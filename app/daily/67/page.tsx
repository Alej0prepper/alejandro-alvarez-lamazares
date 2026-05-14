import type { Metadata } from "next";
import Daily67Client from "./daily67-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 67 (Principio de minimo privilegio: menos acceso = mas seguridad)",
  description:
    "Leccion sobre least privilege, permisos minimos, roles, claims, credenciales de base de datos y reduccion de impacto.",
};

export default function Daily67Page() {
  return <Daily67Client />;
}
