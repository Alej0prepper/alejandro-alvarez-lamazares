import type { Metadata } from "next";
import Daily86Client from "./daily86-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 86 (Deployments seguros)",
  description:
    "Leccion sobre deployments seguros, pipelines, staging, smoke tests, rollback, health checks, feature flags y monitoreo post deploy.",
};

export default function Daily86Page() {
  return <Daily86Client />;
}
