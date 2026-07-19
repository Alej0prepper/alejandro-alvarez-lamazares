import type { Metadata } from "next";
import Daily135Client from "./daily135-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 135 (Identificando los bounded contexts en OrderFlow)",
  description:
    "Leccion sobre como identificar bounded contexts en OrderFlow, definir limites de servicio correctos y evitar separar microservicios por tablas, CRUD o bases compartidas.",
};

export default function Daily135Page() {
  return <Daily135Client />;
}
