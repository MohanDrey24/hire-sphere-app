"use client"

import { useEffect } from "react";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import { useQuery } from "@tanstack/react-query";
import  type { Job, User } from "./types";
import useFetch from "@/hooks/useFetch"
import useUserStore from "../stores/useUserStore";

export default function DashboardMain () {
  const setJobs = useJobStore((state) => state.setJobs);
  const jobState = useJobStore((state) => state.jobs);
  
  const setUser = useUserStore((state) => state.setUser);

  const { isPending, data: jobsData, isSuccess: jobsSuccess } = useQuery<Array<Job>>({
    queryKey: ['jobs'],
    queryFn: () => useFetch('/jobs/all')
  })

  const { data: userData, isSuccess: userDataSuccess} = useQuery<User>({
    queryKey: ['users'],
    queryFn: () => useFetch('/users/current')
  })

  useEffect(() => {
    if (jobsSuccess) {
      setJobs(jobsData);
    }
    if (userDataSuccess) {
      setUser(userData);
    }
  }, [jobsSuccess, jobsData, userDataSuccess, userData, setJobs, setUser]);

  return (
    <>
      <JobCard 
        jobData={jobState} 
        isPending={isPending}
      />
    </>
  );
};