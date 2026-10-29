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
};

const sections: LessonSection[] = [
  {
    "id": "symptom",
    "label": "1) El problema",
    "title": "Un botón todavía no explica la necesidad",
    "subtitle": "La petición describe una solución; falta entender para qué sirve.",
    "chip": "Petición",
    "paragraphs": [
      "Un usuario solicita: «Añade un botón para exportar todos los pedidos a Excel». Parece una tarea clara: crear un endpoint, generar el archivo y añadir el botón. Pero todavía desconoces para qué necesita ese Excel.",
      "Quizás debe entregar un informe a otra persona, busca pedidos pendientes o necesita comparar importes con otro sistema. Son hipótesis, no necesidades confirmadas. Cada una puede conducir a una implementación diferente.",
      "Programar la petición sin entender su propósito puede producir una funcionalidad que no resuelva el trabajo del usuario. Usaremos un ejemplo ficticio para descubrir qué decisión falta antes de escribir código."
    ]
  },
  {
    "id": "idea",
    "label": "2) La idea clave",
    "title": "Separar dificultad y propuesta",
    "subtitle": "La solución solicitada aporta información sobre cómo trabaja la persona.",
    "chip": "Necesidad",
    "paragraphs": [
      "Una petición suele mezclar el problema con una solución propuesta. Escucha la propuesta: muestra cómo el usuario cree que podría completar su trabajo. Para evaluarla, reconstruye quién tiene la dificultad, qué intenta conseguir, qué obstáculo encuentra y qué resultado demostraría una mejora."
    ],
    "after": "Una formulación posible: «La persona que prepara pedidos necesita identificar los pedidos pagados pendientes de preparación, porque actualmente debe revisar cada registro por separado». Es una necesidad sobre la que razonar; hay que confirmarla con quien realiza ese trabajo."
  },
  {
    "id": "conversation",
    "label": "3) Ejemplo práctico",
    "title": "Pregunta por el paso siguiente",
    "subtitle": "Una pregunta concreta puede revelar el propósito de la descarga.",
    "chip": "Comprobación",
    "paragraphs": [
      "Imagina esta conversación. Las respuestas describen el recorrido del ejemplo; en un proyecto real debes obtenerlas de las personas implicadas."
    ],
    "snippet": "Usuario: Necesito exportar todos los pedidos.\nDesarrollador: ¿Qué haces con el archivo después de descargarlo?\nUsuario: Filtro los pagados y busco cuáles siguen pendientes\n         de preparación.\nDesarrollador: ¿Qué haces con esos pedidos?\nUsuario: Se los paso al encargado del almacén para que los prepare.",
    "after": "La conversación revela dos pasos: encontrar los pedidos que requieren preparación y entregarlos a la persona responsable. Ya puedes comparar opciones con un propósito concreto."
  },
  {
    "id": "decision",
    "label": "4) Evaluar opciones",
    "title": "La elección depende del trabajo del almacén",
    "subtitle": "Todavía falta confirmar cómo recibe y utiliza la selección.",
    "chip": "Decisión",
    "paragraphs": [
      "La exportación, un filtro y una vista de preparación son alternativas que conviene comprobar con el mismo objetivo. No elijas una únicamente porque parezca más fácil de programar."
    ],
    "after": "Si el almacén utiliza archivos para operar sin conexión, la exportación podría ser adecuada. Si trabaja dentro de la aplicación, una vista compartida podría evitar transferencias manuales. Entender el problema permite elegir con fundamento; aún falta confirmar ese contexto."
  },
  {
    "id": "backend",
    "label": "5) Cómo se aplica en .NET",
    "title": "La necesidad orienta el contrato",
    "subtitle": "Decide qué operación necesita el usuario antes de diseñar el endpoint.",
    "chip": "Backend",
    "paragraphs": [
      "En una API .NET, si se confirma que hace falta un archivo, podrías implementar una operación de exportación filtrada. Si se confirma que hace falta consultar la selección dentro de la aplicación, podrías aprovechar un listado filtrado. Estos son contratos HTTP posibles, no endpoints implementados en este repositorio."
    ],
    "snippet": "Archivo necesario:\nGET /orders/export?paymentStatus=paid&preparationStatus=pending\n\nConsulta dentro de la aplicación:\nGET /orders?paymentStatus=paid&preparationStatus=pending",
    "after": "Antes de implementarlos, acuerda qué significa exactamente «pagado» y «pendiente de preparación», y quién puede consultar esos pedidos. Criterio backend: esa conversación orienta los filtros, los permisos, los datos devueltos y las pruebas. El formato del archivo por sí solo no define el contrato."
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Descargar no demuestra que el trabajo se complete",
    "subtitle": "Comprueba qué puede hacer la persona con el resultado.",
    "chip": "QA",
    "paragraphs": [
      "Comprobar que el botón descarga un archivo valida una parte. También necesitas comprobar si ese archivo permite identificar correctamente los pedidos que requieren atención. Con datos ficticios de prueba, una vez acordados los estados, comprueba que aparecen los pedidos pagados pendientes y que quedan fuera los no pagados o ya preparados.",
      "Preguntas útiles: ¿qué trabajo realiza el usuario después de usar la funcionalidad?, ¿qué información necesita para completarlo?, ¿cómo sabremos que obtuvo el resultado esperado?, ¿hay una condición que haga obligatoria la solución solicitada?",
      "No necesitas convertir cada petición en una investigación extensa. Una pregunta concreta sobre el uso posterior puede revelar información suficiente para avanzar. La comprobación técnica y la validación con quien utiliza el resultado aportan evidencias complementarias."
    ]
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "¿Para qué pedir observaciones al cancelar?",
    "subtitle": "Distingue tus preguntas de lo que todavía estás suponiendo.",
    "chip": "Práctica",
    "paragraphs": [
      "Recibes esta solicitud: «Añade un campo de observaciones obligatorio al cancelar un pedido». Escribe dos preguntas que te permitan descubrir para qué se necesita esa información. Después, formula un posible problema que explique la petición y señálalo como hipótesis pendiente de confirmar."
    ]
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "Entender antes de implementar",
    "subtitle": "Transforma la petición en una necesidad que puedas analizar y validar.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Regla mental: antes de implementar una petición, entiende qué trabajo necesita completar la persona.",
      "Hoy aprendiste a reconstruir la necesidad detrás de una funcionalidad solicitada. La propuesta inicial sigue siendo una opción, pero ahora puedes contrastarla con el propósito y las condiciones de uso.",
      "En el día 203, todavía planificado, utilizaremos esa necesidad para definir un caso de uso desde el objetivo del usuario."
    ]
  }
];

export default function Daily202Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/201";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Requisitos · entender la necesidad</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/201"><span className={styles.kbd}>←</span> Día 201</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>29/10/2026</div><div className={styles.badge}>Daily #202 • Production Backend</div><h2 className={styles.title}>Separar el problema de la solución solicitada</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Necesidad</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Identifica la necesidad detrás de una petición antes de decidir qué implementar.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.id === "idea" && <table className={styles.sub}>
          <caption>Problema y solución propuesta</caption>
          <thead><tr><th scope="col">Elemento</th><th scope="col">Pregunta</th><th scope="col">Ejemplo</th></tr></thead>
          <tbody>
            <tr><th scope="row">Problema</th><td>¿Qué dificultad necesita resolver?</td><td>Detectar pedidos pagados que siguen sin preparar.</td></tr>
            <tr><th scope="row">Solución propuesta</th><td>¿Cómo imagina resolverla?</td><td>Exportar los pedidos a Excel.</td></tr>
          </tbody>
        </table>}
        {section.id === "decision" && <table className={styles.sub}>
          <caption>Alternativas que conviene comprobar</caption>
          <thead><tr><th scope="col">Opción</th><th scope="col">Qué habría que comprobar</th></tr></thead>
          <tbody>
            <tr><th scope="row">Exportación a Excel</th><td>Si el archivo es necesario para trabajar fuera del sistema.</td></tr>
            <tr><th scope="row">Filtro en el listado</th><td>Si permite identificar los pedidos directamente.</td></tr>
            <tr><th scope="row">Vista de preparación</th><td>Si el encargado puede consultar y trabajar con esa selección.</td></tr>
          </tbody>
        </table>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "challenge" && <details className={styles.proDetails}>
          <summary>Ver una posible respuesta</summary>
          <div className={styles.proBody}>
            <p>¿Quién consulta las observaciones después de cancelar y qué decisión toma con ellas?</p>
            <p>¿Qué dificultad encuentran hoy cuando una cancelación no tiene observaciones?</p>
            <p>Hipótesis pendiente de confirmar: la persona responsable de operaciones necesita entender los motivos de cancelación para investigar incidencias recurrentes, porque actualmente debe preguntar por cada pedido.</p>
            <p>Las respuestas podrían justificar un texto libre, motivos predefinidos u otra solución. Todavía no sabemos si hacer obligatorio el campo resuelve esa necesidad.</p>
          </div>
        </details>}
      </div></section>)}
      <div className={styles.relatedLinks}><Link className={styles.pill} href="/daily/201">Día 201: demostrar una corrección</Link><Link className={styles.pill} href="/daily/9">Día 9: contratos en API</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/201"><span className={styles.kbd}>←</span> Día 201</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
