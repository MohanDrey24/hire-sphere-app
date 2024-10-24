"use client"

import { useQuery } from "@tanstack/react-query";
import { type Job } from "./types";
import JobCard from "./JobCard";

export default function DashboardMain () {
  const { isPending, data, error } = useQuery<Array<Job>>({
    queryKey: ['jobs'],
    queryFn: async () => {
      // should be reusable function that can be accessed globally
      const response = await fetch('http://localhost:4000/api/jobs/all', {
        credentials: 'include'
      })

      return await response.json()
    }
  })

  return (
    <JobCard jobData={data} />
  );
};