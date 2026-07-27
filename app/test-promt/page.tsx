import type { Metadata } from "next";
import TestPromtClient from "./test-promt-client";

export const metadata: Metadata = {
  title: "Test Prompt | Backend Knowledge Lab",
  description: "Prompt para ampliar y verificar la suite de tests de integracion de APIs.",
};

export default function TestPromtPage() {
  return <TestPromtClient />;
}
