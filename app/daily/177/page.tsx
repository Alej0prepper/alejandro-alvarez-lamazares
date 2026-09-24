import type { Metadata } from "next";
import Daily177Client from "./daily177-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 177 (Reverse Proxy)",
  description: "Reverse Proxy: Nginx delante de una aplicacion backend.",
};

export default function Daily177Page() {
  return <Daily177Client />;
}
