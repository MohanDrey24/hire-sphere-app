"use client"

import { DashboardNavBar } from "./DashboardNavBar";
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()


  return (
    <div>
      {/* SHOULD BE IN A LAYOUT */}
      <DashboardNavBar />
      <div>session: {status}</div>
    </div>
  );
}