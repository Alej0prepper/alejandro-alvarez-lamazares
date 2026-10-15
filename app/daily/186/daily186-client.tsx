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
    "title": "Antes del arreglo, el mapa",
    "subtitle": "Te piden corregir un endpoint de un backend desconocido.",
    "chip": "Caso",
    "paragraphs": [
      "Caso didáctico del material: recibes una API ASP.NET Core con controllers, servicios, PostgreSQL, Redis e integraciones. POST /api/orders falla a veces. No hay evidencia de un incidente real ni conocemos aún la causa; empezar cambiando el controller confundiría una sospecha con un diagnóstico.",
      "Hipótesis inicial: el fallo podría estar en la lógica, los datos o una dependencia externa. Una auditoría de software reconstruye estructura, comportamiento, configuración y riesgos para decidir con evidencia. Acota la tarea al flujo de pedidos, su versión y el entorno observado; no necesitas leer todo el repositorio."
    ],
    "snippet": "Síntoma → hipótesis → comprobación → decisión → aprendizaje\n\nObservar → entender → verificar → proponer el cambio",
    "after": "Acuerda alcance y permisos. Acceso de observación no autoriza reiniciar servicios, ejecutar migraciones ni enviar pedidos reales. Registra lo desconocido como pendiente de evidencia, sin rellenarlo con suposiciones."
  },
  {
    "id": "startup",
    "label": "2) Arranque",
    "title": "Encuentra dónde se compone la aplicación",
    "subtitle": "Program.cs es una entrada; sigue también los métodos de registro.",
    "chip": "ASP.NET Core",
    "paragraphs": [
      "Lee README, .csproj, Dockerfile y el arranque. El día 185 ayuda a inventariar runtime y paquetes. En Program.cs busca registros de servicios, configuración del DbContext, autenticación y middleware. Un registro declara una dependencia; no demuestra que se use en cada petición ni que funcione.",
      "La inyección de dependencias proporciona a una clase sus colaboradores desde fuera. Si OrdersController recibe IOrderService, localiza su implementación registrada y después su constructor. Un método como AddApplication puede esconder registros: síguelo antes de concluir que falta un servicio."
    ],
    "snippet": "// Fragmentos ilustrativos de registros en Program.cs:\nbuilder.Services.AddControllers();\nbuilder.Services.AddScoped<IOrderService, OrderService>();\n\n// Constructor que revela el siguiente paso del recorrido:\npublic OrdersController(IOrderService orderService)\n{\n    _orderService = orderService;\n}",
    "after": "Este fragmento no es una aplicación completa. Revisa además el pipeline real y cómo se asignan las rutas; el registro de controllers por sí solo no publica un endpoint."
  },
  {
    "id": "flow",
    "label": "3) Recorrido",
    "title": "Sigue una petición completa",
    "subtitle": "El execution path es el camino que ejecuta una operación.",
    "chip": "Mapa",
    "paragraphs": [
      "Localiza POST /api/orders y sigue validación, autorización, servicio, acceso a datos y respuesta. Anota también las salidas laterales: caché, proveedor de pagos o publicación de mensajes. Distingue llamadas incondicionales de ramas que dependen del estado del pedido.",
      "La frontera del sistema separa tu aplicación de aquello con lo que se comunica. Para cada salida registra propósito, propietario, efecto y modo de fallo. Redis puede ser opcional o imprescindible según su uso; encontrar una librería en el proyecto no resuelve esa pregunta."
    ],
    "snippet": "POST /api/orders\n  → autorización + validación\n  → OrdersController → IOrderService → OrderService\n                                ├─ AppDbContext → PostgreSQL\n                                ├─ Redis (¿qué rama lo usa?)\n                                └─ PaymentClient → proveedor externo",
    "after": "Es un mapa provisional del ejemplo. Marca cada flecha como encontrada en código, observada en ejecución o todavía por confirmar. No elimines una publicación de mensajes sin identificar su consumidor y su regla de negocio."
  },
  {
    "id": "data",
    "label": "4) Datos",
    "title": "Relaciona el flujo con lo que persiste",
    "subtitle": "Las entidades describen intención; el esquema efectivo necesita evidencia.",
    "chip": "PostgreSQL",
    "paragraphs": [
      "Lee DbContext, entidades y migraciones relacionadas con pedidos. Busca claves, relaciones, estados y transacciones: ¿se guarda el pedido antes o después del pago?, ¿qué queda si el proveedor responde tarde? No deduzcas consistencia solo por los nombres de los métodos.",
      "Una migración AddPaymentReference indica una evolución prevista, no acredita que se aplicara en el entorno observado. Contrasta historial y esquema con consultas acotadas de solo lectura autorizadas o con una copia aislada. El día 184 desarrolla la diferencia entre código, esquema y datos. Evita extraer registros de clientes para documentar el mapa."
    ]
  },
  {
    "id": "config",
    "label": "5) Configuración",
    "title": "Identifica la fuente, sin copiar el secreto",
    "subtitle": "El archivo versionado no describe necesariamente el proceso en ejecución.",
    "chip": "Entorno",
    "paragraphs": [
      "Una fuente de configuración es el origen de un valor. En la configuración predeterminada de ASP.NET Core, appsettings.json puede ser sobrescrito por el archivo del entorno, variables de entorno y argumentos de línea de comandos. Hay otros proveedores y el proyecto puede cambiar su orden: revisa el arranque real.",
      "Anota nombres de claves, proveedor efectivo y si apuntan al laboratorio o a otro entorno. No vuelques variables, cadenas de conexión ni docker inspect completos en un informe. La configuración y los secretos reales se aportan fuera del repositorio; basta documentar su función y quién los administra."
    ],
    "snippet": "Clave                    Evidencia que necesitas\nConnectionStrings:Main   proveedor efectivo + destino aislado verificado\nPayments:BaseUrl         proveedor sandbox verificado\nFeatureFlags:Payments    rama que habilita y valor no sensible",
    "after": "No cambies flags para facilitar la investigación. Hoy identificamos las fuentes; la comparación detallada entre entornos corresponde al día 188."
  },
  {
    "id": "verify",
    "label": "6) Comprobación",
    "title": "Contrasta el mapa en un laboratorio",
    "subtitle": "Arrancar también puede disparar efectos secundarios.",
    "chip": "Evidencia",
    "paragraphs": [
      "Antes de ejecutar una copia, comprueba destinos, workers, migraciones automáticas y tareas de arranque. Usa datos sintéticos, PostgreSQL aislado y un proveedor de pago simulado. Compilar y arrancar son hitos distintos; ninguno demuestra por sí solo que crear pedidos funciona.",
      "En el escenario hipotético, el log del pedido sintético muestra un timeout de PaymentClient. Es evidencia de una llamada fallida, pero no demuestra si la causa fue red, proveedor o timeout mal elegido. Correlaciona respuesta, operación y estado persistido antes de decidir qué investigar después."
    ],
    "snippet": "Registro de auditoría del ejemplo (no resultado de producción):\nSíntoma: crear pedido devuelve un error\nHipótesis: falla la escritura en PostgreSQL\nComprobación: pago simulado demora; revisar respuesta y pedido persistido\nEvidencia hipotética: timeout de PaymentClient, pedido pendiente\nDecisión: investigar la frontera de pagos antes de tocar el controller",
    "after": "Si solo tienes observación, entrega el mapa y las incertidumbres. La reproducción con escrituras espera un laboratorio autorizado. No uses un health check exitoso para certificar este flujo de negocio."
  },
  {
    "id": "qa",
    "label": "7) Mirada de QA",
    "title": "Define qué resultado cuenta como correcto",
    "subtitle": "Request, respuesta, persistencia y efectos deben contar la misma historia.",
    "chip": "Criterio",
    "paragraphs": [
      "Propón un contrato verificable antes de cambiar código. Para esta API ficticia, un pedido válido con pago aprobado debe devolver HTTP 201 y un ID; una consulta posterior confirma un único pedido con el importe y estado acordados. Un 200 genérico o un clic exitoso no verifica ese contrato.",
      "Para un pago rechazado, afirma que no queda un pedido marcado como pagado. Para un timeout, inspecciona el estado y acuerda el comportamiento con negocio antes de asumir que repetir la solicitud es seguro. Estas son expectativas propuestas para el laboratorio, no garantías del backend recibido.",
      "Criterio backend: entrega un mapa acotado, evidencia, riesgo y siguiente comprobación. Si desconoces cómo se evita un cobro duplicado, esa incertidumbre limita el cambio. Espera una condición observable con un límite de tiempo; no uses pausas arbitrarias para declarar éxito."
    ]
  },
  {
    "id": "challenge",
    "label": "8) Mini reto",
    "title": "Un controller de pagos de una línea",
    "subtitle": "return await paymentService.ProcessAsync(request);",
    "chip": "Práctica",
    "paragraphs": [
      "Recibes POST /api/payments. Explica qué abrirías después, qué frontera buscarías y qué evidencia pedirías si solo tienes observación. Después define una aserción para un laboratorio con el proveedor simulado. No envíes un pago real para averiguar qué hace."
    ]
  },
  {
    "id": "closing",
    "label": "9) Cierre",
    "title": "Primero el mapa; después el cambio",
    "subtitle": "Regla mental: sigue un flujo real de extremo a extremo.",
    "chip": "Aprendizaje",
    "paragraphs": [
      "Arranque → dependencias → configuración → petición → datos → respuesta. La auditoría termina con una explicación comprobable del flujo que vas a tocar, sus límites y lo que falta confirmar. Leer archivos sirve para formar hipótesis; la evidencia permite decidir.",
      "El siguiente tema, todavía planificado, es el día 187: Feature Discovery desde UI, API, código y base de datos. Hoy basta reconstruir un recorrido y distinguir lo observado de lo inferido."
    ]
  }
];

export default function Daily186Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/185";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Auditoría · alcance, recorrido y evidencia</div></div></div>
      <nav className={styles.nav} aria-label="Navegación"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/185"><span className={styles.kbd}>←</span> Día 185</Link><Link className={`${styles.btn} ${styles.primary}`} href="#symptom">Empezar <span className={styles.kbd}>↓</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>15/10/2026</div><div className={styles.badge}>Daily #186 • Production Backend</div><h2 className={styles.title}>Cómo auditar un backend que no desarrollaste tú</h2><div className={styles.meta} aria-label="Metadatos"><span className={`${styles.chip} ${styles.chipOk}`}>5 min</span><span className={styles.chip}>Nivel: intermedio</span><span className={`${styles.chip} ${styles.chipPro}`}>Auditoría</span><span className={styles.chip}>.NET</span><span className={styles.chip}>QA</span></div><p className={styles.lead}>Reconstruye un flujo y sus dependencias antes de proponer cambios: observa, formula hipótesis y busca evidencia verificable.</p></div>
      <nav className={styles.toc} aria-label="Índice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}>
        {section.paragraphs.map((paragraph) => <p className={styles.sub} key={paragraph}>{paragraph}</p>)}
        {section.snippet && <pre>{section.snippet}</pre>}
        {section.after && <p className={styles.sub}>{section.after}</p>}
        {section.id === "challenge" && <details className={styles.proDetails}><summary>Ver respuesta razonada</summary><div className={styles.proBody}>Sigue IPaymentService hasta la implementación registrada y sus dependencias: DbContext, cliente del proveedor y posibles colas. Comprueba en qué orden persiste y llama al proveedor. Con observación, pide trazas saneadas y esquema autorizado; no ejecutes escrituras. En el laboratorio, simula un rechazo y afirma que ningún pago queda aprobado. Si el contrato no define el estado esperado, resuélvelo antes de aprobar un cambio.</div></details>}
      </div></section>)}
      <div className={styles.relatedLinks}><a className={styles.pill} href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0">Referencia: inyección de dependencias</a><a className={styles.pill} href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0">Referencia: fuentes de configuración</a><Link className={styles.pill} href="/daily/184">Día 184: código y datos</Link><Link className={styles.pill} href="/daily/185">Día 185: dependencias</Link></div>
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/185"><span className={styles.kbd}>←</span> Día 185</Link><Link className={styles.btn} href="/daily">Ver archivo</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
