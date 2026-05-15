import type { Metadata } from "next";
import Daily70Client from "./daily70-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 70 (Auditoria completa simulada: aplicar todo junto)",
  description:
    "Leccion final del bloque de Seguridad Backend: auditoria simulada, superficie de ataque, priorizacion, hallazgos y mini auditoria mental.",
};

export default function Daily70Page() {
  return <Daily70Client />;
}
