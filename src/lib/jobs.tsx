import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "./api-client";
import { Job, SearchResponse } from "@/app/dashboard/types";

const getJobQueryOptions = () => {
  return queryOptions({
    queryKey: ["jobs"],
    queryFn: async () => await api.get<Job[]>("/jobs/all"),
  });
};

export const useJob = () => useQuery(getJobQueryOptions());

export const searchJobQueryOptions = (searchParamsValue?: string) => {
  const url = searchParamsValue
    ? `/jobs/search?query=${searchParamsValue}`
    : "/jobs/search";

  return queryOptions({
    queryKey: ["search", searchParamsValue ?? "all"],
    queryFn: async () => await api.get<SearchResponse>(url),
  });
};

export const useSearchJobs = (searchParamsValue?: string) =>
  useQuery(searchJobQueryOptions(searchParamsValue));
