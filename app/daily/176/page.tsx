import type { Metadata } from "next";
import Daily176Client from "./daily176-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 176 (Como llega una peticion desde Internet hasta tu aplicacion)",
  description:
    "Seguir una peticion HTTP desde el navegador hasta una aplicacion backend, identificando DNS, puertos, Nginx, Docker y dependencias.",
};

export default function Daily176Page() {
  return <Daily176Client />;
}
