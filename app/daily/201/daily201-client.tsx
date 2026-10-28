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
    "title": "El error desapareció. ¿Y el producto?",
    "subtitle": "Ocultar una excepción no demuestra que la importación sea correcta.",
    "chip": "Síntoma",
    "paragraphs": [
      "Una importación falla cuando recibe CAMISETA, un código sin talla. La aplicación intenta extraer una posición que no existe y lanza una excepción. Un desarrollador añade un catch y responde con éxito; la excepción deja de aparecer en los logs. ¿Está corregido?",
      "Todavía falta comprobar qué ocurrió con el producto. Quizás se guardó sin un dato obligatorio o se ignoró silenciosamente. Son posibilidades por investigar, no resultados observados. Continuamos el caso didáctico de los días 199 y 200 con datos ficticios, no un incidente de este repositorio."
    ]
  },
  {
    "id": "idea",
    "label": "2) La idea clave",
    "title": "Antes, después y alrededor",
    "subtitle": "Define el resultado esperado antes de evaluar el arreglo.",
    "chip": "Contrato",
    "paragraphs": [
      "Una corrección necesita una comparación: antes, el caso reproduce el defecto; después, el mismo caso cumple el resultado esperado; alrededor, los comportamientos relacionados siguen funcionando.",
      "Mantenemos el contrato de la clase anterior: un código sin talla debe rechazarse como un error de validación; un código válido debe permitir extraer su talla. Esto distingue ocultar una excepción de corregir el comportamiento."
    ],
    "snippet": "Antes     → CAMISETA → excepción investigada\nDespués   → CAMISETA → rechazo de validación, sin guardado\nAlrededor → CAMISETA-XL → talla XL y recorrido válido"
  },
  {
    "id": "cause",
    "label": "3) La causa en .NET",
    "title": "Comprueba antes de acceder",
    "subtitle": "La causa identificada es un acceso a una posición inexistente.",
    "chip": "Backend",
    "paragraphs": [
      "Supongamos que el importador utiliza bool TryExtractSize(string productCode, out string size). Devuelve true y la talla si el formato es válido; devuelve false y deja size vacío si es inválido. Esta función expresa la decisión; el importador debe convertir false en el rechazo de validación y conservar el mensaje «Falta la talla» para CAMISETA, acordado en el día 200.",
      "El defecto estaba en acceder directamente a la segunda posición. Para este ejemplo consideramos válido un código con exactamente dos partes no vacías ni compuestas solo de espacios, separadas por un guion. Es una regla del ejemplo, no un formato universal de productos."
    ],
    "snippet": "size = productCode.Split('-')[1];",
    "after": "CAMISETA produce una sola parte. Criterio backend: la protección debe actuar antes del acceso y conservar la distinción entre entrada inválida y fallo inesperado."
  },
  {
    "id": "fix",
    "label": "4) La corrección",
    "title": "Rechazar sin esconder el fallo",
    "subtitle": "Una guarda protege el acceso y mantiene el contrato.",
    "chip": "C#",
    "paragraphs": [
      "La implementación corregida podría ser la siguiente. Coloca este método en una clase pública ProductCodeParser para usarlo desde las pruebas. La comprobación de longitud ocurre antes de evaluar parts[1]; el operador || deja de evaluar cuando encuentra una condición verdadera."
    ],
    "snippet": "public static bool TryExtractSize(\n    string productCode,\n    out string size)\n{\n    size = \"\";\n\n    if (string.IsNullOrWhiteSpace(productCode))\n        return false;\n\n    var parts = productCode.Split('-');\n\n    if (parts.Length != 2 ||\n        string.IsNullOrWhiteSpace(parts[0]) ||\n        string.IsNullOrWhiteSpace(parts[1]))\n        return false;\n\n    size = parts[1];\n    return true;\n}",
    "after": "No basta con devolver false para cualquier entrada: también debemos conservar la extracción de talla en los códigos válidos."
  },
  {
    "id": "regression",
    "label": "5) Pruebas de regresión",
    "title": "El mismo caso, un resultado definido",
    "subtitle": "Dos pruebas de xUnit: rechazar el inválido y aceptar el válido.",
    "chip": "Comprobación",
    "paragraphs": [
      "En un proyecto de pruebas xUnit que referencie ProductCodeParser, añade estos métodos dentro de una clase de pruebas y usa using Xunit;. La primera prueba debe fallar por la excepción investigada al ejecutarla contra la versión defectuosa. Después del arreglo debe pasar."
    ],
    "snippet": "[Fact]\npublic void CodeWithoutSize_IsRejected()\n{\n    var accepted = ProductCodeParser.TryExtractSize(\n        \"CAMISETA\", out var size);\n\n    Assert.False(accepted);\n    Assert.Equal(\"\", size);\n}\n\n[Fact]\npublic void ValidCode_ReturnsItsSize()\n{\n    var accepted = ProductCodeParser.TryExtractSize(\n        \"CAMISETA-XL\", out var size);\n\n    Assert.True(accepted);\n    Assert.Equal(\"XL\", size);\n}",
    "after": "La segunda prueba impide que una solución que rechaza todos los productos supere esta validación. Estas pruebas verifican la función: para cerrar la incidencia, comprueba además que el importador interpreta false como rechazo de validación y no guarda el producto inválido."
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Evidencia que permite explicar el cambio",
    "subtitle": "Comprueba el contrato y sus efectos.",
    "chip": "QA",
    "paragraphs": [
      "Mantén comparables los datos y la configuración. Si también cambiaste el archivo de entrada, el resultado podría deberse a ese cambio. Registra las versiones comparadas, el caso ejecutado y los resultados; diferencia la evidencia de la función de la del flujo completo.",
      "En la comprobación del importador, afirma el rechazo, el mensaje esperado para CAMISETA y la ausencia del producto en la persistencia de prueba. Comprueba también que un producto válido completa el recorrido esperado. Después ejecuta las pruebas relacionadas con el área modificada y las comprobaciones requeridas por el proyecto."
    ]
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "De 500 a 200, pero el contrato exige 400",
    "subtitle": "Dejar de fallar no equivale a responder correctamente.",
    "chip": "Práctica",
    "paragraphs": [
      "Un endpoint devolvía 500 al recibir una cantidad negativa. Después del arreglo devuelve 200, pero no crea el pedido. El contrato exige rechazar cantidades negativas con 400. ¿Qué aserción falta si la prueba únicamente comprueba que la respuesta dejó de ser 500?"
    ]
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "Una corrección respaldada por evidencia",
    "subtitle": "El caso pasa de incumplir el contrato a cumplirlo.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Regla mental: reproduce el defecto, comprueba el resultado esperado y verifica los efectos del arreglo.",
      "La corrección queda respaldada cuando el mismo caso cumple el contrato y sus efectos están comprobados. Esa evidencia cubre los recorridos verificados; no demuestra que todo el sistema esté libre de errores.",
      "En el día 202, todavía planificado, comenzamos otro bloque: separar el problema del usuario de la solución que solicita."
    ]
  }
];

export default function Daily201Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/200";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Correcciones · contrato y efectos comprobados</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/200"><span className={styles.kbd}>←</span> Día 200</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>28/10/2026</div><div className={styles.badge}>Daily #201 • Production Backend</div><h2 className={styles.title}>Demostrar que una corrección resolvió el problema</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Regresión</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Comprueba que un arreglo elimina el fallo investigado y conserva el comportamiento esperado.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "qa" && <table className={styles.sub}>
          <caption>Evidencia para evaluar la corrección</caption>
          <thead><tr><th scope="col">Comprobación</th><th scope="col">Qué demuestra</th></tr></thead>
          <tbody>
            <tr><th scope="row">El caso falla antes del arreglo</th><td>La prueba detecta el defecto original.</td></tr>
            <tr><th scope="row">El mismo caso pasa después</th><td>El comportamiento esperado se recuperó.</td></tr>
            <tr><th scope="row">El código válido sigue aceptándose</th><td>El arreglo conserva ese recorrido.</td></tr>
            <tr><th scope="row">El producto inválido no se guarda</th><td>El flujo respeta el rechazo de validación.</td></tr>
          </tbody>
        </table>}
        {section.id === "challenge" && <details className={styles.proDetails}>
          <summary>Ver respuesta razonada</summary>
          <div className={styles.proBody}>
            <p>Falta afirmar el estado exacto esperado: Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode); usando System.Net.</p>
            <p>Comprobar que no es 500 también acepta 200. Añade una comprobación de que no existe un pedido nuevo para ese caso: el estado HTTP y el efecto persistido son evidencias complementarias.</p>
          </div>
        </details>}
      </div></section>)}
      <div className={styles.relatedLinks}><Link className={styles.pill} href="/daily/200">Día 200: Git bisect</Link><Link className={styles.pill} href="/daily/56">Día 56: manejo de errores</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/200"><span className={styles.kbd}>←</span> Día 200</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
