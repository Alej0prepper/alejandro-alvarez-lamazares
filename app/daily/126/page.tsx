import type { Metadata } from "next";
import Daily126Client from "./daily126-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 126 (CQRS avanzado)",
  description:
    "Leccion sobre CQRS avanzado: separar lectura y escritura cuando el negocio lo necesita, usando Commands, Queries y Read Models.",
};

export default function Daily126Page() {
  return <Daily126Client />;
}
