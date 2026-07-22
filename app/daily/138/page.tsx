import type { Metadata } from "next";
import Daily138Client from "./daily138-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 138 (Extraer Orders Service)",
  description: "Leccion sobre extraer Orders Service y construir el nucleo del proceso de compra de OrderFlow.",
};

export default function Daily138Page() {
  return <Daily138Client />;
}
