import DashboardMain from "./DashboardMain";
import { DashboardNavBar } from "./DashboardNavBar";
import { JobDetails } from "./JobDetails";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-8 grid-rows-8 h-screen w-screen">
      {/* SHOULD BE IN A LAYOUT */}
      <DashboardNavBar className="col-span-8"/>
      <DashboardMain className="col-span-3 row-span-7 row-start-2"/>
      <JobDetails className="col-span-5 row-span-7 col-start-4 row-start-2"/>
    </div>
  );
}