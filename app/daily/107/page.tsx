import type { Metadata } from "next";
import Daily107Client from "./daily107-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 107 (Controllers y DTOs: exponer los casos de uso sin ensuciar la API)",
  description:
    "Leccion sobre controllers como frontera HTTP, DTOs, mapping y respuestas coherentes para OrdersController.",
};

export default function Daily107Page() {
  return <Daily107Client />;
}
