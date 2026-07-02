import type { Metadata } from "next";
import Daily117Client from "./daily117-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 117 (Comunicación síncrona vs asíncrona: cuándo esperar una respuesta y cuándo continuar sin ella)",
  description:
    "Leccion sobre comunicacion sincronica y asincronica, cuando esperar respuesta y cuando continuar, consistencia eventual y criterio de uso.",
};

export default function Daily117Page() {
  return <Daily117Client />;
}
