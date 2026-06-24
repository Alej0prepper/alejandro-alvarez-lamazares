import type { Metadata } from "next";
import Daily110Client from "./daily110-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 110 (Hardening de API: convertir una API que funciona en una API preparada para errores reales)",
  description:
    "Leccion sobre hardening de API: errores consistentes, validacion, middleware centralizado y endpoints criticos.",
};

export default function Daily110Page() {
  return <Daily110Client />;
}
