import type { Metadata } from "next";
import Daily140Client from "./daily140-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 140 (Crear Payments Service)",
  description: "Leccion sobre integrar pagos externos con idempotencia, estados inciertos y resiliencia.",
};

export default function Daily140Page() {
  return <Daily140Client />;
}
