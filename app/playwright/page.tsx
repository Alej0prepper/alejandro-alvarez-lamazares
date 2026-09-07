import type { Metadata } from "next";
import PlaywrightLesson from "./playwright-lesson";

export const metadata: Metadata = {
  title: "Nuestro primer test de frontend con Playwright",
  description: "Automatizar un login real con Playwright: locators, sincronización, credenciales y aserciones.",
};

export default function PlaywrightPage() {
  return <PlaywrightLesson />;
}
