import type { Metadata } from "next";
import Daily104Client from "./daily104-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 104 (Dominio primero: si el modelo esta mal, todo lo demas estara mal)",
  description:
    "Leccion sobre modelar el dominio antes de crear endpoints, services o infraestructura.",
};

export default function Daily104Page() {
  return <Daily104Client />;
}
