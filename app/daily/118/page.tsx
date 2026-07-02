import type { Metadata } from "next";
import Daily118Client from "./daily118-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 118 (API Gateway: el punto de entrada de una arquitectura de microservicios)",
  description:
    "Leccion sobre API Gateway: punto de entrada unico, routing, autenticacion, rate limiting, logging y aggregation.",
};

export default function Daily118Page() {
  return <Daily118Client />;
}
