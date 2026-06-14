import type { Metadata } from "next";
import Daily99Client from "./daily99-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 99 (Seguridad de contenedores y cluster)",
  description:
    "Leccion sobre seguridad en la plataforma: imagenes, minimo privilegio, escaneo de vulnerabilidades, firmas, RBAC, Network Policies y defensa en profundidad.",
};

export default function Daily99Page() {
  return <Daily99Client />;
}
