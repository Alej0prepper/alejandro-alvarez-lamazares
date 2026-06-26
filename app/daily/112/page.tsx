import type { Metadata } from "next";
import Daily112Client from "./daily112-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 112 (Kubernetes: desplegar una aplicacion para que sobreviva, escale y se recupere sola)",
  description:
    "Leccion sobre Kubernetes: Deployment, Service, ConfigMap, Secret, health checks, recursos, variables de entorno y flujo de despliegue.",
};

export default function Daily112Page() {
  return <Daily112Client />;
}
