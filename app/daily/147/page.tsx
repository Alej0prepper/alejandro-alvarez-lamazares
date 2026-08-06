import type { Metadata } from "next";
import Daily147Client from "./daily147-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 147 (AWS desde cero)",
  description: "Introduccion a AWS para desarrolladores backend.",
};

export default function Daily147Page() {
  return <Daily147Client />;
}
