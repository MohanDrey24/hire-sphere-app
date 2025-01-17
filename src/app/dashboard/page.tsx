"use client";

import { NavBar } from "./NavBar";
import { JobDetails } from "./JobDetails";
import JobCard from "./JobCard";
import useJobStore from "../stores/useJobStore";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const selectedJobId = searchParams.get("job-id");

  const jobState = useJobStore((state) => state.jobs);

  return (
    <div className="grid grid-cols-8 grid-rows-8 h-screen w-screen relative">
      <NavBar className="col-span-8" />

      <JobCard
        className={`
          col-span-8 row-span-7 row-start-2
          overflow-y-auto
          ${selectedJobId ? "hidden" : "block"}
          sm:block sm:col-span-3
        `}
        jobData={jobState}
        selectedJobId={selectedJobId}
      />

      <JobDetails
        className={`
          col-span-8 row-span-7 row-start-2
          ${selectedJobId ? "block" : "hidden"}
          sm:block sm:col-span-5 sm:col-start-4 sm:row-start-2
          bg-white
        `}
        selectedJobId={selectedJobId}
      />
    </div>
  );
}
