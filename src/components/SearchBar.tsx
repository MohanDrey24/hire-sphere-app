"use client";

import { useCallback, useState } from "react";
import Icon from "./Icon";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { debounce } from "lodash";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const searchAutocomplete = (params: string): any => {
    // const { isPending, data, isSuccess } = useQuery<any>({
    //   queryKey: ["search", params],
    //   queryFn: () => useFetch(`/jobs/autocomplete?position=${params}`)
    // });

    // return { isPending, data, isSuccess, isLoading, isError };
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchInput(query);
      searchAutocomplete(query);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  return (
    <div className="flex border rounded-md focus-within:border-blue-500 focus-within:border-2">

      <Input
        className="w-44 sm:w-80 pr-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-none"
        placeholder="Search for jobs"
        value={searchInput}
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
  );
}