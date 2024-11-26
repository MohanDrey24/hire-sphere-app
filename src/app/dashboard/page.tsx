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
          overflow-y-auto col-span-8 row-span-7
          sm:col-span-3 sm:row-span-7 sm:row-start-2
          ${selectedJobId ? "hidden sm:block" : ""}
        `}
      />

      <JobDetails 
        className={`
          overflow-y-auto col-span-8 row-span-7 row-start-2
          sm:col-span-5 sm:row-span-7 sm:col-start-4
          ${selectedJobId ? "block" : "hidden sm:block"}
        `}
      />

    </div>
  );
}