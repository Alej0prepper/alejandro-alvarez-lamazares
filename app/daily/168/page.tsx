import type { Metadata } from "next";
import Daily168Client from "./daily168-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 168 (Preventas)",
  description: "Preventas vinculadas a Importaciones en TradeOps 360.",
};

export default function Daily168Page() {
  return <Daily168Client />;
}
