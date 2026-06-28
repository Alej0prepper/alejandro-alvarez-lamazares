import type { Metadata } from "next";
import Daily114Client from "./daily114-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 114 (Como seguimos)",
  description: "Planificacion de la siguiente etapa: sistemas distribuidos, microservicios y orden de aprendizaje.",
};

export default function Daily114Page() {
  return <Daily114Client />;
}
