import type { Metadata } from "next";
import Daily130Client from "./daily130-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 130 (Observabilidad distribuida)",
  description:
    "Leccion sobre observabilidad distribuida: trazas, spans, TraceId, CorrelationId, OpenTelemetry, Jaeger, Prometheus, Grafana y logs estructurados.",
};

export default function Daily130Page() {
  return <Daily130Client />;
}
