import type { Metadata } from "next";
import Daily174Client from "./daily174-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 174 (Integraciones y auditoria)",
  description: "Integraciones, notificaciones, auditoria y reportes en Odoo 17.",
};

export default function Daily174Page() {
  return <Daily174Client />;
}
