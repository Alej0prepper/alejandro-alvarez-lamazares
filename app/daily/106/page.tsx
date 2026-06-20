import type { Metadata } from "next";
import Daily106Client from "./daily106-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 106 (Application Services: convertir reglas del dominio en casos de uso)",
  description:
    "Leccion sobre Application Services como capa de orquestacion entre controllers, dominio, repositorios y persistencia.",
};

export default function Daily106Page() {
  return <Daily106Client />;
}
