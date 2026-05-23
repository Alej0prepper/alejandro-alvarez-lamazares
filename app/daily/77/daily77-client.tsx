"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "changes", label: "4) Que cambia" },
  { id: "designs", label: "5) Disenos" },
  { id: "traits", label: "6) Caracteristicas" },
  { id: "bottlenecks", label: "7) Bottlenecks" },
  { id: "defensive", label: "8) Defensivo" },
  { id: "thinking", label: "9) Pensamiento" },
  { id: "tradeoffs", label: "10) Tradeoffs" },
  { id: "feed", label: "11) Ejemplo" },
  { id: "destroyers", label: "12) Riesgos" },
  { id: "senior", label: "13) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const loadSnippet = `100 mil usuarios
millones de requests
picos de trafico`;

const juniorSnippet = `"si funciona, esta bien"`;

const seniorSnippet = `que pasa cuando el trafico sea 100x?`;

const oneMoreQuerySnippet = `1 query mas -> irrelevante`;

const multipliedQuerySnippet = `1 query mas x millones`;

const memoryPressureSnippet = `OOM
GC pressure`;

const naiveResultSnippet = `latencia alta
fragilidad
timeouts`;

const criticalWorkSnippet = `minimo trabajo critico`;

const tenApisSnippet = `10 APIs`;

const slowDbSnippet = `1 DB lenta`;

const smallBackendSnippet = `"hacer feature"`;

const largeBackendSnippet = `"como evitar que esta feature degrade todo el sistema"`;

const feedEndpointSnippet = `GET /feed`;

const fiveHundredUsersSnippet = `500 usuarios`;

const fiftyMillionUsersSnippet = `50 millones de usuarios`;

const worksTodaySnippet = `"funciona hoy?"`;

const pressureSnippet = `seguira funcionando bajo presion extrema?`;

const checkoutSnippet = `POST /checkout`;

const checkoutLoadSnippet = `1 millon de checkouts/dia`;

const architectureSnippet = `sistemas grandes requieren arquitectura diferente`;

export default function Daily77Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/76";
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
            <Link className={styles.btn} href="/daily/76">
              <span className={styles.kbd}>←</span> Dia 76
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
                <div className={styles.createdAt}>23/05/2026</div>
                <div className={styles.badge}>Daily #77 • Backend Performance</div>
                <h2 className={styles.title}>Diseno para alta carga</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Alta carga</span>
                  <span className={styles.chip}>Tag: Escalabilidad</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Arquitectura</span>
                </div>

                <p className={styles.lead}>
                  Un backend pequeno y uno grande no se disenan igual. Alta carga cambia decisiones de DB, red,
                  memoria, concurrencia, resiliencia y observabilidad.
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
                    <p className={styles.sub}>Los sistemas pequenos y grandes no se disenan igual.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos sistemas funcionan perfectamente hasta que llegan:</p>
                  <pre>{loadSnippet}</pre>
                  <div className={styles.quote}>Un sistema pequeno y uno grande no se disenan igual.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Alta carga implica trafico, concurrencia y presion real.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Diseno para alta carga es construir sistemas preparados para soportar mucho trafico, concurrencia y
                    presion sin degradarse o colapsar.
                  </p>
                  <div className={styles.callout}>
                    Escalar no es hacer el mismo backend mas grande. Es disenar distinto.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>La pregunta deja de ser si funciona hoy.</p>
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

              <section className={styles.section} id="changes">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que cambia cuando el sistema crece</h3>
                    <p className={styles.sub}>Lo irrelevante en pequeno puede ser caro a escala.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Escala</span>
                </div>
                <div className={styles.sbd}>
                  <h4>La DB se vuelve critica</h4>
                  <p>Antes:</p>
                  <pre>{oneMoreQuerySnippet}</pre>
                  <p>Despues:</p>
                  <pre>{multipliedQuerySnippet}</pre>

                  <h4>La red importa</h4>
                  <ul className={styles.bullets}>
                    <li>latencia</li>
                    <li>retries</li>
                    <li>timeouts</li>
                    <li>fallos parciales</li>
                  </ul>

                  <h4>La memoria importa</h4>
                  <pre>{memoryPressureSnippet}</pre>

                  <h4>La concurrencia importa</h4>
                  <p>Miles de usuarios simultaneos cambian completamente el comportamiento.</p>

                  <div className={styles.callout}>Los problemas de escala rara vez aparecen con pocos usuarios.</div>
                </div>
              </section>

              <section className={styles.section} id="designs">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Diseno naive vs diseno escalable</h3>
                    <p className={styles.sub}>La diferencia clave es cuanto trabajo queda dentro del request.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Diseno naive</h4>
                  <p>Request hace todo sincronico:</p>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>email</li>
                    <li>PDF</li>
                    <li>analytics</li>
                    <li>APIs externas</li>
                  </ul>
                  <p>Resultado:</p>
                  <pre>{naiveResultSnippet}</pre>

                  <h4>Diseno escalable</h4>
                  <p>Request:</p>
                  <pre>{criticalWorkSnippet}</pre>
                  <p>Luego usa queues, background jobs, cache y workers.</p>
                  <div className={styles.callout}>Alta carga obliga a desacoplar y distribuir responsabilidades.</div>
                </div>
              </section>

              <section className={styles.section} id="traits">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Caracteristicas comunes</h3>
                    <p className={styles.sub}>Sistemas escalables combinan varias decisiones.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>stateless APIs para no depender de memoria local</li>
                    <li>cache para reducir carga innecesaria</li>
                    <li>queues para desacoplar trabajo pesado</li>
                    <li>background jobs para evitar requests largas</li>
                    <li>rate limiting para proteger recursos</li>
                    <li>horizontal scaling con mas instancias</li>
                    <li>observabilidad para diagnosticar sistemas grandes</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="bottlenecks">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Bottlenecks reales</h3>
                    <p className={styles.sub}>Escalar una parte no siempre escala el sistema completo.</p>
                  </div>
                  <span className={styles.chip}>Bottleneck</span>
                </div>
                <div className={styles.sbd}>
                  <p>Tienes:</p>
                  <pre>{tenApisSnippet}</pre>
                  <p>Pero:</p>
                  <pre>{slowDbSnippet}</pre>
                  <p>El sistema completo sigue lento.</p>
                  <div className={styles.callout}>
                    Un sistema escala tan bien como su cuello de botella principal.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="defensive">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Diseno defensivo</h3>
                    <p className={styles.sub}>En alta carga, fallos y degradacion son parte del diseno.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <p>Debes asumir que:</p>
                  <ul className={styles.bullets}>
                    <li>APIs externas fallan</li>
                    <li>DB puede degradarse</li>
                    <li>queues pueden crecer</li>
                    <li>cache puede caer</li>
                    <li>trafico puede explotar</li>
                  </ul>
                  <div className={styles.quote}>Resiliencia se vuelve parte del diseno.</div>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como cambia el pensamiento</h3>
                    <p className={styles.sub}>Una feature tambien puede degradar el sistema.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend pequeno</h4>
                  <pre>{smallBackendSnippet}</pre>

                  <h4>Backend grande</h4>
                  <pre>{largeBackendSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="tradeoffs">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Tradeoffs reales</h3>
                    <p className={styles.sub}>Alta carga obliga a decidir. No existe solucion perfecta.</p>
                  </div>
                  <span className={styles.chip}>Tradeoffs</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>consistencia vs velocidad</li>
                    <li>freshness vs cache</li>
                    <li>sync vs async</li>
                    <li>complejidad vs escalabilidad</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="feed">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Ejemplo mental</h3>
                    <p className={styles.sub}>La arquitectura cambia radicalmente con escala.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{feedEndpointSnippet}</pre>
                  <p>Con:</p>
                  <pre>{fiveHundredUsersSnippet}</pre>
                  <p>Una query directa puede funcionar.</p>

                  <p>Con:</p>
                  <pre>{fiftyMillionUsersSnippet}</pre>
                  <p>Necesitas:</p>
                  <ul className={styles.bullets}>
                    <li>cache</li>
                    <li>precomputacion</li>
                    <li>colas</li>
                    <li>particion</li>
                    <li>CDN</li>
                    <li>procesamiento async</li>
                  </ul>

                  <div className={styles.callout}>La arquitectura cambia radicalmente con escala.</div>
                </div>
              </section>

              <section className={styles.section} id="destroyers">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que suele destruir sistemas grandes</h3>
                    <p className={styles.sub}>Los riesgos comunes se repiten en produccion.</p>
                  </div>
                  <span className={styles.chip}>Riesgos</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>requests sincronicas gigantes</li>
                    <li>DB central saturada</li>
                    <li>queries ineficientes</li>
                    <li>dependencias externas lentas</li>
                    <li>payloads enormes</li>
                    <li>falta de observabilidad</li>
                    <li>acoplamiento fuerte</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>No se queda en el estado actual del sistema.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{worksTodaySnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{pressureSnippet}</pre>

                  <div className={styles.quote}>
                    Alta carga cambia completamente la forma de disenar backend.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Pensar como cambiaria una arquitectura bajo escala real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{checkoutSnippet}</pre>
                  <p>Hoy hace todo sincronico:</p>
                  <ul className={styles.bullets}>
                    <li>guardar orden</li>
                    <li>cobrar</li>
                    <li>email</li>
                    <li>factura PDF</li>
                    <li>analytics</li>
                    <li>notificaciones</li>
                  </ul>

                  <h4>Paso 1 - Problemas mentales</h4>
                  <pre>{checkoutLoadSnippet}</pre>
                  <p>Que se rompe?</p>

                  <h4>Paso 2 - Reorganiza mentalmente</h4>
                  <p>Que moverias a queues, background jobs o cache?</p>

                  <h4>Paso 3 - Piensa bottlenecks</h4>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>pagos</li>
                    <li>red</li>
                    <li>CPU</li>
                  </ul>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{architectureSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>escala cambia arquitectura</li>
                    <li>desacoplamiento se vuelve critico</li>
                    <li>resiliencia se vuelve obligatoria</li>
                    <li>observabilidad se vuelve esencial</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu sistema moriria primero bajo alta carga?</li>
                    <li>Que operacion deberia desacoplarse?</li>
                    <li>Que dependencia externa seria mas peligrosa?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior disena para que funcione. Backend senior disena para que sobreviva bajo presion
                    extrema.
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
