import type { Metadata } from "next";
import Daily92Client from "./daily92-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 92 (Dockerfile reales en produccion)",
  description:
    "Leccion sobre Dockerfiles reales para backend: multi-stage builds, cache por capas, .dockerignore, secretos, usuario no root e imagenes pequenas.",
};

export default function Daily92Page() {
  return <Daily92Client />;
}
