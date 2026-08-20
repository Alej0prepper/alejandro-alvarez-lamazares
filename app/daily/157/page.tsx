import type { Metadata } from "next";
import Daily157Client from "./daily157-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 157 (Arquitectura de Odoo 17)",
  description: "Arquitectura de Odoo 17 y donde vive TradeOps 360.",
};

export default function Daily157Page() {
  return <Daily157Client />;
}
