import type { Metadata } from "next";
import CommandsClient from "./commands-client";

export const metadata: Metadata = {
  title: "Commands | Alejandro Alvarez",
  description: "Comandos utiles para desarrollo local y operacion de proyectos.",
};

export default function CommandsPage() {
  return <CommandsClient />;
}
