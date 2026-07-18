import type { Metadata } from "next";
import Daily134Client from "./daily134-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 134 (Definir los casos de uso y la demostracion esperada de OrderFlow)",
  description:
    "Leccion sobre como definir casos de uso, actores, flujos, eventos, comandos y demostraciones esperadas antes de separar OrderFlow en microservicios.",
};

export default function Daily134Page() {
  return <Daily134Client />;
}
