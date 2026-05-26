import type { Metadata } from "next";
import Daily80Client from "./daily80-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 80 (Backpressure)",
  description:
    "Leccion sobre backpressure, limites, saturacion, degradacion controlada, metricas tempranas y proteccion de sistemas backend bajo presion.",
};

export default function Daily80Page() {
  return <Daily80Client />;
}
