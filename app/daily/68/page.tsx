import type { Metadata } from "next";
import Daily68Client from "./daily68-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 68 (Threat Modeling: aprender a pensar como un atacante)",
  description:
    "Leccion sobre threat modeling, identificacion temprana de riesgos, mentalidad atacante, STRIDE y analisis de endpoints criticos.",
};

export default function Daily68Page() {
  return <Daily68Client />;
}
