"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "goal", label: "3) Objetivo" },
  { id: "files", label: "4) Archivos" },
  { id: "deployment", label: "5) Deployment" },
  { id: "service", label: "6) Service" },
  { id: "configmap", label: "7) ConfigMap" },
  { id: "secret", label: "8) Secret" },
  { id: "resources", label: "9) Recursos" },
  { id: "health", label: "10) Health Checks" },
  { id: "env", label: "11) Env vars" },
  { id: "flow", label: "12) Flujo" },
  { id: "checklist", label: "13) Checklist" },
  { id: "mistakes", label: "14) Errores" },
  { id: "closing", label: "15) Cierre" },
  { id: "next-block", label: "16) Siguiente bloque" },
] as const;

const dockerSnippet = `OrderFlow API

Build
↓
Docker Image
↓
Kubernetes Cluster`;

const problemSnippet = `Docker ejecuta un contenedor.

Kubernetes sabe:
- reemplazar contenedores caidos
- escalar automaticamente
- balancear trafico
- actualizar sin detener el servicio`;

const objectiveSnippet = `OrderFlow API
↓
Docker Image
↓
Kubernetes Cluster`;

const filesSnippet = `Deployment
Service
ConfigMap
Secret`;

const deploymentSnippet = `3 Pods
Imagen OrderFlow:v1
Estado deseado siempre activo`;

const serviceSnippet = `Clientes
↓
Service
↓
Pods`;

const configMapSnippet = `ASPNETCORE_ENVIRONMENT=Production
ApplicationName=OrderFlow
FeatureFlags=...`;

const secretSnippet = `JWT Secret
Password DB
API Keys`;

const resourcesSnippet = `Request
250m CPU
256MB RAM

Limit
1 CPU
1GB RAM`;

const healthSnippet = `Startup
Readiness
Liveness

/health`;

const envSnippet = `La aplicacion casi no cambia.
Cambian los valores que lee del entorno.

ConfigMap + Secret`;

const flowSnippet = `git push
↓
CI/CD
↓
Tests
↓
Docker Build
↓
Registry
↓
Deployment
↓
Kubernetes descarga imagen`;

const checklistSnippet = `[] Deployment
[] Service
[] ConfigMap
[] Secret
[] Health checks
[] Recursos
[] Variables externas
[] Imagen reproducible`;

const mistakesSnippet = `- hardcodear secretos
- usar localhost entre contenedores
- no definir probes
- olvidar recursos
- depender de appsettings.json en produccion`;

const closingSnippet = `Docker empaqueta.
Kubernetes opera.

La aplicacion debe sobrevivir, escalar y recuperarse sola.`;

const nextBlockSnippet = `Arquitectura de Sistemas Distribuidos

113 Monolito vs Monolito Modular vs Microservicios
114 Bounded Context
115 Comunicacion sincrona
116 Comunicacion asincrona
117 API Gateway
118 Service Discovery
119 Configuracion distribuida
120 Observabilidad distribuida
121 Transacciones distribuidas
122 Saga Pattern
123 Outbox Pattern
124 Inbox Pattern
125 Idempotencia
126 Consistencia eventual
127 Versionado entre servicios
128 Fallos en cascada
129 Arquitectura completa de un eCommerce
130 Simulacion completa de una plataforma distribuida`;

const seasonsSnippet = `Temporada 1 (4-50)
Fundamentos del Backend Profesional

Temporada 2 (51-70)
Seguridad

Temporada 3 (71-90)
Performance y Produccion

Temporada 4 (91-112)
Contenedores y despliegue de una API real

Temporada 5 (113-130)
Sistemas Distribuidos y Microservicios`;

const laterRoadmapSnippet = `131-150 Persistencia avanzada
151-170 Cloud
171-190 Arquitectura empresarial
191-210 Proyecto gigante`;

const summaryLines = [
  "Deployment define el estado deseado.",
  "Service da una direccion estable.",
  "ConfigMap separa configuracion publica.",
  "Secret guarda credenciales sensibles.",
  "Health checks permiten operar con seguridad.",
];

export default function Daily112Client() {
  const [activeSection, setActiveSection] = useState<string>("idea");

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/111";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>Kubernetes • despliegue • resiliencia</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/111">
              <span className={styles.kbd}>←</span> Dia 111
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily">
              Ver archivo
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>26/06/2026</div>
                <div className={styles.badge}>Daily #112 • Kubernetes</div>
                <h2 className={styles.title}>
                  Kubernetes: desplegar una aplicacion para que sobreviva, escale y se recupere sola
                </h2>
                <p className={styles.lead}>
                  Ya tenemos la imagen Docker. Ahora falta el sistema que la ejecute en produccion, la recupere si
                  falla, la escale si crece la carga y la conecte con configuracion real.
                </p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Docker ejecuta. Kubernetes orquesta.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Docker sabe correr un contenedor.</p>
                  <p>Kubernetes sabe mantener el sistema sano cuando hay fallos, carga y cambios de version.</p>
                  <pre>{dockerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema real</h3>
                    <p className={styles.sub}>Un contenedor aislado no resuelve operacion en produccion.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{problemSnippet}</pre>
                  <div className={styles.callout}>Kubernetes actua cuando el contenedor ya no es suficiente.</div>
                </div>
              </section>

              <section className={styles.section} id="goal">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Nuestro objetivo</h3>
                    <p className={styles.sub}>Pasar de imagen local a despliegue declarativo en cluster.</p>
                  </div>
                  <span className={styles.chip}>Objetivo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{objectiveSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>La API deja de depender de una maquina concreta.</li>
                    <li>El estado deseado se declara, no se improvisa.</li>
                    <li>El cluster corrige desvio de forma automatica.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="files">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Los cuatro archivos minimos</h3>
                    <p className={styles.sub}>Con esto ya puedes describir un despliegue basico.</p>
                  </div>
                  <span className={styles.chip}>Base</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{filesSnippet}</pre>
                  <div className={styles.callout}>Deployment, Service, ConfigMap y Secret cubren el esqueleto del flujo.</div>
                </div>
              </section>

              <section className={styles.section} id="deployment">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Deployment</h3>
                    <p className={styles.sub}>Define cuantas copias quieres, con que imagen y como actualizar.</p>
                  </div>
                  <span className={styles.chip}>Pods</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploymentSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Si un Pod muere, el Deployment lo vuelve a crear.</li>
                    <li>El estado deseado manda sobre el estado actual.</li>
                    <li>La actualizacion forma parte del contrato.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="service">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Service</h3>
                    <p className={styles.sub}>Da una direccion estable delante de Pods que cambian todo el tiempo.</p>
                  </div>
                  <span className={styles.chip}>Red</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{serviceSnippet}</pre>
                  <div className={styles.quote}>Nunca deberias hablar directamente con un Pod suelto.</div>
                </div>
              </section>

              <section className={styles.section} id="configmap">
                <div className={styles.shd}>
                  <div>
                    <h3>7. ConfigMap</h3>
                    <p className={styles.sub}>Para configuracion no sensible que puede variar por entorno.</p>
                  </div>
                  <span className={styles.chip}>Config</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{configMapSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>ASPNETCORE_ENVIRONMENT</li>
                    <li>ApplicationName</li>
                    <li>Feature flags</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="secret">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Secret</h3>
                    <p className={styles.sub}>Para datos sensibles que no deben vivir en el repo.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{secretSnippet}</pre>
                  <div className={styles.callout}>Nunca lleves secretos reales dentro de appsettings.json en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="resources">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Recursos</h3>
                    <p className={styles.sub}>CPU y memoria tambien se declaran para que el cluster decida bien.</p>
                  </div>
                  <span className={styles.chip}>Limits</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resourcesSnippet}</pre>
                  <p>Request es lo minimo garantizado. Limit es el maximo permitido.</p>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Health checks</h3>
                    <p className={styles.sub}>Kubernetes necesita saber si la app vive, esta lista o sigue arrancando.</p>
                  </div>
                  <span className={styles.chip}>Probes</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{healthSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Startup: evita matar una app que aun esta cargando.</li>
                    <li>Readiness: decide si ya puede recibir trafico.</li>
                    <li>Liveness: decide si debe reiniciarse.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="env">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Variables de entorno</h3>
                    <p className={styles.sub}>La app cambia poco. Cambia el entorno desde donde lee su configuracion.</p>
                  </div>
                  <span className={styles.chip}>Env</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{envSnippet}</pre>
                  <div className={styles.quote}>El codigo casi no cambia. Cambian los valores externos.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Flujo completo</h3>
                    <p className={styles.sub}>La pieza final conecta desarrollo, automatizacion y cluster.</p>
                  </div>
                  <span className={styles.chip}>Pipeline</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                  <div className={styles.callout}>Ese recorrido es el que convierte el codigo en produccion real.</div>
                </div>
              </section>

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Checklist final</h3>
                    <p className={styles.sub}>Antes de decir que ya esta listo, revisa lo que realmente importa.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checklistSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>La API arranca desde cero.</li>
                    <li>PostgreSQL conserva datos.</li>
                    <li>La API espera correctamente a la DB.</li>
                    <li>No hay secretos hardcodeados.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Errores comunes</h3>
                    <p className={styles.sub}>Muchos despliegues fallan por detalles simples, no por Kubernetes en si.</p>
                  </div>
                  <span className={styles.chip}>Errores</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakesSnippet}</pre>
                  <div className={styles.callout}>Si algo funciona solo en local, aun no esta listo para cluster.</div>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Cierre</h3>
                    <p className={styles.sub}>Kubernetes no reemplaza la arquitectura. La hace operable.</p>
                  </div>
                  <span className={styles.chip}>Final</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <ul className={styles.bullets}>
                    {summaryLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/111">
                      <span className={styles.kbd}>←</span> Dia 111
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily">
                      Ver calendario
                    </Link>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="next-block">
                <div className={styles.shd}>
                  <div>
                    <h3>16. El siguiente gran bloque</h3>
                    <p className={styles.sub}>Dejar conceptos aislados y empezar a estudiar sistemas que usan las grandes empresas.</p>
                  </div>
                  <span className={styles.chip}>Roadmap</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    A partir del dia 113 la transicion natural es hacia arquitectura de sistemas distribuidos. Todavia
                    no hace falta saltar a Event Sourcing o Kafka como tema central.
                  </p>
                  <pre>{nextBlockSnippet}</pre>
                  <div className={styles.callout}>
                    Este bloque encaja muy bien con OrderFlow y con eStore CSA, porque ya convive con gateway,
                    multiples APIs, RabbitMQ, Redis, PostgreSQL, MongoDB y Docker Compose.
                  </div>
                  <h4>Temporadas</h4>
                  <pre>{seasonsSnippet}</pre>
                  <pre>{laterRoadmapSnippet}</pre>
                  <div className={styles.quote}>
                    A esta altura ya no estudias clases sueltas. Empiezas a ordenar el contenido por temporadas.
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 112 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Deployment:</strong> define el estado deseado y recupera Pods.
                </div>
                <div className={styles.li}>
                  <strong>Service:</strong> da una direccion estable para la aplicacion.
                </div>
                <div className={styles.li}>
                  <strong>ConfigMap:</strong> configuracion no sensible y externa al codigo.
                </div>
                <div className={styles.li}>
                  <strong>Secret:</strong> credenciales y claves fuera del repo.
                </div>
                <div className={styles.li}>
                  <strong>Health checks:</strong> permiten operar, reiniciar y enrutar con criterio.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
