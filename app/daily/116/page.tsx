import type { Metadata } from "next";
import Daily116Client from "./daily116-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 116 (Comunicacion entre microservicios: REST, gRPC y Mensajeria)",
  description:
    "Leccion sobre comunicacion entre microservicios: REST, gRPC, mensajeria asincrona, ventajas, riesgos y criterio de uso.",
};

export default function Daily116Page() {
  return <Daily116Client />;
}
