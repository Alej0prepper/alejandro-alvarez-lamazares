import type { Metadata } from "next";
import Daily146Client from "./daily146-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 146 (Diseno para produccion)",
  description: "Configuracion por ambientes, secretos y feature flags para produccion.",
};

export default function Daily146Page() {
  return <Daily146Client />;
}
