import type { Metadata } from "next";
import OdooGuide from "./odoo-guide";

export const metadata: Metadata = {
  title: "Odoo en Linux",
  description: "Guía para instalar y ejecutar Odoo 17 en Linux Mint.",
};

export default function OdooPage() {
  return <OdooGuide />;
}
