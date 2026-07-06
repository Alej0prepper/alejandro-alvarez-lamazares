import type { Metadata } from "next";
import Daily121Client from "./daily121-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 121 (Event-Driven Architecture: construir sistemas basados en eventos)",
  description:
    "Leccion sobre Event-Driven Architecture: eventos de dominio, comandos, productores, consumidores y desacoplamiento entre servicios.",
};

export default function Daily121Page() {
  return <Daily121Client />;
}
