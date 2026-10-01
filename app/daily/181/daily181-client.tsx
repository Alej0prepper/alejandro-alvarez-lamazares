"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  ["symptom", "1) Síntoma", "El prompt volvió; ¿se recuperó el sistema?", "Que psql termine solo describe el proceso. El resultado aún necesita evidencia.", "Caso", "psql -d restore_lab < backup.sql\n\nHecho observable: el comando volvió al shell.\nHipótesis: el dump reconstruyó la base.\nComprobación pendiente: objetos, datos y uso desde la aplicación."],
  ["model", "2) Modelo", "Un SQL plano se ejecuta instrucción por instrucción", "psql envía al servidor CREATE, COPY y otras sentencias del dump; no copia una base completa de una vez.", "PostgreSQL", "backup.sql -> psql -> PostgreSQL\n                 ├─ tablas y otros objetos\n                 ├─ filas\n                 └─ índices y restricciones\n\nUn error en una instrucción puede dejar objetos o datos ya aplicados. El ejemplo supone un dump SQL plano; los formatos de archivo se tratarán en el día 182."],
  ["hypothesis", "3) Hipótesis", "Una restauración parcial puede parecer utilizable", "Si falla la carga de orders pero otras sentencias avanzan, la aplicación incluso podría arrancar.", "Riesgo", "CREATE TABLE customers  ✓\nCOPY customers          ✓\nCREATE TABLE orders     ✓\nCOPY orders             ✗\nCREATE INDEX            ✓\n\nTablas existentes no equivalen a datos completos. El error de COPY invalida declarar la recuperación, aunque después aparezcan mensajes de éxito."],
  ["prepare", "4) Decisión", "Prepara un destino aislado y vacío", "No pruebes la recuperación sobre la base que quieres proteger. Confirma antes formato, permisos y alcance del dump.", "Aislamiento", "createdb -T template0 restore_lab\n\nrestore_lab es una base ficticia de prueba. Usa los nombres, credenciales y conexión reales fuera del repositorio. Un destino limpio evita choques con tablas antiguas; no resuelve por sí solo roles, extensiones o dependencias faltantes."],
  ["restore", "5) Comprobación", "Haz visible el primer error", "ON_ERROR_STOP detiene psql ante un error de SQL o script; -X evita que un archivo local de configuración cambie esta ejecución.", "Comando", "psql -X -v ON_ERROR_STOP=1 -d restore_lab -f backup.sql\nstatus=$?\nprintf 'Estado de psql: %s\\n' \"$status\"\n\nEstado distinto de 0: investiga el error y descarta ese intento. Detenerse no revierte automáticamente las sentencias previas: prepara otro destino limpio antes de repetir."],
  ["verify", "6) Evidencia", "Comprueba estructura, datos y relaciones", "Define antes qué datos y objetos críticos esperas recuperar; compara con una referencia válida del respaldo.", "SQL", "psql -X -v ON_ERROR_STOP=1 -d restore_lab -c \"SELECT COUNT(*) FROM public.customers;\"\npsql -X -v ON_ERROR_STOP=1 -d restore_lab -c \"SELECT COUNT(*) FROM public.orders;\"\n\nVerifica también restricciones e índices esperados y una consulta que relacione pedidos con clientes. Los conteos deben coincidir con la referencia elegida; obtener un número cualquiera no prueba integridad."],
  ["application", "7) Mirada de QA", "Prueba el resultado que usa la aplicación", "Una conexión exitosa o un /health verde no prueban que los pedidos recuperados estén disponibles.", "Smoke test", "1. Arranca una instancia de prueba apuntando a restore_lab.\n2. Consulta un pedido conocido del conjunto de prueba.\n3. Afirma que responde con el cliente y estado esperados.\n4. Registra el resultado junto al estado de psql y las consultas SQL.\n\nLa recuperación se declara válida solo para el alcance que estas comprobaciones cubren."],
  ["challenge", "8) Mini reto", "Un error apareció y el comando siguió", "Clasifica la evidencia antes de decidir si puedes utilizar la base.", "Práctica", "Caso: COPY orders falla; después aparecen CREATE INDEX y vuelve el prompt.\n\n¿Base recuperada? No hay evidencia suficiente y puede ser parcial. Identifica el error, desecha ese intento, repite en una base limpia con ON_ERROR_STOP y valida pedidos, relaciones y flujo crítico. No sustituyas esta prueba por un simple exit code."],
  ["closing", "9) Cierre", "Restaurar es reconstruir y demostrar", "El criterio backend es detener un intento inválido y pedir evidencia del estado recuperado.", "Regla mental", "COMANDO TERMINÓ ≠ BASE VÁLIDA ≠ SISTEMA RECUPERADO\n\nRestauración aislada -> error visible -> datos comprobados -> flujo verificado.\n\nEl día 180 explicó cómo nace el dump; aquí comprobamos qué reconstruye. Siguiente: elegir herramienta y formato según el archivo disponible."],
].map(([id, label, title, subtitle, chip, content]) => ({ id, label, title, subtitle, chip, content }));

export default function Daily181Client() {
  const [activeSection, setActiveSection] = useState("symptom");

  useEffect(() => {
    const nodes = sections.map((section) => document.getElementById(section.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/180";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>PostgreSQL · restauración comprobada</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/180"><span className={styles.kbd}>←</span> Día 180</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>30/09/2026</div><div className={styles.badge}>Daily #181 • Production Backend</div><h2 className={styles.title}>Restaurar una base no es ejecutar un .sql y esperar</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>PostgreSQL</span><span className={styles.chip}>Recovery</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Una restauración solo es útil cuando sus errores son visibles y el estado recuperado supera comprobaciones concretas.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/180"><span className={styles.kbd}>←</span> Día 180</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
