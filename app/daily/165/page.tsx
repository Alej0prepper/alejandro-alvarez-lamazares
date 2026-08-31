import type { Metadata } from "next";
import Daily165Client from "./daily165-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 165 (Resumen Odoo 17)",
  description: "Resumen de lo aprendido sobre Odoo 17 y TradeOps 360.",
};

export default function Daily165Page() {
  return <Daily165Client />;
}
