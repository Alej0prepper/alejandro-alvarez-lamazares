import type { Metadata } from "next";
import Daily113Client from "./daily113-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 113 (Pausa para respirar)",
  description: "Pausa en la secuencia para ordenar lo aprendido antes de entrar en el siguiente bloque.",
};

export default function Daily113Page() {
  return <Daily113Client />;
}
