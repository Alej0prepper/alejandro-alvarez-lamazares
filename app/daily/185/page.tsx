import type { Metadata } from "next";
import Daily185Client from "./daily185-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 185 (Dependency Management: tu aplicación depende de mucho más que tu código)",
  description: "Distingue paquetes directos y transitivos, runtime, dependencias nativas y servicios externos; comprueba .NET, addons Odoo y reproducibilidad con criterio backend y QA.",
};

export default function Daily185Page() {
  return <Daily185Client />;
}
