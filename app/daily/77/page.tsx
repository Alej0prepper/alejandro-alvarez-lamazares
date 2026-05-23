import type { Metadata } from "next";
import Daily77Client from "./daily77-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 77 (Diseno para alta carga)",
  description:
    "Leccion sobre como cambia el diseno backend bajo alta carga, trafico masivo, desacoplamiento, bottlenecks y resiliencia.",
};

export default function Daily77Page() {
  return <Daily77Client />;
}
