import type { Metadata } from "next";
import Daily202Client from "./daily202-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 202 (Separar el problema de la solución solicitada)",
  description: "Identifica la necesidad detrás de una petición antes de implementar: preguntas útiles, alternativas de contrato backend y una mirada de QA sobre el resultado esperado.",
};

export default function Daily202Page() {
  return <Daily202Client />;
}
