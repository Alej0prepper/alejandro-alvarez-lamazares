import type { Metadata } from "next";
import Daily76Client from "./daily76-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 76 (Observabilidad y profiling)",
  description:
    "Leccion sobre observabilidad, logs, metricas, tracing y profiling para diagnosticar sistemas backend bajo carga.",
};

export default function Daily76Page() {
  return <Daily76Client />;
}
