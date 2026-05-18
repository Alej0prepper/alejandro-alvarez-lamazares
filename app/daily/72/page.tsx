import type { Metadata } from "next";
import Daily72Client from "./daily72-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 72 (Bottlenecks: donde se vuelven lentos los sistemas)",
  description:
    "Leccion sobre cuellos de botella en backend, DB, APIs externas, red, disco, locks, CPU, medicion y diagnostico.",
};

export default function Daily72Page() {
  return <Daily72Client />;
}
