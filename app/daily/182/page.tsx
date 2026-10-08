import type { Metadata } from "next";
import Daily182Client from "./daily182-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 182 (Formatos y compatibilidad de PostgreSQL)",
  description: "Identifica backups plain y custom, elige psql o pg_restore y comprueba versiones antes de restaurar PostgreSQL en un destino aislado.",
};

export default function Daily182Page() {
  return <Daily182Client />;
}
