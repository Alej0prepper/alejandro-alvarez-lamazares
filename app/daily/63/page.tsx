import type { Metadata } from "next";
import Daily63Client from "./daily63-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 63 (TODO: Titulo de la leccion)",
  description: "TODO: Resumen corto de la leccion.",
};

export default function Daily63Page() {
  return <Daily63Client />;
}
