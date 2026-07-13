import type { Metadata } from "next";
import Daily128Client from "./daily128-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 128 (Consistencia eventual en profundidad)",
  description:
    "Leccion sobre consistencia eventual: ventanas de inconsistencia, estados intermedios, reconciliacion, read-your-own-writes y convergencia en sistemas distribuidos.",
};

export default function Daily128Page() {
  return <Daily128Client />;
}
