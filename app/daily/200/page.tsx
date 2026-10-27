import type { Metadata } from "next";
import Daily200Client from "./daily200-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 200 (Encontrar una regresión con Git bisect)",
  description: "Localiza el commit que introdujo una regresión con Git bisect, una comprobación repetible en .NET y criterios para clasificar good, bad y skip.",
};

export default function Daily200Page() {
  return <Daily200Client />;
}
