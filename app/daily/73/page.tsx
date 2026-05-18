import type { Metadata } from "next";
import Daily73Client from "./daily73-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 73 (Caching: evitar trabajo innecesario)",
  description:
    "Leccion sobre caching backend, memory cache, distributed cache, Redis, invalidacion, cache stampede y oportunidades reales de cache.",
};

export default function Daily73Page() {
  return <Daily73Client />;
}
