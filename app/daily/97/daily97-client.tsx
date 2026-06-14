"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "requests", label: "3) Requests" },
  { id: "example", label: "4) Ejemplo" },
  { id: "oom", label: "5) OOMKilled" },
  { id: "cpu-memory", label: "6) CPU y Memoria" },
  { id: "qos", label: "7) QoS" },
  { id: "horizontal", label: "8) Horizontal" },
  { id: "hpa", label: "9) HPA" },
  { id: "blackfriday", label: "10) Ejemplo" },
  { id: "autoscaler", label: "11) Cluster Autoscaler" },
  { id: "node-failure", label: "12) Falla nodo" },
  { id: "saturation", label: "13) Saturacion" },
  { id: "detection", label: "14) Deteccion" },
  { id: "mistake", label: "15) Error" },
  { id: "mindset", label: "16) Mentalidad" },
  { id: "flow", label: "17) Flujo" },
  { id: "project", label: "Practica" },
] as const;

const scaleSnippet = `mas usuarios
↓
mas servidores`;

const chaosSnippet = `pods reiniciandose
OOMKilled
nodos saturados
costes disparados`;

const apiSnippet = `API .NET`;

const normalConsumptionSnippet = `300 MB RAM
0.2 CPU`;

const heavyTrafficSnippet = `10 veces mas trafico`;

const requestQuestionSnippet = `cuanto necesito para funcionar?`;

const placePodSnippet = `en que nodo colocar el Pod`;

const limitQuestionSnippet = `cual es el maximo permitido?`;

const requestLimitSnippet = `Request = minimo garantizado
Limit = maximo permitido`;

const requestExampleSnippet = `Request: 512 MB
Limit: 1 GB`;

const normalSituationSnippet = `600 MB`;

const bugMemorySnippet = `1.5 GB`;

const oomKilledSnippet = `OOMKilled`;

const oomMeaningSnippet = `Out Of Memory`;

const memoryActionSnippet = `matar proceso`;

const cpuThrottlingSnippet = `throttling`;

const cpuLimitSnippet = `la aplicacion se ralentiza`;

const memoryLimitSnippet = `la aplicacion muere`;

const bestEffortSnippet = `resources: {}`;

const burstableSnippet = `tiene requests`;

const guaranteedSnippet = `Request = Limit`;

const verticalSnippet = `mas CPU
mas RAM`;

const horizontalSnippet = `mas Pods`;

const podsGrowthSnippet = `3 Pods
↓
10 Pods`;

const hpaQuestionSnippet = `quien decide cuando crear mas Pods?`;

const hpaSnippet = `HPA`;

const hpaYamlSnippet = `targetCPUUtilizationPercentage: 70`;

const hpaRuleSnippet = `si CPU > 70%
crear mas Pods`;

const hpaResultSnippet = `3 Pods
↓
5 Pods
↓
8 Pods`;

const normalTrafficSnippet = `3 Pods`;

const blackFridaySnippet = `50.000 usuarios`;

const cpuHighSnippet = `CPU alta`;

const morePodsSnippet = `10 Pods`;

const clusterQuestionSnippet = `y si no caben mas Pods?`;

const clusterAutoscalerSnippet = `Cluster Autoscaler`;

const moreNodesSnippet = `mas nodos`;

const nodesGrowthSnippet = `3 Nodes
↓
5 Nodes`;

const nodeFailureSnippet = `Node 2`;

const nodeGoneSnippet = `desaparece`;

const nodeFailureReasonsSnippet = `VM caída
hardware roto
cloud problem`;

const podsQuestionSnippet = `que pasa con los Pods?`;

const nodeNotReadySnippet = `Node Not Ready`;

const recreatePodsSnippet = `recrea Pods en otros nodos`;

const saturationQuestionSnippet = `como detectaríamos saturacion antes del colapso?`;

const cpuGrowthSnippet = `40%
55%
70%
85%`;

const memoryGrowthSnippet = `300MB
500MB
700MB
900MB`;

const latencyGrowthSnippet = `50ms
120ms
300ms
900ms`;

const queueSnippet = `queue creciendo`;

const timeoutSnippet = `504
timeout
retry`;

const dashboardsSnippet = `Prometheus
Grafana
Datadog
New Relic`;

const dashboardObservesSnippet = `CPU
memoria
latencia
throughput
error rate`;

const badScalingSnippet = `si algo va mal, Kubernetes escalara`;

const dbSaturatedSnippet = `DB saturada`;

const juniorSnippet = `cuantos Pods tengo?`;

const seniorSnippet = `cuanto trafico puedo absorber
antes de degradarme?`;

const loadFlowSnippet = `Mas usuarios
↓
CPU sube
↓
HPA crea Pods
↓
Mas capacidad
↓
Sistema estable`;

const failureFlowSnippet = `Mas usuarios
↓
DB saturada
↓
Latencia
↓
Timeouts
↓
Incidente`;

const systemSnippet = `API
Redis
PostgreSQL`;

const thresholdSnippet = `CPU > 70%
Memoria > 80%
Latencia > 500ms`;

const saturationReflectionSnippet = `la saturacion rara vez aparece de golpe
normalmente deja señales antes del colapso`;

export default function Daily97Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/96";
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
            <Link className={styles.btn} href="/daily/96">
              <span className={styles.kbd}>←</span> Dia 96
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
                <div className={styles.createdAt}>11/06/2026</div>
                <div className={styles.badge}>Daily #97 • Kubernetes Scaling</div>
                <h2 className={styles.title}>Escalado, recursos y comportamiento bajo fallos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Recursos</span>
                  <span className={styles.chip}>Tag: Autoscaling</span>
                  <span className={styles.chip}>Tag: QoS</span>
                  <span className={styles.chip}>Tag: Fallos</span>
                </div>

                <p className={styles.lead}>
                  Escalar no consiste en agregar maquinas a ciegas. Consiste en entender recursos, prioridades y
                  comportamiento real bajo carga y fallos.
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
                    <p className={styles.sub}>Escalar no significa solo agregar usuarios y servidores.</p>
                  </div>
                  <span className={styles.chip}>Escala</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos creen que escalar significa esto:</p>
                  <pre>{scaleSnippet}</pre>
                  <p>Pero si no entiendes recursos, aparecen problemas como:</p>
                  <pre>{chaosSnippet}</pre>
                  <div className={styles.callout}>Escalar consiste en gestionar recursos correctamente.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Una API puede cambiar completamente su comportamiento bajo carga.</p>
                  </div>
                  <span className={styles.chip}>Carga</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{apiSnippet}</pre>
                  <pre>{normalConsumptionSnippet}</pre>
                  <p>Pero un dia recibe:</p>
                  <pre>{heavyTrafficSnippet}</pre>
                  <div className={styles.quote}>Depende de como hayas configurado Kubernetes.</div>
                </div>
              </section>

              <section className={styles.section} id="requests">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Requests y Limits</h3>
                    <p className={styles.sub}>Dos conceptos fundamentales para planificar y proteger recursos.</p>
                  </div>
                  <span className={styles.chip}>Recursos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{requestQuestionSnippet}</pre>
                  <pre>{limitQuestionSnippet}</pre>
                  <pre>{requestLimitSnippet}</pre>
                  <pre>{placePodSnippet}</pre>
                  <div className={styles.callout}>Request = minimo garantizado. Limit = maximo permitido.</div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo real</h3>
                    <p className={styles.sub}>Si superas el limite, Kubernetes interviene.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{requestExampleSnippet}</pre>
                  <pre>{normalSituationSnippet}</pre>
                  <p>Pero si un bug genera:</p>
                  <pre>{bugMemorySnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{oomKilledSnippet}</pre>
                  <div className={styles.callout}>Esto pasa muchisimo en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="oom">
                <div className={styles.shd}>
                  <div>
                    <h3>5. OOMKilled</h3>
                    <p className={styles.sub}>Una de las palabras mas comunes en Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>OOM</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{oomMeaningSnippet}</pre>
                  <p>Kubernetes responde:</p>
                  <pre>{memoryActionSnippet}</pre>
                  <div className={styles.quote}>La memoria no se negocia.</div>
                </div>
              </section>

              <section className={styles.section} id="cpu-memory">
                <div className={styles.shd}>
                  <div>
                    <h3>6. CPU vs Memoria</h3>
                    <p className={styles.sub}>Cuando llegan al limite, el sistema reacciona de manera distinta.</p>
                  </div>
                  <span className={styles.chip}>CPU / RAM</span>
                </div>
                <div className={styles.sbd}>
                  <h4>CPU</h4>
                  <pre>{cpuThrottlingSnippet}</pre>
                  <pre>{cpuLimitSnippet}</pre>
                  <h4>Memoria</h4>
                  <pre>{memoryLimitSnippet}</pre>
                  <div className={styles.callout}>Diferencia muy importante.</div>
                </div>
              </section>

              <section className={styles.section} id="qos">
                <div className={styles.shd}>
                  <div>
                    <h3>7. QoS</h3>
                    <p className={styles.sub}>Kubernetes clasifica Pods segun recursos.</p>
                  </div>
                  <span className={styles.chip}>QoS</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Best Effort</h4>
                  <pre>{bestEffortSnippet}</pre>
                  <h4>Burstable</h4>
                  <pre>{burstableSnippet}</pre>
                  <h4>Guaranteed</h4>
                  <pre>{guaranteedSnippet}</pre>
                  <div className={styles.quote}>Kubernetes protege primero los Pods mas importantes.</div>
                </div>
              </section>

              <section className={styles.section} id="horizontal">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Escalado horizontal</h3>
                    <p className={styles.sub}>Kubernetes suele preferir mas Pods antes que mas CPU o RAM.</p>
                  </div>
                  <span className={styles.chip}>Horizontal</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{verticalSnippet}</pre>
                  <pre>{horizontalSnippet}</pre>
                  <pre>{podsGrowthSnippet}</pre>
                  <div className={styles.callout}>Escalado horizontal.</div>
                </div>
              </section>

              <section className={styles.section} id="hpa">
                <div className={styles.shd}>
                  <div>
                    <h3>9. HPA</h3>
                    <p className={styles.sub}>Decide cuando crear mas Pods.</p>
                  </div>
                  <span className={styles.chip}>HPA</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{hpaQuestionSnippet}</pre>
                  <pre>{hpaSnippet}</pre>
                  <pre>{hpaYamlSnippet}</pre>
                  <pre>{hpaRuleSnippet}</pre>
                  <pre>{hpaResultSnippet}</pre>
                  <div className={styles.quote}>Autoscaling real.</div>
                </div>
              </section>

              <section className={styles.section} id="blackfriday">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ejemplo mental</h3>
                    <p className={styles.sub}>Black Friday pone a prueba tu sistema.</p>
                  </div>
                  <span className={styles.chip}>Pico</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{normalTrafficSnippet}</pre>
                  <pre>{blackFridaySnippet}</pre>
                  <pre>{cpuHighSnippet}</pre>
                  <pre>{morePodsSnippet}</pre>
                  <div className={styles.callout}>Mas capacidad.</div>
                </div>
              </section>

              <section className={styles.section} id="autoscaler">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Cluster Autoscaler</h3>
                    <p className={styles.sub}>Escala la infraestructura si no caben mas Pods.</p>
                  </div>
                  <span className={styles.chip}>Infra</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{clusterQuestionSnippet}</pre>
                  <pre>{clusterAutoscalerSnippet}</pre>
                  <pre>{moreNodesSnippet}</pre>
                  <pre>{nodesGrowthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="node-failure">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que pasa cuando falla un nodo</h3>
                    <p className={styles.sub}>Kubernetes recrea Pods en otros nodos.</p>
                  </div>
                  <span className={styles.chip}>Falla</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nodeFailureSnippet}</pre>
                  <pre>{nodeGoneSnippet}</pre>
                  <pre>{nodeFailureReasonsSnippet}</pre>
                  <p>Pregunta:</p>
                  <pre>{podsQuestionSnippet}</pre>
                  <pre>{nodeNotReadySnippet}</pre>
                  <pre>{recreatePodsSnippet}</pre>
                  <div className={styles.callout}>Autocuracion real.</div>
                </div>
              </section>

              <section className={styles.section} id="saturation">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Que pasa durante una saturacion</h3>
                    <p className={styles.sub}>Antes del colapso suele haber señales.</p>
                  </div>
                  <span className={styles.chip}>Saturacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{saturationQuestionSnippet}</pre>
                  <pre>{cpuGrowthSnippet}</pre>
                  <pre>{memoryGrowthSnippet}</pre>
                  <pre>{latencyGrowthSnippet}</pre>
                  <pre>{queueSnippet}</pre>
                  <pre>{timeoutSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="detection">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como detecta esto una empresa real</h3>
                    <p className={styles.sub}>Con dashboards y alertas sobre las metricas correctas.</p>
                  </div>
                  <span className={styles.chip}>Deteccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dashboardsSnippet}</pre>
                  <pre>{dashboardObservesSnippet}</pre>
                  <div className={styles.callout}>El objetivo es actuar antes del colapso.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Error tipico</h3>
                    <p className={styles.sub}>Escalar no arregla todos los problemas.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badScalingSnippet}</pre>
                  <pre>{dbSaturatedSnippet}</pre>
                  <div className={styles.quote}>Crear mas Pods puede empeorar la situacion.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No mira solo cantidad de Pods.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Mucho mas importante.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Flujo real bajo carga</h3>
                    <p className={styles.sub}>Dos caminos tipicos bajo presion.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loadFlowSnippet}</pre>
                  <pre>{failureFlowSnippet}</pre>
                  <div className={styles.quote}>Entender la diferencia es critico.</div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Pensar como responde tu sistema ante un pico de trafico.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>que recurso se agotaria primero?</li>
                    <li>que metricas observarias?</li>
                    <li>que umbral usarias para alertar?</li>
                    <li>que componente seria el cuello de botella?</li>
                  </ul>
                  <pre>{thresholdSnippet}</pre>
                  <h4>Reflexion clave</h4>
                  <pre>{saturationReflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Requests y Limits son fundamentales.</li>
                    <li>OOMKilled es uno de los errores mas comunes.</li>
                    <li>HPA escala Pods automaticamente.</li>
                    <li>Cluster Autoscaler escala nodos.</li>
                    <li>La observabilidad permite detectar saturacion antes del incidente.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que recurso se agotaria primero en tu sistema?</li>
                    <li>Tiene limites configurados?</li>
                    <li>Podria sobrevivir si un nodo desaparece?</li>
                    <li>Como sabrias que esta empezando a saturarse?</li>
                    <li>Que metricas mirarias primero durante una incidencia?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior observa que el sistema cayo. Backend senior identifica las señales de presion y actua
                    antes de llegar al punto de ruptura.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/96">
                      ← Dia 96
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
                  <p>Dia 97 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Requests:</strong> minimo garantizado; Limits: maximo permitido.
                </div>
                <div className={styles.li}>
                  <strong>OOMKilled:</strong> la memoria excedio el limite y Kubernetes mato el proceso.
                </div>
                <div className={styles.li}>
                  <strong>HPA:</strong> crea mas Pods cuando sube la presion.
                </div>
                <div className={styles.li}>
                  <strong>Cluster Autoscaler:</strong> agrega nodos cuando ya no caben mas Pods.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> detectar presion antes del colapso.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
