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
    "label": "1) Síntoma",
    "title": "Mismo código, otro sistema",
    "subtitle": "La API funciona en la laptop y falla al ejecutarse en el servidor.",
    "chip": "Caso",
    "paragraphs": [
      "Caso didáctico del material, sin incidentes de producción atribuidos: una API arranca con dotnet run en desarrollo, pero el artefacto publicado falla en el servidor. El mensaje puede señalar runtime missing, una librería nativa ausente o connection refused. Son síntomas de capas diferentes.",
      "Hipótesis: alguna dependencia del entorno no coincide. Comprobación: identifica primero el artefacto y dónde se ejecuta; compara su contrato de ejecución con ese entorno. Decisión: corregir la capa respaldada por evidencia y repetir el flujo que fallaba, antes de cambiar código sin una causa demostrada."
    ],
    "snippet": "Backend\n├─ paquetes directos y transitivos\n├─ runtime + sistema operativo + arquitectura\n└─ configuración + red + servicios externos"
  },
  {
    "id": "packages",
    "label": "2) Paquetes",
    "title": "Lo declarado no es todo lo resuelto",
    "subtitle": "Una dependencia permite construir, ejecutar o realizar una función del backend.",
    "chip": ".NET",
    "paragraphs": [
      "Las referencias NuGet del .csproj son dependencias directas. Cada paquete puede traer otros: esas dependencias transitivas también forman parte del sistema. En una API con EF Core y Npgsql, compara las versiones resueltas y su compatibilidad, no solo el nombre del proveedor.",
      "En un proyecto con SDK .NET 10 y assets ya restaurados, estos comandos permiten inventariar qué runtime y paquetes están disponibles. La lista no instala el runtime que falta. Usa --no-restore para que el diagnóstico no dispare una restauración de paquetes."
    ],
    "snippet": "dotnet --info\ndotnet --list-runtimes\ndotnet package list --include-transitive --no-restore",
    "after": "Con SDK 9 o anterior, la forma de listar es dotnet list package --include-transitive, sobre assets existentes. dotnet restore resuelve y descarga paquetes durante la preparación del build; no sustituye la comprobación del entorno destino. Si faltan assets, prepara la copia de trabajo en un entorno autorizado."
  },
  {
    "id": "runtime",
    "label": "3) Runtime",
    "title": "El SDK de la laptop no es el runtime del servidor",
    "subtitle": "El runtime ejecuta el programa; el SDK añade las herramientas para construirlo.",
    "chip": "Compatibilidad",
    "paragraphs": [
      "Para una API ASP.NET Core framework-dependent con target net10.0, verifica su .runtimeconfig.json y la presencia de un runtime Microsoft.AspNetCore.App compatible. Tener solo .NET 8 en el servidor no satisface ese target. Si ejecutas un contenedor, inspecciona dentro de él: el dotnet del host no describe su runtime.",
      "Framework-dependent utiliza el runtime del destino. Self-contained incluye el runtime en el artefacto para una plataforma concreta, pero conserva requisitos nativos del sistema. La elección debe ser explícita, junto con quién actualiza el runtime: en self-contained, una corrección requiere republicar el artefacto."
    ],
    "snippet": "# En el proyecto de laboratorio, con target net10.0:\ndotnet publish -c Release -r linux-x64 --self-contained false -o publish-fdd\ndotnet publish -c Release -r linux-x64 --self-contained true -o publish-scd",
    "after": "Son alternativas de publicación para Linux x64; no comandos de reparación sobre producción. Un servidor ARM64 requiere evaluar otro RID, y linux-musl-x64 corresponde a otra familia de libc. Comprueba plataforma y arquitectura antes de aprobar."
  },
  {
    "id": "native",
    "label": "4) Sistema",
    "title": "El paquete está; la librería nativa puede faltar",
    "subtitle": "Las dependencias pueden bajar desde .NET o Python hasta componentes del sistema operativo.",
    "chip": "Diagnóstico",
    "paragraphs": [
      "Una librería puede usar OpenSSL, ICU u otro componente nativo. Que NuGet o pip termine correctamente no demuestra que esa función pueda ejecutarse. El error exacto, la versión del sistema y la arquitectura ayudan a comprobar esa hipótesis.",
      "Compara las dependencias documentadas del runtime y de la librería con la imagen real. Instala únicamente lo identificado durante la construcción de una imagen revisada y prueba la función afectada. Un paquete añadido manualmente al contenedor en ejecución puede desaparecer al recrearlo y esconder la causa del problema."
    ]
  },
  {
    "id": "odoo",
    "label": "5) Odoo y Python",
    "title": "Tres contratos para un addon",
    "subtitle": "Odoo 17 distingue módulos, imports Python y ejecutables externos.",
    "chip": "Aplicación",
    "paragraphs": [
      "En el addon ficticio shipment_demo, el manifiesto declara los módulos base y sale, un import Python PIL y el ejecutable wkhtmltopdf. depends ordena dependencias entre módulos Odoo; external_dependencies declara comprobaciones externas. Copiar la carpeta del addon no instala ninguna de ellas.",
      "PIL es el nombre importable; su distribución habitual es Pillow. No supongas que el nombre de import coincide con el paquete que debes instalar. Revisa también addons_path y versiones compatibles. Estos fragmentos ilustran declaraciones del manifiesto, no una configuración completa del sistema."
    ],
    "snippet": "# Fragmento de __manifest__.py del addon ficticio:\n'depends': ['base', 'sale'],\n'external_dependencies': {\n    'python': ['PIL'],\n    'bin': ['wkhtmltopdf'],\n}\n\n# Con el mismo intérprete/entorno que ejecuta Odoo:\npython3 --version\npython3 -m pip check\npython3 -c 'import PIL; print(PIL.__version__)'\ncommand -v wkhtmltopdf",
    "after": "pip check valida requisitos declarados entre distribuciones instaladas; no certifica todos los imports, ejecutables ni addons del sistema. Encontrar wkhtmltopdf en PATH tampoco demuestra que genere un PDF correcto. Prueba el reporte en una copia aislada y comprueba su contenido."
  },
  {
    "id": "docker",
    "label": "6) Docker",
    "title": "La imagen controla una parte del entorno",
    "subtitle": "Profundiza el día 91: reutilizar una imagen ayuda, pero los servicios siguen fuera del proceso.",
    "chip": "Reproducibilidad",
    "paragraphs": [
      "Una imagen puede contener la aplicación, el runtime y librerías del sistema. No garantiza DNS, acceso a PostgreSQL, configuración, secretos ni volúmenes del destino. Como en el día 178, connection refused exige revisar el endpoint y la conectividad; por sí solo no demuestra una incompatibilidad de versiones.",
      "Pinning reduce incertidumbre. postgres:17 acota la versión mayor frente a latest, pero la etiqueta todavía puede moverse. Un digest identifica una imagen concreta: registra el digest real del artefacto aprobado y planifica actualizaciones verificadas para incorporar correcciones.",
      "Conserva también lock files, plataforma y configuración no sensible. En NuGet, un packages.lock.json generado y versionado permite usar dotnet restore --locked-mode para detectar cambios del grafo. Una instalación cacheada en la laptop no demuestra una reconstrucción reproducible desde cero."
    ],
    "snippet": "mismo commit + dependencias resueltas + imagen identificada\n             + plataforma y configuración controladas\n                          ↓\n               reconstrucción verificable",
    "after": "La configuración y los secretos reales se aportan fuera del repositorio. Fijar versiones facilita reproducir; no asegura por sí solo el mismo comportamiento de datos y servicios externos."
  },
  {
    "id": "qa",
    "label": "7) Mirada de QA",
    "title": "Aprueba la función que usa la dependencia",
    "subtitle": "Proceso activo ≠ aplicación operativa.",
    "chip": "Comprobación",
    "paragraphs": [
      "Ejemplo de aceptación: en un laboratorio con dependencias disponibles, crear un pedido devuelve el ID esperado y una consulta posterior confirma importe y persistencia. Arrancar el servidor o recibir HTTP 200 en otra ruta no prueba ese resultado.",
      "Provoca una indisponibilidad de PostgreSQL solo en ese laboratorio. Según el contrato definido para la API de ejemplo, afirma HTTP 503, ausencia de un pedido confirmado y un error observable sin credenciales ni cadenas de conexión. Recupera el servicio y verifica que el siguiente pedido se guarda una sola vez.",
      "Registra versiones de runtime, paquetes, sistema, arquitectura y servicios junto con el resultado. Si la hipótesis era una dependencia nativa del reporte, afirma que el documento generado contiene el pedido de prueba. Cada fallo necesita una comprobación de la función afectada; el diagnóstico detallado por capas se ampliará en el día 190."
    ]
  },
  {
    "id": "challenge",
    "label": "8) Mini reto",
    "title": ".NET 10 local; .NET 8 en el servidor",
    "subtitle": "La laptop usa PostgreSQL 17 y el servidor PostgreSQL 15. ¿Qué puedes concluir?",
    "chip": "Práctica",
    "paragraphs": [
      "La API de ejemplo se publicó como framework-dependent para net10.0. Explica qué evidencia buscarías para el fallo de arranque y qué necesitarías antes de atribuir un fallo de pedidos a PostgreSQL. Después cambia el artefacto a self-contained: ¿desaparecieron todas las dependencias?"
    ]
  },
  {
    "id": "closing",
    "label": "9) Cierre",
    "title": "El entorno forma parte del sistema",
    "subtitle": "Regla mental: mismo código no significa mismo sistema.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Gestionar dependencias significa declararlas, conocer lo resuelto, controlar versiones y verificar las funciones que las necesitan. Una instalación exitosa es evidencia de preparación; una operación con resultado esperado es evidencia de funcionamiento.",
      "El día 184 coordinó código, esquema y datos. Hoy añadimos runtime, librerías, plataforma y servicios a ese contrato. El siguiente tema, todavía planificado, es el día 186: cómo auditar un sistema que no desarrollaste."
    ]
  }
];

export default function Daily185Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/184";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Dependencias · runtime, paquetes y servicios</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/184"><span className={styles.kbd}>←</span> Día 184</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>14/10/2026</div><div className={styles.badge}>Daily #185 • Production Backend</div><h2 className={styles.title}>Dependency Management: tu aplicación depende de mucho más que tu código</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Dependencias</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Investiga qué necesita tu backend para ejecutarse y operar antes de atribuir a un bug lo que cambió entre entornos.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>El runtime 8 no satisface el target net10.0 del artefacto framework-dependent. Comprueba el target publicado y los runtimes del entorno que lo ejecuta. La diferencia PostgreSQL 17/15 merece revisión, pero no prueba un fallo: verifica proveedor, funciones SQL, esquema y datos utilizados. Self-contained elimina la necesidad del runtime .NET preinstalado, pero sigue dependiendo de plataforma, librerías nativas, configuración y servicios.</div></details>}
      </div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://learn.microsoft.com/en-us/dotnet/core/deploying/">Referencia: publicar .NET</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list">Referencia: paquetes NuGet</a><a className={styles.pill} href="https://docs.docker.com/build/building/best-practices/">Referencia: versiones de imágenes</a><a className={styles.pill} href="https://www.odoo.com/documentation/17.0/developer/reference/backend/module.html">Referencia: manifiesto Odoo 17</a><a className={styles.pill} href="https://pip.pypa.io/en/stable/cli/pip_check/">Referencia: pip check</a><Link className={styles.pill} href="/daily/91">Día 91: entorno Docker</Link><Link className={styles.pill} href="/daily/178">Día 178: puertos y exposición</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/184"><span className={styles.kbd}>←</span> Día 184</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
