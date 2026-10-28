"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  chip: string;
  paragraphs: string[];
  snippet?: string;
  after?: string;
  source?: { href: string; label: string };
};

const sections: LessonSection[] = [
  {
    "id": "symptom",
    "label": "1) El problema",
    "title": "Antes funcionaba, ahora falla",
    "subtitle": "La reproducción mínima ya existe; falta localizar el cambio.",
    "chip": "Síntoma",
    "paragraphs": [
      "En el día 199 redujimos un fallo de importación a una entrada concreta: CAMISETA, un código de producto sin talla. Ahora descubres que esa misma entrada se gestionaba correctamente en una versión anterior. Entre ambas versiones hay decenas de commits.",
      "Es una regresión: un comportamiento que funcionaba dejó de hacerlo después de un cambio. Continuamos un caso didáctico con datos ficticios, no un incidente de este repositorio. Hipótesis: algún cambio del intervalo eliminó el manejo de esa entrada. Compararemos versiones con la misma comprobación."
    ]
  },
  {
    "id": "idea",
    "label": "2) La idea clave",
    "title": "Git elige la versión; tú defines el resultado",
    "subtitle": "Búsqueda binaria aplicada al historial.",
    "chip": "Git",
    "paragraphs": [
      "Indicas un commit que funciona (good) y otro que presenta el fallo (bad). Git bisect selecciona un candidato intermedio; lo pruebas y clasificas. Cada respuesta reduce el conjunto de cambios que debes investigar.",
      "No necesitas revisar todos los commits uno por uno. Necesitas reconocer de forma fiable si cada candidato cumple el mismo criterio. Un resultado ambiguo no permite decidir qué parte del historial descartar."
    ],
    "snippet": "Versión good → candidato → versión bad\n                   ↓\n           misma comprobación\n                   ↓\n          acotar y volver a probar",
    "source": {
      "href": "https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git",
      "label": "Pro Git: búsqueda binaria"
    }
  },
  {
    "id": "criterion",
    "label": "3) El criterio en .NET",
    "title": "Fija el contrato antes de buscar",
    "subtitle": "Un rechazo de validación también puede ser el resultado correcto.",
    "chip": "Backend",
    "paragraphs": [
      "En este ejemplo fijamos el contrato que quedó pendiente en la clase anterior: importar CAMISETA debe devolver un rechazo de validación con el mensaje «Falta la talla», sin lanzar una excepción inesperada. La versión antigua debe cumplir ese criterio y la actual reproducir IndexOutOfRangeException al acceder a parts[1].",
      "Compruébalo manualmente o con una prueba que afirme el rechazo y su mensaje, y que falle ante la excepción investigada. El resultado esperado procede del contrato conocido; decidirlo durante la búsqueda cambiaría la pregunta. Criterio backend: good significa que cumple este comportamiento, no que toda la versión esté libre de errores."
    ]
  },
  {
    "id": "bisect",
    "label": "4) Buscar el commit",
    "title": "Compila, comprueba y clasifica",
    "subtitle": "Parte de dos extremos comprobados.",
    "chip": "Comprobación",
    "paragraphs": [
      "Supongamos que v1.4.0 es una etiqueta anterior comprobada como correcta y el commit actual reproduce el defecto. Es una referencia ficticia del ejemplo: usa la etiqueta o el hash que hayas verificado en tu proyecto. Guarda los cambios pendientes y confirma con git status que el directorio de trabajo está limpio antes de empezar."
    ],
    "snippet": "git bisect start\ngit bisect bad\ngit bisect good v1.4.0",
    "after": "Git cambia los archivos al candidato. Reconstruye esa versión y ejecuta el caso. Elige solo una clasificación de la tabla según lo observado; después prueba el siguiente candidato. La búsqueda termina al identificar el primer commit defectuoso del intervalo, si la evidencia permite distinguirlo.",
    "source": {
      "href": "https://git-scm.com/docs/git-bisect#_basic_bisect_commands_start_bad_good",
      "label": "Git: comandos básicos de bisect"
    }
  },
  {
    "id": "change",
    "label": "5) Leer el cambio",
    "title": "La protección desapareció",
    "subtitle": "Un cambio concreto que explica el acceso fuera de rango.",
    "chip": "C#",
    "paragraphs": [
      "Imagina que el commit encontrado contiene esta diferencia. Son dos versiones alternativas del mismo método C#: la tupla devuelve si el código es válido y, según el resultado, la talla o el mensaje de validación. Se usa para hacer explícito el contrato sin depender de librerías."
    ],
    "snippet": "// Antes: rechazo controlado\nstatic (bool IsValid, string Value) ExtractSize(string productCode)\n{\n    var parts = productCode.Split('-');\n\n    if (parts.Length < 2)\n        return (false, \"Falta la talla\");\n\n    return (true, parts[1]);\n}\n\n// Después: acceso sin comprobación\nstatic (bool IsValid, string Value) ExtractSize(string productCode)\n{\n    var parts = productCode.Split('-');\n\n    return (true, parts[1]);\n}",
    "after": "CAMISETA solo produce una parte; el cambio eliminó la guarda de parts[1]. Ya tienes una explicación concreta que contrastar con la reproducción. Esto no demuestra que todos los fallos de importación tengan esa causa ni valida otros formatos de código."
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Clasifica evidencia, no cualquier error",
    "subtitle": "Una dependencia ausente no demuestra esta regresión.",
    "chip": "QA",
    "paragraphs": [
      "Mantén la misma entrada y el mismo resultado esperado. Reconstruye cada candidato para no ejecutar binarios de otra versión. Controla SDK, configuración, datos y dependencias relevantes; conserva por candidato el hash, los comandos, la salida observada y la clasificación.",
      "Si una versión no compila por un problema ajeno al defecto, usa git bisect skip. Omitir candidatos puede dejar varios commits posibles. Si pasa unas veces y falla otras, investiga esa variabilidad antes de clasificar: una respuesta poco fiable puede desviar la búsqueda.",
      "El enfoque presupone una transición suficientemente estable entre funcionar y fallar. Si el defecto apareció, se corrigió y reapareció, acota mejor el intervalo. Al terminar, guarda la evidencia y ejecuta el comando siguiente para volver al punto desde el que comenzaste."
    ],
    "snippet": "git bisect reset",
    "source": {
      "href": "https://git-scm.com/docs/git-bisect",
      "label": "Git: skip y reset"
    }
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "Tres versiones, tres decisiones",
    "subtitle": "¿Qué marcarías como good, bad y skip?",
    "chip": "Práctica",
    "paragraphs": [
      "Durante la búsqueda obtienes los resultados de la tabla. Clasifica cada versión con el criterio fijado para CAMISETA. ¿Por qué un problema de compilación ajeno al defecto no equivale a reproducirlo?"
    ]
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "La misma comprobación, versiones diferentes",
    "subtitle": "Conecta una reproducción con el cambio que alteró el comportamiento.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Regla mental: para encontrar cuándo cambió algo, comprueba siempre lo mismo en versiones diferentes.",
      "Ya puedes localizar una regresión sin revisar todo el historial manualmente. En el día 201 veremos cómo demostrar que una corrección resolvió el problema, comprobando la causa además del síntoma."
    ]
  }
];

export default function Daily200Client() {
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
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || target?.isContentEditable || target?.closest("input, textarea, select, button, a, summary")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/199";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Git bisect · una comprobación entre versiones</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/199"><span className={styles.kbd}>←</span> Día 199</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>27/10/2026</div><div className={styles.badge}>Daily #200 • Production Backend</div><h2 className={styles.title}>Encontrar una regresión con Git bisect</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Git bisect</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Localiza el commit que introdujo un fallo mediante una comprobación repetible y el mismo criterio en cada versión.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "bisect" && <table className={styles.sub}>
          <caption>Alternativas: ejecuta una según el resultado</caption>
          <thead><tr><th scope="col">Comando</th><th scope="col">Condición observada</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>git bisect good</code></th><td>Devuelve el rechazo esperado y su mensaje.</td></tr>
            <tr><th scope="row"><code>git bisect bad</code></th><td>Reproduce la excepción investigada en parts[1].</td></tr>
            <tr><th scope="row"><code>git bisect skip</code></th><td>No permite comprobar ese comportamiento por un problema ajeno.</td></tr>
          </tbody>
        </table>}
        {section.source && <p className={styles.sub}><a className={styles.pill} href={section.source.href}>{section.source.label}</a></p>}
        {section.id === "challenge" && <>
          <table className={styles.sub}>
            <caption>Resultados de la misma comprobación</caption>
            <thead><tr><th scope="col">Versión</th><th scope="col">Resultado</th></tr></thead>
            <tbody>
              <tr><th scope="row">A</th><td>Devuelve la validación esperada.</td></tr>
              <tr><th scope="row">B</th><td>Lanza la excepción investigada.</td></tr>
              <tr><th scope="row">C</th><td>No compila por un problema ajeno al defecto.</td></tr>
            </tbody>
          </table>
          <details className={styles.proDetails}>
            <summary>Ver respuesta razonada</summary>
            <div className={styles.proBody}>
              <p>A → good: cumple el contrato. B → bad: reproduce el defecto buscado. C → skip: todavía no sabes cómo se comporta la importación en esa versión.</p>
              <p>Clasificar C como bad confundiría dos problemas diferentes. Guarda el motivo de la omisión; si queda junto a la transición, quizá no puedas señalar un único commit responsable.</p>
            </div>
          </details>
        </>}
      </div></section>)}
      <div className={styles.relatedLinks}><Link className={styles.pill} href="/daily/199">Día 199: reproducción mínima</Link><Link className={styles.pill} href="/daily/56">Día 56: manejo de errores</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/199"><span className={styles.kbd}>←</span> Día 199</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
