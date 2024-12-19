"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import useJobStore from "../stores/useJobStore";
import { computeDaysAgo } from "../utils/computeTimeAgo";
import { type Job } from "./types";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  jobData?: Job[];
  isPending: boolean;
};

export default function JobCard ({ className, jobData, isPending = false }: CardProps) {
  const setSelectedJobId = useJobStore((state) => state.setSelectedJobId);
  const selectedJobId = useJobStore((state) => state.selectedJobId);

  // usbonon kay bati
  if (isPending) {
    return (
      <div className={cn("grid gap-4 p-4 w-full", className)}>
        <Card className="min-w-full min-h-[250px] flex flex-col">
          <div className="animate-pulse flex flex-col gap-2 p-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="bg-slate-200 h-5 w-full rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 p-4">
        {jobData?.map((job: Job) => (
          <Card 
            key={job.id}
            className={`min-w-full cursor-pointer min-h-[250px] flex flex-col ${selectedJobId === job.id ? "border-blue-600 border-2" : ""}`}
            onClick={() => setSelectedJobId(job.id)}
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