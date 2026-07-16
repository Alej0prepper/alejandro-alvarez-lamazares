import type { Metadata } from "next";
import Daily132Client from "./daily132-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 132 (Arquitectura completa de un e-commerce moderno)",
  description:
    "Leccion sobre una arquitectura completa de e-commerce moderno: gateway, microservicios, CQRS, eventos, sagas, resiliencia, observabilidad, Docker y Kubernetes.",
};

export default function Daily132Page() {
  return <Daily132Client />;
}
