import type { Metadata } from "next";
import Daily133Client from "./daily133-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 133 (La razon de negocio para microservicios)",
  description:
    "Leccion sobre por que OrderFlow evolucionaria hacia microservicios solo cuando el negocio necesita autonomia, escalado independiente, aislamiento de fallos y evolucion operativa.",
};

export default function Daily133Page() {
  return <Daily133Client />;
}
