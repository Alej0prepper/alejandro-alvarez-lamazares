import type { Metadata } from "next";
import Daily129Client from "./daily129-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 129 (Patrones de resiliencia en microservicios)",
  description:
    "Leccion sobre resiliencia en microservicios: timeout, retry, circuit breaker, bulkhead, fallback, cache, colas, DLQ, outbox e idempotencia.",
};

export default function Daily129Page() {
  return <Daily129Client />;
}
