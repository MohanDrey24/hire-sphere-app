"use client"

import { useEffect } from "react";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import { useQuery } from "@tanstack/react-query";
import { type Job } from "./types";
import useFetch from "@/hooks/useFetch"

export default function DashboardMain () {
  const setJobs = useJobStore((state) => state.setJobs)
  const jobState = useJobStore((state) => state.jobs)

  const { isPending, data, isSuccess } = useQuery<Array<Job>>({
    queryKey: ['jobs'],
    queryFn: () => useFetch('/jobs/all')
  })

  useEffect(() => {
    if (isSuccess) {
      setJobs(data)
    }
  }, [isSuccess])

  return (
    <JobCard 
      jobData={jobState} 
      isPending={isPending}
    />
  );
};