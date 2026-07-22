"use client";

import { useState } from "react";
import styles from "./page.module.css";

type CopyPromptButtonProps = {
  prompt: string;
};

export default function CopyPromptButton({ prompt }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className={styles.copyButton} onClick={copyPrompt}>
      {copied ? "Contenido copiado" : "Copiar contenido"}
    </button>
  );
}
