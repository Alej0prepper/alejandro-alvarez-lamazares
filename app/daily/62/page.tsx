import type { Metadata } from "next";
import Daily62Client from "./daily62-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 62 (Endpoints criticos: que proteger primero)",
  description:
    "Leccion sobre como priorizar endpoints de alto impacto y aplicar protecciones segun riesgo en APIs backend.",
};

export default function Daily62Page() {
  return <Daily62Client />;
}
