import type { Metadata } from "next";
import Daily83Client from "./daily83-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 83 (Graceful Shutdown)",
  description:
    "Leccion sobre graceful shutdown, despliegues sin interrupcion, SIGTERM, Kubernetes, CancellationToken y background jobs.",
};

export default function Daily83Page() {
  return <Daily83Client />;
}
