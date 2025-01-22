"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
};

export default function JobCard ({ className, jobData, selectedJobId }: CardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const isJobLoading = useJobStore((state) => state.isLoading);
  const favorites = useFavoriteStore((state) => state.favorites);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);

  fetchFavorites();

  const {mutate: setFavorites} = useMutationAPI("/favorites", "POST", {
    mutationOptions: {
      onMutate: async (data: FavoritePayload) => {
        // cancel ongoing queries so that it will not override our optimistic update
        await queryClient.cancelQueries({ queryKey: ["favorites"] });
  
        // snapshot the previous value
        const previousFavorites = queryClient.getQueryData<Favorites[]>(["favorites"]);
  
        // optimistic update
        queryClient.setQueryData(["favorites"], (old: Favorites[]) => [...old, data]);
  
        // return previous value as context
        return { previousFavorites }
      },
      onSettled: () => {
        return queryClient.invalidateQueries({ queryKey: ["favorites"] });
      }
    }
  })

  const handleFavorite = (jobId: string) => {
    setFavorites({ jobId })
  };

  const setQueryParameter = useCallback((id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("job-id", id)
    } else {
      params.delete("job-id")
    }

    router.push(`?${params.toString()}`);
  }, [searchParams]);

  if (isJobLoading) {
    return (
      <div className={cn("grid gap-4 p-4 w-full", className)}>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="min-w-full min-h-[250px] flex flex-col animate-pulse">
            <Card className="flex flex-col min-h-full">
              <div className="p-4 flex flex-col gap-2">
                <div className="bg-slate-200 h-5 w-3/4 rounded" />
                <div className="bg-slate-200 h-5 w-3/4 rounded" />
              </div>
  
              <div className="p-4 flex flex-col gap-2 flex-grow">
                <div className="bg-slate-200 h-5 w-full rounded" />
                <div className="bg-slate-200 h-5 w-full rounded" />
                <div className="bg-slate-200 h-5 w-full rounded" />
              </div>
  
              <div className="text-muted-foreground text-xs ml-4 mb-4">
                <div className="bg-slate-200 h-5 w-1/4 rounded" />
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
            className={`relative min-w-full min-h-[250px] flex flex-col ${selectedJobId === job.id ? "border-blue-600 border-2" : ""}`}
            onClick={() => setQueryParameter(job.id)}
          >

            <button
              type="button"
              aria-label="Bookmark"
              className="absolute right-4 top-4 hover:scale-125 ease-in-out duration-150"
              onClick={() => handleFavorite(job.id)}
            >
              {favorites.some((fav: Favorites) => fav.jobId === job.id) ? (
                <BookmarkCheck size={24} color="blue"/>
              ) : (
                <Bookmark size={24} />
              )}
            </button>

            <CardHeader className="flex flex-row justify-between items-center">
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
            <p className="text-muted-foreground text-xs ml-6 mb-2">
              {computeDaysAgo(job?.createdAt)}
            </p>
          </Card>
          ))
        }
      </div>
    </div>
  );
}