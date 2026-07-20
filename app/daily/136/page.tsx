import type { Metadata } from "next";
import Daily136Client from "./daily136-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 136 (Preparando la solucion de OrderFlow)",
  description: "Leccion sobre como preparar la arquitectura base de OrderFlow antes de migrar la logica a microservicios.",
};

export default function Daily136Page() {
  return <Daily136Client />;
}
