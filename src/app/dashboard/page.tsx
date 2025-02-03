"use client";

import { useSearchParams } from "next/navigation";

import useJobStore from "../stores/useJobStore";
import JobCard from "./JobCard";
import { JobDetails } from "./JobDetails";
import { NavBar } from "./NavBar";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const selectedJobId = searchParams.get("job-id");

  const jobState = useJobStore((state) => state.jobs);

  return (
    <div className="relative grid h-screen w-screen grid-cols-8 grid-rows-8">
      <NavBar className="col-span-8" />

      <JobCard
        className={`col-span-8 row-span-7 row-start-2 overflow-y-auto ${selectedJobId ? "hidden" : "block"} sm:col-span-3 sm:block`}
        jobData={jobState}
        selectedJobId={selectedJobId}
      />

      <JobDetails
        className={`col-span-8 row-span-7 row-start-2 ${selectedJobId ? "block" : "hidden"} bg-white sm:col-span-5 sm:col-start-4 sm:row-start-2 sm:block`}
        selectedJobId={selectedJobId}
      />
    </div>
  );
}
