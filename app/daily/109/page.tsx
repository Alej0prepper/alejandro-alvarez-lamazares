import type { Metadata } from "next";
import Daily109Client from "./daily109-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 109 (Auditoria: como saber quien hizo que, cuando y sobre que)",
  description:
    "Leccion sobre auditoria como historial de negocio, separada de logging y monitoreo, para OrderFlow.",
};

export default function Daily109Page() {
  return <Daily109Client />;
}
