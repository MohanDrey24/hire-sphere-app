import JobCard from "./JobCard";
import { JobDetails } from "./JobDetails";
import { NavBar } from "./NavBar";

export default function Dashboard() {
  return (
    <div className="relative grid h-screen w-screen grid-cols-8 grid-rows-8">
      <NavBar className="col-span-8" />

      <JobCard className="col-span-8 row-span-7 row-start-2 overflow-y-auto sm:col-span-3 sm:block" />

      <JobDetails className="col-span-8 row-span-7 row-start-2 bg-white sm:col-span-5 sm:col-start-4 sm:row-start-2 sm:block" />
    </div>
  );
}
