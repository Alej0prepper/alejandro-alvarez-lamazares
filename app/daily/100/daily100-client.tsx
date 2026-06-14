"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "ci-cd", label: "2) CI/CD" },
  { id: "ci", label: "3) CI" },
  { id: "pipeline", label: "4) Pipeline" },
  { id: "build", label: "5) Build" },
  { id: "tests", label: "6) Tests" },
  { id: "quality-gates", label: "7) Quality Gates" },
  { id: "docker", label: "8) Docker" },
  { id: "registry", label: "9) Registry" },
  { id: "delivery", label: "10) Delivery" },
  { id: "deployment", label: "11) Deployment" },
  { id: "rollback", label: "12) Rollback" },
  { id: "helm", label: "13) Helm" },
  { id: "security", label: "14) Seguridad" },
  { id: "mistake", label: "15) Error" },
  { id: "mindset", label: "16) Mentalidad" },
  { id: "flow", label: "17) Flujo" },
  { id: "project", label: "Practica" },
] as const;

const manualFlowSnippet = `hacer merge
↓
compilar manualmente
↓
copiar archivos
↓
hacer deploy
↓
cruzar los dedos`;

const automationSnippet = `automatizacion`;

const ciSnippet = `Continuous Integration`;

const cdDeliverySnippet = `Continuous Delivery`;

const cdDeploymentSnippet = `Continuous Deployment`;

const changeSnippet = `git push`;

const ciStepsSnippet = `Build
Tests
Analisis
Validaciones`;

const pipelineSnippet = `cadena de pasos automatizados`;

const commitFlowSnippet = `Commit
↓
Build
↓
Tests
↓
Docker Image
↓
Deploy`;

const buildCmdSnippet = `dotnet build`;

const buildQuestionSnippet = `compila?`;

const pipelineStoppedSnippet = `pipeline detenido`;

const unitIntegrationSnippet = `Unit Tests
Integration Tests`;

const behaviorQuestionSnippet = `el comportamiento sigue siendo correcto?`;

const noDeploySnippet = `no hay despliegue`;

const qualityGatesQuestionSnippet = `cumple requisitos minimos?`;

const qualityGatesListSnippet = `tests pasan
cobertura minima
analisis estatico
vulnerabilidades aceptables`;

const dockerBuildSnippet = `docker build`;

const imageVersionSnippet = `my-api:v123`;

const reproducibleSnippet = `reproducible`;

const sameCodeSnippet = `Mismo codigo = misma imagen`;

const registryQuestionSnippet = `donde guardamos imagenes?`;

const registryExamplesSnippet = `Docker Hub
AWS ECR
Azure ACR
GitHub Container Registry`;

const registryResultSnippet = `imagen disponible para Kubernetes`;

const deliveryFlowSnippet = `Build
↓
Tests
↓
Docker
↓
Registry
↓
Listo para produccion`;

const deploymentQuestionSnippet = `deploy automatico`;

const mergeToProdSnippet = `Merge
↓
Produccion`;

const kubernetesFlowSnippet = `Git Push
↓
CI
↓
Tests
↓
Docker Image
↓
Registry
↓
kubectl apply
↓
Kubernetes`;

const rollbackQuestionSnippet = `que pasa si la version falla?`;

const rollbackFlowSnippet = `Deploy
↓
Health Checks fallan
↓
Rollback automatico`;

const helmSnippet = `parametrizar despliegues`;

const helmCmdSnippet = `helm upgrade`;

const helmResultSnippet = `actualizacion controlada`;

const securityQuestionSnippet = `podemos desplegar imagenes vulnerables?`;

const scannerListSnippet = `Trivy
Snyk
escaneres CVE`;

const pipelineFailSnippet = `pipeline falla`;

const ciCdNotSpeedSnippet = `hacer deploy rapido`;

const ciCdSnippet = `hacer deploy seguro
repetible
auditable`;

const juniorSnippet = `como despliego?`;

const seniorSnippet = `como elimino errores humanos
del proceso de despliegue?`;

const fullPipelineSnippet = `Git Push
↓
Build
↓
Tests
↓
Quality Gates
↓
Security Scan
↓
Docker Build
↓
Registry
↓
Deploy Kubernetes
↓
Health Checks
↓
Rollback si falla`;

const manualRiskSnippet = `si un proceso depende de que alguien recuerde hacerlo bien,
eventualmente fallara`;

const systemSnippet = `API
Redis
PostgreSQL`;

const currentProjectSnippet = `tu proyecto actual`;

export default function Daily100Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/99";
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
            <Link className={styles.btn} href="/daily/99">
              <span className={styles.kbd}>←</span> Dia 99
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
                <div className={styles.badge}>Daily #100 • CI/CD</div>
                <h2 className={styles.title}>CI/CD y despliegue automatizado</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: CI/CD</span>
                  <span className={styles.chip}>Tag: Pipeline</span>
                  <span className={styles.chip}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Automatizacion</span>
                </div>

                <p className={styles.lead}>
                  CI/CD automatiza la confianza: valida cambios, construye imagenes, publica artefactos y despliega sin
                  depender de pasos manuales.
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
                    <p className={styles.sub}>Pasar de un commit a produccion sin intervención manual.</p>
                  </div>
                  <span className={styles.chip}>Automatizacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Antes el proceso era algo asi:</p>
                  <pre>{manualFlowSnippet}</pre>
                  <pre>{automationSnippet}</pre>
                  <div className={styles.callout}>Mucho riesgo. Muchos errores humanos.</div>
                </div>
              </section>

              <section className={styles.section} id="ci-cd">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que significa CI/CD</h3>
                    <p className={styles.sub}>Continuous Integration, Delivery y Deployment.</p>
                  </div>
                  <span className={styles.chip}>Conceptos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>CI</h4>
                  <pre>{ciSnippet}</pre>
                  <h4>CD</h4>
                  <pre>{cdDeliverySnippet}</pre>
                  <pre>{cdDeploymentSnippet}</pre>
                  <div className={styles.quote}>Cada cambio sigue un proceso automatico y repetible.</div>
                </div>
              </section>

              <section className={styles.section} id="ci">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Continuous Integration</h3>
                    <p className={styles.sub}>Integrar cambios frecuentemente y validar que el sistema sigue funcionando.</p>
                  </div>
                  <span className={styles.chip}>CI</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{changeSnippet}</pre>
                  <pre>{ciStepsSnippet}</pre>
                  <pre>{kubernetesFlowSnippet}</pre>
                  <div className={styles.callout}>CI reduce errores de integracion.</div>
                </div>
              </section>

              <section className={styles.section} id="pipeline">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Pipeline</h3>
                    <p className={styles.sub}>Una cadena de pasos automatizados.</p>
                  </div>
                  <span className={styles.chip}>Pipeline</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{pipelineSnippet}</pre>
                  <pre>{commitFlowSnippet}</pre>
                  <div className={styles.callout}>Todo ocurre automaticamente.</div>
                </div>
              </section>

              <section className={styles.section} id="build">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Build</h3>
                    <p className={styles.sub}>Si no compila, el pipeline se detiene.</p>
                  </div>
                  <span className={styles.chip}>Build</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{buildCmdSnippet}</pre>
                  <pre>{buildQuestionSnippet}</pre>
                  <pre>{pipelineStoppedSnippet}</pre>
                  <div className={styles.quote}>No seguimos construyendo algo roto.</div>
                </div>
              </section>

              <section className={styles.section} id="tests">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Tests automáticos</h3>
                    <p className={styles.sub}>Unit tests e integration tests protegen produccion.</p>
                  </div>
                  <span className={styles.chip}>Tests</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{unitIntegrationSnippet}</pre>
                  <pre>{behaviorQuestionSnippet}</pre>
                  <pre>{noDeploySnippet}</pre>
                  <div className={styles.callout}>Produccion debe estar protegida.</div>
                </div>
              </section>

              <section className={styles.section} id="quality-gates">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Quality Gates</h3>
                    <p className={styles.sub}>Barreras automáticas antes del despliegue.</p>
                  </div>
                  <span className={styles.chip}>Gates</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{qualityGatesQuestionSnippet}</pre>
                  <pre>{qualityGatesListSnippet}</pre>
                  <div className={styles.quote}>Barreras automaticas.</div>
                </div>
              </section>

              <section className={styles.section} id="docker">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Construccion de imagen Docker</h3>
                    <p className={styles.sub}>Cada build debe ser reproducible.</p>
                  </div>
                  <span className={styles.chip}>Docker</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dockerBuildSnippet}</pre>
                  <pre>{imageVersionSnippet}</pre>
                  <pre>{reproducibleSnippet}</pre>
                  <div className={styles.callout}>{sameCodeSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="registry">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Registry</h3>
                    <p className={styles.sub}>Donde guardamos las imagenes para que Kubernetes pueda usarlas.</p>
                  </div>
                  <span className={styles.chip}>Registry</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{registryQuestionSnippet}</pre>
                  <pre>{registryExamplesSnippet}</pre>
                  <pre>{registryResultSnippet}</pre>
                  <div className={styles.quote}>Similar a NuGet para paquetes.</div>
                </div>
              </section>

              <section className={styles.section} id="delivery">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Continuous Delivery</h3>
                    <p className={styles.sub}>La version queda lista para desplegar en cualquier momento.</p>
                  </div>
                  <span className={styles.chip}>Delivery</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliveryFlowSnippet}</pre>
                  <div className={styles.callout}>Alguien aprueba el despliegue.</div>
                </div>
              </section>

              <section className={styles.section} id="deployment">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Continuous Deployment</h3>
                    <p className={styles.sub}>Despliegue automatico despues de validar.</p>
                  </div>
                  <span className={styles.chip}>Deployment</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploymentQuestionSnippet}</pre>
                  <pre>{mergeToProdSnippet}</pre>
                  <div className={styles.quote}>Mucha automatizacion, mucho control.</div>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Rollback automático</h3>
                    <p className={styles.sub}>Si algo falla, el sistema vuelve atras.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rollbackQuestionSnippet}</pre>
                  <pre>{rollbackFlowSnippet}</pre>
                  <div className={styles.callout}>El pipeline tambien protege produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="helm">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Helm dentro del pipeline</h3>
                    <p className={styles.sub}>Helm parametriza despliegues y suele vivir dentro del pipeline.</p>
                  </div>
                  <span className={styles.chip}>Helm</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{helmSnippet}</pre>
                  <pre>{helmCmdSnippet}</pre>
                  <pre>{helmResultSnippet}</pre>
                  <div className={styles.quote}>Helm y CI/CD suelen trabajar juntos.</div>
                </div>
              </section>

              <section className={styles.section} id="security">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Seguridad en el pipeline</h3>
                    <p className={styles.sub}>No deberias desplegar imagenes vulnerables.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{securityQuestionSnippet}</pre>
                  <pre>{scannerListSnippet}</pre>
                  <pre>{pipelineFailSnippet}</pre>
                  <div className={styles.callout}>Seguridad automatizada.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Error típico</h3>
                    <p className={styles.sub}>CI/CD no es solo hacer deploy rapido.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ciCdNotSpeedSnippet}</pre>
                  <pre>{ciCdSnippet}</pre>
                  <div className={styles.quote}>Velocidad es una consecuencia.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Cómo piensa un backend senior</h3>
                    <p className={styles.sub}>Busca eliminar errores humanos del despliegue.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Pipeline moderno completo</h3>
                    <p className={styles.sub}>Desde un push hasta un rollback si algo falla.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fullPipelineSnippet}</pre>
                  <div className={styles.callout}>Esto se parece a lo que usan muchas empresas hoy.</div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Disenar un pipeline para una API .NET.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <pre>{currentProjectSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>que validar antes del deploy?</li>
                    <li>que tests ejecutar?</li>
                    <li>escanearias vulnerabilidades?</li>
                    <li>como construirias la imagen Docker?</li>
                    <li>como harias rollback?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{manualRiskSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>CI valida cambios automaticamente.</li>
                    <li>CD automatiza la entrega.</li>
                    <li>Kubernetes se integra naturalmente con CI/CD.</li>
                    <li>Los pipelines modernos incluyen seguridad.</li>
                    <li>Rollback debe formar parte del proceso.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que ocurre despues de hacer merge?</li>
                    <li>Hay tests automáticos?</li>
                    <li>Se construyen imagenes Docker automaticamente?</li>
                    <li>Existe rollback?</li>
                    <li>Cuantos pasos siguen dependiendo de personas?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior despliega versiones. Backend senior construye pipelines capaces de validar, proteger,
                    desplegar y recuperar sistemas completos sin depender de la memoria o la intervencion manual de nadie.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/99">
                      ← Dia 99
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
                  <p>Dia 100 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>CI:</strong> valida, prueba y filtra cambios antes de llegar a produccion.
                </div>
                <div className={styles.li}>
                  <strong>CD:</strong> entrega o despliega automaticamente cuando el pipeline lo permite.
                </div>
                <div className={styles.li}>
                  <strong>Seguridad:</strong> escaneo de imagenes y gates antes del deploy.
                </div>
                <div className={styles.li}>
                  <strong>Rollback:</strong> debe formar parte del flujo, no ser una improvisacion.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
