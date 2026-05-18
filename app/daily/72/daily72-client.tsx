"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "common", label: "4) Comunes" },
  { id: "mindset", label: "5) Mentalidad" },
  { id: "example", label: "6) Ejemplo" },
  { id: "detect", label: "7) Detectar" },
  { id: "dotnet", label: "8) .NET" },
  { id: "wrong-opt", label: "9) Error tipico" },
  { id: "mental", label: "10) Ejemplo mental" },
  { id: "senior", label: "11) Senior" },
  { id: "dynamic", label: "12) Dinamicos" },
  { id: "mini-project", label: "Practica" },
] as const;

const highwaySnippet = `6 carriles`;

const bridgeSnippet = `1 carril`;

const slowApiSnippet = `"la API esta lenta"`;

const whatIsSlowSnippet = `QUE esta lento?`;

const slowSqlSnippet = `SELECT * FROM Orders`;

const externalApisSnippet = `Stripe
Translation API
Email provider`;

const externalSpeedSnippet = `la velocidad de otro sistema`;

const hugeResponseSnippet = `50000 usuarios`;

const waitingTableSnippet = `1000 requests esperando la misma tabla`;

const juniorMindsetSnippet = `"algo esta lento"`;

const seniorMindsetSnippet = `DB?
red?
I/O?
CPU?
locks?
API externa?`;

const ordersEndpointSnippet = `GET /orders`;

const timingBreakdownSnippet = `DB query -> 4 segundos
serializacion -> 50ms
red -> 20ms`;

const dbQuerySnippet = `DB query`;

const stopwatchSnippet = `var sw = Stopwatch.StartNew();

await _service.GetOrders();

_logger.LogInformation("Tiempo: {ms}", sw.ElapsedMilliseconds);`;

const fiveMsSnippet = `ahorrar 5ms`;

const fourSecondsQuerySnippet = `una query de 4 segundos`;

const cpuSnippet = `5%`;

const dbSnippet = `100%`;

const optimizeCodeSnippet = `"optimizar codigo"`;

const findConstraintSnippet = `"encontrar la restriccion real"`;

const reportsEndpointSnippet = `GET /reports`;

const reportsBreakdownSnippet = `DB query -> 5s
serializacion -> 40ms
red -> 20ms`;

const concurrentRequestsSnippet = `1000 requests simultaneos`;

const slowestPartSnippet = `el sistema depende de su parte mas lenta`;

export default function Daily72Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/71";
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
            <Link className={styles.btn} href="/daily/71">
              <span className={styles.kbd}>←</span> Dia 71
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
                <div className={styles.createdAt}>17/05/2026</div>
                <div className={styles.badge}>Daily #72 • Backend Performance</div>
                <h2 className={styles.title}>Bottlenecks: donde se vuelven lentos los sistemas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Bottlenecks</span>
                  <span className={styles.chip}>Tag: Diagnostico</span>
                  <span className={styles.chip}>Tag: DB</span>
                </div>

                <p className={styles.lead}>
                  Un sistema no suele ser lento completo: casi siempre hay una restriccion dominante que limita todo.
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
                    <p className={styles.sub}>Normalmente no todo es lento: algo limita el rendimiento total.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Casi siempre hay un punto especifico que limita el sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Un bottleneck es la parte que impone el limite.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Bottleneck: parte del sistema que limita el rendimiento total.
                  </div>

                  <h4>Ejemplo mental</h4>
                  <p>Autopista:</p>
                  <pre>{highwaySnippet}</pre>
                  <p>Pero un puente tiene:</p>
                  <pre>{bridgeSnippet}</pre>
                  <p>Todo el trafico se ralentiza ahi.</p>

                  <div className={styles.callout}>El sistema completo es tan rapido como su parte mas lenta.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Error mas comun</h3>
                    <p className={styles.sub}>Describir el problema de forma demasiado generica.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{slowApiSnippet}</pre>
                  <p>La pregunta correcta es:</p>
                  <pre>{whatIsSlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="common">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Bottlenecks mas comunes en backend</h3>
                    <p className={styles.sub}>DB, APIs externas, red, disco, locks y CPU son sospechosos habituales.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Base de datos</h4>
                  <pre>{slowSqlSnippet}</pre>
                  <p>Sobre millones de filas puede destruir latencia.</p>
                  <ul className={styles.bullets}>
                    <li>requests lentas</li>
                    <li>CPU alta en DB</li>
                    <li>locks</li>
                    <li>timeouts</li>
                  </ul>
                  <div className={styles.callout}>Muchos problemas de performance son problemas de base de datos.</div>

                  <h4>2) APIs externas</h4>
                  <pre>{externalApisSnippet}</pre>
                  <p>Tu endpoint depende de:</p>
                  <pre>{externalSpeedSnippet}</pre>

                  <h4>3) Red</h4>
                  <p>Mover datos cuesta. Ejemplo de respuesta enorme:</p>
                  <pre>{hugeResponseSnippet}</pre>

                  <h4>4) Disco</h4>
                  <p>Comun en uploads, logs gigantes y generacion de archivos.</p>

                  <h4>5) Locks y concurrencia</h4>
                  <pre>{waitingTableSnippet}</pre>

                  <h4>6) CPU</h4>
                  <p>Menos comun en CRUD tradicional, pero aparece en compresion, imagenes, criptografia y calculos.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>Performance engineering es localizar restricciones.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorMindsetSnippet}</pre>

                  <h4>Backend senior</h4>
                  <pre>{seniorMindsetSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo importante</h3>
                    <p className={styles.sub}>El desglose de tiempos te dice donde atacar.</p>
                  </div>
                  <span className={styles.chip}>Diagnostico</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ordersEndpointSnippet}</pre>
                  <p>Dentro:</p>
                  <pre>{timingBreakdownSnippet}</pre>

                  <h4>Pregunta</h4>
                  <p>Donde esta el problema?</p>
                  <pre>{dbQuerySnippet}</pre>
                  <p>Optimizar serializacion no sirve casi nada.</p>
                </div>
              </section>

              <section className={styles.section} id="detect">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como detectar bottlenecks</h3>
                    <p className={styles.sub}>Necesitas datos por operacion, no intuiciones.</p>
                  </div>
                  <span className={styles.chip}>Medicion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>medicion: tiempo por operacion</li>
                    <li>logging: medir duracion</li>
                    <li>tracing: seguir el request completo</li>
                    <li>profiling: ver consumo de CPU/memoria</li>
                    <li>load testing: simular trafico real</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo en .NET</h3>
                    <p className={styles.sub}>Una medicion basica ya mejora el diagnostico.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{stopwatchSnippet}</pre>
                  <p>Esto no reemplaza tracing, pero ayuda a empezar.</p>
                </div>
              </section>

              <section className={styles.section} id="wrong-opt">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Error tipico</h3>
                    <p className={styles.sub}>Optimizar lo que no importa.</p>
                  </div>
                  <span className={styles.chip}>Prioridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{fiveMsSnippet}</pre>
                  <p>cuando tienes:</p>
                  <pre>{fourSecondsQuerySnippet}</pre>
                  <div className={styles.callout}>El bottleneck dominante define el sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="mental">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Otro ejemplo mental</h3>
                    <p className={styles.sub}>Agregar recursos al lugar equivocado no resuelve nada.</p>
                  </div>
                  <span className={styles.chip}>Capacidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>CPU</h4>
                  <pre>{cpuSnippet}</pre>

                  <h4>DB</h4>
                  <pre>{dbSnippet}</pre>

                  <p>Agregar mas CPU no arregla nada porque el bottleneck es DB.</p>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como cambia el pensamiento senior</h3>
                    <p className={styles.sub}>La meta no es optimizar por reflejo, sino encontrar la restriccion real.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>Antes:</p>
                  <pre>{optimizeCodeSnippet}</pre>
                  <p>Ahora:</p>
                  <pre>{findConstraintSnippet}</pre>
                  <div className={styles.callout}>Nunca optimices sin identificar primero el bottleneck.</div>
                </div>
              </section>

              <section className={styles.section} id="dynamic">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Bottlenecks dinamicos</h3>
                    <p className={styles.sub}>Cuando arreglas una restriccion, otra puede aparecer.</p>
                  </div>
                  <span className={styles.chip}>Sistema</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin cache</h4>
                  <p>DB es cuello de botella.</p>

                  <h4>Con cache</h4>
                  <p>Ahora red, serializacion o Redis pueden convertirse en el problema.</p>

                  <div className={styles.quote}>
                    El sistema no se vuelve lento porque si. Siempre hay una restriccion dominante.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Aprender a localizar cuellos de botella mentalmente.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoint</h4>
                  <pre>{reportsEndpointSnippet}</pre>

                  <h4>Datos</h4>
                  <pre>{reportsBreakdownSnippet}</pre>

                  <h4>Paso 1 - Detecta bottleneck</h4>
                  <p>Claramente DB.</p>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <p>Serviria optimizar JSON? Casi nada.</p>

                  <h4>Paso 3 - Escala</h4>
                  <pre>{concurrentRequestsSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>DB colapsa</li>
                    <li>pool conexiones</li>
                    <li>timeouts</li>
                  </ul>

                  <h4>Paso 4 - Reflexion</h4>
                  <pre>{slowestPartSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>performance no es magia</li>
                    <li>casi siempre hay un cuello dominante</li>
                    <li>medir importa mas que adivinar</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que parte de tu backend seria el bottleneck hoy?</li>
                    <li>DB?</li>
                    <li>API externa?</li>
                    <li>uploads?</li>
                    <li>red?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior optimiza codigo. Backend senior encuentra restricciones reales.
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
