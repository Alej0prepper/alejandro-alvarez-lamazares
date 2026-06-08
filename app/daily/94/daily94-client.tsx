"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "kubernetes", label: "2) Kubernetes" },
  { id: "problem", label: "3) Problema" },
  { id: "cluster", label: "4) Cluster" },
  { id: "node", label: "5) Node" },
  { id: "pod", label: "6) Pod" },
  { id: "visual", label: "7) Visual" },
  { id: "deployment", label: "8) Deployment" },
  { id: "declarative", label: "9) Declarativo" },
  { id: "service", label: "10) Service" },
  { id: "flow", label: "11) Flujo" },
  { id: "replicaset", label: "12) ReplicaSet" },
  { id: "configmap", label: "13) ConfigMap" },
  { id: "secrets", label: "14) Secrets" },
  { id: "namespaces", label: "15) Namespaces" },
  { id: "mindset", label: "16) Mentalidad" },
  { id: "architecture", label: "17) Arquitectura" },
  { id: "commands", label: "18) Comandos" },
  { id: "next", label: "19) Siguiente" },
  { id: "project", label: "Practica" },
] as const;

const dockerSolvesSnippet = `empaquetar aplicaciones`;

const oneContainerSnippet = `1 contenedor`;

const manyContainersSnippet = `50 contenedores
100 contenedores
500 contenedores`;

const relationSnippet = `Docker
↓
crea contenedores

Kubernetes
↓
los opera`;

const apiInstancesSnippet = `3 instancias API`;

const restartQuestionSnippet = `quien la levanta otra vez?`;

const recoverySnippet = `contenedor muerto
↓
nuevo contenedor creado`;

const nodesSnippet = `Node 1
Node 2
Node 3`;

const clusterSnippet = `Cluster`;

const cloudNodesSnippet = `EC2
Azure VM
Google Compute Engine`;

const wrongKubernetesSnippet = `Kubernetes ejecuta contenedores`;

const podsSnippet = `Pods`;

const onePodContainerSnippet = `1 contenedor`;

const severalContainersSnippet = `varios contenedores`;

const simplePodSnippet = `Pod
│
├── API Container`;

const sidecarPodSnippet = `Pod
│
├── API Container
├── Sidecar Container`;

const deploymentSnippet = `Deployment`;

const replicasSnippet = `replicas: 3`;

const desiredPodsSnippet = `quiero 3 Pods`;

const recreatePodSnippet = `Kubernetes crea otro`;

const imperativeSnippet = `crea este pod`;

const declarativeSnippet = `quiero 3 pods siempre`;

const changingIpSnippet = `IP cambia constantemente`;

const serviceSnippet = `Service`;

const apiServiceSnippet = `api-service`;

const healthyPodsSnippet = `Pods sanos`;

const trafficFlowSnippet = `Usuario
   ↓
Service
   ↓
Pod 1
Pod 2
Pod 3`;

const replicaSetRoleSnippet = `mantener cantidad de Pods`;

const replicaSetReplicasSnippet = `replicas = 3`;

const replicaSetRecreateSnippet = `ReplicaSet crea otro`;

const configQuestionSnippet = `como paso configuracion?`;

const configKeysSnippet = `DB_HOST
REDIS_HOST`;

const configMapSnippet = `ConfigMap`;

const secretValuesSnippet = `passwords
API Keys
certificados`;

const configMapNotSecretSnippet = `NO secretos`;

const secretYesSnippet = `SI secretos`;

const namespaceSnippet = `production
staging
development`;

const juniorSnippet = `quiero ejecutar contenedores`;

const seniorSnippet = `quiero que sobrevivan
escalen
se recuperen`;

const architectureSnippet = `Internet
   ↓
Load Balancer
   ↓
Service
   ↓
Deployment
   ↓
Pods`;

const supportResourcesSnippet = `ConfigMaps
Secrets
Volumes`;

const commandsSnippet = `kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all`;

const failureSymptomsSnippet = `reinicios infinitos
pods muertos
deployments fallidos`;

const miniSystemSnippet = `API
Redis
PostgreSQL`;

const reflectionSnippet = `Kubernetes no ejecuta aplicaciones.
Kubernetes mantiene aplicaciones funcionando.`;

export default function Daily94Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/93";
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
            <Link className={styles.btn} href="/daily/93">
              <span className={styles.kbd}>←</span> Dia 93
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
                <div className={styles.createdAt}>08/06/2026</div>
                <div className={styles.badge}>Daily #94 • Kubernetes Foundations</div>
                <h2 className={styles.title}>Kubernetes Fundamental</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Pods</span>
                  <span className={styles.chip}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Services</span>
                </div>

                <p className={styles.lead}>
                  Docker empaqueta contenedores. Kubernetes los administra, recupera, escala y conecta para que una
                  aplicacion pueda operar con muchas replicas.
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
                    <p className={styles.sub}>Docker resolvio empaquetar; Kubernetes resuelve operar a escala.</p>
                  </div>
                  <span className={styles.chip}>Escala</span>
                </div>
                <div className={styles.sbd}>
                  <p>Docker resolvio un problema enorme:</p>
                  <pre>{dockerSolvesSnippet}</pre>
                  <p>Con esto Docker funciona perfecto:</p>
                  <pre>{oneContainerSnippet}</pre>
                  <p>Pero administrar esto manualmente cambia todo:</p>
                  <pre>{manyContainersSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>quien los reinicia?</li>
                    <li>quien los escala?</li>
                    <li>quien detecta caidas?</li>
                    <li>quien distribuye trafico?</li>
                    <li>quien hace deploys?</li>
                  </ul>
                  <div className={styles.callout}>Aqui aparece Kubernetes.</div>
                </div>
              </section>

              <section className={styles.section} id="kubernetes">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es Kubernetes</h3>
                    <p className={styles.sub}>Una plataforma para ejecutar, administrar y escalar contenedores.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Docker crea contenedores. Kubernetes los administra.</p>
                  <pre>{relationSnippet}</pre>
                  <div className={styles.quote}>Docker es el vehiculo. Kubernetes es la ciudad que organiza el trafico.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema que resuelve</h3>
                    <p className={styles.sub}>Cuando una replica muere, alguien debe reemplazarla.</p>
                  </div>
                  <span className={styles.chip}>Recuperacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supongamos:</p>
                  <pre>{apiInstancesSnippet}</pre>
                  <p>Una se cae. Pregunta:</p>
                  <pre>{restartQuestionSnippet}</pre>
                  <p>Docker solo no lo hace. Kubernetes si:</p>
                  <pre>{recoverySnippet}</pre>
                  <div className={styles.callout}>Esa es una de sus mayores fortalezas.</div>
                </div>
              </section>

              <section className={styles.section} id="cluster">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Concepto fundamental: Cluster</h3>
                    <p className={styles.sub}>Un conjunto de maquinas administradas por Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Cluster</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nodesSnippet}</pre>
                  <p>Todos forman:</p>
                  <pre>{clusterSnippet}</pre>
                  <div className={styles.quote}>Kubernetes administra el cluster completo.</div>
                </div>
              </section>

              <section className={styles.section} id="node">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Node</h3>
                    <p className={styles.sub}>La maquina que ejecuta contenedores.</p>
                  </div>
                  <span className={styles.chip}>Node</span>
                </div>
                <div className={styles.sbd}>
                  <p>Puede ser una VM, un servidor fisico o una instancia cloud.</p>
                  <pre>{cloudNodesSnippet}</pre>
                  <div className={styles.callout}>Los Nodes son los trabajadores del cluster.</div>
                </div>
              </section>

              <section className={styles.section} id="pod">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Pod</h3>
                    <p className={styles.sub}>El concepto mas importante para empezar.</p>
                  </div>
                  <span className={styles.chip}>Pod</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos principiantes piensan:</p>
                  <pre>{wrongKubernetesSnippet}</pre>
                  <p>No exactamente. Kubernetes ejecuta:</p>
                  <pre>{podsSnippet}</pre>
                  <p>Un Pod normalmente contiene:</p>
                  <pre>{onePodContainerSnippet}</pre>
                  <p>A veces contiene:</p>
                  <pre>{severalContainersSnippet}</pre>
                  <div className={styles.quote}>Kubernetes administra Pods, no contenedores sueltos.</div>
                </div>
              </section>

              <section className={styles.section} id="visual">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo visual</h3>
                    <p className={styles.sub}>Un Pod puede envolver uno o varios contenedores.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{simplePodSnippet}</pre>
                  <pre>{sidecarPodSnippet}</pre>
                  <div className={styles.callout}>El Pod es la unidad basica.</div>
                </div>
              </section>

              <section className={styles.section} id="deployment">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Deployment</h3>
                    <p className={styles.sub}>Mantiene varias copias de tu aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Deployment</span>
                </div>
                <div className={styles.sbd}>
                  <p>Si quieres varias copias, aparece:</p>
                  <pre>{deploymentSnippet}</pre>
                  <pre>{replicasSnippet}</pre>
                  <p>Significa:</p>
                  <pre>{desiredPodsSnippet}</pre>
                  <p>Si uno muere:</p>
                  <pre>{recreatePodSnippet}</pre>
                  <div className={styles.quote}>Tu declaras el estado deseado. Kubernetes intenta mantenerlo.</div>
                </div>
              </section>

              <section className={styles.section} id="declarative">
                <div className={styles.shd}>
                  <div>
                    <h3>9. La filosofia mas importante</h3>
                    <p className={styles.sub}>Kubernetes es declarativo, no imperativo.</p>
                  </div>
                  <span className={styles.chip}>Declarativo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>No dices</h4>
                  <pre>{imperativeSnippet}</pre>
                  <h4>Dices</h4>
                  <pre>{declarativeSnippet}</pre>
                  <div className={styles.callout}>Kubernetes se encarga.</div>
                </div>
              </section>

              <section className={styles.section} id="service">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Service</h3>
                    <p className={styles.sub}>Una direccion estable para Pods que nacen y mueren.</p>
                  </div>
                  <span className={styles.chip}>Service</span>
                </div>
                <div className={styles.sbd}>
                  <p>El problema es que los Pods nacen y mueren:</p>
                  <pre>{changingIpSnippet}</pre>
                  <p>Para encontrarlos aparece:</p>
                  <pre>{serviceSnippet}</pre>
                  <p>Ejemplo:</p>
                  <pre>{apiServiceSnippet}</pre>
                  <p>Siempre apunta a:</p>
                  <pre>{healthyPodsSnippet}</pre>
                  <div className={styles.quote}>Service = punto estable de acceso.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Flujo real</h3>
                    <p className={styles.sub}>El Service balancea trafico hacia Pods sanos.</p>
                  </div>
                  <span className={styles.chip}>Trafico</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{trafficFlowSnippet}</pre>
                  <div className={styles.callout}>Ya tienes alta disponibilidad basica.</div>
                </div>
              </section>

              <section className={styles.section} id="replicaset">
                <div className={styles.shd}>
                  <div>
                    <h3>12. ReplicaSet</h3>
                    <p className={styles.sub}>Normalmente no lo manejas directamente.</p>
                  </div>
                  <span className={styles.chip}>ReplicaSet</span>
                </div>
                <div className={styles.sbd}>
                  <p>Su funcion:</p>
                  <pre>{replicaSetRoleSnippet}</pre>
                  <pre>{replicaSetReplicasSnippet}</pre>
                  <p>Si uno muere:</p>
                  <pre>{replicaSetRecreateSnippet}</pre>
                  <div className={styles.quote}>Deployment usa ReplicaSets internamente.</div>
                </div>
              </section>

              <section className={styles.section} id="configmap">
                <div className={styles.shd}>
                  <div>
                    <h3>13. ConfigMap</h3>
                    <p className={styles.sub}>Configuracion no sensible compartida dentro del cluster.</p>
                  </div>
                  <span className={styles.chip}>Config</span>
                </div>
                <div className={styles.sbd}>
                  <p>Pregunta:</p>
                  <pre>{configQuestionSnippet}</pre>
                  <p>Ejemplos:</p>
                  <pre>{configKeysSnippet}</pre>
                  <p>Aqui aparece:</p>
                  <pre>{configMapSnippet}</pre>
                  <div className={styles.callout}>Es el equivalente Kubernetes de variables de entorno compartidas.</div>
                </div>
              </section>

              <section className={styles.section} id="secrets">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Secrets</h3>
                    <p className={styles.sub}>Parecido a ConfigMap, pero para valores sensibles.</p>
                  </div>
                  <span className={styles.chip}>Secret</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{secretValuesSnippet}</pre>
                  <h4>ConfigMap</h4>
                  <pre>{configMapNotSecretSnippet}</pre>
                  <h4>Secret</h4>
                  <pre>{secretYesSnippet}</pre>
                  <div className={styles.callout}>Separacion importante.</div>
                </div>
              </section>

              <section className={styles.section} id="namespaces">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Namespaces</h3>
                    <p className={styles.sub}>Carpetas logicas para organizar el cluster.</p>
                  </div>
                  <span className={styles.chip}>Organizacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{namespaceSnippet}</pre>
                  <p>Cada namespace puede tener Pods, Services y Deployments independientes.</p>
                  <div className={styles.quote}>Ayudan a organizar el cluster.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No basta con ejecutar contenedores.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Kubernetes responde esas necesidades.</div>
                </div>
              </section>

              <section className={styles.section} id="architecture">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Arquitectura minima real</h3>
                    <p className={styles.sub}>Una forma comun de ver Kubernetes en produccion.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{architectureSnippet}</pre>
                  <p>Y detras:</p>
                  <pre>{supportResourcesSnippet}</pre>
                  <div className={styles.quote}>Esta arquitectura aparece constantemente en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="commands">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Comandos basicos</h3>
                    <p className={styles.sub}>Primeros comandos para leer un cluster.</p>
                  </div>
                  <span className={styles.chip}>kubectl</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{commandsSnippet}</pre>
                  <div className={styles.callout}>Los veremos mas adelante en detalle.</div>
                </div>
              </section>

              <section className={styles.section} id="next">
                <div className={styles.shd}>
                  <div>
                    <h3>19. Que aprenderemos despues</h3>
                    <p className={styles.sub}>Kubernetes toma decisiones automaticas segun la salud de tu app.</p>
                  </div>
                  <span className={styles.chip}>Ruta</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ahora ya entiendes Cluster, Node, Pod, Deployment, Service, ConfigMap y Secret.</p>
                  <p>Si configuras mal la salud de la aplicacion, puedes terminar con:</p>
                  <pre>{failureSymptomsSnippet}</pre>
                  <div className={styles.quote}>
                    Docker ejecuta contenedores. Kubernetes garantiza que sigan vivos, escalen correctamente y esten
                    disponibles para los usuarios.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Visualizar una arquitectura Kubernetes.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{miniSystemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Paso 1: cuantos Pods tendria cada componente?</li>
                    <li>Paso 2: que Services necesitarias?</li>
                    <li>Paso 3: que configuracion iria en ConfigMaps?</li>
                    <li>Paso 4: que informacion iria en Secrets?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Pod es la unidad basica.</li>
                    <li>Deployment mantiene Pods vivos.</li>
                    <li>Service proporciona acceso estable.</li>
                    <li>ConfigMap y Secret gestionan configuracion.</li>
                    <li>Kubernetes es declarativo, no imperativo.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <pre>{commandsSnippet}</pre>
                  <p>Intenta identificar que Pods existen, que Deployments los gestionan y que Services exponen trafico.</p>
                  <div className={styles.quote}>
                    Backend junior lanza contenedores. Backend senior disena plataformas capaces de mantener cientos de
                    contenedores funcionando, recuperandose y escalando automaticamente.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/93">
                      ← Dia 93
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
                  <p>Dia 94 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Cluster:</strong> conjunto de maquinas administradas por Kubernetes.
                </div>
                <div className={styles.li}>
                  <strong>Pod:</strong> unidad minima que Kubernetes ejecuta y administra.
                </div>
                <div className={styles.li}>
                  <strong>Deployment:</strong> declara cuantas replicas deben existir y las mantiene vivas.
                </div>
                <div className={styles.li}>
                  <strong>Service:</strong> punto estable de acceso hacia Pods sanos.
                </div>
                <div className={styles.li}>
                  <strong>Config:</strong> ConfigMaps para datos no sensibles y Secrets para valores sensibles.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
