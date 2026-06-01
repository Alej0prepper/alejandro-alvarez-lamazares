"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "breaks", label: "4) Que rompe" },
  { id: "pipeline", label: "5) Pipeline" },
  { id: "smoke", label: "6) Smoke tests" },
  { id: "rollback", label: "7) Rollback" },
  { id: "flags", label: "8) Flags" },
  { id: "health", label: "9) Health checks" },
  { id: "monitoring", label: "10) Monitoreo" },
  { id: "business", label: "11) Negocio" },
  { id: "small", label: "12) Deploys pequenos" },
  { id: "during", label: "13) Durante deploy" },
  { id: "checklist", label: "14) Checklist" },
  { id: "senior", label: "15) Senior" },
  { id: "mini-project", label: "Practica" },
  { id: "deepening", label: "Profundizacion" },
] as const;

const fridayDeploySnippet = `viernes
5:00 PM
deploy a produccion`;

const chaosSnippet = `errores
clientes llamando
rollback urgente`;

const juniorSnippet = `merge
deploy
rezar`;

const seniorSnippet = `que pasa si algo sale mal?`;

const compileSnippet = `compilar`;

const testsSnippet = `unit tests
integration tests`;

const smokeSnippet = `login
checkout
health checks`;

const basicQuestionSnippet = `lo basico sigue funcionando?`;

const rollbackQuestionSnippet = `si esto falla,
como volvemos atras?`;

const newCodeSnippet = `codigo nuevo`;

const offSnippet = `apagado`;

const disableFlagSnippet = `desactivar flag`;

const deploymentCompletedSnippet = `deployment completado`;

const healthSnippet = `/health`;

const checkoutCompletedSnippet = `checkout completados`;

const okSnippet = `200 OK`;

const businessWorksSnippet = `negocio funcionando`;

const nobodyPaysSnippet = `nadie puede pagar`;

const hugeDeploySnippet = `200 cambios
50 features
30 fixes`;

const liveSystemSnippet = `requests activas
background jobs
colas
cache
DB`;

const dockerDeploySnippet = `docker deploy`;

const deployQuestionSnippet = `"como hacemos deploy?"`;

const riskQuestionSnippet = `como reducimos el riesgo del deploy?`;

const newCheckoutSnippet = `nuevo checkout`;

const recoveryPlanSnippet = `el deploy mas peligroso es aquel que no tiene plan de recuperacion`;

export default function Daily86Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/85";
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
            <Link className={styles.btn} href="/daily/85">
              <span className={styles.kbd}>←</span> Dia 85
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
                <div className={styles.createdAt}>01/06/2026</div>
                <div className={styles.badge}>Daily #86 • Backend Operations</div>
                <h2 className={styles.title}>Deployments seguros</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Produccion</span>
                </div>

                <p className={styles.lead}>
                  Un deployment seguro no es solo publicar una version. Es reducir riesgo, validar que el negocio sigue
                  funcionando y tener plan de recuperacion.
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
                    <p className={styles.sub}>El problema no es desplegar. Es desplegar de forma insegura.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fridayDeploySnippet}</pre>
                  <p>Diez minutos despues:</p>
                  <pre>{chaosSnippet}</pre>
                  <div className={styles.callout}>El objetivo no es desplegar rapido. Es desplegar con confianza.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Publicar minimizando riesgo para usuarios y negocio.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Deployment seguro es un proceso controlado para publicar una nueva version minimizando el riesgo
                    para los usuarios y el negocio.
                  </p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa el backend</h3>
                    <p className={styles.sub}>El punto clave es anticipar recuperacion.</p>
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

              <section className={styles.section} id="breaks">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que puede romperse en un deploy</h3>
                    <p className={styles.sub}>Muchas veces el problema no esta en el codigo.</p>
                  </div>
                  <span className={styles.chip}>Riesgos</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>codigo</li>
                    <li>configuracion</li>
                    <li>variables de entorno</li>
                    <li>base de datos</li>
                    <li>integraciones externas</li>
                    <li>caches</li>
                    <li>permisos</li>
                    <li>feature flags</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="pipeline">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Pipeline ideal</h3>
                    <p className={styles.sub}>Nunca saltar directamente de desarrollo a produccion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Pipeline</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Build</h4>
                  <pre>{compileSnippet}</pre>
                  <h4>Paso 2 - Tests automaticos</h4>
                  <pre>{testsSnippet}</pre>
                  <h4>Paso 3</h4>
                  <p>Deploy a staging.</p>
                  <h4>Paso 4</h4>
                  <p>Validacion.</p>
                  <h4>Paso 5</h4>
                  <p>Deploy a produccion.</p>
                  <div className={styles.callout}>Nunca saltar directamente de desarrollo a produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="smoke">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Smoke tests</h3>
                    <p className={styles.sub}>Pruebas minimas despues del deploy.</p>
                  </div>
                  <span className={styles.chip}>Validacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{smokeSnippet}</pre>
                  <p>Pregunta:</p>
                  <pre>{basicQuestionSnippet}</pre>
                  <div className={styles.callout}>Detectan muchos problemas rapidamente.</div>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Rollback</h3>
                    <p className={styles.sub}>Todo deployment deberia tener estrategia de vuelta atras.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rollbackQuestionSnippet}</pre>
                  <p>Si no tienes respuesta, estas desplegando con riesgo.</p>
                  <div className={styles.callout}>Todo deployment deberia tener estrategia de rollback.</div>
                </div>
              </section>

              <section className={styles.section} id="flags">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Feature Flags y deployments</h3>
                    <p className={styles.sub}>Puedes desplegar codigo sin activarlo.</p>
                  </div>
                  <span className={styles.chip}>Flags</span>
                </div>
                <div className={styles.sbd}>
                  <p>Puedes desplegar:</p>
                  <pre>{newCodeSnippet}</pre>
                  <p>Pero mantenerlo:</p>
                  <pre>{offSnippet}</pre>
                  <p>Si algo sale mal:</p>
                  <pre>{disableFlagSnippet}</pre>
                  <p>Sin redeploy.</p>
                  <div className={styles.callout}>Mucho mas seguro.</div>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Health checks despues del deploy</h3>
                    <p className={styles.sub}>Deploy exitoso no significa sistema sano.</p>
                  </div>
                  <span className={styles.chip}>Health</span>
                </div>
                <div className={styles.sbd}>
                  <p>No basta con:</p>
                  <pre>{deploymentCompletedSnippet}</pre>
                  <p>Hay que verificar:</p>
                  <pre>{healthSnippet}</pre>
                  <p>La aplicacion podria arrancar pero estar rota.</p>
                  <div className={styles.callout}>Deploy exitoso no equivale a sistema sano.</div>
                </div>
              </section>

              <section className={styles.section} id="monitoring">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Que monitorear despues del deploy</h3>
                    <p className={styles.sub}>Tambien debes mirar metricas de negocio.</p>
                  </div>
                  <span className={styles.chip}>Monitoreo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>latencia</li>
                    <li>error rate</li>
                    <li>CPU</li>
                    <li>RAM</li>
                    <li>timeouts</li>
                    <li>logs</li>
                    <li>metricas de negocio</li>
                  </ul>
                  <p>Ejemplo:</p>
                  <pre>{checkoutCompletedSnippet}</pre>
                  <div className={styles.quote}>Esto ultimo suele olvidarse.</div>
                </div>
              </section>

              <section className={styles.section} id="business">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Mirar solo 200 OK no valida el negocio.</p>
                  </div>
                  <span className={styles.chip}>Negocio</span>
                </div>
                <div className={styles.sbd}>
                  <p>Solo revisar:</p>
                  <pre>{okSnippet}</pre>
                  <p>Pero no verificar:</p>
                  <pre>{businessWorksSnippet}</pre>
                  <p>Ejemplo: la API responde, pero:</p>
                  <pre>{nobodyPaysSnippet}</pre>
                  <p>Desastre.</p>
                </div>
              </section>

              <section className={styles.section} id="small">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Despliegues pequenos</h3>
                    <p className={styles.sub}>Menos cambios reducen riesgo y simplifican rollback.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Malo</h4>
                  <pre>{hugeDeploySnippet}</pre>
                  <h4>Mejor</h4>
                  <p>Deploys pequenos.</p>
                  <ul className={styles.bullets}>
                    <li>menos riesgo</li>
                    <li>mas faciles de revertir</li>
                    <li>mas faciles de diagnosticar</li>
                  </ul>
                  <div className={styles.quote}>Las empresas maduras despliegan constantemente.</div>
                </div>
              </section>

              <section className={styles.section} id="during">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Que pasa durante un deploy</h3>
                    <p className={styles.sub}>El sistema completo esta vivo.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Backend senior piensa:</p>
                  <pre>{liveSystemSnippet}</pre>
                  <p>No solo:</p>
                  <pre>{dockerDeploySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Checklist mental antes de desplegar</h3>
                    <p className={styles.sub}>Si alguna respuesta es no, aumenta el riesgo.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Los tests pasaron?</li>
                    <li>Health checks funcionan?</li>
                    <li>Existe rollback?</li>
                    <li>La configuracion es correcta?</li>
                    <li>Las migraciones son compatibles?</li>
                    <li>Se monitoreara el resultado?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa alguien senior</h3>
                    <p className={styles.sub}>La meta es reducir riesgo del deploy.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{deployQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{riskQuestionSnippet}</pre>
                  <div className={styles.quote}>
                    Un buen deployment no es el que termina. Es el que puede recuperarse rapidamente si algo sale mal.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Disenar un despliegue seguro.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{newCheckoutSnippet}</pre>

                  <h4>Paso 1</h4>
                  <p>Que validarias antes del deploy?</p>

                  <h4>Paso 2</h4>
                  <p>Que monitorearias despues?</p>

                  <h4>Paso 3</h4>
                  <p>Como harias rollback?</p>

                  <h4>Paso 4</h4>
                  <p>Usarias feature flag?</p>

                  <h4>Paso 5 - Reflexion clave</h4>
                  <pre>{recoveryPlanSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>desplegar implica riesgo</li>
                    <li>rollback es obligatorio</li>
                    <li>health checks son fundamentales</li>
                    <li>feature flags reducen impacto</li>
                    <li>observabilidad permite reaccionar rapido</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="deepening">
                <div className={styles.shd}>
                  <div>
                    <h3>Proyecto de profundizacion</h3>
                    <p className={styles.sub}>Deployment Readiness Checklist.</p>
                  </div>
                  <span className={styles.chip}>15-20 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Antes del deploy</h4>
                  <ul className={styles.bullets}>
                    <li>tests ejecutados</li>
                    <li>configuracion validada</li>
                    <li>variables de entorno revisadas</li>
                    <li>health checks funcionando</li>
                  </ul>

                  <h4>Durante el deploy</h4>
                  <ul className={styles.bullets}>
                    <li>monitorear logs</li>
                    <li>monitorear errores</li>
                    <li>monitorear latencia</li>
                  </ul>

                  <h4>Despues del deploy</h4>
                  <ul className={styles.bullets}>
                    <li>ejecutar smoke tests</li>
                    <li>verificar metricas de negocio</li>
                    <li>confirmar que existe rollback</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior celebra cuando el deploy termina. Backend senior celebra cuando el deploy termina,
                    el negocio sigue funcionando y existe plan claro para recuperarse si algo falla.
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
