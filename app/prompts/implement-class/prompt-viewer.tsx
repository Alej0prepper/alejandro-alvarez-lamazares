"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../integration-testing/prompt-viewer.module.css";

type PromptViewerProps = {
  prompt: string;
};

export default function PromptViewer({ prompt }: PromptViewerProps) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <main className={styles.page}>
    <section className={styles.shell}>
      <header className={styles.header}>
        <div><Link href="/prompts" className={styles.back}>← Prompts</Link><p className={styles.eyebrow}>Reusable prompt</p><h1>Implementar una clase práctica</h1></div>
        <button type="button" className={styles.copy} onClick={copyPrompt}>{copied ? "Copiado" : "Copiar prompt"}</button>
      </header>
      <p className={styles.description}>Guía operativa para convertir los requisitos de una clase en cambios acotados, comprobados y documentados dentro del repositorio.</p>
      <pre className={styles.content}>{prompt}</pre>
    </section>
  </main>;
}
