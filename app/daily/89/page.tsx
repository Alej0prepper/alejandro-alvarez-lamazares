import type { Metadata } from "next";
import Daily89Client from "./daily89-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 89 (Diseno para fallos)",
  description:
    "Leccion sobre diseno para fallos, resiliencia, modo degradado, aislamiento, cascading failures, single point of failure y chaos engineering.",
};

export default function Daily89Page() {
  return <Daily89Client />;
}
