import type { Metadata } from "next";
import Daily170Client from "./daily170-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 170 (Preventa a venta)",
  description: "Convertir una Preventa en sale.order estandar de Odoo.",
};

export default function Daily170Page() {
  return <Daily170Client />;
}
