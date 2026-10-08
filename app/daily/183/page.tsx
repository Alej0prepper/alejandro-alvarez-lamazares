import type { Metadata } from "next";
import Daily183Client from "./daily183-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 183 (Fail Fast vs Best Effort)",
  description: "Decide cuándo detener un proceso backend y cuándo continuar con unidades independientes: atomicidad, resultados parciales, ejemplos .NET y validación de QA.",
};

export default function Daily183Page() {
  return <Daily183Client />;
}
