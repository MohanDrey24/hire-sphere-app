import DashboardMain from "./DashboardMain";
import { DashboardNavBar } from "./DashboardNavBar";

export default function Dashboard() {
  return (
    <div>
      {/* SHOULD BE IN A LAYOUT */}
      <DashboardNavBar />
      <DashboardMain />
    </div>
  );
}