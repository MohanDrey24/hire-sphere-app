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

export default function SearchBar({ queryKey }: { queryKey: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchParamsValue = searchParams.get("query")?.toString();

  const [displayInput, setDisplayInput] = useState("");
  const setJobs = useJobStore((state) => state.setJobs);
  const setShowAutocomplete = useJobStore((state) => state.setShowAutocomplete);

  const setQueryParameter = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value.trim()) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`);
  }, [searchParams, queryKey, router]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setQueryParameter(query)
    }, 300),
    [setQueryParameter]
  );

  const { isPending, data, isSuccess } = useQuery<SearchResponse>({
    queryKey: ["search", searchParamsValue],
    queryFn: () => {
      const url = searchParamsValue 
        ? `/jobs/search?query=${searchParamsValue}`
        : "/jobs/search"
      
      return useFetch(url)
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  
  useEffect(() => {
    if (isSuccess) {
      setJobs(data.jobs)
    }
  }, [isSuccess, data, setJobs]);

  useEffect(() => {
    if (searchParamsValue) {
      setDisplayInput(searchParamsValue)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setDisplayInput(e.target.value);
  }

  return (
    <div className="relative">  
      <div className="flex border-2 border-slate-300 focus-within:border-black rounded-full items-center bg-white">
          
        <div className="pl-3">
          <Search size={20} />
        </div>

        <Input
          className="w-44 sm:w-80 pr-3 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-none"
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