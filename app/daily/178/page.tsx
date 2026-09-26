import type { Metadata } from "next";
import Daily178Client from "./daily178-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 178 (Puertos e interfaces)",
  description: "Puertos, interfaces y exposicion: 127.0.0.1 vs 0.0.0.0.",
};

export default function Daily178Page() {
  return <Daily178Client />;
}
