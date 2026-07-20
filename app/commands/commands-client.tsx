"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./commands.module.css";

const dockerCleanupCommand = "docker rm -f $(docker ps -aq)";

export default function CommandsClient() {
  const [copyLabel, setCopyLabel] = useState("Copiar");

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(dockerCleanupCommand);
      setCopyLabel("Copiado");
      window.setTimeout(() => setCopyLabel("Copiar"), 1400);
    } catch {
      setCopyLabel("No disponible");
      window.setTimeout(() => setCopyLabel("Copiar"), 1400);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Referencia personal</p>
            <h1>Commands</h1>
            <p className={styles.subtitle}>Comandos utiles para el trabajo diario.</p>
          </div>
          <nav className={styles.nav} aria-label="Navegacion principal">
            <Link href="/profile">Perfil</Link>
            <Link href="/daily">Daily</Link>
            <Link href="/calendar">Calendario</Link>
          </nav>
        </header>

        <section className={styles.commandCard} aria-labelledby="docker-cleanup-title">
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.badge}>Docker</span>
              <h2 id="docker-cleanup-title">Eliminar todos los contenedores</h2>
            </div>
            <span className={styles.status}>Local</span>
          </div>

          <p className={styles.description}>
            Detiene y elimina todos los contenedores existentes en Docker.
          </p>

          <div className={styles.codeRow}>
            <code>{dockerCleanupCommand}</code>
            <button type="button" onClick={copyCommand} className={styles.copyButton}>
              {copyLabel}
            </button>
          </div>

          <p className={styles.warning}>
            Precaucion: este comando es destructivo y afecta a todos los contenedores locales.
          </p>
        </section>
      </section>
    </main>
  );
}
