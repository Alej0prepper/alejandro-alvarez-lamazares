"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  [
    "symptom",
    "1) Síntoma",
    "Dos archivos, una decisión pendiente",
    "La extensión sugiere una herramienta; el contenido determina cuál puede procesarlo.",
    "Caso",
    "Ejemplo didáctico: recibes backup.sql y backup.dump.\nHipótesis: el primero es SQL plano y el segundo es custom.\nComprobación: inspeccionar formato y versiones antes de restaurar.\n\nNo es un incidente de producción documentado: usamos bases y archivos ficticios. La conexión y las credenciales deben configurarse fuera del repositorio."
  ],
  [
    "formats",
    "2) Formatos",
    "Plain ejecuta SQL; custom guarda un archivo estructurado",
    "pg_dump crea ambos. Sin indicar formato, genera SQL plano; -Fc selecciona custom.",
    "PostgreSQL",
    "Plain:\npg_dump -Fp -d app_db -f backup.sql\nPostgreSQL -> pg_dump -> texto SQL -> psql -> PostgreSQL\n\nCustom:\npg_dump -Fc -d app_db -f backup.dump\nPostgreSQL -> pg_dump -> archivo custom -> pg_restore -> PostgreSQL\n\nPlain contiene sentencias como CREATE TABLE y COPY con sus datos. Custom permite listar y seleccionar objetos sin ejecutar todavía la restauración."
  ],
  [
    "inspect",
    "3) Comprobación",
    "Identifica sin escribir en la base",
    "Empieza por file. Si indica texto SQL, revisa su cabecera; si indica un archivo PostgreSQL, pide su índice.",
    "Diagnóstico",
    "file backup.sql\n\n# Solo si es texto: inspección local, sin publicar datos\nhead -n 20 backup.sql\n\n# Si es un archivo de pg_dump:\npg_restore --list backup.sql\n\nEl listado (Table of Contents) muestra objetos: TABLE, TABLE DATA, INDEX, CONSTRAINT. Que funcione demuestra que esa herramienta lee el índice; no prueba que todos los datos estén íntegros. Un fallo tampoco confirma SQL plano: puede ser corrupción o un lector incompatible."
  ],
  [
    "versions",
    "4) Versiones",
    "Cliente y servidor son programas distintos",
    "Registra la herramienta que produjo el dump, las herramientas que lo leen y los servidores de origen y destino.",
    "Inventario",
    "pg_dump --version\npg_restore --version\npsql --version\n\n# Ejecutar en cada conexión configurada, origen y destino:\nSELECT version();\n\nLa versión de pg_dump instalada hoy no demuestra cuál creó un archivo recibido. Busca “Dumped from database version” y “Dumped by pg_dump version” en la cabecera SQL o el listado del archivo. Si no están, conserva esa incertidumbre y pide el registro de creación."
  ],
  [
    "compatibility",
    "5) Compatibilidad",
    "Mismo producto no garantiza el mismo camino",
    "Separa la lectura del archivo de la compatibilidad del SQL con el servidor destino.",
    "Criterio backend",
    "Caso hipotético: servidor origen 17 -> servidor destino 15.\nUsar pg_restore 17 puede resolver la lectura del archivo; no convierte su SQL en compatible con PostgreSQL 15.\n\npg_dump no respalda servidores de una versión mayor que la suya. Puede leer versiones anteriores dentro de su rango soportado.\n\nUpgrade: mover a una versión posterior es el camino previsto para dumps lógicos, con validación de dependencias.\nDowngrade: cargar en una versión mayor anterior a la de pg_dump no está garantizado, incluso si el origen tenía esa versión.\n\nDecisión: preferir un destino compatible y probar el recorrido completo. No borrar instrucciones que fallan para declarar éxito."
  ],
  [
    "restore",
    "6) Decisión",
    "Elige una sola ruta en un destino aislado",
    "Los ejemplos suponen un dump de una base, sin creación de base, y permisos, roles y extensiones ya revisados.",
    "Comandos",
    "# Crear una base de laboratorio vacía:\ncreatedb -T template0 restored_db\n\n# Si confirmaste SQL plano:\npsql -X -v ON_ERROR_STOP=1 -d restored_db -f backup.sql\n\n# Alternativa: si confirmaste custom, en otro destino limpio:\npg_restore --exit-on-error -d restored_db backup.dump\n\nNo ejecutes ambas alternativas sobre la misma base. Comprueba el estado de salida inmediatamente y conserva los errores. Estas opciones detienen el intento; no revierten por sí solas lo ya aplicado. El día 181 explica la validación posterior."
  ],
  [
    "qa",
    "7) Mirada de QA",
    "Aprueba evidencia del resultado, no del nombre",
    "Un listado correcto y un exit code 0 son señales necesarias, pero insuficientes para declarar recuperación.",
    "Validación",
    "Registra: formato observado, versión creadora, origen, destino, lector y estado de salida.\n\nEn la base aislada:\n- verifica tablas, índices y restricciones esperados;\n- compara conteos críticos con la referencia del respaldo;\n- consulta un pedido de prueba y afirma cliente y estado esperados;\n- ejecuta el flujo crítico de la aplicación contra esa base.\n\nSi la aplicación falla, comprueba schema y dependencias antes de atribuirlo al código. Arrancar no demuestra que pueda usar los datos restaurados."
  ],
  [
    "challenge",
    "8) Mini reto",
    "backup.sql devuelve caracteres ilegibles",
    "Después, pg_restore --list backup.sql muestra un índice de tablas. ¿Qué sabes y qué falta?",
    "Práctica",
    "Respuesta: el nombre indujo una hipótesis incorrecta. El archivo es un formato que pg_restore reconoce; el índice solo no distingue custom de todos los otros formatos admitidos.\n\nComprueba con file y el encabezado del listado. pg_restore también admite tar y directory, aunque hoy nos centramos en plain y custom.\n\nAntes de escribir datos aún faltan versiones compatibles, destino limpio y validaciones. Renombrar el archivo no cambia su formato."
  ],
  [
    "closing",
    "9) Cierre",
    "La extensión nombra; el formato decide",
    "Un desarrollador backend justifica herramienta y destino con evidencia, y QA comprueba el resultado.",
    "Regla mental",
    "ARCHIVO -> FORMATO -> HERRAMIENTA -> VERSIONES -> RESTAURAR -> VALIDAR\n\nPlain -> psql | Custom -> pg_restore\n\nEl día 180 explicó cómo crear el respaldo y el 181 cómo validar su recuperación. Hoy elegimos cómo leerlo y dónde reconstruirlo. En el día 183 estudiaremos Fail Fast vs Best Effort, sin tratar un intento parcial como recuperación aprobada."
  ]
].map(([id, label, title, subtitle, chip, content]) => ({ id, label, title, subtitle, chip, content }));

export default function Daily182Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/181";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>PostgreSQL · formatos y compatibilidad</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/181"><span className={styles.kbd}>←</span> Día 181</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>02/10/2026</div><div className={styles.badge}>Daily #182 • Production Backend</div><h2 className={styles.title}>Formatos de backup y compatibilidad de PostgreSQL</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>PostgreSQL</span><span className={styles.chip}>Recovery</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Identifica el formato real y las versiones antes de elegir cómo restaurar: el nombre del archivo no demuestra compatibilidad.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://www.postgresql.org/docs/17/app-pgdump.html">Referencia: pg_dump (PostgreSQL 17)</a><a className={styles.pill} href="https://www.postgresql.org/docs/17/app-pgrestore.html">Referencia: pg_restore (PostgreSQL 17)</a><Link className={styles.pill} href="/daily/180">Día 180: crear el respaldo</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/181"><span className={styles.kbd}>←</span> Día 181</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
