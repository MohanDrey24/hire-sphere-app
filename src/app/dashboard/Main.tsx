"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import useFetch from "@/hooks/useFetch"
import type { Job } from "./types";

type Props = {
  className?: string;
}

export default function Main ({ className }: Props) {
  const setJobs = useJobStore((state) => state.setJobs);
  const jobState = useJobStore((state) => state.jobs);
  
  const { isPending, data: jobsData, isSuccess: jobsSuccess } = useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: () => useFetch('/jobs/all')
  })

  useEffect(() => {
    if (jobsSuccess) {
      setJobs(jobsData);
    }
  }, [jobsSuccess, jobsData, setJobs]);

  return (
    <div className={`${className} w-full`}>
      <JobCard
        jobData={jobState} 
        isPending={isPending}
      />
    </div>
  );
};