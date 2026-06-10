import type { Metadata } from "next";
import Daily96Client from "./daily96-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 96 (Health checks y arranque/graceful shutdown)",
  description:
    "Leccion sobre probes en Kubernetes: liveness, readiness, startup, Docker HEALTHCHECK, rolling updates y graceful shutdown.",
};

export default function Daily96Page() {
  return <Daily96Client />;
}
