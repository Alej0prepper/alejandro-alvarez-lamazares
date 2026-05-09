import type { Metadata } from "next";
import Daily63Client from "./daily63-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 63 (Logging y monitoreo: como detectar ataques y abuso)",
  description:
    "Leccion sobre logging, monitoreo, deteccion de ataques, eventos importantes y secretos que no deben registrarse.",
};

export default function Daily63Page() {
  return <Daily63Client />;
}
