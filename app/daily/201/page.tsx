import type { Metadata } from "next";
import Daily201Client from "./daily201-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 201 (Demostrar que una corrección resolvió el problema)",
  description: "Comprueba una corrección con el mismo caso antes y después, pruebas de regresión en .NET y aserciones sobre el resultado y sus efectos.",
};

export default function Daily201Page() {
  return <Daily201Client />;
}
