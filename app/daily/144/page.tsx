import type { Metadata } from "next";
import Daily144Client from "./daily144-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 144 (Observabilidad distribuida)",
  description: "Leccion sobre OpenTelemetry, logs, metricas y trazas en OrderFlow.",
};

export default function Daily144Page() {
  return <Daily144Client />;
}
