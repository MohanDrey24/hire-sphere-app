"use client";

import Main from "./Main";
import { NavBar } from "./NavBar";
import { JobDetails } from "./JobDetails";
import useJobStore from "../stores/useJobStore";

export default function Dashboard() {
  const selectedJobId = useJobStore((state) => state.selectedJobId);

  return (
    <div className="grid grid-cols-8 grid-rows-8 h-screen w-screen">
      <NavBar className="col-span-8" />

      <Main 
        className={`
          col-span-8 row-span-7 row-start-2
          overflow-y-auto
          ${selectedJobId ? "hidden" : "block"}
          sm:block sm:col-span-3
        `}
      />

      <JobDetails 
        className={`
          col-span-8 row-span-7 row-start-2
          ${selectedJobId ? "block" : "hidden"}
          sm:block sm:col-span-5 sm:col-start-4 sm:row-start-2
          bg-white
        `}
      />
    </div>
  );
}