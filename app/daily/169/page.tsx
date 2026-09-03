import type { Metadata } from "next";
import Daily169Client from "./daily169-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 169 (Pagos y estados derivados)",
  description: "Sobrepreventa, pagos y estados derivados en TradeOps 360.",
};

export default function Daily169Page() {
  return <Daily169Client />;
}
