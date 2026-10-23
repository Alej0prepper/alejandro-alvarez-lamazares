import type { Metadata } from "next";
import Daily190Client from "./daily190-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 190 (Seguir una petición con un identificador de correlación)",
  description: "Reconstruye una petición entre logs concurrentes con HttpContext.TraceIdentifier, scopes y X-Correlation-ID en ASP.NET Core; comprueba la correlación con criterio backend y QA.",
};

export default function Daily190Page() {
  return <Daily190Client />;
}
