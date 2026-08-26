"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./prompt-viewer.module.css";

const prompt = `Actua como responsable de calidad y mantenimiento de este repositorio ASP.NET Core/.NET 10. Entiende todos los cambios, determina su impacto, crea o actualiza los tests necesarios, ejecutalos y deja evidencia verificable.

Revisa cambios committed, staged, unstaged y untracked. Lee AGENTS.md, Changes.md, los .csproj, la solucion, comandos, inventario, trazabilidad, factory de integracion y tests cercanos.

Conserva el trabajo del usuario. No descartes cambios, no deshabilites tests, no reduzcas aserciones, no uses Skip y no hagas commits salvo solicitud expresa. Usa fakes y reemplazos DI existentes. No ejecutes comandos destructivos de Docker.

Identifica endpoints, DTOs, validadores, DI, AutoMapper, entidades, EF, migraciones, permisos, mensajes y tests. Presenta una matriz con comportamiento, riesgo, cobertura actual, test faltante y archivo de implementacion.

Cubre happy path, errores, limites, status codes, headers, body, permisos, persistencia, relaciones, transacciones, rollback, eventos, dependencias externas, idempotencia y concurrencia cuando aplique. Respeta xUnit, fixtures, factories, fakes y nombres existentes.

Ejecuta tests dirigidos, builds Release de la solucion y del proyecto de integracion, suite unitaria completa y suite de integracion completa por sus .csproj aunque la solucion no incluya integracion.

Ante cada fallo, aisla el test, lee stack trace y setup, clasifica la causa, corrige y repite las suites afectadas. Actualiza Changes.md, inventario y TEST_TRACEABILITY.md cuando corresponda.

Entrega resultado, impacto, tests, comandos con pasados/fallidos/omitidos, warnings, documentacion y archivos modificados. No declares terminado mientras una suite requerida no haya sido ejecutada o tenga fallos sin clasificar.`;

export default function PromptViewer() {
  const [copied, setCopied] = useState(false);
  const copyPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <main className={styles.page}><article className={styles.shell}>
    <header className={styles.header}><div><Link href="/prompts" className={styles.back}>← Prompts</Link><p className={styles.eyebrow}>Reusable prompt</p><h1>Revisar cambios y mantener los tests</h1></div><button type="button" className={styles.copy} onClick={copyPrompt}>{copied ? "Copiado" : "Copiar prompt"}</button></header>
    <p className={styles.description}>Prompt operativo para analizar cambios, diseñar cobertura y ejecutar las suites correctas en un repositorio ASP.NET Core.</p>
    <pre className={styles.content}>{prompt}</pre>
    <footer><Link href="/profile" className={styles.back}>Volver al perfil</Link></footer>
  </article></main>;
}
