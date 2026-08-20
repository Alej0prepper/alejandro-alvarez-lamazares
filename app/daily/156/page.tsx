import type { Metadata } from "next";
import Daily156Client from "./daily156-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 156 (Odoo 17 para backend)",
  description: "Odoo 17 desde la perspectiva de un desarrollador backend con FieldOps 360.",
};

export default function Daily156Page() {
  return <Daily156Client />;
}
