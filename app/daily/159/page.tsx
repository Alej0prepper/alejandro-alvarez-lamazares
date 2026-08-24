import type { Metadata } from "next";
import Daily159Client from "./daily159-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 159 (Anatomia de un modulo Odoo)",
  description: "Crear trade_core y trade_import para TradeOps 360.",
};

export default function Daily159Page() {
  return <Daily159Client />;
}
