import type { Metadata } from "next";
import Daily105Client from "./daily105-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 105 (Repositorios: conectar el dominio con la persistencia sin contaminar las reglas de negocio)",
  description:
    "Leccion sobre repositories como frontera entre dominio y base de datos, manteniendo las reglas de negocio aisladas.",
};

export default function Daily105Page() {
  return <Daily105Client />;
}
