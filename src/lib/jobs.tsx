import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "./api-client";
import { Job } from "@/app/dashboard/types";

export const getJobs = async (): Promise<Job[]> => {
  return await api.get<Job[]>("/jobs/all");
};

const jobQueryKey = ["jobs"];

const getJobsQueryOptions = () => {
  return queryOptions({
    queryKey: jobQueryKey,
    queryFn: getJobs,
  });
};

export const useJob = () => useQuery(getJobsQueryOptions());
