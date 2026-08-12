import type { Metadata } from "next";
import Daily151Client from "./daily151-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 151 (Montar Floci desde cero)",
  description: "Montar Floci, AWS CLI, S3 y SQS para disponer de AWS local.",
};

export default function Daily151Page() {
  return <Daily151Client />;
}
