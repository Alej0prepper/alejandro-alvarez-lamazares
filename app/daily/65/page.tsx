import type { Metadata } from "next";
import Daily65Client from "./daily65-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 65 (SQL Injection: como romper una base de datos desde input)",
  description:
    "Leccion sobre SQL Injection, concatenacion insegura, queries parametrizadas en .NET, riesgos con EF Core raw SQL y checklist de testing.",
};

export default function Daily65Page() {
  return <Daily65Client />;
}
