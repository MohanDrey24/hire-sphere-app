"use client";
import useJobStore from "../stores/useJobStore";
import { Job } from "./types";

type Props = {
  className?: string;
}

export function JobDetails ({ className }: Props) {
  const selectedJobId: string = useJobStore((state) => state.selectedJobId);
  const jobState: Job[] = useJobStore((state) => state.jobs)

  const selectedJob = jobState.find((job) => job.id === selectedJobId);

 return (
  <div className={`${className} bg-green-100 w-full h-full flex items-center justify-center`} >
    {selectedJob?.description ? (
      <p className="text-md">{selectedJob.description}</p>
    ) : (
      <p className="text-md">No Job Description</p>
    )}
  </div>
 )
}