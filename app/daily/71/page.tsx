import type { Metadata } from "next";
import Daily71Client from "./daily71-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 71 (Que significa realmente performance)",
  description:
    "Leccion sobre performance backend, latencia, throughput, CPU, RAM, I/O, concurrencia y comportamiento bajo carga.",
};

export default function Daily71Page() {
  return <Daily71Client />;
}
