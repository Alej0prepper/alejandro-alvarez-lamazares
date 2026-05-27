import type { Metadata } from "next";
import Daily81Client from "./daily81-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 81 (Circuit Breaker)",
  description:
    "Leccion sobre Circuit Breaker, dependencias lentas, Polly, retries, cascading failures y resiliencia en backend.",
};

export default function Daily81Page() {
  return <Daily81Client />;
}
