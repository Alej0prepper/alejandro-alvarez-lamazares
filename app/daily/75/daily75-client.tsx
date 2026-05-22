"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "vertical", label: "4) Vertical" },
  { id: "horizontal", label: "5) Horizontal" },
  { id: "stateless", label: "6) Stateless" },
  { id: "load-balancer", label: "7) Load balancer" },
  { id: "shared", label: "8) Shared resources" },
  { id: "senior", label: "9) Senior" },
  { id: "distributed", label: "10) Sistemas distribuidos" },
  { id: "mistake", label: "11) Error tipico" },
  { id: "signals", label: "12) Senales" },
  { id: "mini-project", label: "Practica" },
] as const;

const verticalResourcesSnippet = `mas CPU
mas RAM
mas disco`;

const horizontalInstancesSnippet = `API Server 1
API Server 2
API Server 3`;

const verticalExampleSnippet = `1 servidor muy poderoso`;

const horizontalExampleSnippet = `10 servidores medianos`;

const juniorMindsetSnippet = `"si va lento -> mas RAM"`;

const seniorMindsetSnippet = `el sistema puede distribuir carga?`;

const oneHugeApiSnippet = `1 API enorme`;

const allDownSnippet = `todo cae`;

const loadBalancerSnippet = `Load Balancer
      |
      v
API 1  API 2  API 3`;

const statelessSnippet = `stateless`;

const localSessionSnippet = `sesion guardada en memoria local`;

const sessionLostSnippet = `request 1 -> API 1
request 2 -> API 2`;

const loadBalancerExamplesSnippet = `NGINX
Cloud Load Balancer
AWS ALB`;

const loadBalancerDecisionSnippet = `que instancia recibe cada request`;

const tenApisSnippet = `10 APIs`;

const oneSlowDbSnippet = `1 DB lenta`;

const moreServersSnippet = `"mas servidores = problema resuelto"`;

const realLimiterSnippet = `que componente realmente limita el sistema?`;

const apiScalesSnippet = `"mi API escala"`;

const tenXTrafficSnippet = `que pasara cuando el trafico sea 10x?`;

const startingSystemSnippet = `1 API
1 DB
1000 usuarios`;

const biggerSystemSnippet = `100,000 usuarios`;

const verticalThinkingSnippet = `mas CPU
mas RAM`;

const fiveApiInstancesSnippet = `5 instancias API`;

const newProblemsSnippet = `sesiones
cache
coordinacion
DB compartida`;

const architectureChangeSnippet = `escalar cambia arquitectura`;

export default function Daily75Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/74";
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
            <Link className={styles.btn} href="/daily/74">
              <span className={styles.kbd}>←</span> Dia 74
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
                <div className={styles.createdAt}>21/05/2026</div>
                <div className={styles.badge}>Daily #75 • Backend Performance</div>
                <h2 className={styles.title}>Escalabilidad vertical vs horizontal</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Escalabilidad</span>
                  <span className={styles.chip}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Stateless</span>
                  <span className={styles.chip}>Tag: Load Balancer</span>
                </div>

                <p className={styles.lead}>
                  Cuando un backend crece, la pregunta real es si conviene hacer mas potente una maquina o distribuir
                  carga entre varias.
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
                    <p className={styles.sub}>Todo backend que crece debe decidir como soportar mas carga.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Normalmente existen dos caminos:</p>
                  <ul className={styles.bullets}>
                    <li>hacer el servidor mas potente</li>
                    <li>agregar mas servidores</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Vertical aumenta una maquina; horizontal agrega instancias.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escalabilidad vertical</h4>
                  <p>Aumentar recursos de una maquina.</p>
                  <pre>{verticalResourcesSnippet}</pre>

                  <h4>Escalabilidad horizontal</h4>
                  <p>Agregar mas instancias del sistema.</p>
                  <pre>{horizontalInstancesSnippet}</pre>

                  <h4>Ejemplo simple</h4>
                  <p>Vertical:</p>
                  <pre>{verticalExampleSnippet}</pre>
                  <p>Horizontal:</p>
                  <pre>{horizontalExampleSnippet}</pre>

                  <div className={styles.callout}>La mayoria de sistemas grandes escalan horizontalmente.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>No basta con agregar recursos: hay que saber si el sistema distribuye carga.</p>
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

              <section className={styles.section} id="vertical">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Escalado vertical</h3>
                    <p className={styles.sub}>Es facil y rapido, pero tiene limites claros.</p>
                  </div>
                  <span className={styles.chip}>Vertical</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Ventajas</h4>
                  <ul className={styles.bullets}>
                    <li>facil: no cambia arquitectura</li>
                    <li>rapido: subes specs y listo</li>
                    <li>menos complejidad</li>
                  </ul>

                  <h4>Problemas</h4>
                  <ul className={styles.bullets}>
                    <li>tiene limite</li>
                    <li>punto unico de fallo</li>
                    <li>maquinas enormes son caras</li>
                  </ul>

                  <p>Si cae:</p>
                  <pre>{allDownSnippet}</pre>

                  <h4>Ejemplo mental</h4>
                  <pre>{oneHugeApiSnippet}</pre>
                  <p>Funciona hasta que CPU llega al limite, RAM se llena o DB se satura.</p>
                </div>
              </section>

              <section className={styles.section} id="horizontal">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Escalado horizontal</h3>
                    <p className={styles.sub}>Distribuye requests entre varias instancias.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Horizontal</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loadBalancerSnippet}</pre>
                  <p>Resultado: mas capacidad total.</p>

                  <h4>Ventajas</h4>
                  <ul className={styles.bullets}>
                    <li>mejor tolerancia a fallos</li>
                    <li>mucha mas escalabilidad</li>
                    <li>sistemas mas resilientes</li>
                  </ul>

                  <h4>Problemas</h4>
                  <ul className={styles.bullets}>
                    <li>mucho mas complejo</li>
                    <li>necesitas coordinacion</li>
                    <li>estado compartido se vuelve problema</li>
                  </ul>

                  <div className={styles.callout}>
                    Escalar horizontalmente obliga a disenar sistemas diferentes.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="stateless">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Stateless APIs</h3>
                    <p className={styles.sub}>Para escalar horizontalmente, las APIs no deberian guardar estado local importante.</p>
                  </div>
                  <span className={styles.chip}>Stateless</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{statelessSnippet}</pre>
                  <p>La instancia no deberia guardar estado local importante.</p>

                  <h4>Problema tipico</h4>
                  <pre>{localSessionSnippet}</pre>
                  <p>Usuario:</p>
                  <pre>{sessionLostSnippet}</pre>
                  <p>Sesion perdida.</p>

                  <h4>Mejor enfoque</h4>
                  <ul className={styles.bullets}>
                    <li>Redis</li>
                    <li>DB</li>
                    <li>distributed cache</li>
                  </ul>

                  <div className={styles.callout}>Horizontal scaling y estado local suelen chocar.</div>
                </div>
              </section>

              <section className={styles.section} id="load-balancer">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Load Balancer</h3>
                    <p className={styles.sub}>Distribuye trafico entre instancias disponibles.</p>
                  </div>
                  <span className={styles.chip}>Infra</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loadBalancerExamplesSnippet}</pre>
                  <p>Decide:</p>
                  <pre>{loadBalancerDecisionSnippet}</pre>
                  <div className={styles.quote}>El usuario normalmente no sabe que servidor respondio.</div>
                </div>
              </section>

              <section className={styles.section} id="shared">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Problema clasico: Shared Resources</h3>
                    <p className={styles.sub}>Escalar APIs no siempre escala el sistema completo.</p>
                  </div>
                  <span className={styles.chip}>Bottleneck</span>
                </div>
                <div className={styles.sbd}>
                  <p>Aunque tengas:</p>
                  <pre>{tenApisSnippet}</pre>
                  <p>si todas golpean:</p>
                  <pre>{oneSlowDbSnippet}</pre>
                  <p>el cuello de botella sigue existiendo.</p>
                  <div className={styles.callout}>Escalar APIs no siempre escala el sistema completo.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>No confunde mas instancias con solucion total.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{moreServersSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{realLimiterSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="distributed">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Horizontal scaling cambia muchas cosas</h3>
                    <p className={styles.sub}>Sistemas distribuidos requieren nuevas decisiones.</p>
                  </div>
                  <span className={styles.chip}>Distribuido</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>cache distribuida</li>
                    <li>colas</li>
                    <li>locking</li>
                    <li>coordinacion</li>
                    <li>observabilidad</li>
                    <li>consistencia</li>
                  </ul>
                  <p>Por eso sistemas distribuidos son complejos.</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Decir que la API escala cuando sus dependencias no lo hacen.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{apiScalesSnippet}</pre>
                  <p>cuando:</p>
                  <ul className={styles.bullets}>
                    <li>DB no escala</li>
                    <li>cache no escala</li>
                    <li>storage no escala</li>
                  </ul>
                  <div className={styles.callout}>Un sistema escala tan bien como su componente mas debil.</div>
                </div>
              </section>

              <section className={styles.section} id="signals">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como detectar necesidad de escalar</h3>
                    <p className={styles.sub}>Busca senales de saturacion y crecimiento.</p>
                  </div>
                  <span className={styles.chip}>Senales</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>CPU alta</li>
                    <li>RAM alta</li>
                    <li>timeouts</li>
                    <li>latencia creciente</li>
                    <li>picos de trafico</li>
                    <li>usuarios creciendo</li>
                  </ul>

                  <p>No piensa: puede manejar trafico hoy?</p>
                  <p>Piensa:</p>
                  <pre>{tenXTrafficSnippet}</pre>

                  <div className={styles.quote}>
                    Escalar no es solo agregar recursos. Es disenar sistemas preparados para crecer.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Pensar como creceria un backend real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{startingSystemSnippet}</pre>
                  <p>Todo funciona bien.</p>

                  <h4>Paso 1 - Escala mentalmente</h4>
                  <pre>{biggerSystemSnippet}</pre>
                  <p>Que se rompe primero?</p>
                  <ul className={styles.bullets}>
                    <li>API</li>
                    <li>DB</li>
                    <li>cache</li>
                    <li>red</li>
                  </ul>

                  <h4>Paso 2 - Vertical</h4>
                  <pre>{verticalThinkingSnippet}</pre>
                  <p>Hasta cuando ayuda?</p>

                  <h4>Paso 3 - Horizontal</h4>
                  <pre>{fiveApiInstancesSnippet}</pre>
                  <p>Que nuevos problemas aparecen?</p>
                  <pre>{newProblemsSnippet}</pre>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{architectureChangeSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>vertical scaling tiene limites</li>
                    <li>horizontal scaling introduce complejidad</li>
                    <li>estado compartido es critico</li>
                    <li>APIs modernas suelen ser stateless</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu sistema podria correr en multiples instancias?</li>
                    <li>Hay estado guardado localmente?</li>
                    <li>Que componente seria el cuello de botella real?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior piensa en servidores. Backend senior piensa en sistemas distribuidos y escalabilidad real.
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
