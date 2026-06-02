import type { Metadata } from "next";
import Daily87Client from "./daily87-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 87 (Migraciones en produccion)",
  description:
    "Leccion sobre migraciones seguras en produccion, rollback, expand-contract, indices, cambios destructivos y bases de datos vivas.",
};

export default function Daily87Page() {
  return <Daily87Client />;
}
