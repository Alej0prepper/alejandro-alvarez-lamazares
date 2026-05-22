import type { Metadata } from "next";
import Daily75Client from "./daily75-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 75 (Escalabilidad vertical vs horizontal)",
  description:
    "Leccion sobre escalabilidad vertical y horizontal, stateless APIs, load balancers, recursos compartidos y cuellos de botella reales.",
};

export default function Daily75Page() {
  return <Daily75Client />;
}
