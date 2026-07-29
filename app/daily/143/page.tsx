import type { Metadata } from "next";
import Daily143Client from "./daily143-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 143 (Implementar una Saga)",
  description: "Leccion sobre coordinar una compra distribuida y sus compensaciones con una Saga.",
};

export default function Daily143Page() {
  return <Daily143Client />;
}
