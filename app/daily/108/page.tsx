import type { Metadata } from "next";
import Daily108Client from "./daily108-client";

export const metadata: Metadata = {
  title:
    "Daily Backend - Dia 108 (Payments: cuando una operacion afecta varias entidades al mismo tiempo)",
  description:
    "Leccion sobre pagos como operacion consistente que afecta Order, Payment y AuditLog dentro de una sola unidad de trabajo.",
};

export default function Daily108Page() {
  return <Daily108Client />;
}
