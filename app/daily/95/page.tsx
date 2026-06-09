import type { Metadata } from "next";
import Daily95Client from "./daily95-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 95 (Deployments en Kubernetes)",
  description:
    "Leccion sobre despliegues en Kubernetes: rolling updates, readiness, rollout, rollback, kubectl, manifiestos YAML y Helm.",
};

export default function Daily95Page() {
  return <Daily95Client />;
}
