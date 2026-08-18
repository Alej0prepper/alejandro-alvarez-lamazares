import type { Metadata } from "next";
import Daily155Client from "./daily155-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 155 (Pruebas de carga)",
  description: "Load, stress, spike y soak testing aplicado a APIs backend.",
};

export default function Daily155Page() {
  return <Daily155Client />;
}
