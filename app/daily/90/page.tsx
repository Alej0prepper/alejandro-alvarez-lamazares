import type { Metadata } from "next";
import Daily90Client from "./daily90-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 90 (Simulacion completa de backend en produccion)",
  description:
    "Cierre del bloque: simulacion completa para pensar como backend senior en produccion, con riesgo, fallos, observabilidad, deploys y negocio.",
};

export default function Daily90Page() {
  return <Daily90Client />;
}
