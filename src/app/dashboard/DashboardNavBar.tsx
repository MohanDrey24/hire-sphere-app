"use client"
import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function DashboardNavBar () {
  return (
    <div className="flex justify-between bg-slate-100 h-20 min-w-full items-center">
      <div className="border-none ml-10 bg-red-100 w-10 h-10 rounded-full" />

      <div className="flex flex-row relative">
        <Input
          className="w-[300px]"
          placeholder="Search for jobs"
        >
          <Icon
            alt="search"
            src="/icons/search.svg"
            height="20px"
            width="20px"
          />
        </Input>
      </div>

      <motion.div 
        className="mr-8 rounded-full w-10 h-10 bg-blue-600 cursor-pointer border-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
      />
    </div>
  );
}