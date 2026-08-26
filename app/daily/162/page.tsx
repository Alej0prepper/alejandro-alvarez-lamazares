import type { Metadata } from "next";
import Daily162Client from "./daily162-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 162 (Computed Fields y Constraints)",
  description: "Computed Fields, Constraints y reglas de negocio en Importaciones.",
};

export default function Daily162Page() {
  return <Daily162Client />;
}
