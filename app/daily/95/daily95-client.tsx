"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "deployment", label: "2) Deployment" },
  { id: "rolling", label: "3) Rolling" },
  { id: "visual", label: "4) Visual" },
  { id: "readiness", label: "5) Readiness" },
  { id: "broken", label: "6) Falla" },
  { id: "rollout", label: "7) Rollout" },
  { id: "rollback", label: "8) Rollback" },
  { id: "strategies", label: "9) Estrategias" },
  { id: "kubectl", label: "10) kubectl" },
  { id: "yaml", label: "11) YAML" },
  { id: "helm", label: "12) Helm" },
  { id: "helm-example", label: "13) Ejemplo Helm" },
  { id: "mindset", label: "14) Mentalidad" },
  { id: "flow", label: "15) Flujo real" },
  { id: "project", label: "Practica" },
] as const;

const v1ToV2Snippet = `v1 funcionando
↓
necesitamos v2`;

const downtimeSnippet = `apagar todo
↓
instalar
↓
encender todo`;

const deploymentYamlSnippet = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api
spec:
  replicas: 3`;

const desiredPodsSnippet = `quiero 3 Pods`;

const imageKnowledgeSnippet = `que imagen ejecutar`;

const imageV1Snippet = `image: my-api:v1`;

const initialPodsSnippet = `Pod A v1
Pod B v1
Pod C v1`;

const targetPodsSnippet = `Pod A v2
Pod B v2
Pod C v2`;

const rollingFlowSnippet = `Crear Pod v2
↓
Esperar que este sano
↓
Eliminar Pod v1
↓
Repetir`;

const beforeSnippet = `v1 v1 v1`;

const transitionOneSnippet = `v2 v1 v1`;

const transitionTwoSnippet = `v2 v2 v1`;

const finalSnippet = `v2 v2 v2`;

const readinessSnippet = `Readiness Probe`;

const readySnippet = `Ready`;

const noTrafficSnippet = `No recibe trafico`;

const bugSnippet = `v2 tiene un bug`;

const readinessFailSnippet = `No pasan readiness`;

const noProgressSnippet = `el rollout no progresa`;

const rolloutMeaningSnippet = `proceso de despliegue`;

const rolloutStatusSnippet = `kubectl rollout status deployment/my-api`;

const rolloutResultsSnippet = `Deployment successfully rolled out

Rollout in progress`;

const seniorQuestionSnippet = `que hacemos si sale mal?`;

const rollbackCommandSnippet = `kubectl rollout undo deployment/my-api`;

const rollbackResultSnippet = `v2 falla
↓
rollback
↓
v1 vuelve`;

const recreateSnippet = `v1 v1 v1
↓
nada
↓
v2 v2 v2`;

const downtimeWordSnippet = `downtime`;

const rollingUpdateSnippet = `Rolling Update`;

const blueGreenSnippet = `Blue
Green`;

const canarySnippet = `1%
5%
20%`;

const hundredPercentSnippet = `100%`;

const kubectlCommandsSnippet = `kubectl get pods
kubectl get deployments
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml`;

const imperativeSnippet = `crea pod`;

const declarativeSnippet = `quiero este estado`;

const replicasSnippet = `replicas: 3`;

const k8sResourcesSnippet = `Deployment
Service
ConfigMap
Secret
Ingress`;

const helmSnippet = `Helm`;

const nugetSnippet = `NuGet`;

const npmSnippet = `npm`;

const duplicatedImagesSnippet = `image: my-api-dev
image: my-api-prod
image: my-api-staging`;

const helmImageSnippet = `image: {{ .Values.image }}`;

const valuesSnippet = `values-dev.yaml
values-prod.yaml`;

const juniorSnippet = `quiero desplegar la nueva version`;

const seniorSnippet = `quiero desplegar sin downtime
quiero rollback
quiero minimizar riesgo`;

const gitPushSnippet = `git push`;

const cicdSnippet = `Build
↓
Tests
↓
Docker Image
↓
Registry
↓
Kubernetes`;

const kubernetesFlowSnippet = `Rolling Update
↓
Readiness Checks
↓
Trafico`;

const usersSnippet = `sin notar nada`;

const miniSystemSnippet = `API
3 Pods`;

const versionOneSnippet = `v1`;

const versionTwoSnippet = `v2`;

const reflectionSnippet = `un deploy exitoso no es el que termina
es el que puede recuperarse rapidamente si algo sale mal`;

export default function Daily95Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/94";
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
            <Link className={styles.btn} href="/daily/94">
              <span className={styles.kbd}>←</span> Dia 94
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
                <div className={styles.createdAt}>09/06/2026</div>
                <div className={styles.badge}>Daily #95 • Kubernetes Deployments</div>
                <h2 className={styles.title}>Deployments en Kubernetes</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                  <span className={styles.chip}>Tag: Helm</span>
                </div>

                <p className={styles.lead}>
                  Kubernetes no solo mantiene Pods vivos: tambien permite actualizar aplicaciones sin tumbar el servicio,
                  observar el rollout y volver atras si algo falla.
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
                    <p className={styles.sub}>Desplegar una version nueva no debe interrumpir a los usuarios.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <p>En produccion normalmente pasas de:</p>
                  <pre>{v1ToV2Snippet}</pre>
                  <p>La solucion no puede ser:</p>
                  <pre>{downtimeSnippet}</pre>
                  <div className={styles.callout}>Kubernetes fue disenado para evitar ese downtime.</div>
                </div>
              </section>

              <section className={styles.section} id="deployment">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El Deployment que ya conocemos</h3>
                    <p className={styles.sub}>Define cuantas replicas quieres y que imagen debe ejecutarse.</p>
                  </div>
                  <span className={styles.chip}>Deployment</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploymentYamlSnippet}</pre>
                  <p>Esto significa:</p>
                  <pre>{desiredPodsSnippet}</pre>
                  <p>Pero Kubernetes tambien sabe:</p>
                  <pre>{imageKnowledgeSnippet}</pre>
                  <pre>{imageV1Snippet}</pre>
                  <div className={styles.quote}>Cuando cambia la imagen, comienza un despliegue.</div>
                </div>
              </section>

              <section className={styles.section} id="rolling">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Rolling Update</h3>
                    <p className={styles.sub}>La estrategia por defecto y probablemente la mas usada.</p>
                  </div>
                  <span className={styles.chip}>Rolling</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Situacion inicial</h4>
                  <pre>{initialPodsSnippet}</pre>
                  <h4>Queremos</h4>
                  <pre>{targetPodsSnippet}</pre>
                  <p>Kubernetes no mata todo. Hace:</p>
                  <pre>{rollingFlowSnippet}</pre>
                  <div className={styles.callout}>Siempre hay Pods disponibles: actualizacion sin downtime.</div>
                </div>
              </section>

              <section className={styles.section} id="visual">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Visualizacion mental</h3>
                    <p className={styles.sub}>Nunca desaparecen todos los Pods a la vez.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{beforeSnippet}</pre>
                  <pre>{transitionOneSnippet}</pre>
                  <pre>{transitionTwoSnippet}</pre>
                  <pre>{finalSnippet}</pre>
                  <div className={styles.quote}>Esta es la base de los despliegues modernos.</div>
                </div>
              </section>

              <section className={styles.section} id="readiness">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como sabe Kubernetes que un Pod esta listo</h3>
                    <p className={styles.sub}>Readiness decide si el Pod puede recibir trafico.</p>
                  </div>
                  <span className={styles.chip}>Readiness</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{readinessSnippet}</pre>
                  <p>Si responde:</p>
                  <pre>{readySnippet}</pre>
                  <p>Entonces recibe trafico. Si no:</p>
                  <pre>{noTrafficSnippet}</pre>
                  <div className={styles.callout}>Fundamental para evitar despliegues defectuosos.</div>
                </div>
              </section>

              <section className={styles.section} id="broken">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que pasa si la nueva version esta rota</h3>
                    <p className={styles.sub}>Readiness protege el rollout.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{bugSnippet}</pre>
                  <p>Los nuevos Pods:</p>
                  <pre>{readinessFailSnippet}</pre>
                  <p>Kubernetes detecta:</p>
                  <pre>{noProgressSnippet}</pre>
                  <div className={styles.quote}>Mecanismo de proteccion incorporado.</div>
                </div>
              </section>

              <section className={styles.section} id="rollout">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Rollout</h3>
                    <p className={styles.sub}>La palabra que veras constantemente en produccion.</p>
                  </div>
                  <span className={styles.chip}>Rollout</span>
                </div>
                <div className={styles.sbd}>
                  <p>Rollout significa:</p>
                  <pre>{rolloutMeaningSnippet}</pre>
                  <pre>{rolloutStatusSnippet}</pre>
                  <pre>{rolloutResultsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Rollback</h3>
                    <p className={styles.sub}>La pregunta senior es que hacemos si sale mal.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{seniorQuestionSnippet}</pre>
                  <p>Kubernetes guarda historial y permite volver:</p>
                  <pre>{rollbackCommandSnippet}</pre>
                  <pre>{rollbackResultSnippet}</pre>
                  <div className={styles.callout}>Rollback rapido = menos impacto.</div>
                </div>
              </section>

              <section className={styles.section} id="strategies">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Estrategias de despliegue</h3>
                    <p className={styles.sub}>Rolling Update no es la unica estrategia.</p>
                  </div>
                  <span className={styles.chip}>Estrategias</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Recreate</h4>
                  <pre>{recreateSnippet}</pre>
                  <pre>{downtimeWordSnippet}</pre>
                  <h4>Rolling Update</h4>
                  <pre>{rollingUpdateSnippet}</pre>
                  <p>Sin downtime. La mas utilizada.</p>
                  <h4>Blue/Green</h4>
                  <pre>{blueGreenSnippet}</pre>
                  <p>Dos entornos completos y cambio instantaneo.</p>
                  <h4>Canary</h4>
                  <pre>{canarySnippet}</pre>
                  <p>antes de llegar a:</p>
                  <pre>{hundredPercentSnippet}</pre>
                  <div className={styles.callout}>Kubernetes puede implementar todas.</div>
                </div>
              </section>

              <section className={styles.section} id="kubectl">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Kubectl</h3>
                    <p className={styles.sub}>La herramienta principal para hablar con Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>CLI</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{kubectlCommandsSnippet}</pre>
                  <div className={styles.quote}>Kubectl es el docker de Kubernetes.</div>
                </div>
              </section>

              <section className={styles.section} id="yaml">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Manifiestos YAML</h3>
                    <p className={styles.sub}>Kubernetes es declarativo.</p>
                  </div>
                  <span className={styles.chip}>YAML</span>
                </div>
                <div className={styles.sbd}>
                  <h4>No dices</h4>
                  <pre>{imperativeSnippet}</pre>
                  <h4>Dices</h4>
                  <pre>{declarativeSnippet}</pre>
                  <pre>{replicasSnippet}</pre>
                  <div className={styles.callout}>Kubernetes intenta mantener ese estado.</div>
                </div>
              </section>

              <section className={styles.section} id="helm">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Introduccion a Helm</h3>
                    <p className={styles.sub}>Plantillas reutilizables para Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Helm</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cuando tienes muchos recursos, los YAML crecen rapido:</p>
                  <pre>{k8sResourcesSnippet}</pre>
                  <p>Aqui aparece:</p>
                  <pre>{helmSnippet}</pre>
                  <p>Helm es para Kubernetes lo que NuGet es para .NET o npm para JavaScript.</p>
                  <pre>{nugetSnippet}</pre>
                  <pre>{npmSnippet}</pre>
                  <div className={styles.callout}>Permite reutilizar configuraciones.</div>
                </div>
              </section>

              <section className={styles.section} id="helm-example">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Ejemplo de Helm</h3>
                    <p className={styles.sub}>La plantilla cambia valores sin duplicar YAML.</p>
                  </div>
                  <span className={styles.chip}>Plantillas</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin Helm</h4>
                  <pre>{duplicatedImagesSnippet}</pre>
                  <h4>Con Helm</h4>
                  <pre>{helmImageSnippet}</pre>
                  <pre>{valuesSnippet}</pre>
                  <div className={styles.quote}>Misma plantilla. Mucho mas mantenible.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como piensa un backend senior</h3>
                    <p className={styles.sub}>La version nueva importa, pero tambien el riesgo.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Esa diferencia es enorme.</div>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Flujo real de despliegue</h3>
                    <p className={styles.sub}>Desde git push hasta usuarios sin notar el cambio.</p>
                  </div>
                  <span className={styles.chip}>CI/CD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{gitPushSnippet}</pre>
                  <pre>{cicdSnippet}</pre>
                  <pre>{kubernetesFlowSnippet}</pre>
                  <p>Usuarios:</p>
                  <pre>{usersSnippet}</pre>
                  <div className={styles.quote}>
                    Kubernetes no solo ejecuta aplicaciones. Tambien actualiza aplicaciones de forma segura.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Pensar un despliegue real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{miniSystemSnippet}</pre>
                  <h4>Version actual</h4>
                  <pre>{versionOneSnippet}</pre>
                  <h4>Nueva version</h4>
                  <pre>{versionTwoSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Paso 1: como evitarias downtime?</li>
                    <li>Paso 2: que ocurre si v2 falla?</li>
                    <li>Paso 3: como harias rollback?</li>
                    <li>Paso 4: que probe usarias para decidir cuando recibir trafico?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Rolling Update es la estrategia por defecto.</li>
                    <li>Readiness Probes protegen despliegues.</li>
                    <li>Rollouts permiten monitorear despliegues.</li>
                    <li>Rollbacks son fundamentales.</li>
                    <li>Helm ayuda a gestionar configuraciones complejas.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Cuantas replicas tiene el Deployment?</li>
                    <li>Que imagen usa?</li>
                    <li>Tiene readiness probe?</li>
                    <li>Como harias rollback?</li>
                    <li>Podria desplegarse sin downtime?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior publica versiones. Backend senior disena mecanismos para desplegar, observar y
                    revertir cambios sin afectar a los usuarios.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/94">
                      ← Dia 94
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
                  <p>Dia 95 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Rolling Update:</strong> reemplaza Pods gradualmente para evitar downtime.
                </div>
                <div className={styles.li}>
                  <strong>Readiness:</strong> decide si un Pod nuevo puede recibir trafico.
                </div>
                <div className={styles.li}>
                  <strong>Rollout:</strong> proceso observable de despliegue.
                </div>
                <div className={styles.li}>
                  <strong>Rollback:</strong> volver rapido a una version anterior si algo falla.
                </div>
                <div className={styles.li}>
                  <strong>Helm:</strong> plantillas para reutilizar y parametrizar manifiestos Kubernetes.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
