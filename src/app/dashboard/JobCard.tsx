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
import useFavoriteStore from "../stores/useFavoriteStore";
import { useQueryClient } from "@tanstack/react-query";
import { useMutationAPI } from "@/hooks/useMutationAPI";

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

  const isJobLoading = useJobStore((state) => state.isLoading);
  const favorites = useFavoriteStore((state) => state.favorites);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);

  fetchFavorites();

  const { mutate: setFavorites } = useMutationAPI("/favorites", "POST", {
    mutationOptions: {
      onMutate: async (data: FavoritePayload) => {
        // cancel ongoing queries so that it will not override our optimistic update
        await queryClient.cancelQueries({ queryKey: ["favorites"] });

        // snapshot the previous value
        const previousFavorites = queryClient.getQueryData<Favorites[]>([
          "favorites",
        ]);

        // optimistic update
        queryClient.setQueryData(["favorites"], (old: Favorites[]) => [
          ...old,
          data,
        ]);

        // return previous value as context
        return { previousFavorites };
      },
      onSettled: () => {
        return queryClient.invalidateQueries({ queryKey: ["favorites"] });
      },
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

              <div className="flex flex-grow flex-col gap-2 p-4">
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-5 w-full rounded bg-slate-200" />
              </div>

              <div className="mb-4 ml-4 text-xs text-muted-foreground">
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
            className={`relative flex min-h-[250px] min-w-full flex-col ${selectedJobId === job.id ? "ring-2 ring-inset ring-blue-600" : ""}`}
            onClick={() => setQueryParameter(job.id)}
          >
            <button
              type="button"
              aria-label="Bookmark"
              className="absolute right-4 top-4 duration-150 ease-in-out hover:scale-125"
              onClick={() => handleFavorite(job.id)}
            >
              {favorites.some((fav: Favorites) => fav.jobId === job.id) ? (
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

            <CardContent className="flex-grow text-sm">
              <p>${job?.salary}</p>
              <p>{job?.type}</p>
              <p>{job?.country}</p>
            </CardContent>
            <p className="mb-2 ml-6 text-xs text-muted-foreground">
              {computeDaysAgo(job?.createdAt)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
