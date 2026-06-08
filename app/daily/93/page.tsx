import type { Metadata } from "next";
import Daily93Client from "./daily93-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 93 (Contenedores reales: redes, volumenes, env y secretos)",
  description:
    "Leccion sobre contenedores reales: Docker networking, publicacion de puertos, redes bridge, volumenes, bind mounts, variables de entorno y secretos.",
};

export default function Daily93Page() {
  return <Daily93Client />;
}
