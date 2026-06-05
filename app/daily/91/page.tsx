import type { Metadata } from "next";
import Daily91Client from "./daily91-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 91 (Docker desde cero para backend)",
  description:
    "Introduccion a Docker para backend: contenedores, imagenes, Dockerfile, diferencias con maquinas virtuales y comandos basicos.",
};

export default function Daily91Page() {
  return <Daily91Client />;
}
