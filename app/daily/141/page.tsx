import type { Metadata } from "next";
import Daily141Client from "./daily141-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 141 (Integrar RabbitMQ)",
  description: "Leccion sobre comunicar microservicios mediante eventos con RabbitMQ.",
};

export default function Daily141Page() {
  return <Daily141Client />;
}
