import type { Metadata } from "next";
import Daily161Client from "./daily161-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 161 (Relaciones y Domains en Odoo)",
  description: "Relaciones, domains y datos configurables en TradeOps 360.",
};

export default function Daily161Page() {
  return <Daily161Client />;
}
