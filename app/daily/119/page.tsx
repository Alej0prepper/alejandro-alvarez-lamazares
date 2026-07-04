import type { Metadata } from "next";
import Daily119Client from "./daily119-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 119 (Service Discovery: como encuentran los microservicios a otros microservicios)",
  description:
    "Leccion sobre Service Discovery en arquitecturas distribuidas: nombres de servicio, Kubernetes Services, balanceo de carga y health checks.",
};

export default function Daily119Page() {
  return <Daily119Client />;
}
