import type { Metadata } from "next";
import Daily184Client from "./daily184-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 184 (Migraciones de software: código compatible ≠ datos compatibles)",
  description: "Coordina código, esquema y datos históricos: migraciones PostgreSQL y EF Core, compatibilidad entre versiones, límites del rollback y validación de QA.",
};

export default function Daily184Page() {
  return <Daily184Client />;
}
