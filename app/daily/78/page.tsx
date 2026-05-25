import type { Metadata } from "next";
import Daily78Client from "./daily78-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 78 (Consistencia vs performance)",
  description:
    "Leccion sobre tradeoffs reales entre consistencia, performance, cache, replicas, asincronia y arquitectura distribuida.",
};

export default function Daily78Page() {
  return <Daily78Client />;
}
