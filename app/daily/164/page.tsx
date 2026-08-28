import type { Metadata } from "next";
import Daily164Client from "./daily164-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 164 (Gastos de importacion)",
  description: "Gastos de importacion y prorrateo del costo real.",
};

export default function Daily164Page() {
  return <Daily164Client />;
}
