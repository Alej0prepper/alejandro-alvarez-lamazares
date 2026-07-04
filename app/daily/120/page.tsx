import type { Metadata } from "next";
import Daily120Client from "./daily120-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 120 (RabbitMQ desde cero: entender colas, exchanges y routing)",
  description:
    "Leccion sobre RabbitMQ desde cero: message broker, productores, consumidores, queues, exchanges, routing keys y desacoplamiento.",
};

export default function Daily120Page() {
  return <Daily120Client />;
}
