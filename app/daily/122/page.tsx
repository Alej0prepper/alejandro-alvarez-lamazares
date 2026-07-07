import type { Metadata } from "next";
import Daily122Client from "./daily122-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 122 (Saga Pattern: coordinar procesos distribuidos sin usar una transaccion gigante)",
  description:
    "Leccion sobre Saga Pattern: transacciones locales, compensaciones, coreografia, orquestacion y consistencia en microservicios.",
};

export default function Daily122Page() {
  return <Daily122Client />;
}
