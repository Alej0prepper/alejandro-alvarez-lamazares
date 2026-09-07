import type { Metadata } from "next";
import Daily171Client from "./daily171-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 171 (Distribucion y workflow)",
  description: "Distribucion, choferes y workflow logistico en TradeOps 360.",
};

export default function Daily171Page() {
  return <Daily171Client />;
}
