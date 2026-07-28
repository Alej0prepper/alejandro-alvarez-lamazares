import type { Metadata } from "next";
import Daily142Client from "./daily142-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 142 (Transactional Outbox)",
  description: "Leccion sobre implementar Transactional Outbox y evitar eventos perdidos.",
};

export default function Daily142Page() {
  return <Daily142Client />;
}
