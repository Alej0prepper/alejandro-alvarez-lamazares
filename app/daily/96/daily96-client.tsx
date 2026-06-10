"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "questions", label: "3) Preguntas" },
  { id: "liveness", label: "4) Liveness" },
  { id: "readiness", label: "5) Readiness" },
  { id: "startup", label: "6) Startup" },
  { id: "difference", label: "7) Diferencias" },
  { id: "example", label: "8) Ejemplo" },
  { id: "rolling", label: "9) Rolling" },
  { id: "shutdown", label: "10) Shutdown" },
  { id: "sigterm", label: "11) SIGTERM" },
  { id: "connected", label: "12) Conexion" },
  { id: "docker", label: "13) Docker" },
  { id: "mistake", label: "14) Error" },
  { id: "mindset", label: "15) Mentalidad" },
  { id: "flow", label: "16) Flujo" },
  { id: "project", label: "Practica" },
] as const;

const decisionsSnippet = `Enviar trafico?
Reiniciar el Pod?
Eliminar el Pod?
Esperar?`;

const newApiSnippet = `Nueva API`;

const readyQuestionSnippet = `ya esta lista para recibir usuarios?`;

const liveQuestionSnippet = `Esta viva?`;

const readinessQuestionSnippet = `Esta lista?`;

const startupQuestionSnippet = `Ya arranco completamente?`;

const shouldRunSnippet = `este proceso deberia seguir ejecutandose?`;

const keepRunningSnippet = `seguir funcionando`;

const killPodSnippet = `mata el Pod
crea otro`;

const livenessYamlSnippet = `livenessProbe:
  httpGet:
    path: /health/live
    port: 8080`;

const canSendUsersSnippet = `puedo enviar usuarios aqui?`;

const noTrafficSnippet = `NO recibe trafico`;

const readinessYamlSnippet = `readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080`;

const slowAppSnippet = `app tarda 60 segundos en arrancar`;

const k8sThinksBrokenSnippet = `Kubernetes cree que esta rota`;

const startupFinishedSnippet = `termino de arrancar?`;

const yesSnippet = `si`;

const startupDiffSnippet = `ya arranco?`;

const readinessDiffSnippet = `puede recibir trafico?`;

const livenessDiffSnippet = `sigue viva?`;

const systemSnippet = `API
Redis
PostgreSQL`;

const notReadySnippet = `Not Ready`;

const withoutTrafficSnippet = `sin trafico`;

const readySnippet = `Ready`;

const newPodSnippet = `Pod nuevo`;

const isReadySnippet = `esta listo?`;

const noSnippet = `No`;

const gracefulDeploySnippet = `Deployment nuevo`;

const killImmediatelySnippet = `lo mata inmediatamente?`;

const sigtermSnippet = `SIGTERM`;

const abruptDeathSnippet = `muere abruptamente`;

const healthFlowSnippet = `crea Pod
↓
Startup Probe
↓
Readiness Probe
↓
recibe trafico
↓
Liveness Probe`;

const shutdownFlowSnippet = `SIGTERM
↓
Graceful Shutdown
↓
eliminacion`;

const dockerHealthcheckSnippet = `HEALTHCHECK`;

const dockerHealthcheckExampleSnippet = `HEALTHCHECK CMD curl http://localhost/health`;

const kubernetesProbesSnippet = `Liveness
Readiness
Startup`;

const genericHealthSnippet = `/health`;

const separatedHealthSnippet = `/health/live
/health/ready
/health/startup`;

const juniorSnippet = `mi aplicacion arranco`;

const seniorSnippet = `como sabra Kubernetes
cuando recibir trafico,
cuando reiniciar
y cuando esperar?`;

const deployV2Snippet = `Deploy v2`;

const fullFlowSnippet = `Crear Pod
↓
Startup Probe
↓
Readiness Probe
↓
Trafico
↓
Liveness Probe
↓
Produccion estable`;

const terminateFlowSnippet = `SIGTERM
↓
Graceful Shutdown
↓
Pod eliminado`;

const reflectionSnippet = `estar vivo no significa estar listo`;

export default function Daily96Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/95";
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
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/95">
              <span className={styles.kbd}>←</span> Dia 95
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
                <div className={styles.createdAt}>10/06/2026</div>
                <div className={styles.badge}>Daily #96 • Kubernetes Health</div>
                <h2 className={styles.title}>Health Checks, Readiness y Graceful Shutdown</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Probes</span>
                  <span className={styles.chip}>Tag: Health Checks</span>
                  <span className={styles.chip}>Tag: Shutdown</span>
                </div>

                <p className={styles.lead}>
                  Kubernetes no adivina el estado de tu aplicacion. Tu app debe comunicarlo con probes correctas y un
                  apagado ordenado.
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
                    <p className={styles.sub}>Kubernetes toma decisiones segun las senales de tu aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Probes</span>
                </div>
                <div className={styles.sbd}>
                  <p>Kubernetes decide constantemente:</p>
                  <pre>{decisionsSnippet}</pre>
                  <div className={styles.callout}>Todas esas decisiones dependen de las Probes.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Un Pod creado no siempre esta listo para usuarios.</p>
                  </div>
                  <span className={styles.chip}>Arranque</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{newApiSnippet}</pre>
                  <p>Kubernetes crea un Pod y debe responder:</p>
                  <pre>{readyQuestionSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>cargando configuracion</li>
                    <li>conectando a Redis</li>
                    <li>calentando cache</li>
                    <li>ejecutando migraciones</li>
                  </ul>
                  <div className={styles.quote}>Kubernetes necesita saber el estado real de la aplicacion.</div>
                </div>
              </section>

              <section className={styles.section} id="questions">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Las tres preguntas que Kubernetes hace</h3>
                    <p className={styles.sub}>Cada pregunta tiene una Probe diferente.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{liveQuestionSnippet}</pre>
                  <pre>{readinessQuestionSnippet}</pre>
                  <pre>{startupQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="liveness">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Liveness Probe</h3>
                    <p className={styles.sub}>Determina si la aplicacion sigue viva.</p>
                  </div>
                  <span className={styles.chip}>Liveness</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{shouldRunSnippet}</pre>
                  <p>Si responde bien:</p>
                  <pre>{keepRunningSnippet}</pre>
                  <p>Si falla repetidamente, Kubernetes:</p>
                  <pre>{killPodSnippet}</pre>
                  <pre>{livenessYamlSnippet}</pre>
                  <div className={styles.callout}>Liveness decide si el Pod debe seguir existiendo.</div>
                </div>
              </section>

              <section className={styles.section} id="readiness">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Readiness Probe</h3>
                    <p className={styles.sub}>Determina si el Pod puede recibir trafico.</p>
                  </div>
                  <span className={styles.chip}>Readiness</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{canSendUsersSnippet}</pre>
                  <p>Si responde OK, el Service envia trafico. Si falla, el Pod sigue vivo, pero:</p>
                  <pre>{noTrafficSnippet}</pre>
                  <pre>{readinessYamlSnippet}</pre>
                  <div className={styles.quote}>Readiness no reinicia Pods. Solo controla trafico.</div>
                </div>
              </section>

              <section className={styles.section} id="startup">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Startup Probe</h3>
                    <p className={styles.sub}>Protege aplicaciones que tardan en arrancar.</p>
                  </div>
                  <span className={styles.chip}>Startup</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{slowAppSnippet}</pre>
                  <p>Si liveness empieza demasiado pronto:</p>
                  <pre>{k8sThinksBrokenSnippet}</pre>
                  <p>Startup pregunta:</p>
                  <pre>{startupFinishedSnippet}</pre>
                  <p>Hasta que responde:</p>
                  <pre>{yesSnippet}</pre>
                  <div className={styles.callout}>Liveness no actua. Muy util para aplicaciones lentas.</div>
                </div>
              </section>

              <section className={styles.section} id="difference">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Diferencia entre las tres</h3>
                    <p className={styles.sub}>Memoriza esta separacion.</p>
                  </div>
                  <span className={styles.chip}>Resumen</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Startup</h4>
                  <pre>{startupDiffSnippet}</pre>
                  <h4>Readiness</h4>
                  <pre>{readinessDiffSnippet}</pre>
                  <h4>Liveness</h4>
                  <pre>{livenessDiffSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo real</h3>
                    <p className={styles.sub}>La API arranca, pero PostgreSQL tarda.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{systemSnippet}</pre>
                  <p>Readiness devuelve:</p>
                  <pre>{notReadySnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{withoutTrafficSnippet}</pre>
                  <p>Cuando PostgreSQL conecta:</p>
                  <pre>{readySnippet}</pre>
                  <div className={styles.callout}>Entonces recibe usuarios. Exactamente lo que queremos.</div>
                </div>
              </section>

              <section className={styles.section} id="rolling">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Que pasa durante un Rolling Update</h3>
                    <p className={styles.sub}>Readiness protege despliegues.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <p>Kubernetes crea:</p>
                  <pre>{newPodSnippet}</pre>
                  <p>Pregunta:</p>
                  <pre>{isReadySnippet}</pre>
                  <p>Readiness:</p>
                  <pre>{noSnippet}</pre>
                  <p>Kubernetes espera. Cuando responde si, el Pod recibe trafico y entonces elimina uno viejo.</p>
                </div>
              </section>

              <section className={styles.section} id="shutdown">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Graceful Shutdown en Kubernetes</h3>
                    <p className={styles.sub}>Antes de eliminar un Pod, Kubernetes avisa.</p>
                  </div>
                  <span className={styles.chip}>Shutdown</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{gracefulDeploySnippet}</pre>
                  <p>Kubernetes decide eliminar un Pod antiguo. Pregunta:</p>
                  <pre>{killImmediatelySnippet}</pre>
                  <p>No deberia. Primero envia:</p>
                  <pre>{sigtermSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>dejar de aceptar trafico</li>
                    <li>terminar requests activas</li>
                    <li>liberar recursos</li>
                    <li>apagarse</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="sigterm">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Que ocurre si ignoras SIGTERM</h3>
                    <p className={styles.sub}>La aplicacion muere abruptamente.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{abruptDeathSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>requests perdidas</li>
                    <li>trabajos incompletos</li>
                    <li>errores</li>
                  </ul>
                  <div className={styles.callout}>Toda aplicacion Kubernetes deberia respetar CancellationToken.</div>
                </div>
              </section>

              <section className={styles.section} id="connected">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Health Checks y Rolling Updates</h3>
                    <p className={styles.sub}>Todo esta conectado.</p>
                  </div>
                  <span className={styles.chip}>Sistema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{healthFlowSnippet}</pre>
                  <p>Y durante apagado:</p>
                  <pre>{shutdownFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="docker">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Docker HEALTHCHECK</h3>
                    <p className={styles.sub}>Existe, pero Kubernetes normalmente usa probes propias.</p>
                  </div>
                  <span className={styles.chip}>Docker</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dockerHealthcheckSnippet}</pre>
                  <pre>{dockerHealthcheckExampleSnippet}</pre>
                  <p>En Kubernetes normalmente usamos:</p>
                  <pre>{kubernetesProbesSnippet}</pre>
                  <div className={styles.quote}>Son mas potentes para operar trafico, reinicios y arranque.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Error tipico</h3>
                    <p className={styles.sub}>Usar el mismo endpoint para todo.</p>
                  </div>
                  <span className={styles.chip}>Anti-patron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{genericHealthSnippet}</pre>
                  <p>Startup, readiness y liveness responden preguntas distintas. Mejor separarlos:</p>
                  <pre>{separatedHealthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa un backend senior</h3>
                    <p className={styles.sub}>Arrancar no basta.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Esa es la mentalidad correcta.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Flujo mental completo</h3>
                    <p className={styles.sub}>Asi opera Kubernetes constantemente.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deployV2Snippet}</pre>
                  <pre>{fullFlowSnippet}</pre>
                  <p>Cuando llega un deploy nuevo:</p>
                  <pre>{terminateFlowSnippet}</pre>
                  <div className={styles.quote}>
                    Kubernetes no adivina el estado de tu aplicacion. Tu aplicacion debe comunicarselo correctamente
                    mediante Probes y un shutdown ordenado.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Disenar los endpoints de salud de una API.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Que verificarias en /health/live?</li>
                    <li>Que verificarias en /health/ready?</li>
                    <li>Necesitarias Startup Probe?</li>
                    <li>Que ocurre si PostgreSQL tarda 30 segundos en arrancar?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Liveness decide reinicios.</li>
                    <li>Readiness decide trafico.</li>
                    <li>Startup protege arranques lentos.</li>
                    <li>Graceful Shutdown evita perder trabajo.</li>
                    <li>Kubernetes depende completamente de estas senales.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint usarias para Liveness?</li>
                    <li>Que dependencia es obligatoria para Readiness?</li>
                    <li>Cuanto tarda realmente en arrancar?</li>
                    <li>Respeta CancellationToken?</li>
                    <li>Podria sobrevivir un Rolling Update sin perder requests?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior construye aplicaciones que arrancan. Backend senior construye aplicaciones que
                    Kubernetes puede operar, monitorear, actualizar y apagar de forma segura.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/95">
                      ← Dia 95
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
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 96 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Liveness:</strong> decide si Kubernetes debe reiniciar el Pod.
                </div>
                <div className={styles.li}>
                  <strong>Readiness:</strong> decide si el Pod recibe trafico.
                </div>
                <div className={styles.li}>
                  <strong>Startup:</strong> protege arranques lentos antes de activar liveness.
                </div>
                <div className={styles.li}>
                  <strong>SIGTERM:</strong> permite apagar sin cortar requests activas.
                </div>
                <div className={styles.li}>
                  <strong>Regla:</strong> vivo no significa listo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
