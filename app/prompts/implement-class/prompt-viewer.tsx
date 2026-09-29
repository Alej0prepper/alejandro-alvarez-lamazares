"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../integration-testing/prompt-viewer.module.css";

type PromptViewerProps = {
  prompt: string;
  title?: string;
  description?: string;
};

export default function PromptViewer({
  prompt,
  title = "Implementar una clase práctica",
  description = "Guía operativa para convertir los requisitos de una clase en cambios acotados, comprobados y documentados dentro del repositorio.",
}: PromptViewerProps) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <main className={styles.page}>
    <section className={styles.shell}>
      <header className={styles.header}>
        <div><Link href="/prompts" className={styles.back}>← Prompts</Link><p className={styles.eyebrow}>Reusable prompt</p><h1>{title}</h1></div>
        <button type="button" className={styles.copy} onClick={copyPrompt}>{copied ? "Copiado" : "Copiar prompt"}</button>
      </header>
      <p className={styles.description}>{description}</p>
      <pre className={styles.content}>{prompt}</pre>
    </section>
  </main>;
}
