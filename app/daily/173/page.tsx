import type { Metadata } from "next";
import Daily173Client from "./daily173-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 173 (Conciliaciones y concurrencia)",
  description: "Conciliaciones, transacciones, atomicidad y concurrencia en Odoo 17.",
};

export default function Daily173Page() {
  return <Daily173Client />;
}
