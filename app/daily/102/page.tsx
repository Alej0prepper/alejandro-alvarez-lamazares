import type { Metadata } from "next";
import Daily102Client from "./daily102-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 102 (Cultura de plataforma, deploys y rollback)",
  description:
    "Leccion final del bloque: cultura de plataforma, deploys pequenos, rollback, ownership, confianza operativa y aprendizaje a partir de incidentes.",
};

export default function Daily102Page() {
  return <Daily102Client />;
}
