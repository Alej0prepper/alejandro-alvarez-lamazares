import type { Metadata } from "next";
import Daily175Client from "./daily175-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 175 (Cierre TradeOps 360)",
  description: "Testing, debugging, performance, despliegue y cierre de TradeOps 360 v1.0.",
};

export default function Daily175Page() {
  return <Daily175Client />;
}
