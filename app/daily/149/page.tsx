import type { Metadata } from "next";
import Daily149Client from "./daily149-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 149 (AWS local con Floci)",
  description: "Practicar servicios compatibles con AWS localmente con Floci.",
};

export default function Daily149Page() {
  return <Daily149Client />;
}
