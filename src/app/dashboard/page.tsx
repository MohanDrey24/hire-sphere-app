import Main from "./Main";
import { NavBar } from "./NavBar";
import { JobDetails } from "./JobDetails";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-8 grid-rows-8 h-screen w-screen">
      {/* SHOULD BE IN A LAYOUT */}
      <NavBar className="col-span-8"/>
      <Main className="overflow-y-auto col-span-8 row-span-7 sm:col-span-3 sm:row-span-7 sm:row-start-2"/>
      <JobDetails className="overflow-y-auto hidden sm:block col-span-5 row-span-7 col-start-4 row-start-2"/>
    </div>
  );
}