"use client"

import { useEffect } from "react";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import { useQuery } from "@tanstack/react-query";
import { type Job } from "./types";

export default function DashboardMain () {
  const setJobs = useJobStore((state) => state.setJobs)
  const jobState = useJobStore((state) => state.jobs)

  const { isPending, data, isSuccess } = useQuery<Array<Job>>({
    queryKey: ['jobs'],
    queryFn: async () => {
      // should be reusable function that can be accessed globally
      const response = await fetch('http://localhost:4000/api/jobs/all', {
        credentials: 'include'
      })

      return await response.json()
    }
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