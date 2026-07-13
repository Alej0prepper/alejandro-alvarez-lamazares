import type { Metadata } from "next";
import Daily127Client from "./daily127-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 127 (Event Sourcing)",
  description:
    "Leccion sobre Event Sourcing: guardar la historia completa del negocio, reconstruir aggregates desde eventos y combinarlo con projections y CQRS.",
};

export default function Daily127Page() {
  return <Daily127Client />;
}
