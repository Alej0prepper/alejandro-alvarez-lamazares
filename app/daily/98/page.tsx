import type { Metadata } from "next";
import Daily98Client from "./daily98-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 98 (Observabilidad y monitoreo de cluster)",
  description:
    "Leccion sobre observabilidad en Kubernetes: logs, metricas, traces, Prometheus, Grafana, alertas y deteccion temprana de degradacion.",
};

export default function Daily98Page() {
  return <Daily98Client />;
}
