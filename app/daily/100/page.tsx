import type { Metadata } from "next";
import Daily100Client from "./daily100-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 100 (CI/CD y despliegue automatizado)",
  description:
    "Leccion sobre CI/CD: pipeline, quality gates, Docker image, registry, Kubernetes, Helm, rollback y seguridad automatizada.",
};

export default function Daily100Page() {
  return <Daily100Client />;
}
