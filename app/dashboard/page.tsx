import type { Metadata } from "next";
import DashboardClient from "./dashboard-client";
export const metadata: Metadata = { title: "Dashboard Logística Comercial", description: "Vista ejecutiva local del control logístico comercial." };
export default function DashboardPage() { return <DashboardClient />; }
