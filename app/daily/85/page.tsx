import type { Metadata } from "next";
import Daily85Client from "./daily85-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 85 (Configuracion por ambiente)",
  description:
    "Leccion sobre configuracion por ambiente, Development, QA, Staging, Production, variables de entorno, secretos y appsettings en .NET.",
};

export default function Daily85Page() {
  return <Daily85Client />;
}
