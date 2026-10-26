import type { Metadata } from "next";
import Daily199Client from "./daily199-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 199 (Construir una reproducción mínima)",
  description: "Reduce datos, pasos y dependencias conservando el mismo fallo: una reproducción mínima en C#, evidencia verificable y criterio backend y QA.",
};

export default function Daily199Page() {
  return <Daily199Client />;
}
