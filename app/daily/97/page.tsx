import type { Metadata } from "next";
import Daily97Client from "./daily97-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 97 (Escalado, recursos y comportamiento bajo fallos)",
  description:
    "Leccion sobre requests, limits, QoS, HPA, Cluster Autoscaler, OOMKilled y comportamiento de una app cuando recibe mas carga de la que soporta.",
};

export default function Daily97Page() {
  return <Daily97Client />;
}
