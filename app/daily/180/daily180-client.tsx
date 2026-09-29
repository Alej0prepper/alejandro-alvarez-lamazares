"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  ["symptom", "1) Sintoma", "Un archivo aparecio; eso no prueba recuperacion", "Un volumen conserva datos, pero un backup debe permitir reconstruirlos fuera de ese volumen.", "Caso", "pg_dump -U backup_user -d app_db > backup.sql\n\nEl shell puede crear backup.sql antes de que pg_dump termine. Archivo existente != dump exitoso != recuperacion garantizada."],
  ["hypothesis", "2) Hipotesis", "pg_dump produce una representacion logica", "No copia los archivos internos de PostgreSQL: extrae estructura y datos que despues pueden reconstruirse.", "Concepto", "PostgreSQL\n   -> pg_dump\n   -> schema + data + objetos\n   -> dump\n\nEs un backup logico. Un backup fisico trabaja directamente con los archivos que usa el motor."],
  ["content", "3) Comprobacion", "Schema y datos son partes distintas de la evidencia", "Un dump puede contener tablas, secuencias, indices, constraints, vistas, funciones, triggers y filas.", "Modelo", "Schema:\nCREATE TABLE orders (id bigint PRIMARY KEY, total numeric NOT NULL);\n\nData:\nCOPY public.orders (id, total) FROM stdin;\n1  100.00\n2  250.00\n\\.\n\nDecide que necesitas recuperar; no supongas que una base equivale a todo el servidor."],
  ["stdout", "4) Comprobacion", "El shell decide donde termina stdout", "La redireccion no pertenece a PostgreSQL. pg_dump escribe su salida normal; el shell la guarda en un archivo.", "Shell", "PostgreSQL -> pg_dump -> stdout -> > -> backup.sql\n\nstderr es otro canal: > backup.sql no captura por si solo los diagnosticos. En automatizacion, conserva ambos resultados y revisa el exit code."],
  ["formats", "5) Decision", "El formato determina como se restaura", "La extension es una pista; la herramienta correcta depende del formato real creado por pg_dump.", "Formato", "Plain SQL\npg_dump -U backup_user -d app_db > backup.sql\npsql -U restore_user -d restored_db < backup.sql\n\nCustom archive\npg_dump -Fc -U backup_user -d app_db -f backup.dump\npg_restore -U restore_user -d restored_db backup.dump\n\nPlain -> psql | Custom -> pg_restore"],
  ["snapshot", "6) Hecho", "El dump toma una vision coherente sin apagar la base", "pg_dump usa mecanismos de PostgreSQL para obtener un snapshot consistente mientras otros clientes pueden seguir trabajando.", "PostgreSQL", "Inicio del dump\n   -> snapshot coherente\n   -> la aplicacion sigue operando\n   -> fin del dump\n\nNo significa que respalde todo el cluster. pg_dump -d app_db cubre esa base, no analytics_db ni todos los objetos globales."],
  ["limits", "7) Limite", "Una base no es toda la instancia", "Roles y otros objetos globales requieren revisar herramientas y estrategia especificas; no declares cobertura total sin inventario.", "Alcance", "PostgreSQL server\n├─ app_db        <- pg_dump -d app_db\n├─ analytics_db  <- no incluido\n└─ objetos globales <- revisar por separado\n\nRecomendacion: documenta origen, formato, version, destino y alcance del backup."],
  ["docker", "8) Comprobacion", "Con Docker, la redireccion ocurre en el host", "docker exec transmite stdout; el shell que ejecuta el comando crea el archivo donde se lanzo.", "Docker", "docker exec db pg_dump -U backup_user -d app_db > backup.sql\n\nContenedor: pg_dump -> stdout\nHost: docker exec -> shell -> backup.sql\n\nPara un flujo a archivo, no anadas -t sin necesidad: un pseudo-TTY no aporta valor a un dump y es especialmente inadecuado para bytes de un archivo custom."],
  ["decision", "9) Decision", "Mide el resultado, pero no confundas senales con prueba", "Exit code 0 y un tamano razonable son comprobaciones necesarias; ninguna demuestra por si sola que la recuperacion funciona.", "Evidencia", "pg_dump ... > backup.sql\nstatus=$?\ntest \"$status\" -eq 0\nls -lh backup.sql\n\n0 bytes es una alarma clara. 8.4G solo demuestra que hay contenido. La restauracion aislada es la evidencia fuerte."],
  ["qa", "10) Mirada de QA", "La prueba debe terminar en datos restaurados", "Un test que solo verifica que se genero el archivo confirma un paso del flujo, no su resultado de recuperacion.", "QA", "1. Generar dump de una base de prueba.\n2. Restaurarlo en otra base aislada.\n3. Comprobar tablas, conteos y datos criticos.\n4. Ejecutar una consulta o smoke test relevante.\n\nEsperado: restored_db contiene el estado necesario y puede usarse. No restaura sobre produccion para probarlo."],
  ["challenge", "11) Mini reto", "Clasifica lo que realmente sabes", "Aplica la cadena de evidencia a un backup grande creado desde un contenedor.", "Practica", "Evidencia: backup.sql existe y mide 8.4G.\n\nPuedes afirmar:\n- hay un archivo con contenido.\n\nAun debes comprobar:\n- pg_dump termino correctamente;\n- el formato puede procesarse;\n- una restauracion aislada termina;\n- los datos restaurados son correctos.\n\nNo promociones una pista a garantia."],
  ["closing", "12) Cierre", "El valor del backup aparece al restaurar", "Backend en produccion incluye disenar evidencia de recuperacion, no solo ejecutar comandos que parecen correctos.", "Regla mental", "DATABASE\n  -> DUMP\n  -> BACKUP FILE\n  -> RESTORE\n  -> VERIFY\n\nPersistencia != backup\nBackup creado != backup verificado\nArchivo existente != recuperacion garantizada\n\nSiguiente: restaurar una base de forma aislada y validar su resultado."],
].map(([id, label, title, subtitle, chip, content]) => ({ id, label, title, subtitle, chip, content }));

export default function Daily180Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/179";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>PostgreSQL · backup logico y recuperacion</div></div></div>
      <nav className={styles.nav} aria-label="Navegacion"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/179"><span className={styles.kbd}>←</span> Dia 179</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>29/09/2026</div><div className={styles.badge}>Daily #180 • Production Backend</div><h2 className={styles.title}>Backups PostgreSQL: que hace realmente pg_dump</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>PostgreSQL</span><span className={styles.chip}>Docker</span><span className={styles.chip}>Recovery</span></div><p className={styles.lead}>pg_dump crea un respaldo logico; solo una restauracion aislada y comprobada aporta evidencia de recuperacion.</p></div>
      <nav className={styles.toc} aria-label="Indice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/179"><span className={styles.kbd}>←</span> Dia 179</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
