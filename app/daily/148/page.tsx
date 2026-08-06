import type { Metadata } from "next";
import Daily148Client from "./daily148-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 148 (Desplegar una API .NET en AWS)",
  description: "Formas practicas de desplegar una API .NET en AWS.",
};

export default function Daily148Page() {
  return <Daily148Client />;
}
