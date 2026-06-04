"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "mistake", label: "2) Error" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "shift", label: "4) Cambio mental" },
  { id: "checkout", label: "5) Checkout" },
  { id: "resilience", label: "6) Resiliencia" },
  { id: "tools", label: "7) Tecnicas" },
  { id: "partial", label: "8) Parciales" },
  { id: "degraded", label: "9) Degradado" },
  { id: "isolation", label: "10) Aislamiento" },
  { id: "cascade", label: "11) Cascadas" },
  { id: "spof", label: "12) SPOF" },
  { id: "observability", label: "13) Observabilidad" },
  { id: "mental", label: "14) Ejemplo" },
  { id: "chaos", label: "15) Chaos" },
  { id: "senior", label: "16) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const juniorDesignSnippet = `como funciona?`;

const seniorDesignSnippet = `como falla?`;

const happyPathSnippet = `Cliente
  |
API
  |
Payment Service
  |
Success`;

const paymentFailsQuestionSnippet = `y si Payment Service falla?`;

const juniorSnippet = `si todo funciona, estamos bien`;

const seniorSnippet = `cuando algo falle,
que ocurrira?`;

const worksQuestionSnippet = `funciona?`;

const failureQuestionSnippet = `como falla?`;

const willFailSnippet = `va a fallar`;

const checkoutSnippet = `POST /checkout`;

const paymentServiceSnippet = `payment-service`;

const paymentWorksSnippet = `el pago funciona?`;

const paymentTimeoutSnippet = `que hacemos si el pago tarda 30 segundos?`;

const pessimismSnippet = `todo saldra mal`;

const preparedSnippet = `estoy preparado si sale mal`;

const partialFailureSnippet = `Checkout funciona
Analytics falla`;

const wholeSystemQuestionSnippet = `debe caer todo?`;

const degradedModeSnippet = `Degraded Mode`;

const normalModeSnippet = `checkout
analytics
emails
reporting`;

const degradedOnlySnippet = `checkout`;

const disabledSnippet = `desactivado temporalmente`;

const isolationQuestionSnippet = `si este componente falla,
que mas cae?`;

const everythingSnippet = `todo`;

const isolatedFailuresSnippet = `fallos aislados`;

const cascadeSnippet = `API A
  |
API B
  |
API C`;

const cascadeResultSnippet = `B se degrada
A se degrada`;

const spofQuestionSnippet = `que componente tumba todo el sistema?`;

const detectionQuestionSnippet = `como sabremos que estamos fallando?`;

const resilientFlowSnippet = `timeout
  |
retry
  |
circuit breaker
  |
degraded mode
  |
alerta`;

const naiveFlowSnippet = `esperar
esperar
esperar
esperar`;

const redisQuestionSnippet = `sobrevivimos si Redis desaparece?`;

const slowApiQuestionSnippet = `sobrevivimos si una API tarda 60 segundos?`;

const todaySnippet = `hoy`;

const incidentSnippet = `durante un incidente real`;

const neverFailSnippet = `como hacemos que nunca falle?`;

const limitImpactSnippet = `como hacemos que el fallo tenga el menor impacto posible?`;

const dependencyFailureSnippet = `que ocurre si desaparece?`;

const classificationSnippet = `critico
degradable
opcional`;

const proSystemsSnippet = `los sistemas profesionales no asumen exito permanente`;

export default function Daily89Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/88";
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
            <Link className={styles.btn} href="/daily/88">
              <span className={styles.kbd}>←</span> Dia 88
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
                <div className={styles.badge}>Daily #89 • Backend Resilience</div>
                <h2 className={styles.title}>Diseno para fallos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Fallos</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Arquitectura</span>
                </div>

                <p className={styles.lead}>
                  Disenar para fallos significa asumir que todo puede romperse y construir el sistema para limitar el
                  impacto cuando ocurra.
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
                    <p className={styles.sub}>Todo falla eventualmente.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior disena pensando</h4>
                  <pre>{juniorDesignSnippet}</pre>
                  <h4>Backend senior disena pensando</h4>
                  <pre>{seniorDesignSnippet}</pre>
                  <p>Todo falla: APIs externas, Redis, DB, colas, DNS, red, Kubernetes y usuarios.</p>
                  <div className={styles.callout}>Disenar para fallos significa asumir que los fallos son inevitables.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El error mas comun</h3>
                    <p className={styles.sub}>Disenar solo el happy path.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{happyPathSnippet}</pre>
                  <p>Todo funciona. Pero nadie pregunta:</p>
                  <pre>{paymentFailsQuestionSnippet}</pre>
                  <p>Ahi empiezan los problemas reales.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa el backend</h3>
                    <p className={styles.sub}>La pregunta real es que ocurre cuando algo falla.</p>
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

              <section className={styles.section} id="shift">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El cambio mental mas importante</h3>
                    <p className={styles.sub}>No preguntar si funciona. Preguntar como falla.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No preguntar:</p>
                  <pre>{worksQuestionSnippet}</pre>
                  <p>Preguntar:</p>
                  <pre>{failureQuestionSnippet}</pre>
                  <p>Porque tarde o temprano:</p>
                  <pre>{willFailSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="checkout">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Ejemplo real</h3>
                    <p className={styles.sub}>Checkout depende de payment-service.</p>
                  </div>
                  <span className={styles.chip}>Checkout</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Depende de:</p>
                  <pre>{paymentServiceSnippet}</pre>
                  <h4>Pregunta junior</h4>
                  <pre>{paymentWorksSnippet}</pre>
                  <h4>Pregunta senior</h4>
                  <pre>{paymentTimeoutSnippet}</pre>
                  <div className={styles.callout}>Esa es arquitectura real.</div>
                </div>
              </section>

              <section className={styles.section} id="resilience">
                <div className={styles.shd}>
                  <div>
                    <h3>6. No es pesimismo</h3>
                    <p className={styles.sub}>Disenar para fallos significa resiliencia.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <p>No estas diciendo:</p>
                  <pre>{pessimismSnippet}</pre>
                  <p>Estas diciendo:</p>
                  <pre>{preparedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tools">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Tecnicas que ya viste</h3>
                    <p className={styles.sub}>Todas existen porque los fallos existen.</p>
                  </div>
                  <span className={styles.chip}>Tecnicas</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>timeouts: no esperar eternamente</li>
                    <li>retries: intentar recuperarse</li>
                    <li>circuit breakers: aislar dependencias rotas</li>
                    <li>health checks: detectar degradacion</li>
                    <li>graceful shutdown: apagar correctamente</li>
                    <li>feature flags: reducir riesgo</li>
                    <li>blue/green: rollback rapido</li>
                    <li>canary: reducir impacto</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="partial">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Fallos parciales</h3>
                    <p className={styles.sub}>No todos los fallos deben tumbar todo el sistema.</p>
                  </div>
                  <span className={styles.chip}>Parcial</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{partialFailureSnippet}</pre>
                  <p>Pregunta:</p>
                  <pre>{wholeSystemQuestionSnippet}</pre>
                  <p>Probablemente no. Entonces aparece:</p>
                  <pre>{degradedModeSnippet}</pre>
                  <div className={styles.callout}>Disenar para fallos implica evitar fallos totales.</div>
                </div>
              </section>

              <section className={styles.section} id="degraded">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Modo degradado</h3>
                    <p className={styles.sub}>El negocio sigue funcionando con menos capacidades.</p>
                  </div>
                  <span className={styles.chip}>Degraded</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Normal</h4>
                  <pre>{normalModeSnippet}</pre>
                  <h4>Degradado</h4>
                  <pre>{degradedOnlySnippet}</pre>
                  <p>Y el resto:</p>
                  <pre>{disabledSnippet}</pre>
                  <div className={styles.callout}>Mucho mejor que una caida completa.</div>
                </div>
              </section>

              <section className={styles.section} id="isolation">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Aislamiento</h3>
                    <p className={styles.sub}>Backend resiliente busca fallos aislados.</p>
                  </div>
                  <span className={styles.chip}>Aislamiento</span>
                </div>
                <div className={styles.sbd}>
                  <p>Pregunta:</p>
                  <pre>{isolationQuestionSnippet}</pre>
                  <p>Si la respuesta es:</p>
                  <pre>{everythingSnippet}</pre>
                  <p>mala arquitectura.</p>
                  <p>Backend resiliente busca:</p>
                  <pre>{isolatedFailuresSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cascade">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Cascading Failures</h3>
                    <p className={styles.sub}>Disenar para fallos intenta romper la cadena.</p>
                  </div>
                  <span className={styles.chip}>Cascada</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cascadeSnippet}</pre>
                  <p>API C cae:</p>
                  <pre>{cascadeResultSnippet}</pre>
                  <p>Efecto domino.</p>
                </div>
              </section>

              <section className={styles.section} id="spof">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Single Point of Failure</h3>
                    <p className={styles.sub}>Si existe un punto critico unico, debes conocerlo.</p>
                  </div>
                  <span className={styles.chip}>SPOF</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{spofQuestionSnippet}</pre>
                  <p>Ejemplos:</p>
                  <ul className={styles.bullets}>
                    <li>una DB</li>
                    <li>un Redis</li>
                    <li>un servicio externo</li>
                    <li>un nodo</li>
                  </ul>
                  <div className={styles.callout}>Algun dia fallara.</div>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Observabilidad</h3>
                    <p className={styles.sub}>No basta con sobrevivir. Tambien debes detectar.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{detectionQuestionSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>logs</li>
                    <li>metricas</li>
                    <li>tracing</li>
                    <li>alertas</li>
                  </ul>
                  <div className={styles.callout}>Lo que no se observa no se puede operar.</div>
                </div>
              </section>

              <section className={styles.section} id="mental">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ejemplo mental completo</h3>
                    <p className={styles.sub}>Payment Service empieza a responder lento.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend resiliente</h4>
                  <pre>{resilientFlowSnippet}</pre>
                  <h4>Backend ingenuo</h4>
                  <pre>{naiveFlowSnippet}</pre>
                  <p>Colapso.</p>
                </div>
              </section>

              <section className={styles.section} id="chaos">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Chaos Engineering</h3>
                    <p className={styles.sub}>Disenar para fallos tambien implica probar fallos.</p>
                  </div>
                  <span className={styles.chip}>Chaos</span>
                </div>
                <div className={styles.sbd}>
                  <p>Empresas grandes provocan fallos intencionalmente:</p>
                  <pre>{redisQuestionSnippet}</pre>
                  <pre>{slowApiQuestionSnippet}</pre>
                  <p>Prefieren descubrirlo:</p>
                  <pre>{todaySnippet}</pre>
                  <p>y no:</p>
                  <pre>{incidentSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Como piensa alguien senior</h3>
                    <p className={styles.sub}>La resiliencia no evita fallos, limita su impacto.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{neverFailSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{limitImpactSnippet}</pre>
                  <div className={styles.quote}>
                    La resiliencia no consiste en evitar fallos. Consiste en limitar su impacto.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Analizar tu sistema desde la perspectiva del fallo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Lista dependencias</h4>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>Redis</li>
                    <li>Email</li>
                    <li>Payment Service</li>
                  </ul>

                  <h4>Paso 2</h4>
                  <pre>{dependencyFailureSnippet}</pre>

                  <h4>Paso 3 - Clasifica</h4>
                  <pre>{classificationSnippet}</pre>

                  <h4>Paso 4 - Disena respuesta</h4>
                  <ul className={styles.bullets}>
                    <li>timeout</li>
                    <li>retry</li>
                    <li>circuit breaker</li>
                    <li>degraded mode</li>
                  </ul>

                  <h4>Paso 5 - Reflexion clave</h4>
                  <pre>{proSystemsSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>los fallos son inevitables</li>
                    <li>resiliencia es preparacion</li>
                    <li>aislamiento reduce impacto</li>
                    <li>observabilidad acelera recuperacion</li>
                    <li>disenar para fallos cambia la arquitectura</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Cual es el Single Point of Failure de tu proyecto actual?</li>
                    <li>Que dependencia podria desaparecer manana?</li>
                    <li>Que funcionalidad podria entrar en modo degradado y aun asi permitir que el negocio siga?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior disena para el exito. Backend senior disena para que el sistema siga funcionando
                    cuando las cosas fallen.
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
