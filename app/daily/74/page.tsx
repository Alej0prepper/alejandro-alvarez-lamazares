import type { Metadata } from "next";
import Daily74Client from "./daily74-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 74 (Trabajo sincronico vs asincronico en backend)",
  description:
    "Leccion sobre minimizar trabajo dentro del request HTTP, desacoplar operaciones costosas, queues, background jobs y resiliencia.",
};

export default function Daily74Page() {
  return <Daily74Client />;
}
