"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { computeDaysAgo } from "../utils/computeTimeAgo";
import type { Favorites, FavoritePayload, Job } from "./types";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import useJobStore from "../stores/useJobStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFavorites, useToggleFavorite } from "@/lib/favorites";

interface CardProps {
  className?: string;
  jobData: Job[];
  selectedJobId: string | null;
}

export default function JobCard({
  className,
  jobData,
  selectedJobId,
}: CardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const favorites = useGetFavorites();

  const isJobLoading = useJobStore((state) => state.isLoading);

  const { mutate: setFavorites } = useToggleFavorite({
    onMutate: async (newFavorite: FavoritePayload) => {
      // cancel ongoing queries so that it will not override our optimistic update
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      // get a snapshot of the previous data
      const previousFavorites = queryClient.getQueryData<Favorites[]>([
        "favorites",
      ]);
      // optimistically update the cache
      await queryClient.setQueryData(["favorites"], (old: Favorites[]) =>
        old ? [...old, newFavorite] : [newFavorite],
      );

      // return previous value as context
      return { previousFavorites };
    },
    // if error, set the current cache to the previous favorites
    onError: (_err, _newFavorite, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },
    onSettled: async () => {
      // update the cache again when the API is successful
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleFavorite = (jobId: string) => {
    setFavorites({ jobId });
  };

  const setQueryParameter = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (id) {
        params.set("job-id", id);
      } else {
        params.delete("job-id");
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  if (isJobLoading) {
    return (
      <div className={cn("grid w-full gap-4 p-4", className)}>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex min-h-[250px] min-w-full animate-pulse flex-col"
          >
            <Card className="flex min-h-full flex-col">
              <div className="flex flex-col gap-2 p-4">
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-5 w-3/4 rounded bg-slate-200" />
              </div>

              <div className="flex grow flex-col gap-2 p-4">
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-5 w-full rounded bg-slate-200" />
              </div>

              <div className="text-muted-foreground mb-4 ml-4 text-xs">
                <div className="h-5 w-1/4 rounded bg-slate-200" />
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 p-4">
        {jobData.map((job: Job) => (
          <Card
            key={job.id}
            className={`bg-mint-green-dark relative flex min-h-[250px] min-w-full flex-col ${selectedJobId === job.id ? "ring-4 ring-[#D96AC4] ring-inset" : ""}`}
            onClick={() => setQueryParameter(job.id)}
          >
            <button
              type="button"
              aria-label="Bookmark"
              className="absolute top-4 right-4 duration-150 ease-in-out hover:scale-125"
              onClick={() => handleFavorite(job.id)}
            >
              {favorites.data?.some(
                (fav: Favorites) => fav.jobId === job.id,
              ) ? (
                <BookmarkCheck size={24} color="blue" />
              ) : (
                <Bookmark size={24} />
              )}
            </button>

            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{job?.position}</CardTitle>
                <CardDescription>{job?.company?.name}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grow text-sm">
              <p>${job?.salary}</p>
              <p>{job?.type}</p>
              <p>{job?.country}</p>
            </CardContent>
            <p className="text-muted-foreground mb-2 ml-6 text-xs">
              {computeDaysAgo(job?.createdAt)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
