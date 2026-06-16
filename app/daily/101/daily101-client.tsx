"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "operations", label: "2) Operacion" },
  { id: "degradation", label: "3) Degradacion" },
  { id: "signals", label: "4) Señales" },
  { id: "incident", label: "5) Incidente" },
  { id: "senior-response", label: "6) Respuesta" },
  { id: "playbook", label: "7) Playbook" },
  { id: "runbook", label: "8) Runbook" },
  { id: "failure-flow", label: "9) Falla" },
  { id: "mistake", label: "10) Error" },
  { id: "dependencies", label: "11) Dependencias" },
  { id: "degraded-mode", label: "12) Modo degradado" },
  { id: "postmortem", label: "13) Postmortem" },
  { id: "postmortem-structure", label: "14) Estructura" },
  { id: "mindset", label: "15) Mentalidad" },
  { id: "daily-work", label: "16) Operacion diaria" },
  { id: "project", label: "Practica" },
] as const;

const systemsSnippet = `Docker
Kubernetes
Deployments
Observabilidad
CI/CD
Seguridad`;

const failureSnippet = `cuando fallaran`;

const jobStartsSnippet = `cuando termina el deploy,
comienza la operacion`;

const serviceSnippet = `mantener un sistema disponible, estable y util para el negocio`;

const notCodeSnippet = `escribir codigo`;

const keepRunningSnippet = `mantener el servicio funcionando`;

const degradationSignalsSnippet = `latencia ↑
errores ↑
CPU ↑`;

const degradationSnippet = `degradacion`;

const latencySnippet = `50ms
100ms
300ms
700ms`;

const errorRateSnippet = `0.1%
1%
3%
8%`;

const cpuSnippet = `40%
60%
80%
95%`;

const queueSnippet = `creciendo constantemente`;

const retriesSnippet = `aumentando`;

const incidentSnippet = `checkout caido
API lenta
errores masivos`;

const notEveryErrorSnippet = `No todo error es un incidente.`;

const observingSnippet = `observando`;

const metricsSnippet = `metricas
logs
traces
dashboards`;

const whatHappeningSnippet = `que esta ocurriendo`;

const playbookSnippet = `Base de datos saturada`;

const playbookStepsSnippet = `1 Revisar conexiones
2 Revisar CPU
3 Revisar queries lentas
4 Escalar si es necesario`;

const runbookSnippet = `como reiniciar Redis
como hacer rollback`;

const stabilizeSnippet = `Primero estabilizar.
Luego entender.`;

const wrongFixSnippet = `que ocurre realmente`;

const worseIncidentSnippet = `empeorar incidente`;

const dependencyQuestionSnippet = `que ocurre si Stripe falla?
que ocurre si AWS falla?
que ocurre si Redis desaparece?`;

const resilienceToolsSnippet = `Timeouts
Retries
Circuit Breakers
Degraded Mode`;

const degradedNormalSnippet = `checkout
emails
analytics
recomendaciones`;

const degradedModeSnippet = `checkout`;

const disabledSnippet = `deshabilitado`;

const incidentQuestionSnippet = `que aprendimos?`;

const notBlameSnippet = `a quien culpamos`;

const goalSnippet = `Mejorar el sistema.
No buscar culpables.`;

const juniorSnippet = `como soluciono el problema?`;

const seniorSnippet = `como evitamos que vuelva a ocurrir?`;

const opsTasksSnippet = `Revisar alertas
Revisar dashboards
Revisar capacidad
Revisar errores
Revisar despliegues recientes
Revisar dependencias criticas`;

const notGlamorousSnippet = `mucho menos glamuroso que programar`;

const systemSnippet = `API
Redis
PostgreSQL`;

const finalSnippet = `los sistemas fallan`;

const finalWhenSnippet = `cuándo fallarán`;

const playbookFinalSnippet = `¿Existe rollback?
¿Cuanto tarda?`;

const finalMonitoringSnippet = `¿Como detectarias una degradacion?`;

const finalSecuritySnippet = `¿Donde estan los secretos?`;

const finalScalingSnippet = `¿Que ocurre si duplicas el trafico?`;

const finalOperationSnippet = `¿Quien recibe una alerta a las 3 AM?`;

const finalCultureSnippet = `¿El equipo confia en produccion?`;

const finalReflectionSnippet = `La madurez de una plataforma no se mide por la tecnologia que usa.
Se mide por la confianza con la que el equipo puede cambiarla.`;

const nextBlockSnippet = `103–115 Arquitectura Distribuida Avanzada`;

const nextTopicsSnippet = `Monolito Modular
Microservicios
API Gateway
Service Discovery
Sagas
Outbox Pattern
Event Driven Architecture
Distributed Tracing
OpenTelemetry
Consistencia distribuida
Comunicacion sincronica vs asincronica
Anti-Patterns de microservicios`;

export default function Daily101Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/100";
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
              <div className={styles.brandSub}>1 leccion al dia • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/rest-lite">
              REST Lite
            </Link>
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/100">
              <span className={styles.kbd}>←</span> Dia 100
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#idea">
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>16/06/2026</div>
                <div className={styles.badge}>Daily #101 • Operations</div>
                <h2 className={styles.title}>Operacion diaria y resiliencia en produccion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Operacion</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Incidentes</span>
                  <span className={styles.chip}>Tag: Runbooks</span>
                </div>

                <p className={styles.lead}>
                  La operacion diaria consiste en convivir con sistemas imperfectos y responder bien cuando empiezan a
                  romperse.
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
                    <p className={styles.sub}>Los sistemas fallan. La pregunta es cuando y como lo manejas.</p>
                  </div>
                  <span className={styles.chip}>Operar</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{systemsSnippet}</pre>
                  <pre>{failureSnippet}</pre>
                  <div className={styles.callout}>La operacion diaria consiste en convivir con sistemas imperfectos.</div>
                </div>
              </section>

              <section className={styles.section} id="operations">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Operacion diaria</h3>
                    <p className={styles.sub}>Cuando termina el deploy, comienza la operacion.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{serviceSnippet}</pre>
                  <pre>{notCodeSnippet}</pre>
                  <pre>{keepRunningSnippet}</pre>
                  <pre>{jobStartsSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>monitorizar</li>
                    <li>responder incidentes</li>
                    <li>analizar degradaciones</li>
                    <li>gestionar capacidad</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="degradation">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que pasa durante una degradacion</h3>
                    <p className={styles.sub}>No siempre hay caida total; a veces el sistema solo empeora.</p>
                  </div>
                  <span className={styles.chip}>Degradacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{degradationSignalsSnippet}</pre>
                  <pre>{degradationSnippet}</pre>
                  <div className={styles.quote}>Las degradaciones suelen preceder a las caidas.</div>
                </div>
              </section>

              <section className={styles.section} id="signals">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como detectar degradacion</h3>
                    <p className={styles.sub}>Las señales tipicas aparecen antes del colapso.</p>
                  </div>
                  <span className={styles.chip}>Señales</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Latencia</h4>
                  <pre>{latencySnippet}</pre>
                  <h4>Error rate</h4>
                  <pre>{errorRateSnippet}</pre>
                  <h4>CPU</h4>
                  <pre>{cpuSnippet}</pre>
                  <h4>Colas</h4>
                  <pre>{queueSnippet}</pre>
                  <h4>Retries</h4>
                  <pre>{retriesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="incident">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Incidente</h3>
                    <p className={styles.sub}>Solo importa si impacta al servicio o al negocio.</p>
                  </div>
                  <span className={styles.chip}>Incidente</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{incidentSnippet}</pre>
                  <pre>{notEveryErrorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior-response">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Respuesta de un senior</h3>
                    <p className={styles.sub}>Primero observa, luego actua.</p>
                  </div>
                  <span className={styles.chip}>Respuesta</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{observingSnippet}</pre>
                  <pre>{metricsSnippet}</pre>
                  <pre>{whatHappeningSnippet}</pre>
                  <div className={styles.callout}>Diagnostico antes de accion.</div>
                </div>
              </section>

              <section className={styles.section} id="playbook">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Playbook</h3>
                    <p className={styles.sub}>Documento para responder a un problema especifico.</p>
                  </div>
                  <span className={styles.chip}>Playbook</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{playbookSnippet}</pre>
                  <pre>{playbookStepsSnippet}</pre>
                  <div className={styles.callout}>Reduce improvisacion.</div>
                </div>
              </section>

              <section className={styles.section} id="runbook">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Runbook</h3>
                    <p className={styles.sub}>Mas operativo que un playbook.</p>
                  </div>
                  <span className={styles.chip}>Runbook</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{runbookSnippet}</pre>
                  <div className={styles.quote}>Manual de operaciones.</div>
                </div>
              </section>

              <section className={styles.section} id="failure-flow">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Que hacer cuando algo falla</h3>
                    <p className={styles.sub}>Primero estabilizar, luego entender.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <ol className={styles.bullets}>
                    <li>confirmar incidente</li>
                    <li>medir impacto</li>
                    <li>contener daño</li>
                    <li>investigar causa raiz</li>
                  </ol>
                  <pre>{stabilizeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Error tipico</h3>
                    <p className={styles.sub}>Arreglar sin entender suele empeorar el incidente.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{wrongFixSnippet}</pre>
                  <pre>{worseIncidentSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dependencies">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Dependencias externas</h3>
                    <p className={styles.sub}>Stripe, AWS o Redis pueden fallar.</p>
                  </div>
                  <span className={styles.chip}>Dependencias</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dependencyQuestionSnippet}</pre>
                  <pre>{resilienceToolsSnippet}</pre>
                  <div className={styles.callout}>Resiliencia operativa.</div>
                </div>
              </section>

              <section className={styles.section} id="degraded-mode">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Modo degradado</h3>
                    <p className={styles.sub}>Mejor degradado que caido.</p>
                  </div>
                  <span className={styles.chip}>Degradado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{degradedNormalSnippet}</pre>
                  <pre>{degradedModeSnippet}</pre>
                  <pre>{disabledSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="postmortem">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Postmortem</h3>
                    <p className={styles.sub}>Mejorar el sistema, no buscar culpables.</p>
                  </div>
                  <span className={styles.chip}>Postmortem</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{incidentQuestionSnippet}</pre>
                  <pre>{notBlameSnippet}</pre>
                  <div className={styles.callout}>Aprendizaje institucional.</div>
                </div>
              </section>

              <section className={styles.section} id="postmortem-structure">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Estructura tipica de un postmortem</h3>
                    <p className={styles.sub}>Que paso, impacto, causa raiz y acciones.</p>
                  </div>
                  <span className={styles.chip}>Estructura</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>que ocurrio</li>
                    <li>cuando ocurrio</li>
                    <li>impacto</li>
                    <li>causa raiz</li>
                    <li>que funciono</li>
                    <li>que fallo</li>
                    <li>acciones preventivas</li>
                  </ul>
                  <pre>{goalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa un backend senior</h3>
                    <p className={styles.sub}>Evita que vuelva a ocurrir.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Ahí está la diferencia.</div>
                </div>
              </section>

              <section className={styles.section} id="daily-work">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Operacion diaria real</h3>
                    <p className={styles.sub}>Mucho menos glamuroso que programar, pero critico.</p>
                  </div>
                  <span className={styles.chip}>Dia a dia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{opsTasksSnippet}</pre>
                  <pre>{notGlamorousSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Pensar en la operacion de un sistema real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <pre>{finalMonitoringSnippet}</pre>
                  <pre>{finalSecuritySnippet}</pre>
                  <pre>{finalScalingSnippet}</pre>
                  <pre>{finalOperationSnippet}</pre>
                  <pre>{finalCultureSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>como detectarias degradacion?</li>
                    <li>que haria un playbook?</li>
                    <li>que haria un runbook?</li>
                    <li>que dependencia externa es mas fragil?</li>
                  </ul>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Los sistemas fallan.</li>
                    <li>La operacion no termina cuando termina el deploy.</li>
                    <li>Primero estabilizar, luego entender.</li>
                    <li>Los incidentes son oportunidades de aprendizaje.</li>
                    <li>Modo degradado es mejor que caido.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>como detectarias una degradacion antes de que escale?</li>
                    <li>tienes playbooks y runbooks escritos?</li>
                    <li>que harías si Stripe falla?</li>
                    <li>que partes del sistema pueden seguir funcionando en modo degradado?</li>
                    <li>como se hace postmortem en tu equipo?</li>
                  </ul>
                  <h4>Observabilidad</h4>
                  <pre>{finalMonitoringSnippet}</pre>
                  <h4>Seguridad</h4>
                  <pre>{finalSecuritySnippet}</pre>
                  <h4>Escalado</h4>
                  <pre>{finalScalingSnippet}</pre>
                  <h4>Operacion</h4>
                  <pre>{finalOperationSnippet}</pre>
                  <h4>Cultura</h4>
                  <pre>{finalCultureSnippet}</pre>
                  <div className={styles.quote}>
                    Backend junior arregla el problema. Backend senior diseña sistemas y procesos para operar,
                    recuperarse y aprender de fallos.
                  </div>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/100">
                      ← Dia 100
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

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>Cierre</h3>
                    <p className={styles.sub}>Operacion y resiliencia en produccion.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalSnippet}</pre>
                  <pre>{finalWhenSnippet}</pre>
                  <pre>{playbookFinalSnippet}</pre>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente bloque natural:</p>
                  <pre>{nextBlockSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 101 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Operacion:</strong> monitorizar, responder incidentes y gestionar capacidad.
                </div>
                <div className={styles.li}>
                  <strong>Resiliencia:</strong> tolerar fallos externos, degradar y recuperarse.
                </div>
                <div className={styles.li}>
                  <strong>Playbooks:</strong> reducen improvisacion.
                </div>
                <div className={styles.li}>
                  <strong>Postmortems:</strong> convierten incidentes en aprendizaje.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
