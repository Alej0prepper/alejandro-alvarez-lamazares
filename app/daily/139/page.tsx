import type { Metadata } from "next";
import Daily139Client from "./daily139-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 139 (Crear Inventory Service)",
  description: "Leccion sobre gestionar stock, reservas y concurrencia en Inventory Service.",
};

export default function Daily139Page() {
  return <Daily139Client />;
}
