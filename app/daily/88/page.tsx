import type { Metadata } from "next";
import Daily88Client from "./daily88-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 88 (Blue/Green y Canary Deployments)",
  description:
    "Leccion sobre Blue/Green deployment, Canary deployment, rollback, feature flags, health checks y despliegues de bajo riesgo.",
};

export default function Daily88Page() {
  return <Daily88Client />;
}
