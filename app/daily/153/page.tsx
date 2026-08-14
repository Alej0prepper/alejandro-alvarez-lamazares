import type { Metadata } from "next";
import Daily153Client from "./daily153-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 153 (Integration Testing real)",
  description: "Testcontainers, PostgreSQL, RabbitMQ y WebApplicationFactory.",
};

export default function Daily153Page() {
  return <Daily153Client />;
}
