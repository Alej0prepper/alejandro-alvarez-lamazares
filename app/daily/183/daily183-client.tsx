"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  [
    "symptom",
    "1) Síntoma",
    "El producto 3 falló: ¿qué hacemos con el 4?",
    "Importar 1 000 productos obliga a diseñar el comportamiento ante un error.",
    "Caso",
    "Ejemplo didáctico, sin datos de producción: los productos 1 y 2 se guardan; el 3 tiene un precio inválido.\n\nHipótesis: podemos seguir porque cada producto es independiente.\nComprobación: ¿el 4 necesita al 3?, ¿el fallo dejó cambios parciales?, ¿sabremos qué se guardó?\n\nSi comparten una transacción o dependen de referencias creadas antes, la independencia no está demostrada. Continuar solo es útil cuando podemos mantener y comprobar la consistencia."
  ],
  [
    "decision",
    "2) Criterio backend",
    "Decide según dependencia y alcance",
    "Fail Fast detiene el flujo ante un error; Best Effort completa las unidades que aún pueden procesarse de forma segura.",
    "Decisión",
    "Pasos dependientes: validar pedido -> cobrar -> confirmar.\nSi cobrar falla, no confirmes como si hubiera funcionado.\n\nUnidades independientes: producto A | producto B | producto C.\nSi B es inválido, A y C pueden guardarse por separado.\n\nDefine primero la unidad de trabajo y qué errores son recuperables. Un dato inválido local puede permitir continuar; una conexión caída o una configuración incorrecta afecta al lote y exige detenerlo."
  ],
  [
    "restore",
    "3) PostgreSQL",
    "Una restauración parcial no es recuperación aprobada",
    "El caso del día 181 conecta esta decisión con objetos y datos que dependen unos de otros.",
    "Fail Fast",
    "Escenario hipotético: COPY orders falla y luego se crean índices.\nObservar mensajes posteriores no demuestra que los pedidos estén completos.\n\n# SQL plano, sobre una base de laboratorio vacía:\npsql -X -v ON_ERROR_STOP=1 -d restore_lab -f backup.sql\n\n# Alternativa para custom, en otro destino limpio:\npg_restore --exit-on-error -d restore_lab backup.dump\n\nConfigura conexiones y credenciales fuera del repositorio. No ejecutes ambas rutas sobre la misma base. Ante un estado de salida distinto de cero, registra el error y no apruebes el intento. Corrige la causa y repite en un destino limpio; después valida datos y flujo crítico como en el día 181."
  ],
  [
    "atomicity",
    "4) Atomicidad",
    "Detenerse no equivale a deshacer",
    "Atomicidad significa que una unidad se aplica completa o no se aplica. Fail Fast solo define cuándo parar.",
    "Límites",
    "Transferencia: descontar 100 de A y sumar 100 a B.\nUna transacción de base de datos debe confirmar ambos cambios o revertirlos. Detener el código después del descuento no devuelve el dinero por sí solo.\n\nEn los comandos anteriores pueden quedar sentencias ya confirmadas. Una transacción única requiere que el script y sus operaciones sean compatibles con ese alcance.\n\nUn cobro externo tampoco se revierte con un rollback SQL. Si la respuesta del proveedor es incierta, comprueba el resultado antes de reintentar; detenerse evita avanzar, pero la recuperación necesita una decisión explícita."
  ],
  [
    "dotnet",
    "5) Ejemplo .NET",
    "Captura solo el error que permite continuar",
    "Fragmento del cuerpo de un método async: items, logger y ct se reciben del llamador.",
    "C#",
    "var successful = new List<int>();\nvar failed = new List<(int Id, string Reason)>();\n\nforeach (var item in items)\n{\n    ct.ThrowIfCancellationRequested();\n    try\n    {\n        await ProcessAsync(item, ct);\n        successful.Add(item.Id);\n    }\n    catch (ArgumentException ex)\n        when (ex.ParamName == \"Price\")\n    {\n        failed.Add((item.Id, \"invalid_price\"));\n        logger.LogWarning(\n            \"Producto {ItemId}: precio inválido\", item.Id);\n    }\n}\n\nContrato del ejemplo: Id es int; ProcessAsync valida Price antes de escribir y lanza ArgumentException con ParamName = \"Price\" si es inválido. Cada producto se guarda en una transacción propia, confirmada antes de retornar.\n\nSin ese catch, la excepción sale del foreach y el lote se detiene. Aquí solo continúa el rechazo conocido de precio; cancelación y errores inesperados se propagan. Un catch (Exception) indiscriminado podría ocultar un fallo que afecta a todos los productos."
  ],
  [
    "report",
    "6) Resultado parcial",
    "Continuar exige conservar el resultado",
    "Partial Success significa que unas unidades terminan y otras fallan; debe verse en el estado final.",
    "Trazabilidad",
    "Resultado ficticio de un lote completado:\nBatch: demo-183 | Total: 1 000 | Correctos: 992 | Fallidos: 8\nEstado: partial_success\nProducto 42 -> invalid_price\n\nConserva el identificador del lote, IDs procesados y rechazados, y causas seguras, sin datos sensibles. Usa successful y failed para construir ese resumen; un log por sí solo no constituye un resultado consultable.\n\nSi el lote se interrumpe, registra estado interrupted y elementos pendientes; no anuncies finalización. En un job duradero, persiste el progreso: las listas en memoria del ejemplo se pierden si muere el proceso.\n\nReintenta solo lo fallido tras corregirlo y evitando duplicados. Capturar sin registrar ni actuar —catch vacío— es error swallowing: el fallo desaparece de la evidencia, no del sistema."
  ],
  [
    "qa",
    "7) Mirada de QA",
    "Provoca el fallo y afirma lo que ocurre",
    "Una prueba debe verificar tanto el avance permitido como el paso que debe quedar bloqueado.",
    "Comprobación",
    "Lote de prueba: 1 válido, 2 válido, 3 con precio inválido, 4 válido.\n\nBest Effort: afirma que 1, 2 y 4 están guardados, que 3 no tiene cambios parciales y que el resumen contiene 3 correctos y 1 fallo con su ID y causa. Corrige 3 y verifica que el reintento no duplique los otros.\n\nFail Fast: afirma que el procesador del 4 no se invocó. Comprueba por separado qué cambios previos permanecen según el alcance transaccional.\n\nSimula también cancelación o pérdida de conexión: deben propagarse y dejar el lote interrumpido. Para pedidos, afirma que un cobro fallido no confirma el pedido. Para restores, compara datos y relaciones esperados; arrancar la aplicación no basta."
  ],
  [
    "challenge",
    "8) Mini reto",
    "Una dirección inválida entre 500 notificaciones",
    "¿Seguirías si falla la número 20? Cambia luego la causa por credenciales inválidas del proveedor.",
    "Práctica",
    "Piensa antes de abrir la respuesta.\n\nDecide: ¿el fallo es local?, ¿qué registras?, ¿qué condición detiene el lote?\n\nVariante: crear pedido -> cobrar -> confirmar. Si cobrar falla, ¿puede ejecutarse confirmar?"
  ],
  [
    "closing",
    "9) Cierre",
    "¿Es seguro y útil continuar?",
    "Esta es la regla mental: dependencia, consistencia y trazabilidad antes de elegir la estrategia.",
    "Aprendizaje",
    "Continuar sería inseguro -> detener y recuperar explícitamente.\nUnidades independientes + fallos identificables -> Best Effort puede ser válido.\n\nNo todos los errores deben detener un sistema, pero todo error debe tener un comportamiento diseñado. Fail Fast no garantiza rollback; Best Effort no permite anunciar éxito total cuando hubo fallos.\n\nSiguiente tema, todavía planificado: Día 184 — Migraciones de software: código compatible ≠ datos compatibles."
  ]
].map(([id, label, title, subtitle, chip, content]) => ({ id, label, title, subtitle, chip, content }));

export default function Daily183Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/182";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Errores · dependencia y consistencia</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/182"><span className={styles.kbd}>←</span> Día 182</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>05/10/2026</div><div className={styles.badge}>Daily #183 • Production Backend</div><h2 className={styles.title}>Fail Fast vs Best Effort: cuándo detenerse ante un error</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>.NET</span><span className={styles.chip}>Errores</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Decide cuándo detener un flujo y cuándo completar unidades independientes sin ocultar sus fallos.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre>{section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>Una dirección inválida es un rechazo local: continúa con las notificaciones independientes y registra el ID y la causa. Corrige la dirección antes de reintentar. Si las credenciales del proveedor son inválidas, el problema afecta al lote: detén el envío y conserva los pendientes. Un cobro fallido bloquea la confirmación del pedido; un resultado incierto exige consultar al proveedor antes de repetir el cobro.</div></details>}</div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://www.postgresql.org/docs/17/app-psql.html">Referencia: psql</a><a className={styles.pill} href="https://www.postgresql.org/docs/17/app-pgrestore.html">Referencia: pg_restore</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions">Referencia: excepciones en .NET</a><Link className={styles.pill} href="/daily/181">Día 181: validar la restauración</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/182"><span className={styles.kbd}>←</span> Día 182</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
