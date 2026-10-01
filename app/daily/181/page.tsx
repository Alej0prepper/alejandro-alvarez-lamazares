import type { Metadata } from "next";
import Daily181Client from "./daily181-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 181 (Restaurar y validar PostgreSQL)",
  description: "Restaurar un dump SQL en una base aislada, detenerse ante errores y comprobar datos y comportamiento antes de declarar la recuperacion.",
};

export default function Daily181Page() {
  return <Daily181Client />;
}
