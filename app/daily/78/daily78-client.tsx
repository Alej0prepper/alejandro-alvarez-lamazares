"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "domain", label: "4) Dominio" },
  { id: "eventual", label: "5) Eventual" },
  { id: "cache", label: "6) Cache" },
  { id: "replicas", label: "7) Replicas" },
  { id: "sync-async", label: "8) Sync vs async" },
  { id: "cap", label: "9) CAP" },
  { id: "senior", label: "10) Senior" },
  { id: "mistake", label: "11) Error tipico" },
  { id: "examples", label: "12) Ejemplos" },
  { id: "questions", label: "13) Preguntas" },
  { id: "mini-project", label: "Practica" },
] as const;

const bankBalanceSnippet = `saldo bancario`;

const directDbCostSnippet = `mas latencia
mas carga`;

const cacheRiskSnippet = `datos podrian estar desactualizados`;

const juniorSnippet = `"quiero todo perfecto"`;

const seniorSnippet = `que es mas importante en ESTE contexto?`;

const likeDelaySnippet = `2 segundos`;

const wrongBalanceSnippet = `saldo incorrecto`;

const orderCreatedSnippet = `Order Created`;

const freshDataSnippet = `datos frescos`;

const slowAndExpensiveSnippet = `mas lentitud
mas carga`;

const fastCacheSnippet = `mas velocidad
menos DB`;

const staleDataSnippet = `datos stale`;

const primaryDbSnippet = `writes`;

const replicaDbSnippet = `reads`;

const syncConsistencySnippet = `mas consistente`;

const syncCostSnippet = `mas lento
mas fragil`;

const asyncPerformanceSnippet = `mas rapido
mas escalable`;

const asyncCostSnippet = `consistencia eventual`;

const bestArchitectureSnippet = `"cual es la mejor arquitectura?"`;

const contextualTradeoffSnippet = `que tradeoff tiene sentido para ESTE problema?`;

const performanceAlwaysSnippet = `"mas performance siempre es mejor"`;

const fasterQuestionSnippet = `"como hago esto mas rapido"`;

const sacrificeQuestionSnippet = `que estoy sacrificando para hacerlo mas rapido`;

const stockEndpointSnippet = `GET /product-stock`;

const stockLoadSnippet = `100 mil requests/minuto`;

const conclusionSnippet = `toda arquitectura implica decisiones y costos`;

export default function Daily78Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/77";
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
            <Link className={styles.btn} href="/daily/77">
              <span className={styles.kbd}>←</span> Dia 77
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
                <div className={styles.createdAt}>25/05/2026</div>
                <div className={styles.badge}>Daily #78 • Backend Performance</div>
                <h2 className={styles.title}>Consistencia vs performance</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Tradeoffs</span>
                  <span className={styles.chip}>Tag: Consistencia</span>
                  <span className={styles.chip}>Tag: Cache</span>
                  <span className={styles.chip}>Tag: Sistemas distribuidos</span>
                </div>

                <p className={styles.lead}>
                  En sistemas grandes no puedes maximizar todo al mismo tiempo. La arquitectura real consiste en elegir
                  que sacrificar segun el dominio.
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
                    <p className={styles.sub}>No puedes maximizar consistencia, velocidad y disponibilidad a la vez.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cuando los sistemas crecen debes elegir entre:</p>
                  <ul className={styles.bullets}>
                    <li>consistencia</li>
                    <li>velocidad</li>
                    <li>disponibilidad</li>
                    <li>frescura de datos</li>
                    <li>escalabilidad</li>
                  </ul>
                  <div className={styles.quote}>Esto cambia completamente la mentalidad backend.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Consistencia y performance no siempre empujan en la misma direccion.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Consistencia</h4>
                  <p>Todos los usuarios ven los mismos datos correctos.</p>

                  <h4>Performance</h4>
                  <p>El sistema responde rapido y soporta carga.</p>

                  <h4>Ejemplo simple</h4>
                  <pre>{bankBalanceSnippet}</pre>

                  <p>Opcion A: leer siempre directo de DB. Maxima consistencia, pero:</p>
                  <pre>{directDbCostSnippet}</pre>

                  <p>Opcion B: usar cache. Mucho mas rapido, pero:</p>
                  <pre>{cacheRiskSnippet}</pre>

                  <div className={styles.callout}>A veces mejorar uno empeora el otro.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa el backend</h3>
                    <p className={styles.sub}>La respuesta correcta depende del contexto.</p>
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

              <section className={styles.section} id="domain">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El dominio decide el tradeoff</h3>
                    <p className={styles.sub}>Un feed social y una transferencia bancaria no tienen las mismas reglas.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Dominio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Feed de redes sociales</h4>
                  <p>Si un like tarda:</p>
                  <pre>{likeDelaySnippet}</pre>
                  <p>normalmente no importa. Puedes priorizar cache, performance y escalabilidad.</p>

                  <h4>Transferencias bancarias</h4>
                  <pre>{wrongBalanceSnippet}</pre>
                  <p>Eso es inaceptable. Priorizas consistencia, transacciones y exactitud aunque sea mas lento.</p>

                  <div className={styles.callout}>El dominio determina que tradeoff aceptar.</div>
                </div>
              </section>

              <section className={styles.section} id="eventual">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Eventual consistency</h3>
                    <p className={styles.sub}>Los datos convergen despues, no necesariamente al instante.</p>
                  </div>
                  <span className={styles.chip}>Distribuido</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ejemplo:</p>
                  <pre>{orderCreatedSnippet}</pre>
                  <p>Luego se actualizan inventory, analytics y notifications.</p>
                  <p>El sistema no es instantaneamente consistente, pero escala mucho mejor.</p>
                  <div className={styles.callout}>
                    Sistemas altamente escalables suelen sacrificar consistencia inmediata.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="cache">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Cache vs consistencia</h3>
                    <p className={styles.sub}>Cache acelera, pero puede devolver informacion vieja.</p>
                  </div>
                  <span className={styles.chip}>Cache</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin cache</h4>
                  <pre>{freshDataSnippet}</pre>
                  <p>Pero:</p>
                  <pre>{slowAndExpensiveSnippet}</pre>

                  <h4>Con cache</h4>
                  <pre>{fastCacheSnippet}</pre>
                  <p>Pero:</p>
                  <pre>{staleDataSnippet}</pre>

                  <div className={styles.callout}>Toda optimizacion tiene costo.</div>
                </div>
              </section>

              <section className={styles.section} id="replicas">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Read replicas</h3>
                    <p className={styles.sub}>Distribuir lecturas puede introducir retraso de datos.</p>
                  </div>
                  <span className={styles.chip}>DB</span>
                </div>
                <div className={styles.sbd}>
                  <h4>DB principal</h4>
                  <pre>{primaryDbSnippet}</pre>

                  <h4>Replicas</h4>
                  <pre>{replicaDbSnippet}</pre>

                  <p>Problema: la replica puede ir retrasada.</p>
                  <p>Resultado: usuario escribe y luego lee datos antiguos.</p>
                  <div className={styles.quote}>Otro tradeoff real.</div>
                </div>
              </section>

              <section className={styles.section} id="sync-async">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Sync vs async</h3>
                    <p className={styles.sub}>La asincronia mejora escalabilidad, pero cambia garantias.</p>
                  </div>
                  <span className={styles.chip}>Async</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sincrono</h4>
                  <pre>{syncConsistencySnippet}</pre>
                  <p>Pero:</p>
                  <pre>{syncCostSnippet}</pre>

                  <h4>Asincrono</h4>
                  <pre>{asyncPerformanceSnippet}</pre>
                  <p>Pero:</p>
                  <pre>{asyncCostSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cap">
                <div className={styles.shd}>
                  <div>
                    <h3>9. CAP Theorem</h3>
                    <p className={styles.sub}>Introduccion ligera: los sistemas distribuidos implican concesiones.</p>
                  </div>
                  <span className={styles.chip}>CAP</span>
                </div>
                <div className={styles.sbd}>
                  <p>En sistemas distribuidos no puedes maximizar simultaneamente:</p>
                  <ul className={styles.bullets}>
                    <li>consistencia</li>
                    <li>disponibilidad</li>
                    <li>tolerancia a particiones</li>
                  </ul>
                  <div className={styles.callout}>
                    Sistemas distribuidos consisten en gestionar tradeoffs, no en eliminarlos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como piensa alguien senior</h3>
                    <p className={styles.sub}>No busca una arquitectura universal.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{bestArchitectureSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{contextualTradeoffSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Mas performance no siempre es mejor.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{performanceAlwaysSnippet}</pre>
                  <p>No si rompes:</p>
                  <ul className={styles.bullets}>
                    <li>exactitud</li>
                    <li>negocio</li>
                    <li>consistencia critica</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="examples">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Ejemplos reales</h3>
                    <p className={styles.sub}>No existe respuesta universal.</p>
                  </div>
                  <span className={styles.chip}>Ejemplos</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>e-commerce: carrito puede tolerar algo de inconsistencia</li>
                    <li>banking: no puede tolerarla</li>
                    <li>analytics: consistencia eventual suele ser suficiente</li>
                    <li>inventory: depende del negocio</li>
                  </ul>
                  <div className={styles.callout}>No existe respuesta universal.</div>
                </div>
              </section>

              <section className={styles.section} id="questions">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como detectar tradeoffs importantes</h3>
                    <p className={styles.sub}>La arquitectura aparece cuando preguntas que se sacrifica.</p>
                  </div>
                  <span className={styles.chip}>Preguntas</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que pasa si los datos tardan en actualizarse?</li>
                    <li>Que pasa si cache devuelve datos viejos?</li>
                    <li>Que pasa si priorizamos velocidad?</li>
                    <li>Que pasa si priorizamos exactitud?</li>
                  </ul>

                  <h4>Backend senior</h4>
                  <p>No piensa:</p>
                  <pre>{fasterQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{sacrificeQuestionSnippet}</pre>

                  <div className={styles.quote}>
                    Backend escalable consiste en gestionar tradeoffs inteligentemente.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Pensar sistemas desde tradeoffs reales.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{stockEndpointSnippet}</pre>
                  <p>Recibe:</p>
                  <pre>{stockLoadSnippet}</pre>

                  <h4>Paso 1 - Sin cache</h4>
                  <p>Maxima consistencia. Que pasa con DB?</p>

                  <h4>Paso 2 - Con cache</h4>
                  <p>Mucho mas rapido. Que pasa si stock cambia?</p>

                  <h4>Paso 3 - Reflexion</h4>
                  <p>Que prefieres para este negocio?</p>
                  <ul className={styles.bullets}>
                    <li>exactitud</li>
                    <li>velocidad</li>
                    <li>escalabilidad</li>
                  </ul>

                  <h4>Paso 4 - Conclusion clave</h4>
                  <pre>{conclusionSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>performance tiene costo</li>
                    <li>escalabilidad tiene tradeoffs</li>
                    <li>consistencia absoluta es cara</li>
                    <li>sistemas distribuidos implican decisiones dificiles</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que datos de tu sistema toleran inconsistencia?</li>
                    <li>Que datos jamas deberian ser inconsistentes?</li>
                    <li>Donde usarias cache y donde no?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior busca soluciones perfectas. Backend senior entiende y gestiona tradeoffs reales.
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
