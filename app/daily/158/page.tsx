import type { Metadata } from "next";
import Daily158Client from "./daily158-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 158 (Entorno profesional Odoo 17)",
  description: "Preparar un entorno profesional de desarrollo Odoo 17 para TradeOps 360.",
};

export default function Daily158Page() {
  return <Daily158Client />;
}
