import type { Metadata } from "next";
import Daily180Client from "./daily180-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 180 (Backups PostgreSQL)",
  description: "Que hace realmente pg_dump y por que crear un archivo no demuestra una recuperacion verificable.",
};

export default function Daily180Page() {
  return <Daily180Client />;
}
