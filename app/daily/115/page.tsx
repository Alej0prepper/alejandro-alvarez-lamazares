import type { Metadata } from "next";
import Daily115Client from "./daily115-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 115 (Monolito vs Monolito Modular vs Microservicios: elegir la arquitectura correcta, no la más popular)",
  description:
    "Leccion sobre monolitos, monolitos modulares y microservicios: ventajas, desventajas, criterio de uso y evolucion real.",
};

export default function Daily115Page() {
  return <Daily115Client />;
}
