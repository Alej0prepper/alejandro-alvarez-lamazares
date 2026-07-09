import type { Metadata } from "next";
import Daily125Client from "./daily125-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 125 (Dead Letter Queues)",
  description:
    "Leccion sobre Dead Letter Queues, poison messages, retries, backoff exponencial y operacion de mensajes irrecuperables.",
};

export default function Daily125Page() {
  return <Daily125Client />;
}
