"use client";

import { useEffect } from "react";
import { NavBar } from "./NavBar";
import { JobDetails } from "./JobDetails";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import { useQuery } from "@tanstack/react-query";
import type { Job } from "./types";
import useFetch from "@/hooks/useFetch";

export default function Dashboard() {
  const selectedJobId = useJobStore((state) => state.selectedJobId);

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
    <div className="grid grid-cols-8 grid-rows-8 h-screen w-screen">
      <NavBar className="col-span-8" />

      <JobCard
        className={`
          col-span-8 row-span-7 row-start-2
          overflow-y-auto
          ${selectedJobId ? "hidden" : "block"}
          sm:block sm:col-span-3
        `}
        jobData={jobState}
        isPending={isPending}
      />

      <JobDetails
        className={`
          col-span-8 row-span-7 row-start-2
          ${selectedJobId ? "block" : "hidden"}
          sm:block sm:col-span-5 sm:col-start-4 sm:row-start-2
          bg-white
        `}
      />
    </div>
  );
}