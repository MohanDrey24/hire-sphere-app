"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import useFetch from "@/hooks/useFetch"
import type { Job } from "./types";

export default function DashboardMain () {
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
    <>
      <JobCard 
        jobData={jobState} 
        isPending={isPending}
      />
    </>
  );
};