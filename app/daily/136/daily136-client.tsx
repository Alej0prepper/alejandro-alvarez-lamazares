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
  content: string;
};

const sections: LessonSection[] = [
  { id: "idea", label: "1) Idea clave", title: "La idea clave", subtitle: "Antes de extraer microservicios, hay que preparar una estructura donde puedan crecer sin caos.", chip: "Idea", content: "Ya sabemos:\npor que vamos a migrar a microservicios\npor que OrderFlow necesita evolucionar\ndonde estan los Bounded Contexts\n\nAhora si podemos comenzar.\n\nPero aun no moveremos logica de negocio.\nPrimero construiremos la casa.\nDespues moveremos los muebles.\n\nAntes de separar un sistema debemos preparar una estructura que permita crecer de forma ordenada." },
  { id: "objective", label: "2) Objetivo", title: "Nuestro objetivo hoy", subtitle: "La solucion quedara preparada para evolucionar aunque todavia no tenga funcionalidades completas.", chip: "Objetivo", content: "Al finalizar esta clase tendremos:\n\nproyectos separados\nreferencias organizadas\nconfiguracion inicial\nDocker Compose preparado\ncomunicacion prevista\nestructura escalable\n\nTodavia no habra funcionalidades completas. Pero cada pieza tendra un lugar claro." },
  { id: "no-copy", label: "3) No copiar codigo", title: "Por que no copiar directamente el codigo", subtitle: "Mover clases antes de preparar la estructura genera dependencias, puertos y configuracion que luego hay que rehacer.", chip: "Riesgo", content: "Imagina que comienzas moviendo Orders.\n\nDespues descubres que:\nfalta configuracion\nno existe comunicacion\nlos puertos cambian\nDocker no esta preparado\nlas referencias generan ciclos\n\nEntonces reorganizas todo otra vez. Eso provoca retrabajo.\n\nUn backend senior primero prepara la estructura. Despues mueve la logica." },
  { id: "current", label: "4) Solucion actual", title: "De donde partimos", subtitle: "Actualmente toda la aplicacion vive dentro de un unico proyecto.", chip: "Estado actual", content: "OrderFlow\n|-- Controllers\n|-- Services\n|-- Repositories\n|-- Entities\n|-- Infrastructure\n|-- Database\n|-- Program.cs\n\nEsta estructura funciona para comenzar, pero no ofrece limites claros para extraer servicios de forma gradual." },
  { id: "target", label: "5) Solucion objetivo", title: "La estructura a la que queremos llegar", subtitle: "La migracion sera progresiva y cada contexto tendra sus propios proyectos y responsabilidades.", chip: "Arquitectura", content: "OrderFlow.sln\n|-- Gateway\n|-- Catalog\n|   |-- Catalog.API\n|   |-- Catalog.Application\n|   |-- Catalog.Domain\n|   |-- Catalog.Infrastructure\n|-- Orders\n|   |-- Orders.API\n|   |-- Orders.Application\n|   |-- Orders.Domain\n|   |-- Orders.Infrastructure\n|-- Inventory\n|-- Payments\n|-- Notifications\n|-- BuildingBlocks\n|-- Docker\n\nTodavia no construiremos todo. Pero dejaremos preparada la estructura." },
  { id: "four-projects", label: "6) Cuatro proyectos", title: "Por que cada servicio tiene cuatro proyectos", subtitle: "Usaremos Clean Architecture para separar transporte, casos de uso, reglas e infraestructura.", chip: "Clean Architecture", content: "Catalog\n\nAPI: Controllers, Swagger, Authentication\n\nApplication: Use Cases, Handlers, DTOs, Validators, Interfaces\n\nDomain: Entities, Value Objects, Aggregates, Events, Rules\n\nInfrastructure: EF Core, Repositories, Persistence, External Services, RabbitMQ" },
  { id: "building-blocks", label: "7) BuildingBlocks", title: "Que es BuildingBlocks", subtitle: "El codigo comun debe ser pequeno y verdaderamente transversal para no convertirse en otro monolito.", chip: "Shared Kernel", content: "BuildingBlocks puede contener:\n\nResult<T>\nPagination\nCorrelationId\nOutbox\nLogging\nCommon Exceptions\nBase Entity\nDomain Events\nShared Kernel\n\nNo pertenece exclusivamente a Catalog ni a Orders. Por eso vive en una libreria compartida." },
  { id: "building-blocks-rules", label: "8) Limites comunes", title: "Que no debe ir en BuildingBlocks", subtitle: "El codigo propio de un contexto debe permanecer dentro de ese contexto.", chip: "Limites", content: "No debemos colocar:\n\nProduct\nOrder\nPayment\nInventory\nRepositories\nBusiness Rules\n\nPorque pertenecen a un contexto concreto. BuildingBlocks solo debe contener infraestructura verdaderamente compartida." },
  { id: "first-version", label: "9) Primera version", title: "La primera version de la solucion", subtitle: "Los proyectos pueden estar practicamente vacios; lo importante es establecer sus fronteras.", chip: "Estructura", content: "OrderFlow.sln\n|-- Gateway\n|-- Catalog\n|-- Orders\n|-- Inventory\n|-- Payments\n|-- Notifications\n|-- BuildingBlocks\n\nQue esten vacios al principio es completamente normal. La estructura precede a la logica." },
  { id: "gateway", label: "10) Gateway", title: "Que hara el Gateway", subtitle: "Al principio solo recibira peticiones y las dirigira al servicio correspondiente.", chip: "Gateway", content: "Responsabilidad inicial:\n\nRecibir peticiones\n        |\n        v\nRedirigirlas al servicio correcto\n\nMas adelante añadiremos:\nautenticacion\nautorizacion\nrate limiting\nlogging\ncorrelation id\n\nHoy solo prepararemos su existencia." },
  { id: "compose", label: "11) Docker Compose", title: "Preparando Docker Compose", subtitle: "El sistema tendra varios procesos, asi que la infraestructura local debe reflejar esa realidad desde el comienzo.", chip: "Docker", content: "Gateway\nCatalog API\nOrders API\nInventory API\nPayments API\nNotifications Worker\nRabbitMQ\nPostgreSQL\n\nAunque algunos servicios todavia no hagan nada, la infraestructura debe existir antes que la logica." },
  { id: "ports", label: "12) Puertos", title: "Asignando puertos", subtitle: "Cada API tendra un puerto propio para facilitar desarrollo, Docker, pruebas y observabilidad.", chip: "Red", content: "Gateway       5000\nCatalog       5001\nOrders        5002\nInventory     5003\nPayments      5004\n\nPuertos explicitos facilitan:\ndesarrollo local\nDocker\npruebas\nobservabilidad" },
  { id: "databases", label: "13) Bases de datos", title: "Propiedad de los datos", subtitle: "Cada servicio tendra preparada su propia base para reforzar los limites de propiedad.", chip: "Datos", content: "No tendremos una unica base compartida.\n\nCatalogDb\nOrdersDb\nInventoryDb\nPaymentsDb\n\nInicialmente algunas pueden estar vacias. Lo importante es que cada servicio sea dueno de sus datos y no modifique tablas ajenas." },
  { id: "communication", label: "14) Comunicacion", title: "Comunicacion inicial", subtitle: "Comenzaremos con REST donde se necesite una respuesta y dejaremos los eventos para la siguiente etapa.", chip: "REST", content: "Todavia no configuraremos RabbitMQ.\n\nGateway\n  |\n  v\nCatalog\n  |\n  v\nOrders\n\nLa migracion sera gradual. Mas adelante sustituiremos algunas llamadas por eventos." },
  { id: "health", label: "15) Health Checks", title: "Health Checks desde el principio", subtitle: "Todos los servicios deben poder informar rapidamente si estan disponibles.", chip: "Operabilidad", content: "GET /health\n\nRespuesta:\n\n{\n    \"status\": \"Healthy\"\n}\n\nEsto permite que Docker, Kubernetes, Gateway y Prometheus conozcan el estado del servicio." },
  { id: "swagger", label: "16) Swagger", title: "Swagger desde el primer dia", subtitle: "Cada API debe poder probarse y documentarse aunque solo exponga uno o dos endpoints.", chip: "API", content: "/swagger\n\nCada API lo expondra desde el inicio.\n\nEsto facilita:\npruebas\ndocumentacion\nintegracion\n\nUna API pequena tambien necesita un contrato visible." },
  { id: "configuration", label: "17) Configuracion", title: "Configuracion independiente", subtitle: "Cada servicio sera configurable sin compartir cadenas de conexion innecesariamente.", chip: "Config", content: "Cada servicio tendra su propio:\n\nappsettings.json\n\ny posteriormente:\n\n.env\n\nNo compartiremos configuracion innecesariamente. Cada servicio debe poder cambiar su entorno de forma independiente." },
  { id: "logging", label: "18) Logging", title: "Logging estructurado", subtitle: "Los logs deben conservar contexto suficiente para diagnosticar fallos cuando el sistema crezca.", chip: "Observabilidad", content: "Aunque todavia no tengamos OpenTelemetry, prepararemos logging estructurado.\n\nInformation\nWarning\nError\nCritical\n\nCon informacion como:\nTimestamp\nService\nTraceId\nCorrelationId\nRequestId" },
  { id: "no-code", label: "19) Sin migrar logica", title: "Que codigo moveremos hoy", subtitle: "Ninguno. Es una decision intencionada para que la primera migracion tenga un destino claro.", chip: "Pragmatismo", content: "Hoy solo construiremos:\n\nla solucion\nlos proyectos\nlas referencias\nla infraestructura base\n\nLa migracion comenzara mañana. Primero se prepara la casa. Despues se mueven las piezas." },
  { id: "checklist", label: "20) Checklist", title: "Checklist del dia", subtitle: "La estructura esta lista cuando cada pieza necesaria para comenzar una migracion tiene un lugar definido.", chip: "Checklist", content: "Solucion creada\nProyectos separados\nBuildingBlocks creado\nGateway creado\nDocker Compose preparado\nSwagger funcionando\nHealth Checks funcionando\nConfiguracion independiente\nBases de datos definidas\nEstructura lista para migrar" },
  { id: "senior", label: "21) Cierre", title: "Como piensa un backend senior", subtitle: "La migracion empieza definiendo estructura, responsabilidades y destinos claros para cada pieza.", chip: "Cierre", content: "Backend junior:\nVoy copiando clases y luego veo donde encajan.\n\nBackend senior:\nPrimero diseño la estructura. Despues empiezo a mover piezas.\n\nCada migracion debe tener un lugar claro donde terminar.\n\nMañana comenzaremos la primera migracion real: extraeremos Catalog como microservicio independiente, manteniendo el sistema funcional." },
];

export default function Daily136Client() {
  const [activeSection, setActiveSection] = useState("idea");

  useEffect(() => {
    const nodes = sections.map((section) => document.getElementById(section.id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/135";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Arquitectura base para migrar OrderFlow</div></div></div>
          <nav className={styles.nav} aria-label="Navegacion"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
          <div className={styles.actions}><Link className={styles.btn} href="/daily/135"><span className={styles.kbd}>←</span> Dia 135</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
        </div>
      </header>
      <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
        <div className={styles.dailyHero}><div className={styles.createdAt}>20/07/2026</div><div className={styles.badge}>Daily #136 • Arquitectura de OrderFlow</div><h2 className={styles.title}>Preparando la solucion: crear la arquitectura base antes de migrar</h2><p className={styles.lead}>Antes de mover logica de negocio a microservicios, construiremos la estructura que permitira que OrderFlow evolucione de forma ordenada.</p></div>
        <nav className={styles.toc} aria-label="Indice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
        {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
        <div className={styles.footerNav}><Link className={styles.btn} href="/daily/135"><span className={styles.kbd}>←</span> Dia 135</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
      </div></article></div></main>
    </div>
  );
}
