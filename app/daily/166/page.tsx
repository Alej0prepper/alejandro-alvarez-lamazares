import type { Metadata } from "next";
import Daily166Client from "./daily166-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 166 (Extender Odoo)",
  description: "_inherit, Views, XPath, Actions y Menus para extender Odoo.",
};

export default function Daily166Page() {
  return <Daily166Client />;
}
