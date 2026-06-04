"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "blue-green", label: "2) Blue/Green" },
  { id: "rollback", label: "3) Rollback" },
  { id: "cost", label: "4) Costo" },
  { id: "mindset", label: "5) Mentalidad" },
  { id: "canary", label: "6) Canary" },
  { id: "real", label: "7) Ejemplo" },
  { id: "monitoring", label: "8) Monitoreo" },
  { id: "comparison", label: "9) Comparacion" },
  { id: "flags", label: "10) Feature Flags" },
  { id: "health", label: "11) Health Checks" },
  { id: "cloud", label: "12) Cloud" },
  { id: "mistake", label: "13) Error" },
  { id: "business", label: "14) Negocio" },
  { id: "senior", label: "15) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const traditionalDeploySnippet = `Version vieja
  |
Deploy
  |
Version nueva`;

const strategiesSnippet = `Blue/Green Deployment
Canary Deployment`;

const blueGreenSnippet = `Blue = Produccion actual
Green = Nueva version`;

const blueTrafficSnippet = `100% trafico
  |
Blue`;

const greenSnippet = `Green`;

const greenTrafficSnippet = `100% trafico
  |
Green`;

const returnToBlueSnippet = `volver trafico a Blue`;

const secondsSnippet = `segundos`;

const twoEnvironmentsSnippet = `2 entornos completos`;

const juniorSnippet = `deploy encima de produccion`;

const seniorSnippet = `tener siempre una version estable lista para volver atras`;

const onePercentSnippet = `1%`;

const fivePercentSnippet = `5%`;

const twentyPercentSnippet = `20%`;

const fiftyPercentSnippet = `50%`;

const hundredPercentSnippet = `100%`;

const usersSnippet = `100.000 usuarios`;

const canaryUsersSnippet = `1.000 usuarios`;

const expandTrafficSnippet = `ampliar trafico`;

const stopRolloutSnippet = `detener despliegue`;

const checkoutCompletedSnippet = `checkout completados`;

const blueGreenPercentSnippet = `0% -> 100%`;

const instantRollbackSnippet = `rollback instantaneo`;

const moreInfraSnippet = `mas infraestructura`;

const canaryPercentSnippet = `1% -> 5% -> 20% -> 100%`;

const lessRiskSnippet = `menos riesgo`;

const moreComplexitySnippet = `mas complejidad`;

const canaryFlagsSnippet = `Canary + Feature Flags`;

const twentyUsersSnippet = `20% usuarios`;

const featureOffSnippet = `apagada`;

const instanceHealthySnippet = `la instancia esta sana?`;

const successfulDeploySnippet = `deploy exitoso = sistema sano`;

const realUsersSnippet = `usuarios reales`;

const discountAlgorithmSnippet = `nuevo algoritmo de descuentos`;

const canaryFiveSnippet = `5% usuarios`;

const salesDropSnippet = `ventas bajan 15%`;

const deployQuestionSnippet = `"como desplegamos?"`;

const impactQuestionSnippet = `como reducimos el impacto si nos equivocamos?`;

const paymentSystemSnippet = `nuevo sistema de pagos`;

const finalReflectionSnippet = `la mejor estrategia es la que minimiza el impacto de los errores inevitables`;

export default function Daily88Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/87";
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
            <Link className={styles.btn} href="/daily/87">
              <span className={styles.kbd}>←</span> Dia 87
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
                <div className={styles.createdAt}>04/06/2026</div>
                <div className={styles.badge}>Daily #88 • Backend Operations</div>
                <h2 className={styles.title}>Blue/Green y Canary Deployments</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Canary</span>
                  <span className={styles.chip}>Tag: Blue/Green</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                </div>

                <p className={styles.lead}>
                  Blue/Green y Canary reducen el impacto de errores inevitables. No hacen que los deploys nunca fallen:
                  hacen que fallen con menos dano.
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
                    <p className={styles.sub}>La nueva version puede tener bugs que no detectaste.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>En un despliegue tradicional:</p>
                  <pre>{traditionalDeploySnippet}</pre>
                  <p>Si algo sale mal, todos los usuarios sufren.</p>
                  <p>Para resolver esto aparecen:</p>
                  <pre>{strategiesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="blue-green">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Blue/Green Deployment</h3>
                    <p className={styles.sub}>Preparas otra produccion paralela.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Blue/Green</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{blueGreenSnippet}</pre>
                  <p>Actualmente:</p>
                  <pre>{blueTrafficSnippet}</pre>
                  <p>Desplegamos:</p>
                  <pre>{greenSnippet}</pre>
                  <p>pero sin trafico.</p>
                  <p>Validamos health checks, smoke tests y metricas.</p>
                  <p>Cuando todo esta bien movemos:</p>
                  <pre>{greenTrafficSnippet}</pre>
                  <div className={styles.callout}>Nunca reemplazas la produccion actual. Preparas otra produccion paralela.</div>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ventaja principal</h3>
                    <p className={styles.sub}>Rollback inmediato.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <p>Si Green falla:</p>
                  <pre>{returnToBlueSnippet}</pre>
                  <p>Tiempo:</p>
                  <pre>{secondsSnippet}</pre>
                  <p>No hace falta recompilar, redeployar ni restaurar.</p>
                  <div className={styles.callout}>Esa es la gran ventaja.</div>
                </div>
              </section>

              <section className={styles.section} id="cost">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Desventaja</h3>
                    <p className={styles.sub}>Necesitas doble infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Costo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{twoEnvironmentsSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>doble infraestructura</li>
                    <li>doble costo</li>
                  </ul>
                  <p>Para sistemas criticos suele valer la pena.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa el backend</h3>
                    <p className={styles.sub}>Siempre debe existir una version estable para volver atras.</p>
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

              <section className={styles.section} id="canary">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Canary Deployment</h3>
                    <p className={styles.sub}>Expones la nueva version gradualmente.</p>
                  </div>
                  <span className={styles.chip}>Canary</span>
                </div>
                <div className={styles.sbd}>
                  <p>No expones la nueva version a todos. Expones:</p>
                  <pre>{onePercentSnippet}</pre>
                  <p>Luego:</p>
                  <pre>{fivePercentSnippet}</pre>
                  <pre>{twentyPercentSnippet}</pre>
                  <pre>{fiftyPercentSnippet}</pre>
                  <pre>{hundredPercentSnippet}</pre>
                  <div className={styles.callout}>Si algo sale mal, afecta a pocos usuarios.</div>
                </div>
              </section>

              <section className={styles.section} id="real">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo real</h3>
                    <p className={styles.sub}>Riesgo mucho mas controlado.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supón:</p>
                  <pre>{usersSnippet}</pre>
                  <p>Nueva version:</p>
                  <pre>{canaryUsersSnippet}</pre>
                  <p>Observas errores, latencia y metricas de negocio.</p>
                  <p>Todo bien:</p>
                  <pre>{expandTrafficSnippet}</pre>
                  <p>Todo mal:</p>
                  <pre>{stopRolloutSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="monitoring">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que se monitorea durante un Canary</h3>
                    <p className={styles.sub}>Las metricas de negocio pueden ser mas importantes que CPU.</p>
                  </div>
                  <span className={styles.chip}>Monitoreo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>error rate</li>
                    <li>latencia</li>
                    <li>CPU</li>
                    <li>memory</li>
                    <li>health checks</li>
                    <li>metricas de negocio</li>
                  </ul>
                  <p>Ejemplo:</p>
                  <pre>{checkoutCompletedSnippet}</pre>
                  <div className={styles.quote}>Esto ultimo suele ser mas importante que la CPU.</div>
                </div>
              </section>

              <section className={styles.section} id="comparison">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Blue/Green vs Canary</h3>
                    <p className={styles.sub}>Ambas son validas, pero optimizan cosas distintas.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Blue/Green</h4>
                  <pre>{blueGreenPercentSnippet}</pre>
                  <p>Ventaja:</p>
                  <pre>{instantRollbackSnippet}</pre>
                  <p>Desventaja:</p>
                  <pre>{moreInfraSnippet}</pre>

                  <h4>Canary</h4>
                  <pre>{canaryPercentSnippet}</pre>
                  <p>Ventaja:</p>
                  <pre>{lessRiskSnippet}</pre>
                  <p>Desventaja:</p>
                  <pre>{moreComplexitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="flags">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Relacion con Feature Flags</h3>
                    <p className={styles.sub}>Canary y flags reducen riesgo juntos.</p>
                  </div>
                  <span className={styles.chip}>Flags</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{canaryFlagsSnippet}</pre>
                  <p>Nueva version:</p>
                  <pre>{twentyUsersSnippet}</pre>
                  <p>Nueva funcionalidad:</p>
                  <pre>{featureOffSnippet}</pre>
                  <p>Luego activan gradualmente. Riesgo aun menor.</p>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Relacion con Health Checks</h3>
                    <p className={styles.sub}>Health checks pueden detener rollouts automaticamente.</p>
                  </div>
                  <span className={styles.chip}>Health</span>
                </div>
                <div className={styles.sbd}>
                  <p>Antes de aumentar trafico preguntas:</p>
                  <pre>{instanceHealthySnippet}</pre>
                  <p>Si health checks fallan:</p>
                  <pre>{stopRolloutSnippet}</pre>
                  <div className={styles.callout}>Automatizacion real.</div>
                </div>
              </section>

              <section className={styles.section} id="cloud">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Kubernetes y Cloud Providers</h3>
                    <p className={styles.sub}>Muchos sistemas implementan esto automaticamente.</p>
                  </div>
                  <span className={styles.chip}>Cloud</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>rolling updates</li>
                    <li>canary releases</li>
                    <li>blue/green</li>
                  </ul>
                  <p>Pero debes entender el concepto primero.</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Error tipico</h3>
                    <p className={styles.sub}>Deploy exitoso no significa sistema sano.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{successfulDeploySnippet}</pre>
                  <p>Debes observar:</p>
                  <pre>{realUsersSnippet}</pre>
                  <p>Algunos errores solo aparecen bajo trafico real.</p>
                </div>
              </section>

              <section className={styles.section} id="business">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ejemplo realista</h3>
                    <p className={styles.sub}>No todos los errores son tecnicos.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{discountAlgorithmSnippet}</pre>
                  <h4>Deploy tradicional</h4>
                  <p>100% usuarios afectados.</p>
                  <h4>Canary</h4>
                  <pre>{canaryFiveSnippet}</pre>
                  <p>Detectas:</p>
                  <pre>{salesDropSnippet}</pre>
                  <p>Detienes rollout y evitas un desastre.</p>
                  <div className={styles.callout}>Algunos errores son errores de negocio.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa alguien senior</h3>
                    <p className={styles.sub}>Asume que algo puede salir mal.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{deployQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{impactQuestionSnippet}</pre>
                  <div className={styles.quote}>
                    Los mejores despliegues no son los que nunca fallan. Son los que limitan el dano cuando fallan.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Disenar un despliegue de bajo riesgo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{paymentSystemSnippet}</pre>

                  <h4>Paso 1</h4>
                  <p>Usarias Blue/Green o Canary?</p>

                  <h4>Paso 2</h4>
                  <p>Como harias rollback?</p>

                  <h4>Paso 3</h4>
                  <p>Que metricas observarias?</p>

                  <h4>Paso 4</h4>
                  <p>Combinarias Feature Flags?</p>

                  <h4>Paso 5 - Reflexion clave</h4>
                  <pre>{finalReflectionSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>produccion siempre implica riesgo</li>
                    <li>Blue/Green facilita rollback</li>
                    <li>Canary reduce exposicion</li>
                    <li>Health Checks ayudan a automatizar decisiones</li>
                    <li>Feature Flags complementan ambas estrategias</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que cambio de tu proyecto actual desplegarias con Canary?</li>
                    <li>Que sistema requeriria Blue/Green por criticidad?</li>
                    <li>Que metrica de negocio usarias para decidir si continuar o detener un rollout?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior despliega esperando que todo salga bien. Backend senior disena despliegues asumiendo
                    que algo podria salir mal.
                  </div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
