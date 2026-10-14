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
    id: "symptom", label: "1) Síntoma", title: "La imagen arranca; consultar pedidos falla",
    subtitle: "Un build correcto prueba el artefacto, no su compatibilidad con una base existente.", chip: "Caso",
    paragraphs: [
      "Caso didáctico del material, sin datos de producción: API v1 usa orders con id, customer_id y total. API v2 espera además status. El contenedor arranca, pero al consultar pedidos aparece el error de abajo.",
      "Hipótesis: desplegamos código nuevo sobre el esquema anterior. Comprobación: consulta las columnas en la misma base y schema que usa la API, y contrasta el historial de migraciones. Si falta status, la hipótesis queda respaldada; el arranque por sí solo no la resuelve."
    ],
    snippet: `column "status" does not exist

-- En la conexión de laboratorio de la API:
SELECT column_name, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'orders'
ORDER BY ordinal_position;`,
    after: "Decisión: bloquear la promoción hasta ensayar la migración y el flujo de pedidos en una base aislada. Código, esquema y datos son tres estados que deben poder trabajar juntos."
  },
  {
    id: "model", label: "2) Dos cambios", title: "Crear una columna no clasifica el pasado",
    subtitle: "Una migración transforma la base desde un estado conocido a otro, con una validación de salida.", chip: "Criterio backend",
    paragraphs: [
      "Schema migration cambia estructura: tablas, columnas, índices o restricciones. Data migration transforma registros existentes para cumplir las nuevas reglas. Añadir status permite consultarlo; no decide qué estado corresponde a cada pedido histórico.",
      "Antes de escribir SQL, define la regla con el negocio. NULL, una cadena vacía y Pending no significan lo mismo. Rellenar todo con un valor que satisface NOT NULL puede ocultar pedidos entregados o cancelados. Una base estructuralmente compatible todavía puede contener datos incompatibles."
    ],
    snippet: `API v2 + esquema v1 -> falta la columna
API v2 + esquema v2 + estados inválidos -> falla la regla
API v2 + esquema v2 + datos válidos -> validar el flujo`
  },
  {
    id: "postgres", label: "3) PostgreSQL", title: "Transforma antes de exigir NOT NULL",
    subtitle: "Ejemplo pequeño y ficticio, ejecutable solo en un laboratorio aislado.", chip: "Comprobación",
    paragraphs: [
      "Esta variante incluye delivered_at. Contrato explícito del ejemplo: solo hay pedidos entregados o pendientes; no hay cancelaciones. Una fecha de entrega significa Completed y su ausencia significa Pending. En otro dominio debes cambiar la regla, no copiarla a ciegas.",
      "La tabla temporal representa v1 y contiene un pedido de cada tipo. En una única sesión psql, con ON_ERROR_STOP, ejecuta la preparación y la transformación:"
    ],
    snippet: `-- Sesión: psql -X -v ON_ERROR_STOP=1 -d migration_lab
CREATE TEMP TABLE orders (
  id bigint PRIMARY KEY,
  total numeric(12,2) NOT NULL,
  delivered_at date
);
INSERT INTO orders VALUES
  (1, 100.00, '2026-10-01'), (2, 50.00, NULL);

BEGIN;
ALTER TABLE orders ADD COLUMN status varchar(30);
UPDATE orders
SET status = CASE WHEN delivered_at IS NOT NULL
  THEN 'Completed' ELSE 'Pending' END
WHERE status IS NULL;
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;
ALTER TABLE orders ADD CONSTRAINT orders_status_valid
  CHECK (status IN ('Completed', 'Pending'));
COMMIT;

SELECT id, total, status FROM orders ORDER BY id;
-- Esperado: 1 | 100.00 | Completed
--           2 |  50.00 | Pending
SELECT count(*) AS invalidos FROM orders
WHERE status IS NULL OR status NOT IN ('Completed', 'Pending');
-- Esperado: 0`,
    after: "Estas operaciones admiten una transacción: si fallan antes del COMMIT, no apruebes el intento. No generalices este alcance a cualquier migración. Con millones de filas, ALTER TABLE y UPDATE pueden bloquear y prolongar el trabajo; mide tiempos y define lotes o una ventana de mantenimiento. Este ensayo pequeño no prueba rendimiento de producción."
  },
  {
    id: "dotnet", label: "4) EF Core", title: "Generar, revisar y aplicar son pasos distintos",
    subtitle: "Comandos para un proyecto .NET con EF Core y su proveedor PostgreSQL ya configurados.", chip: ".NET",
    paragraphs: [
      "Añadir Status al modelo y generar una migración crea código de evolución; no actualiza automáticamente todas las bases. Revisa Up y el SQL resultante: un defaultValue vacío en una columna obligatoria no representa una decisión de negocio.",
      "Para este caso, la migración debe añadir la columna nullable, transformar los datos con la regla acordada y después imponer las restricciones. Configura la conexión de laboratorio fuera del repositorio; estos comandos no se ejecutan en este sitio Next.js."
    ],
    snippet: `dotnet ef migrations add AddOrderStatus
# Revisar y ajustar Up; luego generar SQL para inspección:
dotnet ef migrations script --idempotent --output migration.sql
# Solo sobre la base aislada configurada:
dotnet ef database update`,
    after: "El historial de EF evita volver a aplicar migraciones registradas. No certifica la corrección de los datos ni del flujo de negocio. Para producción, usa un artefacto revisado y un ejecutor controlado; no hagas que todas las réplicas intenten migrar al arrancar."
  },
  {
    id: "compatibility", label: "5) Compatibilidad", title: "Expandir, migrar y retirar con condiciones",
    subtitle: "Backward compatibility permite trabajar con estructuras o datos de la versión anterior.", chip: "Decisión",
    paragraphs: [
      "Si v1 y v2 conviven, añadir status NOT NULL sin default puede romper los INSERT de v1, que omiten la columna. Una migración aditiva tampoco es compatible por definición: comprueba lecturas y escrituras de ambas versiones.",
      "Expand and Contract separa la transición. Para renombrar total a order_total: añade la nueva columna, despliega una versión puente que mantenga ambas coherentes y transforma los registros antiguos. Mientras existan escritores v1, debes capturar también sus cambios con una estrategia verificada o detener sus escrituras durante la transición.",
      "Cambia las lecturas solo después de comprobar la sincronización. Elimina total cuando no queden lectores ni escritores antiguos y hayas cerrado la ventana de rollback a v1. Copiar una vez los datos mientras v1 sigue escribiendo deja la nueva columna desactualizada."
    ],
    snippet: `EXPAND -> ambas estructuras disponibles
MIGRATE -> históricos + nuevas escrituras coherentes
CONTRACT -> retirar lo antiguo tras verificar consumidores`
  },
  {
    id: "odoo", label: "6) Odoo", title: "Un addon importable no demuestra una base migrada",
    subtitle: "El mismo criterio conecta con las clases de Odoo 17 y el roadmap de producción.", chip: "Aplicación",
    paragraphs: [
      "Escenario hipotético: un addon cambia un campo o los valores de una selección. Que Python cargue no demuestra que los registros históricos encajen con el modelo nuevo. Distingue compatibilidad del código, actualización del módulo y transformación de datos.",
      "Odoo permite scripts de upgrade versionados con fases pre, post y end. Se ejecutan al actualizar el módulo y según las versiones instalada y destino. Restaurar un dump o reemplazar una imagen no sustituye esa actualización. Para cambiar de versión mayor, además hay que evaluar la migración de la base y los addons personalizados; no basta con copiar módulos.",
      "En una copia aislada, registra versiones, ensaya el camino de actualización y afirma estados, relaciones y operaciones críticas. Hoy aplicamos el criterio; la auditoría de dependencias corresponde al día 185."
    ]
  },
  {
    id: "recovery", label: "7) Recuperación", title: "Volver al contenedor anterior puede no recuperar el sistema",
    subtitle: "Deploy pone código en ejecución; migration transforma estado persistente.", chip: "Límites",
    paragraphs: [
      "Si eliminaste una columna usada por v1, desplegar v1 vuelve a fallar. Un Down puede recrear estructura sin recuperar los valores borrados. Define qué versiones siguen siendo compatibles con el estado resultante y qué pasos son reversibles.",
      "Como en el día 183, detenerse no significa deshacer. Ante un error, registra el paso y el estado transaccional; bloquea la promoción y elige una corrección hacia adelante o una recuperación ensayada. Evita reintentos ciegos sobre un estado parcial.",
      "Un backup solo respalda el plan cuando se validó su restauración, como en el día 181. Recuperar un snapshot antiguo también puede perder escrituras posteriores: define cómo detener o reconciliar ese tráfico. El orden migration/deploy depende de la compatibilidad; no existe una secuencia única segura para todos los cambios."
    ]
  },
  {
    id: "qa", label: "8) Mirada de QA", title: "Prueba la evolución, además de la base vacía",
    subtitle: "La evidencia debe cubrir registros históricos y operaciones nuevas.", chip: "Validación",
    paragraphs: [
      "Prepara una base v1 con datos ficticios representativos: entregados, pendientes y casos límite del dominio. Registra IDs, importes y relaciones esperados antes de migrar. Una base nueva no ejerce la transformación del pasado.",
      "Tras la migración, afirma que se conservan IDs, conteos, importes y relaciones; que el pedido entregado queda Completed y el pendiente queda Pending; y que no quedan estados inválidos. Afirma también que una escritura con NULL es rechazada después de imponer NOT NULL.",
      "Con v2, consulta esos pedidos y crea uno nuevo: verifica estado inicial y persistencia, no solo HTTP 200. Si habrá convivencia, prueba también los INSERT y UPDATE de v1. Provoca un fallo de migración y afirma que la promoción queda bloqueada y que la recuperación deja el estado esperado."
    ]
  },
  {
    id: "challenge", label: "9) Mini reto", title: "50 000 estados NULL y una nueva restricción",
    subtitle: "¿Qué ocurre si aplicas SET NOT NULL antes de transformar esos registros?", chip: "Práctica",
    paragraphs: ["Decide qué falla, de dónde sale el estado de cada pedido y qué consultas probarían la transformación. Después añade otra condición: v1 sigue creando pedidos sin status. ¿Basta con arreglar los históricos?"],
    snippet: `ALTER TABLE orders ALTER COLUMN status SET NOT NULL;`
  },
  {
    id: "closing", label: "10) Cierre", title: "Código + esquema + datos",
    subtitle: "Regla mental: código compatible ≠ datos compatibles.", chip: "Aprendizaje",
    paragraphs: [
      "Una migración válida lleva los datos existentes a reglas nuevas y conserva un camino operativo comprobado. Imagen construida, migración aplicada y sistema saludable son evidencias distintas.",
      "Antes de aprobar, pregunta: ¿esta versión puede leer y escribir correctamente lo que ya existe?, ¿qué pasa con la anterior?, ¿cómo recuperaríamos un fallo? Continúa en el día 185: dependencias de aplicación, Python y sistema."
    ]
  }
];

export default function Daily184Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/183";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Migraciones · código, esquema y datos</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/183"><span className={styles.kbd}>←</span> Día 183</Link><Link className={`${styles.btn} ${styles.primary}`} href="/daily/185">Día 185 <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>12/10/2026</div><div className={styles.badge}>Daily #184 • Production Backend</div><h2 className={styles.title}>Migraciones de software: código compatible ≠ datos compatibles</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>PostgreSQL</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Desplegar una nueva versión no garantiza que pueda trabajar con el esquema y los datos existentes. Diseña y comprueba esa transición.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>SET NOT NULL falla porque los registros actuales violan la restricción. Primero acuerda la regla con el negocio, transforma los datos y afirma estados esperados y cero NULL; después impón la restricción. Si v1 sigue omitiendo status, sus INSERT fallarán: necesita una versión puente, un default con significado válido o una transición sin esos escritores. Comprueba históricos y nuevas escrituras antes de aprobar.</div></details>}
      </div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://www.postgresql.org/docs/17/ddl-alter.html">Referencia: ALTER TABLE</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying">Referencia: migraciones EF Core</a><a className={styles.pill} href="https://www.odoo.com/documentation/17.0/developer/reference/upgrades/upgrade_scripts.html">Referencia: upgrades Odoo 17</a><Link className={styles.pill} href="/daily/87">Día 87: migraciones en producción</Link><Link className={styles.pill} href="/daily/181">Día 181: validar recuperación</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/183"><span className={styles.kbd}>←</span> Día 183</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link><Link className={styles.btn} href="/daily/185">Día 185 <span className={styles.kbd}>→</span></Link></div>
    </div></article></div></main>
  </div>;
}
