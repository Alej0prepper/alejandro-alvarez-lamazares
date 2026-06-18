import type { Metadata } from "next";
import Daily103Client from "./daily103-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 103 (Pausa estrategica: ordenar el proyecto)",
  description:
    "Leccion sobre parar, revisar el dominio real y convertir OrderFlow API en un plan de ejecucion concreto.",
};

export default function Daily103Page() {
  return <Daily103Client />;
}
