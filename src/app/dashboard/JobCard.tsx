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
import { type Job } from "./types";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface CardProps {
  className?: string;
  jobData: Job[];
  isPending: boolean;
  selectedJobId: string | null;
};

export default function JobCard ({ className, jobData, isPending = false, selectedJobId }: CardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParameter = useCallback((id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("job-id", id)
    } else {
      params.delete("job-id")
    }

    router.push(`?${params.toString()}`);
  }, [searchParams]);


  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 p-4">
        {jobData.map((job: Job) => (
          <Card 
            key={job.id}
            className={`min-w-full cursor-pointer min-h-[250px] flex flex-col ${selectedJobId === job.id ? "border-blue-600 border-2" : ""}`}
            onClick={() => setQueryParameter(job.id)}
          >

            <CardHeader>
              <CardTitle>{job?.position}</CardTitle>
              <CardDescription>{job?.company?.name}</CardDescription>
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