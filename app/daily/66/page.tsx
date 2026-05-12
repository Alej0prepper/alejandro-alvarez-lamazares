import type { Metadata } from "next";
import Daily66Client from "./daily66-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 66 (Seguridad en uploads y manejo de archivos)",
  description:
    "Leccion sobre seguridad en uploads, validacion de archivos, path traversal, nombres seguros y buenas practicas.",
};

export default function Daily66Page() {
  return <Daily66Client />;
}
