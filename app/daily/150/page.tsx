import type { Metadata } from "next";
import Daily150Client from "./daily150-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 150 (AWS local con Floci)",
  description: "Practicar servicios compatibles con AWS localmente con Floci.",
};

export default function Daily150Page() {
  return <Daily150Client />;
}
