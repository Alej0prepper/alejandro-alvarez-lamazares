import type { Metadata } from "next";
import Daily111Client from "./daily111-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 111 (Dockerización de la API: convertir un proyecto de desarrollo en una aplicación portable)",
  description:
    "Leccion sobre dockerizacion de una API, Dockerfile, variables de entorno, docker compose, red interna y persistencia.",
};

export default function Daily111Page() {
  return <Daily111Client />;
}
