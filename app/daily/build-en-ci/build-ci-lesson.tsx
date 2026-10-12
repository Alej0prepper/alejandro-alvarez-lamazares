"use client";

import Link from "next/link";
import { useState } from "react";
import { sections } from "./lesson-content";
import styles from "../daily-lesson.module.css";

function CodeBlock({ code, caption, language }: { code: string; caption: string; language: string }) {
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copiado");
    } catch {
      setStatus("Selecciona el código para copiarlo");
    }
  }

  return <>
    <div className={styles.codebar}>
      <span className={styles.hint}>{caption}</span>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copiar ${caption}`}>Copiar código</button>
      <span className={styles.hint} role="status">{status}</span>
    </div>
    <pre tabIndex={0} aria-label={caption}><code className={`language-${language}`}>{code}</code></pre>
  </>;
}

export default function BuildCiLesson() {
  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><strong>Backend Knowledge Lab</strong><div className={styles.brandSub}>Docker · GitHub Actions · GHCR</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/profile">Home</Link><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
    </div></header>
    <main className={styles.container}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}>
        <time className={styles.createdAt} dateTime="2026-10-12">12/10/2026</time>
        <div className={styles.badge}>Clase complementaria • Backend en producción</div>
        <h1 className={styles.title}>Construir una imagen fuera del servidor</h1>
        <div className={styles.meta}><span className={`${styles.chip} ${styles.chipOk}`}>8–10 min + práctica</span><span className={styles.chip}>Docker Compose</span><span className={styles.chip}>CI/CD</span><span className={styles.chip}>QA</span></div>
        <p className={styles.lead}>Construye en GitHub, publica en GHCR y ejecuta en el VPS con el mismo contrato de configuración. Ejemplos genéricos listos para adaptar.</p>
      </div>
      <nav className={styles.jump} aria-label="Índice de la clase">{sections.map(section => <a className={styles.pill} href={`#${section.id}`} key={section.id}>{section.title.split(':')[0]}</a>)}</nav>
      {sections.map(section => <section className={styles.section} id={section.id} key={section.id}>
        <div className={styles.shd}><h2>{section.title}</h2></div>
        <div className={styles.sbd}>
          {section.paragraphs.map(text => <p className={styles.sub} key={text}>{text}</p>)}
          {section.code && <CodeBlock code={section.code} caption={section.caption} language={section.language} />}
          {section.answer && <details className={styles.proDetails}><summary>Ver respuesta</summary><div className={styles.proBody}>{section.answer}</div></details>}
          {section.after?.map(text => <p className={styles.sub} key={text}>{text}</p>)}
        </div>
      </section>)}
      <section className={styles.section} aria-labelledby="referencias"><div className={styles.shd}><h2 id="referencias">Para profundizar</h2></div><div className={styles.sbd}><div className={styles.relatedLinks}>
        <Link className={styles.pill} href="/daily/92">Dockerfiles</Link><Link className={styles.pill} href="/daily/93">Redes, variables y volúmenes</Link><Link className={styles.pill} href="/daily/100">CI/CD</Link><Link className={styles.pill} href="/daily/179">Persistencia</Link>
        <a className={styles.pill} href="https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images">GitHub: publicar imágenes</a>
        <a className={styles.pill} href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry">GHCR: permisos y autenticación</a>
        <a className={styles.pill} href="https://docs.docker.com/reference/cli/docker/compose/up/">Docker Compose up</a>
        <a className={styles.pill} href="https://docs.docker.com/build/ci/github-actions/push-multi-registries/">Docker: acciones de publicación</a>
      </div></div></section>
      <footer className={styles.footerNav}><Link className={styles.btn} href="/profile">Volver al home</Link><Link className={styles.btn} href="/daily">Ver todas las clases</Link></footer>
    </div></article></main>
  </div>;
}
