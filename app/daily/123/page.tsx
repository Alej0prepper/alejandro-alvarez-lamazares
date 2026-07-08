import type { Metadata } from "next";
import Daily123Client from "./daily123-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 123 (Outbox Pattern: como publicar eventos sin perder consistencia)",
  description:
    "Leccion sobre Outbox Pattern: guardar datos y eventos en la misma transaccion, publicar con un worker y evitar perdida de eventos.",
};

export default function Daily123Page() {
  return <Daily123Client />;
}
