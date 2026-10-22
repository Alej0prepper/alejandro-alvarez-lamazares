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
    "title": "Misma imagen, distinto resultado",
    "subtitle": "Un 200 en testing y un 500 en producción.",
    "chip": "Caso",
    "paragraphs": [
      "Caso didáctico del material: GET /api/products devuelve 200 en testing y 500 en producción. No es un incidente observado en este repositorio. La primera hipótesis es una diferencia de configuración; el estado HTTP por sí solo no demuestra su causa.",
      "La etiqueta my-api:1.4.0 coincide, pero una etiqueta puede apuntar a imágenes distintas. Confirma el digest del artefacto desplegado antes de dar por idéntico el código. Aun con el mismo artefacto, cambian configuración, dependencias y datos. Todos los nombres y valores de esta clase son ficticios."
    ],
    "snippet": "Síntoma → hipótesis → comprobación → decisión → aprendizaje\n\nArtefacto + configuración + dependencias + datos = comportamiento"
  },
  {
    "id": "sources",
    "label": "2) Fuentes",
    "title": "Lo que necesita el código, lo aporta el entorno",
    "subtitle": "La configuración conecta el artefacto con su destino.",
    "chip": "ASP.NET Core",
    "paragraphs": [
      "Configuración son valores externos que determinan conexiones y comportamiento: URLs, puertos, timeouts o flags. Una fuente es su origen: JSON, variables de entorno, argumentos o un proveedor de secretos. Separarlos del código permite promover el mismo artefacto sin recompilar por cada servidor.",
      "Con WebApplication.CreateBuilder(args), el ejemplo lee dos claves jerárquicas. GetConnectionString busca ConnectionStrings:Database; no selecciona un archivo concreto. El nombre Production identifica el entorno y participa en la selección de configuración; no garantiza que los valores sean correctos."
    ],
    "snippet": "var builder = WebApplication.CreateBuilder(args);\n\nvar connectionString =\n    builder.Configuration.GetConnectionString(\"Database\");\nvar newCheckout =\n    builder.Configuration.GetValue<bool>(\"Features:NewCheckout\");\nvar environment = builder.Environment.EnvironmentName;"
  },
  {
    "id": "overrides",
    "label": "3) Prioridad",
    "title": "El archivo no demuestra el valor efectivo",
    "subtitle": "Override: una fuente posterior sustituye la misma clave.",
    "chip": "Hipótesis",
    "paragraphs": [
      "Con los proveedores predeterminados de CreateBuilder, la prioridad crece en el orden inferior. User Secrets se carga en Development cuando está configurado; un almacén de secretos de producción requiere integración explícita. Si el proyecto añade o reordena proveedores, revisa ese orden real.",
      "La variable ConnectionStrings__Database representa ConnectionStrings:Database: el doble guion bajo sirve para la jerarquía. appsettings.Production.json puede ser correcto y quedar sobrescrito. Comprueba también el entorno efectivo: DOTNET_ENVIRONMENT y ASPNETCORE_ENVIRONMENT pueden entrar en conflicto; con WebApplication moderno prevalece DOTNET_ENVIRONMENT entre ambas."
    ],
    "snippet": "Menor prioridad → mayor prioridad (configuración de aplicación)\n\nappsettings.json\n  → appsettings.{Environment}.json\n  → User Secrets (Development, si corresponde)\n  → variables de entorno\n  → argumentos de línea de comandos",
    "after": "No cambies producción a Development para investigar: podrías exponer páginas de error detalladas. Examina solo claves autorizadas y registra su procedencia sin volcar toda la configuración."
  },
  {
    "id": "docker",
    "label": "4) Docker",
    "title": "localhost puede ser el destino equivocado",
    "subtitle": "Comprueba desde dónde se interpreta la dirección.",
    "chip": "Comprobación",
    "paragraphs": [
      "Hipótesis concreta: la API intenta llamar a otro servicio usando localhost. En una red bridge de Compose, localhost apunta al propio contenedor. Si el backend escucha en otro contenedor llamado backend, ambos deben compartir una red y la API debe usar su nombre de servicio y puerto interno.",
      "Este fragmento muestra únicamente valores no sensibles del servicio api; supone un servicio backend existente que escucha en 8080 en esa red. No es un despliegue completo. La configuración real y los secretos se suministran fuera del repositorio."
    ],
    "snippet": "services:\n  api:\n    image: my-api:1.4.0\n    environment:\n      DOTNET_ENVIRONMENT: Production\n      Backend__BaseUrl: \"http://backend:8080\"\n      Features__NewCheckout: \"false\"",
    "after": "Decisión condicionada: si confirmas que Backend:BaseUrl resuelve a localhost y que el destino es otro contenedor, corrige el valor en la fuente de despliegue y recrea el servicio mediante el procedimiento autorizado. Un simple restart no actualiza sus variables. La URL válida tampoco demuestra que el servicio esté accesible."
  },
  {
    "id": "evidence",
    "label": "5) Evidencia",
    "title": "Investiga una clave, no publiques los secretos",
    "subtitle": "Un valor presente no equivale a un valor utilizado.",
    "chip": "Backend",
    "paragraphs": [
      "En un laboratorio, inspecciona con un depurador builder.Configuration[\"Backend:BaseUrl\"] después de registrar los proveedores y antes de consumir la opción. Compara el valor efectivo con el destino esperado. Revisar solo la variable del contenedor es insuficiente si un argumento posterior la sobrescribe.",
      "Para una clave no sensible, este fragmento identifica el proveedor ganador sin imprimir el valor. Requiere using Microsoft.Extensions.Configuration y se ejecuta tras configurar todos los proveedores. Si la aplicación transforma la URL al construir su cliente HTTP, comprueba también esa opción consumida."
    ],
    "snippet": "var key = \"Backend:BaseUrl\";\nvar configuration = (IConfigurationRoot)builder.Configuration;\nvar source = configuration.Providers\n    .Reverse()\n    .FirstOrDefault(provider => provider.TryGet(key, out _));\n\nConsole.WriteLine($\"{key}: fuente={source?.GetType().Name ?? \"ausente\"}\");",
    "after": "Criterio backend: valida al arrancar presencia y formato de valores obligatorios, con mensajes sin credenciales. Contraseñas, claves JWT y API keys son secretos: no van en Git, Dockerfile ni logs. No vuelques env, cadenas de conexión ni GetDebugView para compartir un diagnóstico. La validez sintáctica no prueba red, permisos ni disponibilidad."
  },
  {
    "id": "qa",
    "label": "6) Mirada de QA",
    "title": "Controla las diferencias que sí importan",
    "subtitle": "Configuration drift: divergencia que nadie controla.",
    "chip": "QA",
    "paragraphs": [
      "Una diferencia puede ser intencional: testing usa payments-mock y producción un proveedor externo. La deriva aparece cuando cambia sin control. Mantén una matriz saneada con digest, entorno, claves relevantes, fuente y diferencia esperada; para secretos registra disponibilidad o referencia de versión autorizada, nunca el contenido.",
      "Una feature flag activa una rama sin recompilar: Features:NewCheckout=true y false requieren expectativas distintas. En laboratorio, usa el mismo digest y datos sintéticos, activa cada variante y afirma el resultado del checkout previsto por el contrato. Que la página cargue no demuestra la rama ejecutada.",
      "Para el caso inicial, tras corregir la URL en el laboratorio, afirma GET /api/products = 200 y el producto sintético esperado en el cuerpo. Después simula una dependencia inaccesible y comprueba el error controlado acordado. Si persiste el fallo con el destino correcto, investiga la dependencia: no atribuyas automáticamente todo 500 a configuración."
    ]
  },
  {
    "id": "challenge",
    "label": "7) Mini reto",
    "title": "¿Qué URL utiliza realmente la API?",
    "subtitle": "El digest coincide; las fuentes compiten.",
    "chip": "Práctica",
    "paragraphs": [
      "En un laboratorio con CreateBuilder predeterminado, appsettings.Production.json define Backend:BaseUrl=http://backend:8080. La variable Backend__BaseUrl contiene http://localhost:8080 y no hay argumentos para esa clave. Backend vive en otro contenedor de la red bridge. ¿Qué valor gana, qué comprobarías y qué resultado exigirías después de corregirlo?"
    ]
  },
  {
    "id": "closing",
    "label": "8) Cierre",
    "title": "Investiga el sistema que se está ejecutando",
    "subtitle": "Regla mental: pregunta por el valor efectivo y su fuente.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "El código define posibilidades; la configuración selecciona destinos y variantes. Confirma artefacto, entorno, clave efectiva y dependencia antes de modificar lógica. Una corrección queda respaldada por un comportamiento comprobado y por sus límites, no por un archivo que parece correcto.",
      "El día 189 sigue planificado: logs como herramienta de investigación backend. Hoy basta distinguir configuración, disponibilidad y comportamiento sin exponer secretos."
    ]
  }
];

export default function Daily188Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/187";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Configuración · artefacto, entorno y evidencia</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/187"><span className={styles.kbd}>←</span> Día 187</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>22/10/2026</div><div className={styles.badge}>Daily #188 • Production Backend</div><h2 className={styles.title}>Configuración vs código: mismo software, distinto entorno</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Configuración</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Descubre por qué el mismo artefacto cambia entre entornos y comprueba qué configuración utiliza realmente tu aplicación.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>Gana la variable: http://localhost:8080. Comprueba el valor efectivo y el proveedor ganador; localhost apunta a la propia API en esta red. Verifica que backend escucha en 8080 y comparte la red. Corrige la variable en la fuente del despliegue del laboratorio y recrea la API. Confirma el mismo digest, el nuevo valor efectivo y un 200 con el producto sintético esperado. Eso valida este recorrido; no prueba todas las integraciones ni el comportamiento de producción.</div></details>}
      </div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0">Referencia: configuración ASP.NET Core</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/environments?view=aspnetcore-10.0">Referencia: entornos</a><a className={styles.pill} href="https://docs.docker.com/compose/how-tos/networking/">Referencia: redes Compose</a><Link className={styles.pill} href="/daily/178">Día 178: puertos e interfaces</Link><Link className={styles.pill} href="/daily/187">Día 187: Feature Discovery</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/187"><span className={styles.kbd}>←</span> Día 187</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
