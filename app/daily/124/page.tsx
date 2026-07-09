import type { Metadata } from "next";
import Daily124Client from "./daily124-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 124 (Idempotencia en consumidores)",
  description:
    "Leccion sobre idempotencia en consumidores: como evitar procesar dos veces el mismo mensaje en arquitecturas distribuidas.",
};

export default function Daily124Page() {
  return <Daily124Client />;
}
