import type { Metadata } from "next";
import Daily188Client from "./daily188-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 188 (Configuración vs código: mismo software, distinto entorno)",
  description: "Investiga diferencias entre entornos con ASP.NET Core y Docker: fuentes, prioridad, valores efectivos, secretos y feature flags con criterio backend y QA.",
};

export default function Daily188Page() {
  return <Daily188Client />;
}
