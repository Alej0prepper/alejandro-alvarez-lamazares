import type { Metadata } from "next";
import Daily145Client from "./daily145-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 145 (Resiliencia avanzada)",
  description: "Leccion sobre retries, Circuit Breaker, timeouts y Bulkheads en microservicios.",
};

export default function Daily145Page() {
  return <Daily145Client />;
}
