import Link from "next/link";
import styles from "./prompts.module.css";

export default function PromptsPage() {
  return <main className={styles.page}>
    <section className={styles.shell}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Reusable prompts</p><h1>Prompts</h1><p className={styles.subtitle}>Prompts versionados para tareas repetibles del proyecto.</p></div>
        <Link href="/profile" className={styles.backLink}>Volver al perfil</Link>
      </header>
      <div className={styles.list}>
        <Link href="/prompts/integration-testing" className={styles.promptCard}>
          <span className={styles.icon} aria-hidden="true">{"{}"}</span>
          <span><strong>Revisar cambios y mantener los tests</strong><small>Analisis de impacto, cobertura, integracion, ejecucion y trazabilidad para common-store-admin.</small></span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  </main>;
}
