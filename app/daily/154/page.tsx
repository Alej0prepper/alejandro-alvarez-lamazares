import type { Metadata } from "next";
import Daily154Client from "./daily154-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 154 (Contract Testing)",
  description: "Proteger contratos HTTP y eventos entre microservicios.",
};

export default function Daily154Page() {
  return <Daily154Client />;
}
