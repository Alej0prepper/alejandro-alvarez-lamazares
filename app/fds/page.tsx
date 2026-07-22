import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import styles from "./page.module.css";
import CopyPromptButton from "./copy-prompt-button";

export const metadata: Metadata = {
  title: "Prompt de diseño frontend",
  description: "Especificación profesional para diseñar el frontend de una aplicación.",
};

export default async function FdsPage() {
  const promptPath = path.join(process.cwd(), "FDS", "prompt-diseno-frontend.md");
  const prompt = await readFile(promptPath, "utf8");

  return (
    <main className={styles.page}>
      <article className={styles.document}>
        <header className={styles.header}>
          <p className={styles.kicker}>FDS · Documento de diseño</p>
          <h1>Prompt de diseño frontend</h1>
          <p className={styles.summary}>
            Consulta aquí el prompt completo para generar una especificación profesional de frontend.
          </p>
          <CopyPromptButton prompt={prompt} />
        </header>
        <pre className={styles.content}>{prompt}</pre>
      </article>
    </main>
  );
}
