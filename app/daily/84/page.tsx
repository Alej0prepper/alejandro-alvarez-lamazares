import type { Metadata } from "next";
import Daily84Client from "./daily84-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 84 (Feature Flags)",
  description:
    "Leccion sobre feature flags, despliegues seguros, activacion gradual, rollback instantaneo, .NET FeatureManagement y deuda tecnica.",
};

export default function Daily84Page() {
  return <Daily84Client />;
}
