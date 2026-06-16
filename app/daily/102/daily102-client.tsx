"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "platform-culture", label: "2) Cultura" },
  { id: "problem", label: "3) Problema" },
  { id: "mature-teams", label: "4) Equipos" },
  { id: "trust", label: "5) Confianza" },
  { id: "environment", label: "6) Entornos" },
  { id: "small-deploys", label: "7) Deploys pequeños" },
  { id: "rollback", label: "8) Rollback" },
  { id: "ownership", label: "9) Ownership" },
  { id: "you-build-it", label: "10) You Build It" },
  { id: "fear", label: "11) Miedo" },
  { id: "post-deploy", label: "12) Post-deploy" },
  { id: "business", label: "13) Negocio" },
  { id: "learning", label: "14) Aprendizaje" },
  { id: "mindset", label: "15) Mentalidad" },
  { id: "block", label: "16) Bloque" },
  { id: "project", label: "Proyecto" },
  { id: "final", label: "Cierre" },
] as const;

const technologiesSnippet = `Docker
Kubernetes
CI/CD`;

const deployRhythmSnippet = `20 veces al dia
1 vez al mes`;

const cultureQuestionSnippet = `que significa cultura de plataforma?`;

const cultureDefinitionSnippet = `Conjunto de practicas que permiten que los equipos desplieguen y operen sistemas de forma segura y predecible.`;

const notToolSnippet = `una herramienta`;

const notYamlSnippet = `un YAML`;

const processSnippet = `una forma de trabajar`;

const fearSnippet = `produccion da miedo`;

const fewerDeploysSnippet = `menos deploys`;

const bigChangesSnippet = `cambios gigantes`;

const moreRiskSnippet = `mas riesgo`;

const moreFearSnippet = `mas miedo`;

const reduceRiskSnippet = `si desplegar da miedo
hay que reducir el riesgo`;

const whyDeployOftenSnippet = `por que algunas empresas despliegan decenas de veces al dia?`;

const trustIngredientsSnippet = `tests
observabilidad
rollback
feature flags
automatizacion`;

const trustSnippet = `Confianza`;

const trustTermSnippet = `Confianza operativa`;

const prodSpecialSnippet = `dev
staging
produccion`;

const similarSnippet = `se parezcan lo maximo posible`;

const surpriseSnippet = `sorpresas`;

const expensiveSnippet = `las sorpresas suelen ser caras`;

const badDeploySnippet = `3 semanas de cambios`;

const goodDeploySnippet = `cambios pequeños`;

const smallDeployBenefitsSnippet = `menos riesgo
rollback mas facil
diagnostico mas rapido`;

const rollbackQuestionSnippet = `si esto falla
como volvemos atras?`;

const rollbackCommandSnippet = `kubectl rollout undo`;

const blueGreenSnippet = `Blue/Green switch`;

const featureFlagSnippet = `Feature Flag OFF`;

const recoverySnippet = `Impacto minimo`;

const recoverySpeedSnippet = `Velocidad de recuperacion > velocidad de despliegue`;

const ownershipQuestionSnippet = `quien es responsable del servicio?`;

const badOwnershipSnippet = `infraestructura
desarrollo`;

const goodOwnershipSnippet = `el equipo completo`;

const youBuildItSnippet = `quien construye
tambien opera`;

const benefitsSnippet = `entiendes mejor los fallos
disenas mejor
monitorizas mejor`;

const fearQuestionSnippet = `"me da miedo desplegar"`;

const missingPiecesSnippet = `tests
observabilidad
rollback
automatizacion`;

const deploySuccessSnippet = `Deploy Success`;

const postDeployMetricsSnippet = `latencia
errores
metricas de negocio
logs
traces`;

const deployDoneSnippet = `deploy terminado != deploy exitoso`;

const businessMetricsSnippet = `Checkout completados
Pedidos creados`;

const zeroErrorSnippet = `0 errores tecnicos`;

const salesDownSnippet = `ventas cayendo`;

const learningWrongSnippet = `quien fue?`;

const learningRightSnippet = `que permitio que esto ocurriera?`;

const juniorSnippet = `quiero que el deploy salga bien`;

const seniorSnippet = `quiero que el sistema sea seguro
incluso cuando el deploy salga mal`;

const builtSoFarSnippet = `Docker

Kubernetes

Health Checks

Escalado

Observabilidad

Seguridad

CI/CD

Operacion

Cultura de Plataforma`;

const reflectionSnippet = `Los mejores equipos no son los que nunca fallan.
Son los que detectan rapido, recuperan rapido y aprenden rapido.`;

const finalDeploySnippet = `¿Existe rollback?
¿Cuanto tarda?`;

const finalObservabilitySnippet = `¿Como detectarías una degradacion?`;

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

export default function Daily102Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/101";
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
            <Link className={styles.btn} href="/daily/101">
              <span className={styles.kbd}>←</span> Dia 101
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
                <div className={styles.badge}>Daily #102 • Platform Culture</div>
                <h2 className={styles.title}>Cultura de plataforma, deploys y rollback</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Cultura</span>
                  <span className={styles.chip}>Tag: Deploys</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                  <span className={styles.chip}>Tag: Produccion</span>
                </div>

                <p className={styles.lead}>
                  La madurez de una plataforma no se mide por la tecnologia que usa, sino por la confianza con la que
                  el equipo puede cambiarla.
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
                    <p className={styles.sub}>Muchos problemas de produccion son problemas de proceso.</p>
                  </div>
                  <span className={styles.chip}>Cultura</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{technologiesSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                    <li>CI/CD</li>
                    <li>Observabilidad</li>
                    <li>Seguridad</li>
                    <li>Operacion</li>
                  </ul>
                  <div className={styles.callout}>Los problemas de produccion rara vez son problemas tecnicos puros.</div>
                </div>
              </section>

              <section className={styles.section} id="platform-culture">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que significa Cultura de Plataforma</h3>
                    <p className={styles.sub}>Una forma de trabajar, no una herramienta.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cultureQuestionSnippet}</pre>
                  <pre>{cultureDefinitionSnippet}</pre>
                  <pre>{notToolSnippet}</pre>
                  <pre>{notYamlSnippet}</pre>
                  <pre>{processSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema clasico</h3>
                    <p className={styles.sub}>Si produccion da miedo, el equipo despliega menos y arriesga mas.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fearSnippet}</pre>
                  <pre>{fewerDeploysSnippet}</pre>
                  <pre>{bigChangesSnippet}</pre>
                  <pre>{moreRiskSnippet}</pre>
                  <pre>{moreFearSnippet}</pre>
                  <div className={styles.callout}>Circulo vicioso.</div>
                </div>
              </section>

              <section className={styles.section} id="mature-teams">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como trabajan los equipos maduros</h3>
                    <p className={styles.sub}>No dejan de desplegar; reducen el riesgo.</p>
                  </div>
                  <span className={styles.chip}>Madurez</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{reduceRiskSnippet}</pre>
                  <div className={styles.quote}>Diferencia enorme.</div>
                </div>
              </section>

              <section className={styles.section} id="trust">
                <div className={styles.shd}>
                  <div>
                    <h3>5. La confianza en produccion</h3>
                    <p className={styles.sub}>La confianza nace de pruebas, observabilidad y rollback.</p>
                  </div>
                  <span className={styles.chip}>Confianza</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whyDeployOftenSnippet}</pre>
                  <pre>{trustIngredientsSnippet}</pre>
                  <pre>{trustSnippet}</pre>
                  <pre>{trustTermSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="environment">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Produccion no deberia ser especial</h3>
                    <p className={styles.sub}>Los entornos deben parecerse lo maximo posible.</p>
                  </div>
                  <span className={styles.chip}>Entornos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{prodSpecialSnippet}</pre>
                  <pre>{similarSnippet}</pre>
                  <pre>{surpriseSnippet}</pre>
                  <pre>{expensiveSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="small-deploys">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Deploy pequeño vs deploy grande</h3>
                    <p className={styles.sub}>Cambios pequeños reducen riesgo y aceleran diagnostico.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deployRhythmSnippet}</pre>
                  <h4>Malo</h4>
                  <pre>{badDeploySnippet}</pre>
                  <h4>Bueno</h4>
                  <pre>{goodDeploySnippet}</pre>
                  <pre>{smallDeployBenefitsSnippet}</pre>
                  <div className={styles.callout}>Deploy pequeño = menor superficie de fallo.</div>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Rollback</h3>
                    <p className={styles.sub}>Debe estar diseñado antes del deploy.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rollbackQuestionSnippet}</pre>
                  <pre>{rollbackCommandSnippet}</pre>
                  <pre>{blueGreenSnippet}</pre>
                  <pre>{featureFlagSnippet}</pre>
                  <pre>{recoverySnippet}</pre>
                  <pre>{recoverySpeedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ownership">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Ownership</h3>
                    <p className={styles.sub}>Responsabilidad compartida del equipo completo.</p>
                  </div>
                  <span className={styles.chip}>Ownership</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ownershipQuestionSnippet}</pre>
                  <pre>{badOwnershipSnippet}</pre>
                  <pre>{goodOwnershipSnippet}</pre>
                  <div className={styles.quote}>Responsabilidad compartida.</div>
                </div>
              </section>

              <section className={styles.section} id="you-build-it">
                <div className={styles.shd}>
                  <div>
                    <h3>10. You Build It, You Run It</h3>
                    <p className={styles.sub}>Quien construye tambien opera.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{youBuildItSnippet}</pre>
                  <pre>{benefitsSnippet}</pre>
                  <div className={styles.callout}>Acerca desarrollo a produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="fear">
                <div className={styles.shd}>
                  <div>
                    <h3>11. El miedo a produccion</h3>
                    <p className={styles.sub}>El miedo suele indicar una carencia de proceso.</p>
                  </div>
                  <span className={styles.chip}>Señal</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fearQuestionSnippet}</pre>
                  <pre>{missingPiecesSnippet}</pre>
                  <div className={styles.quote}>El miedo suele ser sintoma.</div>
                </div>
              </section>

              <section className={styles.section} id="post-deploy">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que mira un equipo maduro despues del deploy</h3>
                    <p className={styles.sub}>No basta con ver Deploy Success.</p>
                  </div>
                  <span className={styles.chip}>Post-deploy</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deploySuccessSnippet}</pre>
                  <pre>{postDeployMetricsSnippet}</pre>
                  <pre>{deployDoneSnippet}</pre>
                  <pre>{businessMetricsSnippet}</pre>
                  <pre>{zeroErrorSnippet}</pre>
                  <pre>{salesDownSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="business">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Metricas de negocio</h3>
                    <p className={styles.sub}>La tecnica no siempre cuenta toda la historia.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>0 errores tecnicos no garantiza ventas sanas.</div>
                </div>
              </section>

              <section className={styles.section} id="learning">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Cultura de aprendizaje</h3>
                    <p className={styles.sub}>Aprender del sistema, no buscar culpables.</p>
                  </div>
                  <span className={styles.chip}>Aprendizaje</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{learningWrongSnippet}</pre>
                  <pre>{learningRightSnippet}</pre>
                  <div className={styles.quote}>Mejorar sistemas, no buscar culpables.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa un backend senior</h3>
                    <p className={styles.sub}>El sistema debe ser seguro incluso si el deploy sale mal.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Diseñar para errores humanos.</div>
                </div>
              </section>

              <section className={styles.section} id="block">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Que has construido hasta ahora</h3>
                    <p className={styles.sub}>El cierre real del bloque 91–102.</p>
                  </div>
                  <span className={styles.chip}>Bloque</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{builtSoFarSnippet}</pre>
                  <div className={styles.quote}>Este es el verdadero cierre del bloque.</div>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Proyecto Final del Bloque</h3>
                    <p className={styles.sub}>Responder estas preguntas en tu proyecto actual.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>30 min</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Deploy: existe rollback? cuanto tarda?</li>
                    <li>Observabilidad: como detectarias una degradacion?</li>
                    <li>Seguridad: donde estan los secretos?</li>
                    <li>Escalado: que ocurre si duplicas el trafico?</li>
                    <li>Operacion: quien recibe una alerta a las 3 AM?</li>
                    <li>Cultura: el equipo confia en produccion?</li>
                  </ul>
                  <h4>Deploy</h4>
                  <pre>{finalDeploySnippet}</pre>
                  <h4>Observabilidad</h4>
                  <pre>{finalObservabilitySnippet}</pre>
                  <h4>Seguridad</h4>
                  <pre>{finalSecuritySnippet}</pre>
                  <h4>Escalado</h4>
                  <pre>{finalScalingSnippet}</pre>
                  <h4>Operacion</h4>
                  <pre>{finalOperationSnippet}</pre>
                  <h4>Cultura</h4>
                  <pre>{finalCultureSnippet}</pre>
                  <h4>Reflexion final</h4>
                  <pre>{finalReflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>La cultura es tan importante como la tecnologia.</li>
                    <li>Los deploys pequenos reducen riesgo.</li>
                    <li>Rollback es una capacidad estrategica.</li>
                    <li>Produccion debe inspirar confianza, no miedo.</li>
                    <li>Los equipos maduros aprenden de los incidentes.</li>
                  </ul>
                  <div className={styles.quote}>
                    Los mejores equipos no son los que nunca fallan. Son los que detectan rapido, recuperan rapido y
                    aprenden rapido.
                  </div>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/101">
                      ← Dia 101
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
                    <h3>Cierre del bloque 91–102</h3>
                    <p className={styles.sub}>Plataforma y operacion en produccion.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{reflectionSnippet}</pre>
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
                  <p>Dia 102 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Cultura:</strong> despliegues pequenos, rollback rapido y confianza operativa.
                </div>
                <div className={styles.li}>
                  <strong>Ownership:</strong> el equipo completo construye y opera el servicio.
                </div>
                <div className={styles.li}>
                  <strong>Aprendizaje:</strong> los incidentes deben mejorar el sistema, no buscar culpables.
                </div>
                <div className={styles.li}>
                  <strong>Cierre:</strong> plataforma y proceso existen para que el equipo cambie sistemas complejos con
                  confianza.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
