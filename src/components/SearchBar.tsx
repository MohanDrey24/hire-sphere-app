"use client";

import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { debounce } from "lodash";
import { type SearchResponse } from "@/app/dashboard/types";
import { useSearchParams, useRouter } from "next/navigation";
import useJobStore from "@/app/stores/useJobStore";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchParamsValue = searchParams.get("query")?.toString();

  const [displayInput, setDisplayInput] = useState("");
  const setJobs = useJobStore((state) => state.setJobs);
  const isLoading = useJobStore((state) => state.isLoading);
  const setIsLoading = useJobStore((state) => state.setIsLoading);
  const setShowAutocomplete = useJobStore((state) => state.setShowAutocomplete);

  const setQueryParameter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("query", encodeURIComponent(value));
      } else {
        params.delete("query");
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setQueryParameter(query);
    }, 300),
    [setQueryParameter],
  );

  const { isPending, data } = useQuery<SearchResponse>({
    queryKey: ["search", searchParamsValue ?? "all"],
    queryFn: () => {
      const url = searchParamsValue
        ? `/jobs/search?query=${searchParamsValue}`
        : "/jobs/search";

      return useFetch(url);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (isPending) {
      setIsLoading(isPending);
    }

    if (data) {
      setJobs(data.jobs);
      setIsLoading(false);
    }
  }, [data, setJobs, isPending, setIsLoading, isLoading]);

  useEffect(() => {
    if (searchParamsValue) {
      setDisplayInput(searchParamsValue);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setDisplayInput(e.target.value);
  };

  return (
    <div className="relative">
      <div className="flex items-center rounded-full border-2 border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-1">
        <div className="pl-3">
          <Search size={20} />
        </div>

        <Input
          className="focus-visible:ring-none w-44 border-0 pr-3 shadow-none focus-visible:ring-0 sm:w-80"
          placeholder="Search for jobs"
          value={displayInput}
          onChange={handleInputChange}
          onClick={() => setShowAutocomplete(true)}
        />
      </div>

      {/* {(isPending || isSuccess) && searchParamsValue !== undefined && showAutocomplete && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {isPending && <div className="p-2">Loading...</div>}
          {isSuccess && data.jobs?.length > 0 && (
            <div className="py-1">
              {data.jobs?.map((item: Job, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDisplayInput(item.position);
                    setQueryParameter(item.position);
                    setShowAutocomplete(false);
                  }}
                >
                  {item.position}
                </div>
              ))}
            </div>
          )}
          {isSuccess && data.jobs?.length === 0 && (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )} */}
    </div>
  );
}
