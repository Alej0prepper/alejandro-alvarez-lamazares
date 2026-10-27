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
    "title": "Un reporte amplio, demasiadas condiciones",
    "subtitle": "¿Cuánto puedo quitar sin que desaparezca el mismo fallo?",
    "chip": "Síntoma",
    "paragraphs": [
      "«Al importar un catálogo, la aplicación devuelve un error». Te entregan un archivo con 2 000 productos. El proceso incluye autenticación, lectura del archivo, validación, consulta de existencias y guardado en base de datos. Investigar todo el flujo hace difícil distinguir qué condiciones provocan el fallo.",
      "Este es un caso didáctico con productos ficticios, no un incidente observado en este repositorio. La hipótesis inicial es que una entrada concreta provoca el error. Para comprobarlo, reduciremos el caso y compararemos la excepción y el punto donde ocurre después de cada cambio."
    ]
  },
  {
    "id": "idea",
    "label": "2) La idea clave",
    "title": "Pequeña, suficiente y reproducible",
    "subtitle": "Reduce distracciones conservando las condiciones relevantes.",
    "chip": "Criterio",
    "paragraphs": [
      "Una reproducción mínima es un caso reducido que conserva el comportamiento defectuoso que investigas. Pequeña: contiene pocos elementos que revisar. Suficiente: incluye lo necesario para ejecutarlo. Reproducible: explica cómo provocar y reconocer el fallo.",
      "Mínima no significa eliminar líneas a cualquier precio ni demostrar que ya no existe un caso menor. Puedes reducir datos, pasos y dependencias. Después de cada reducción, vuelve a ejecutar el caso: si cambias demasiadas cosas juntas, será difícil saber cuál hizo desaparecer el problema."
    ]
  },
  {
    "id": "reduce",
    "label": "3) Reducir el caso",
    "title": "De 2 000 productos a una función",
    "subtitle": "La evidencia justifica qué puedes quitar.",
    "chip": "Comprobación",
    "paragraphs": [
      "Supongamos que los logs muestran System.IndexOutOfRangeException en ExtractSize(...). Reduces el archivo y la misma excepción continúa con diez productos, luego con uno. El producto tiene el código CAMISETA y el acceso que falla ocurre al extraer su talla, antes de consultar la base de datos.",
      "Ahora tienes una razón para probar esa función de forma aislada. Conserva su implementación y la entrada problemática; retira el resto del flujo solo mientras puedas confirmar la misma excepción en el mismo acceso. No necesitas reproducir todas las pantallas para estudiar ese defecto."
    ],
    "snippet": "2 000 productos → 10 → 1 (CAMISETA)\nImportación completa → llamada a ExtractSize\nMisma excepción → mismo acceso a parts[1]",
    "after": "Criterio backend: quitar una dependencia requiere evidencia. Si el fallo depende de dos peticiones simultáneas, un registro previo o una restricción de PostgreSQL, esas condiciones forman parte del caso y deben conservarse."
  },
  {
    "id": "dotnet",
    "label": "4) Ejemplo en .NET",
    "title": "Una entrada que rompe una suposición",
    "subtitle": "Program.cs de una aplicación de consola C# con instrucciones de nivel superior.",
    "chip": "C#",
    "paragraphs": [
      "Este programa conserva la operación que falla. En un proyecto de consola creado con dotnet new console, sustituye Program.cs por el fragmento y ejecuta dotnet run desde su carpeta. Requiere el SDK de .NET; no necesita paquetes adicionales, autenticación ni base de datos.",
      "La primera llamada imprime XL. La segunda lanza System.IndexOutOfRangeException al acceder a parts[1]. La salida de la excepción puede variar según el entorno; reconoce el tipo y el acceso que falla."
    ],
    "snippet": "using System;\n\nstatic string ExtractSize(string productCode)\n{\n    var parts = productCode.Split('-');\n\n    return parts[1];\n}\n\nConsole.WriteLine(ExtractSize(\"CAMISETA-XL\")); // XL\nConsole.WriteLine(ExtractSize(\"CAMISETA\"));    // Excepción",
    "after": "CAMISETA-XL se divide en [\"CAMISETA\", \"XL\"]; CAMISETA produce [\"CAMISETA\"]. El código presupone que existe una segunda parte. La diferencia entre ambas entradas apunta a una condición concreta: falta el separador esperado."
  },
  {
    "id": "decision",
    "label": "5) La decisión pendiente",
    "title": "Localizar el fallo no define el requisito",
    "subtitle": "La reproducción explica dónde falla; el contrato decide cómo corregirlo.",
    "chip": "Backend",
    "paragraphs": [
      "¿Debería rechazarse CAMISETA con un mensaje de validación o admitirse un producto sin talla? La reproducción no responde esa pregunta. Antes de cambiar ExtractSize, acuerda el comportamiento esperado para un código sin separador.",
      "La evidencia disponible muestra un acceso fuera de rango para esa entrada. No demuestra que toda importación falle por ese motivo ni que cualquier código con guion sea válido. Conserva el caso reducido para estudiar la causa sin convertir una suposición en requisito."
    ]
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Otra persona debe reconocer el mismo resultado",
    "subtitle": "Un 500 distinto puede ser un defecto nuevo.",
    "chip": "QA",
    "paragraphs": [
      "Registra entrada, acción y resultado observado junto con un caso de comparación. Para compartirlo, añade el comando de ejecución, la versión del SDK usada y el fragmento mínimo. Usa datos sintéticos; no adjuntes catálogos reales, credenciales ni volcados de producción.",
      "Comprueba que conservas el mismo fallo. Obtener otro 500 porque eliminaste una configuración necesaria no reproduce el defecto original. Compara el tipo de excepción y el punto del código, además del estado HTTP si todavía ejecutas el flujo completo."
    ],
    "snippet": "Entrada: CAMISETA\nAcción: ejecutar ExtractSize\nObservado: IndexOutOfRangeException en parts[1]\nComparación: CAMISETA-XL devuelve XL",
    "after": "Si el error depende del estado o de concurrencia, documenta también cómo preparar ese estado y coordinar las operaciones. Quitar esas condiciones puede ocultarlo aunque el ejemplo quede más corto."
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "Las últimas 50 filas fallan",
    "subtitle": "¿Qué reducción probarías después?",
    "chip": "Práctica",
    "paragraphs": [
      "Una importación falla con un archivo de 100 filas. Las primeras 50 funcionan y las últimas 50 fallan. ¿Qué probarías después para localizar la fila problemática? ¿Qué evidencia conservarías para comprobar que sigues investigando el mismo defecto?"
    ]
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "Quita una cosa y vuelve a comprobar",
    "subtitle": "Menos ruido, una condición verificable.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Regla mental: quita una cosa, ejecuta de nuevo y comprueba que sigue fallando por la misma razón.",
      "Una reproducción mínima convierte un reporte amplio en un caso que puedes ejecutar, compartir y estudiar con precisión. En el día 200 utilizaremos una comprobación repetible para encontrar qué cambio introdujo una regresión mediante git bisect."
    ]
  }
];

export default function Daily199Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/190";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Reproducción mínima · conservar el mismo fallo</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/190"><span className={styles.kbd}>←</span> Día 190</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>26/10/2026</div><div className={styles.badge}>Daily #199 • Production Backend</div><h2 className={styles.title}>Construir una reproducción mínima</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Depuración</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Reduce un caso que falla hasta conservar únicamente los datos, pasos y dependencias necesarios para reproducirlo.</p></div>
      <p className={styles.sub}>Anterior disponible: día 190. Los días 191–198 siguen planificados y todavía no tienen páginas publicadas.</p>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "idea" && <table className={styles.sub}>
          <caption>Tres formas de reducir el caso</caption>
          <thead><tr><th scope="col">Elemento</th><th scope="col">Ejemplo de reducción</th></tr></thead>
          <tbody>
            <tr><th scope="row">Datos</th><td>Pasar de 2 000 productos a uno.</td></tr>
            <tr><th scope="row">Pasos</th><td>Ejecutar directamente la importación sin navegar por varias pantallas.</td></tr>
            <tr><th scope="row">Dependencias</th><td>Ejecutar el cálculo sin base de datos si el fallo ocurre antes de consultarla.</td></tr>
          </tbody>
        </table>}
        {section.id === "challenge" && <details className={styles.proDetails}>
          <summary>Ver respuesta razonada</summary>
          <div className={styles.proBody}>
            <p>Divide las últimas 50 filas en dos grupos de 25 y ejecuta cada grupo con el mismo estado inicial. Continúa reduciendo el grupo que conserve la misma excepción en el mismo punto. Guarda el subconjunto usado, los pasos, el estado relevante y la evidencia de cada ejecución, además de un caso que funcione.</p>
            <p>Esto supone que una fila puede provocar el fallo por sí sola. Si ambos grupos funcionan por separado, investiga una interacción entre filas, su orden o un umbral del lote. Si ambos fallan, puede haber más de una entrada problemática. Conserva las condiciones que reproduzcan el defecto.</p>
          </div>
        </details>}
      </div></section>)}
      <div className={styles.relatedLinks}><Link className={styles.pill} href="/daily/200">Día 200: Git bisect</Link><Link className={styles.pill} href="/daily/15">Día 15: casos reales</Link><Link className={styles.pill} href="/daily/56">Día 56: manejo de errores</Link><Link className={styles.pill} href="/daily/190">Día 190: correlación</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/190"><span className={styles.kbd}>←</span> Día 190</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
