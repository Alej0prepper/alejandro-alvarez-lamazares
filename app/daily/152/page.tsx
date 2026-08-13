import type { Metadata } from "next";
import Daily152Client from "./daily152-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 152 (Estrategia de testing)",
  description: "Diseñar una estrategia de testing real para OrderFlow.",
};

export default function Daily152Page() {
  return <Daily152Client />;
}
