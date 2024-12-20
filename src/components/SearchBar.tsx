"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { debounce } from "lodash";
import type { Job } from "@/app/dashboard/types";
import { useSearchParams, useRouter } from "next/navigation";
import useJobStore from "@/app/stores/useJobStore";

export default function SearchBar({ queryKey }: { queryKey: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [displayInput, setDisplayInput] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const setJobs = useJobStore((state) => state.setJobs);

  const { isPending, data, isSuccess } = useQuery<Job[]>({
    queryKey: ["search", queryInput],
    queryFn: () => useFetch(`/jobs/autocomplete?${queryKey}=${queryInput}`),
    enabled: queryInput.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  
  useEffect(() => {
    if (isSuccess) {
      setJobs(data)
    }
  }, [isSuccess, data, setJobs]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setQueryInput(query);
    }, 300),
    []
  );

  const setQueryParameter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(queryKey, value)
    } else {
      params.delete(queryKey)
    }

    router.push(`?${params.toString()}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayInput(e.target.value);
    debouncedSearch(e.target.value);
    setQueryParameter(e.target.value);
  }

  return (
    <div className="relative">
      <div className="flex border rounded-md focus-within:border-blue-500 focus-within:border-2">
        <Input
          className="w-44 sm:w-80 pr-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-none"
          placeholder="Search for jobs"
          value={displayInput}
          onChange={handleInputChange}
        />

        <motion.button
          className="p-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          <Icon
            alt="search"
            src="/icons/search.svg"
            height="20px"
            width="20px"
          />
        </motion.button>
      </div>

      {(isPending || isSuccess) && displayInput.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {isPending && <div className="p-2">Loading...</div>}
          {isSuccess && data?.length > 0 && (
            <div className="py-1">
              {data.map((item: Job, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDisplayInput(item.position);
                    setQueryInput(item.position);
                    setQueryParameter(item.position);
                  }}
                >
                  {item.position}
                </div>
              ))}
            </div>
          )}
          {isSuccess && data?.length === 0 && (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}