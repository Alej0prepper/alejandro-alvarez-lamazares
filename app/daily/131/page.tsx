import type { Metadata } from "next";
import Daily131Client from "./daily131-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 131 (Diseno de APIs para microservicios)",
  description:
    "Leccion sobre diseno de APIs para microservicios: contratos, versionado, breaking changes, DTOs, paginacion, idempotencia y contract testing.",
};

export default function Daily131Page() {
  return <Daily131Client />;
}
