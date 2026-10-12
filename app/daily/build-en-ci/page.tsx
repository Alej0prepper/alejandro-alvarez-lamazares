import type { Metadata } from "next";
import BuildCiLesson from "./build-ci-lesson";

export const metadata: Metadata = {
  title: "Construir una imagen fuera del servidor: Docker, GitHub Actions y GHCR",
  description: "Clase práctica con workflow de publicación, Compose, etiquetas, actualización, smoke tests y rollback sin compilar en el VPS.",
};

export default function BuildCiPage() {
  return <BuildCiLesson />;
}
