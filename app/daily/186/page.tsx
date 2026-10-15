import type { Metadata } from "next";
import Daily186Client from "./daily186-client";

export const metadata: Metadata = {
  title: "Daily Backend - Día 186 (Cómo auditar un backend que no desarrollaste tú)",
  description: "Reconstruye el arranque, las dependencias y el recorrido de una petición en ASP.NET Core; contrasta hipótesis con evidencia y define límites de observación con criterio backend y QA.",
};

export default function Daily186Page() {
  return <Daily186Client />;
}
