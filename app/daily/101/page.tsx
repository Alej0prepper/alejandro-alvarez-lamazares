import type { Metadata } from "next";
import Daily101Client from "./daily101-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 101 (Operacion diaria y resiliencia en produccion)",
  description:
    "Leccion sobre operacion diaria: degradaciones, incidentes, playbooks, runbooks, modo degradado, postmortems y resiliencia operativa.",
};

export default function Daily101Page() {
  return <Daily101Client />;
}
