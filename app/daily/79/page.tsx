import type { Metadata } from "next";
import Daily79Client from "./daily79-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 79 (Simulacion completa: backend escalable)",
  description:
    "Simulacion completa para disenar un backend de e-commerce preparado para escala, fallos, colas, cache, observabilidad y tradeoffs.",
};

export default function Daily79Page() {
  return <Daily79Client />;
}
