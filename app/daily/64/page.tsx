import type { Metadata } from "next";
import Daily64Client from "./daily64-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 64 (Seguridad en integraciones externas y APIs de terceros)",
  description:
    "Leccion sobre riesgos de integraciones externas, webhooks, timeouts, certificados y validacion de respuestas.",
};

export default function Daily64Page() {
  return <Daily64Client />;
}
