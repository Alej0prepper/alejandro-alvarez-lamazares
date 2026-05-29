"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "real", label: "3) Ejemplo real" },
  { id: "mindset", label: "4) Mentalidad" },
  { id: "steps", label: "5) Que hace" },
  { id: "mental", label: "6) Ejemplo mental" },
  { id: "lb", label: "7) Load balancers" },
  { id: "kubernetes", label: "8) Kubernetes" },
  { id: "dotnet", label: "9) .NET" },
  { id: "jobs", label: "10) Jobs" },
  { id: "token", label: "11) CancellationToken" },
  { id: "connections", label: "12) Conexiones" },
  { id: "senior", label: "13) Senior" },
  { id: "checkout", label: "14) Checkout" },
  { id: "availability", label: "15) Alta disponibilidad" },
  { id: "mini-project", label: "Practica" },
] as const;

const badShutdownResultSnippet = `request cancelada
checkout incompleto
trabajo perdido
errores 500`;

const gracefulShutdownSnippet = `Graceful Shutdown`;

const checkoutSnippet = `POST /checkout`;

const checkoutFlowSnippet = `validar pago
guardar orden
actualizar inventario`;

const deploySnippet = `deploy`;

const chargedWithoutOrderSnippet = `pago cobrado
orden no creada`;

const inconsistentInventorySnippet = `orden creada
inventario inconsistente`;

const juniorSnippet = `"apagamos y listo"`;

const seniorSnippet = `que pasa con el trabajo que estaba en curso?`;

const withoutShutdownSnippet = `Load Balancer
      |
      v
Instancia A`;

const sigtermSnippet = `SIGTERM`;

const internalErrorSnippet = `500 Internal Server Error`;

const stopTrafficSnippet = `no aceptar mas trafico`;

const activeRequestsSnippet = `requests activas`;

const apiInstancesSnippet = `API 1
API 2
API 3`;

const apiTwoSnippet = `API 2`;

const kubernetesFlowSnippet = `SIGTERM
  |
Graceful Shutdown
  |
espera
  |
SIGKILL`;

const workerSnippet = `public class Worker : BackgroundService
{
    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await ProcessJob();
        }
    }
}`;

const stoppingTokenSnippet = `stoppingToken`;

const shuttingDownSnippet = `la aplicacion se esta apagando`;

const manyEmailsSnippet = `10000 emails`;

const lostWorkSnippet = `trabajo perdido`;

const badLoopSnippet = `while(true)
{
    Process();
}`;

const deployQuestionSnippet = `"como desplegamos?"`;

const uninterruptedDeploySnippet = `como desplegamos sin interrumpir usuarios?`;

const checkoutDurationSnippet = `8 segundos`;

const deploymentSecondSnippet = `deployment`;

const user500Snippet = `500`;

const appStartsSnippet = `"la aplicacion debe arrancar"`;

const appStopsSnippet = `la aplicacion tambien debe apagarse correctamente`;

const threeInstancesSnippet = `3 instancias API`;

const shutdownDesignSnippet = `apagar correctamente tambien es parte del diseno del sistema`;

export default function Daily83Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/82";
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
            <Link className={styles.btn} href="/daily/82">
              <span className={styles.kbd}>←</span> Dia 82
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
                <div className={styles.createdAt}>29/05/2026</div>
                <div className={styles.badge}>Daily #83 • Backend Resilience</div>
                <h2 className={styles.title}>Graceful Shutdown</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Graceful shutdown permite apagar una API dejando terminar el trabajo en curso. Un sistema profesional
                  no solo sabe arrancar: tambien sabe detenerse sin romper usuarios.
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
                    <p className={styles.sub}>Un deploy tambien apaga procesos en produccion.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cuando despliegas, reinicias Docker, actualizas Kubernetes o reinicias servidores, hay requests ejecutandose.</p>
                  <p>Si no haces nada especial, la aplicacion simplemente muere.</p>
                  <pre>{badShutdownResultSnippet}</pre>
                  <p>Aqui aparece:</p>
                  <pre>{gracefulShutdownSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Apagar correctamente es distinto a apagar rapido.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Graceful Shutdown es el proceso de detener una aplicacion permitiendo que termine correctamente el
                    trabajo que ya estaba ejecutando.
                  </p>
                  <div className={styles.callout}>No se trata de apagar rapido. Se trata de apagar correctamente.</div>
                </div>
              </section>

              <section className={styles.section} id="real">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo real</h3>
                    <p className={styles.sub}>Checkout interrumpido durante un deploy.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Flujo:</p>
                  <pre>{checkoutFlowSnippet}</pre>
                  <p>En medio del proceso:</p>
                  <pre>{deploySnippet}</pre>

                  <h4>Sin graceful shutdown</h4>
                  <p>La instancia muere inmediatamente.</p>
                  <pre>{chargedWithoutOrderSnippet}</pre>
                  <p>o:</p>
                  <pre>{inconsistentInventorySnippet}</pre>
                  <div className={styles.callout}>Problema serio.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa el backend</h3>
                    <p className={styles.sub}>El trabajo en curso tambien importa.</p>
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

              <section className={styles.section} id="steps">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que hace realmente</h3>
                    <p className={styles.sub}>Primero deja de recibir trabajo; luego termina lo pendiente.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <ol className={styles.bullets}>
                    <li>deja de aceptar nuevas requests</li>
                    <li>permite terminar las requests actuales</li>
                    <li>libera recursos</li>
                    <li>se apaga</li>
                  </ol>
                  <div className={styles.callout}>Los usuarios no notan interrupciones.</div>
                </div>
              </section>

              <section className={styles.section} id="mental">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo mental</h3>
                    <p className={styles.sub}>La diferencia es como responde la instancia al SIGTERM.</p>
                  </div>
                  <span className={styles.chip}>SIGTERM</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin graceful shutdown</h4>
                  <pre>{withoutShutdownSnippet}</pre>
                  <p>Llega:</p>
                  <pre>{sigtermSnippet}</pre>
                  <p>La instancia muere. Request:</p>
                  <pre>{internalErrorSnippet}</pre>

                  <h4>Con graceful shutdown</h4>
                  <p>Llega:</p>
                  <pre>{sigtermSnippet}</pre>
                  <p>La instancia responde:</p>
                  <pre>{stopTrafficSnippet}</pre>
                  <p>Pero deja terminar:</p>
                  <pre>{activeRequestsSnippet}</pre>
                  <div className={styles.callout}>Primero deja de recibir trabajo. Luego termina el trabajo pendiente.</div>
                </div>
              </section>

              <section className={styles.section} id="lb">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Relacion con load balancers</h3>
                    <p className={styles.sub}>Los despliegues modernos retiran instancias antes de apagarlas.</p>
                  </div>
                  <span className={styles.chip}>Infra</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{apiInstancesSnippet}</pre>
                  <p>Quieres actualizar:</p>
                  <pre>{apiTwoSnippet}</pre>
                  <p>El load balancer deja de enviarle trafico. API 2 termina requests actuales y se apaga.</p>
                  <div className={styles.quote}>Asi funcionan despliegues modernos.</div>
                </div>
              </section>

              <section className={styles.section} id="kubernetes">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se ve en Kubernetes</h3>
                    <p className={styles.sub}>Kubernetes envia SIGTERM antes de matar el contenedor.</p>
                  </div>
                  <span className={styles.chip}>Kubernetes</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{kubernetesFlowSnippet}</pre>
                  <div className={styles.callout}>Si no manejas SIGTERM correctamente puedes perder trabajo.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como se ve en .NET</h3>
                    <p className={styles.sub}>ASP.NET Core soporta graceful shutdown de forma nativa.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{workerSnippet}</pre>
                  <p>Esto:</p>
                  <pre>{stoppingTokenSnippet}</pre>
                  <p>es la senal de:</p>
                  <pre>{shuttingDownSnippet}</pre>
                  <div className={styles.callout}>Tus procesos deben respetar ese token.</div>
                </div>
              </section>

              <section className={styles.section} id="jobs">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Background jobs y shutdown</h3>
                    <p className={styles.sub}>Los jobs largos deben guardar progreso y reanudarse.</p>
                  </div>
                  <span className={styles.chip}>Jobs</span>
                </div>
                <div className={styles.sbd}>
                  <p>Job procesando:</p>
                  <pre>{manyEmailsSnippet}</pre>
                  <p>Servidor reiniciado.</p>

                  <h4>Sin manejo correcto</h4>
                  <pre>{lostWorkSnippet}</pre>

                  <h4>Con manejo correcto</h4>
                  <ul className={styles.bullets}>
                    <li>guarda progreso</li>
                    <li>termina operacion segura</li>
                    <li>se reanuda despues</li>
                  </ul>
                  <div className={styles.quote}>Aqui aparece resiliencia real.</div>
                </div>
              </section>

              <section className={styles.section} id="token">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico: ignorar CancellationToken</h3>
                    <p className={styles.sub}>Todo proceso largo deberia escuchar cancelaciones.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badLoopSnippet}</pre>
                  <p>El proceso nunca coopera con el apagado.</p>
                  <p>Resultado: shutdown lento o forzado.</p>
                </div>
              </section>

              <section className={styles.section} id="connections">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Otro error tipico</h3>
                    <p className={styles.sub}>Cerrar conexiones abruptamente puede dejar operaciones incompletas.</p>
                  </div>
                  <span className={styles.chip}>Recursos</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>DB</li>
                    <li>Redis</li>
                    <li>RabbitMQ</li>
                    <li>Kafka</li>
                  </ul>
                  <p>Si se cierran abruptamente, pueden quedar operaciones incompletas.</p>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa alguien senior</h3>
                    <p className={styles.sub}>No solo despliega: despliega sin interrumpir usuarios.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{deployQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{uninterruptedDeploySnippet}</pre>
                  <div className={styles.callout}>Esa diferencia es enorme.</div>
                </div>
              </section>

              <section className={styles.section} id="checkout">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ejemplo realista</h3>
                    <p className={styles.sub}>Un checkout largo durante un deployment.</p>
                  </div>
                  <span className={styles.chip}>Checkout</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Tarda:</p>
                  <pre>{checkoutDurationSnippet}</pre>
                  <p>Durante el segundo 7:</p>
                  <pre>{deploymentSecondSnippet}</pre>

                  <h4>Sin graceful shutdown</h4>
                  <p>Usuario recibe:</p>
                  <pre>{user500Snippet}</pre>

                  <h4>Con graceful shutdown</h4>
                  <p>La request termina normalmente. Luego la instancia se apaga.</p>
                  <div className={styles.callout}>Experiencia completamente diferente.</div>
                </div>
              </section>

              <section className={styles.section} id="availability">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Relacion con alta disponibilidad</h3>
                    <p className={styles.sub}>Sin graceful shutdown, las actualizaciones generan errores visibles.</p>
                  </div>
                  <span className={styles.chip}>HA</span>
                </div>
                <div className={styles.sbd}>
                  <p>Graceful shutdown es pieza fundamental de:</p>
                  <ul className={styles.bullets}>
                    <li>rolling deployments</li>
                    <li>blue/green deployments</li>
                    <li>canary releases</li>
                    <li>Kubernetes</li>
                  </ul>

                  <h4>Backend senior</h4>
                  <p>No piensa:</p>
                  <pre>{appStartsSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{appStopsSnippet}</pre>

                  <div className={styles.quote}>
                    Un sistema profesional no solo sabe arrancar. Tambien sabe detenerse sin romper trabajo ni usuarios.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Pensar como reaccionaria tu backend durante un deploy.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{threeInstancesSnippet}</pre>
                  <p>Debes desplegar una nueva version.</p>

                  <h4>Paso 1</h4>
                  <p>Que pasa con las requests activas?</p>

                  <h4>Paso 2</h4>
                  <p>Que pasa con los background jobs?</p>

                  <h4>Paso 3</h4>
                  <p>Tu codigo respeta CancellationToken?</p>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{shutdownDesignSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>los despliegues generan apagados constantemente</li>
                    <li>graceful shutdown evita errores innecesarios</li>
                    <li>CancellationToken es fundamental en .NET</li>
                    <li>sistemas resilientes tambien gestionan su apagado</li>
                    <li>alta disponibilidad depende parcialmente de esto</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que proceso de tu sistema tardaria mas en apagarse?</li>
                    <li>Que pasaria si reinicias tu API en medio de un checkout?</li>
                    <li>Que background job podria perder trabajo durante un deploy?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior piensa en como ejecutar codigo. Backend senior tambien piensa en como detenerlo
                    correctamente sin afectar al negocio.
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
