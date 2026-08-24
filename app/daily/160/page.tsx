import type { Metadata } from "next";
import Daily160Client from "./daily160-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 160 (ORM y Recordsets en Odoo)",
  description: "Crear el primer modelo y flujo de importacion de TradeOps 360.",
};

export default function Daily160Page() {
  return <Daily160Client />;
}
