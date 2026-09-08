import type { Metadata } from "next";
import Daily172Client from "./daily172-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 172 (Entregas parciales)",
  description: "Entregas parciales, incidencias y Wizards en Odoo 17.",
};

export default function Daily172Page() {
  return <Daily172Client />;
}
