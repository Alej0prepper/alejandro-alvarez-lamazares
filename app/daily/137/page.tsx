import type { Metadata } from "next";
import Daily137Client from "./daily137-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 137 (Extraer Catalog como microservicio)",
  description: "Leccion practica sobre extraer Catalog como el primer microservicio independiente de OrderFlow.",
};

export default function Daily137Page() {
  return <Daily137Client />;
}
