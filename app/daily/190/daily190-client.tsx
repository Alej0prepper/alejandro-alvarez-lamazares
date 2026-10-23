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
    "title": "Dos peticiones, mensajes mezclados",
    "subtitle": "El orden de los logs no identifica una ejecución.",
    "chip": "Síntoma",
    "paragraphs": [
      "Dos usuarios crean pedidos al mismo tiempo. El backend registra los mensajes siguientes. Sabes que ocurrió un fallo, pero ¿a cuál de las dos peticiones pertenece? Distintas ejecuciones pueden avanzar simultáneamente y mezclar sus logs.",
      "Este es un caso didáctico con identificadores ficticios, no un incidente observado en este repositorio. Hipótesis: los mensajes pertenecen a ejecuciones distintas; para comprobarlo necesitamos contexto por petición, no deducirlo por proximidad."
    ],
    "snippet": "Iniciando creación del pedido\nIniciando creación del pedido\nPedido guardado\nFalló la consulta de inventario"
  },
  {
    "id": "correlation",
    "label": "2) Correlación",
    "title": "Un identificador para seguir el recorrido",
    "subtitle": "Establecer → registrar → filtrar.",
    "chip": "Decisión",
    "paragraphs": [
      "Un identificador de correlación permite agrupar los eventos relacionados con una misma ejecución. Se establece al entrar, se incluye en los logs de esa petición y se utiliza para buscar su recorrido.",
      "Con este contexto, filtrar por CorrelationId=B2 permite investigar la consulta de inventario sin confundirla con el pedido guardado por A1. La presencia del identificador relaciona mensajes; no demuestra que la operación haya terminado correctamente."
    ],
    "snippet": "CorrelationId=A1 Iniciando creación del pedido\nCorrelationId=B2 Iniciando creación del pedido\nCorrelationId=A1 Pedido guardado OrderId=842\nCorrelationId=B2 Falló la consulta de inventario"
  },
  {
    "id": "identity",
    "label": "3) Dos identidades",
    "title": "El pedido y la ejecución responden preguntas distintas",
    "subtitle": "Un objeto puede participar en muchas peticiones.",
    "chip": "Backend",
    "paragraphs": [
      "Un mismo pedido puede consultarse, modificarse y cancelarse mediante peticiones diferentes. También puede haber una petición que falle antes de que exista un pedido: su identificador de negocio no sustituye al de ejecución.",
      "Criterio backend: conserva ambos campos cuando existan y elige el filtro según la pregunta. Correlación tampoco significa idempotencia: repetir una petición puede generar otra ejecución y otro efecto. El identificador ayuda a investigarlo, pero no evita duplicados."
    ]
  },
  {
    "id": "middleware",
    "label": "4) En .NET",
    "title": "Establece el contexto al entrar",
    "subtitle": "Program.cs: después de construir app y antes de los endpoints.",
    "chip": "ASP.NET Core",
    "paragraphs": [
      "ASP.NET Core proporciona HttpContext.TraceIdentifier para identificar la petición en los logs. Aquí lo utilizamos como correlación dentro de esta aplicación. El ejemplo no lee un identificador enviado por el cliente ni configura su propagación a otros servicios.",
      "BeginScope añade contexto compartido a los logs del ámbito. Los servicios que usan ILogger de la misma infraestructura dentro de la petición pueden registrar mensajes normales sin repetir manualmente el identificador. El proveedor debe admitir scopes y tenerlos habilitados."
    ],
    "snippet": "app.Use(async (context, next) =>\n{\n    var correlationId = context.TraceIdentifier;\n\n    context.Response.Headers[\"X-Correlation-ID\"] =\n        correlationId;\n\n    using (app.Logger.BeginScope(\n        \"CorrelationId={CorrelationId}\",\n        correlationId))\n    {\n        await next(context);\n    }\n});",
    "after": "El identificador pertenece a la petición. Guardarlo en una variable estática compartida permitiría que otra ejecución sobrescribiera su valor. Este scope cubre el código que continúa por next; no todos los mensajes anteriores o posteriores del servidor."
  },
  {
    "id": "console",
    "label": "5) Ver el contexto",
    "title": "Activa los scopes en la consola",
    "subtitle": "Antes de builder.Build().",
    "chip": "Comprobación",
    "paragraphs": [
      "Para mostrarlos con el proveedor de consola simple, activa IncludeScopes. El formato visible depende del proveedor: la salida con CorrelationId=A1 de esta clase es esquemática; A1 y B2 no representan el formato real de TraceIdentifier.",
      "La cabecera X-Correlation-ID permite recuperar el mismo valor desde la respuesta en DevTools y buscarlo en los logs. Es una referencia de diagnóstico, no una credencial. No añadas tokens, cookies ni datos personales a los mensajes."
    ],
    "snippet": "builder.Logging.AddSimpleConsole(options =>\n{\n    options.IncludeScopes = true;\n});",
    "after": "Decisión verificable: antes de confiar en el filtro, confirma que el proveedor muestra el scope y que el valor de la respuesta coincide con los eventos del endpoint. Una cabecera presente por sí sola no demuestra que los logs estén correlacionados."
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Comprueba dos peticiones simultáneas",
    "subtitle": "Afirmaciones sobre la ejecución, además del estado HTTP.",
    "chip": "QA",
    "paragraphs": [
      "En un laboratorio, lanza dos peticiones concurrentes con datos sintéticos distinguibles y captura sus respuestas y logs. Usa un fallo controlado de inventario en una de ellas; no provoques el fallo en producción."
    ],
    "after": "Una petición fallida también debe poder localizarse si atraviesa este middleware y la aplicación logra emitir su respuesta. Una caída del proceso o un fallo anterior al middleware puede impedir recibir la cabecera. La ausencia de un mensaje tampoco prueba que un paso no ocurrió: revisa niveles y captura de logs."
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "Mismo pedido, distinta intención",
    "subtitle": "¿Qué filtro aísla exclusivamente la cancelación?",
    "chip": "Práctica",
    "paragraphs": [
      "Recibes estos logs. ¿Qué perderías si filtraras únicamente por OrderId=842? Decide qué filtro usar y qué conclusión permiten los mensajes."
    ],
    "snippet": "CorrelationId=A1 Consultando pedido OrderId=842\nCorrelationId=B2 Cancelando pedido OrderId=842\nCorrelationId=A1 Consulta completada OrderId=842\nCorrelationId=B2 Cancelación rechazada OrderId=842"
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "Relaciona la evidencia sin inventar el resultado",
    "subtitle": "El objeto y la ejecución tienen identidades diferentes.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Regla mental: el identificador de negocio señala el objeto; el de correlación señala la ejecución.",
      "Ya puedes separar los mensajes de una petición entre muchas ejecuciones simultáneas: identifica al entrar, registra en el ámbito y comprueba al filtrar. En la clase 191, todavía planificada, veremos cómo leer una traza para localizar en qué pasos se gastó el tiempo."
    ]
  }
];

export default function Daily190Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/188";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Correlación · una petición entre muchos logs</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/188"><span className={styles.kbd}>←</span> Día 188</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>23/10/2026</div><div className={styles.badge}>Daily #190 • Production Backend</div><h2 className={styles.title}>Seguir una petición con un identificador de correlación</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Correlación</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Reconstruye una petición aunque sus logs estén mezclados con los de otras. Una idea, un ejemplo en .NET y una comprobación concreta.</p></div>
      <p className={styles.sub}>Anterior disponible: día 188. El día 189 aún no tiene una página publicada.</p>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "identity" && <table className={styles.sub}><caption>Dos campos, dos preguntas</caption><thead><tr><th scope="col">Campo</th><th scope="col">Pregunta</th></tr></thead><tbody><tr><th scope="row"><code>OrderId</code></th><td>¿Sobre qué pedido ocurrió?</td></tr><tr><th scope="row"><code>CorrelationId</code></th><td>¿En qué ejecución ocurrió?</td></tr></tbody></table>}
        {section.id === "qa" && <ul className={styles.bullets}>
          <li>Afirma que ambas respuestas contienen un identificador no vacío y diferente entre sí.</li>
          <li>Comprueba que los eventos del inicio y del resultado de cada petición conservan el mismo identificador, sin mezclar los datos de la otra.</li>
          <li>Compara el valor devuelto en cada cabecera con el registrado para esa ejecución.</li>
          <li>En la petición con fallo controlado, afirma el estado de error acordado y localiza el mensaje de fallo con su identificador.</li>
        </ul>}
        {section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>OrderId=842 reúne la consulta y la cancelación: conserva el contexto del pedido, pero no aísla una ejecución. Usa CorrelationId=B2 para ver exclusivamente la cancelación. El mensaje indica que fue rechazada; no demuestra su causa ni permite afirmar el estado persistido del pedido sin otra comprobación.</div></details>}
      </div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext.traceidentifier?view=aspnetcore-10.0">Microsoft Learn: TraceIdentifier</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-10.0#log-scopes">Microsoft Learn: scopes de logging</a><Link className={styles.pill} href="/daily/20">Día 20: fundamentos de logs</Link><Link className={styles.pill} href="/daily/33">Día 33: idempotency keys</Link><Link className={styles.pill} href="/daily/188">Día 188: configuración</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/188"><span className={styles.kbd}>←</span> Día 188</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
