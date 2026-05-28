import type { Metadata } from "next";
import Daily82Client from "./daily82-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 82 (Health Checks)",
  description:
    "Leccion sobre health checks, estados healthy/degraded/unhealthy, liveness vs readiness y como automatizar salud real en backend.",
};

export default function Daily82Page() {
  return <Daily82Client />;
}
