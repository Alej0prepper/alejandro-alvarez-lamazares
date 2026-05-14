import type { Metadata } from "next";
import Daily69Client from "./daily69-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 69 (Como reportar hallazgos de seguridad profesionalmente)",
  description:
    "Leccion sobre como comunicar hallazgos de seguridad con estructura profesional, impacto, evidencia, severidad y recomendaciones.",
};

export default function Daily69Page() {
  return <Daily69Client />;
}
