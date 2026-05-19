"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "example", label: "3) Ejemplo" },
  { id: "mindset", label: "4) Mentalidad" },
  { id: "sync-work", label: "5) Sincronico" },
  { id: "async-work", label: "6) Asincronico" },
  { id: "dotnet", label: "7) .NET" },
  { id: "jobs", label: "8) Colas" },
  { id: "production", label: "9) Produccion" },
  { id: "latency", label: "10) Latencia" },
  { id: "detect", label: "11) Detectar" },
  { id: "async-await", label: "12) async/await" },
  { id: "senior", label: "13) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const createOrderEndpointSnippet = `POST /create-order`;

const slowRequestSnippet = `request lenta
timeouts
usuarios esperando`;

const syncFlowSnippet = `request -> trabajo -> respuesta`;

const asyncFlowSnippet = `request -> guardar -> responder rapido
               |
        background job / queue`;

const registerEndpointSnippet = `POST /register`;

const eightSecondsSnippet = `request de 8 segundos`;

const betterRequestSnippet = `crear usuario
guardar evento/job
responder`;

const juniorMindsetSnippet = `"todo ocurre en el controller"`;

const seniorMindsetSnippet = `que trabajo realmente necesita bloquear la respuesta?`;

const practicalRuleSnippet = `el usuario necesita esperar esto?`;

const badDotnetSnippet = `public async Task Register()
{
    await _repo.CreateUser();

    await _emailService.SendWelcomeEmail();

    await _crm.SyncUser();

    await _analytics.Track();
}`;

const betterDotnetSnippet = `public async Task Register()
{
    await _repo.CreateUser();

    await _queue.Publish(new UserCreatedEvent());

    return Ok();
}`;

const externalServicesSnippet = `payment service
email service
CRM`;

const productionResultSnippet = `timeouts
errores
degradacion`;

const latencySnippet = `DB = 100ms
Email = 400ms
CRM = 600ms`;

const accumulatedLatencySnippet = `1100ms+`;

const asyncAwaitSnippet = `"async/await = arquitectura asincrona"`;

const requestQuestionSnippet = `"como hago esta request?"`;

const delegateQuestionSnippet = `que deberia ocurrir dentro del request y que deberia delegarse?`;

const checkoutEndpointSnippet = `POST /checkout`;

const criticalSyncSnippet = `guardar orden
procesar pago`;

const possibleAsyncSnippet = `email
analytics
PDF`;

const immediateNeedSnippet = `que necesita realmente el usuario inmediatamente?`;

export default function Daily74Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/73";
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
            <Link className={styles.btn} href="/daily/73">
              <span className={styles.kbd}>←</span> Dia 73
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
                <div className={styles.createdAt}>19/05/2026</div>
                <div className={styles.badge}>Daily #74 • Backend Performance</div>
                <h2 className={styles.title}>Trabajo sincronico vs asincronico en backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Background Jobs</span>
                  <span className={styles.chip}>Tag: Queues</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                </div>

                <p className={styles.lead}>
                  Backend escalable minimiza trabajo dentro del request HTTP y delega operaciones costosas o
                  secundarias.
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
                    <p className={styles.sub}>Uno de los errores mas comunes es hacer demasiado dentro del request HTTP.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{createOrderEndpointSnippet}</pre>
                  <p>Y el backend guarda en DB, manda emails, genera PDFs, llama APIs externas y procesa imagenes antes de responder.</p>
                  <p>Resultado:</p>
                  <pre>{slowRequestSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>La diferencia es si el cliente espera todo o si el backend delega.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Trabajo sincronico</h4>
                  <p>El cliente espera hasta que todo termine.</p>
                  <pre>{syncFlowSnippet}</pre>

                  <h4>Trabajo asincronico/desacoplado</h4>
                  <p>El backend delega trabajo pesado para despues.</p>
                  <pre>{asyncFlowSnippet}</pre>

                  <div className={styles.callout}>HTTP no deberia cargar trabajo pesado innecesario.</div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>El registro de usuario suele mezclar trabajo principal y secundario.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{registerEndpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>crear usuario</li>
                    <li>mandar email</li>
                    <li>generar avatar</li>
                    <li>sincronizar CRM</li>
                    <li>generar analytics</li>
                  </ul>
                  <pre>{eightSecondsSnippet}</pre>

                  <h4>Mejor enfoque</h4>
                  <pre>{betterRequestSnippet}</pre>
                  <p>Luego email, analytics y sincronizacion ocurren fuera del request.</p>

                  <div className={styles.callout}>El usuario normalmente no necesita esperar trabajo secundario.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>No todo lo que inicia una request debe terminar dentro de ella.</p>
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

              <section className={styles.section} id="sync-work">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que suele ir sincronico</h3>
                    <p className={styles.sub}>Solo lo necesario para que la operacion principal sea valida.</p>
                  </div>
                  <span className={styles.chip}>Request</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>validaciones criticas</li>
                    <li>persistencia principal</li>
                    <li>reglas de negocio esenciales</li>
                    <li>respuesta minima necesaria</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="async-work">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que suele ir asincronico</h3>
                    <p className={styles.sub}>Trabajo secundario, lento o externo suele poder delegarse.</p>
                  </div>
                  <span className={styles.chip}>Desacoplar</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>emails</li>
                    <li>logs complejos</li>
                    <li>analytics</li>
                    <li>generacion de PDFs</li>
                    <li>procesamiento de imagenes</li>
                    <li>integraciones externas lentas</li>
                    <li>notificaciones</li>
                  </ul>
                  <h4>Regla practica</h4>
                  <pre>{practicalRuleSnippet}</pre>
                  <p>Si no, probablemente deberia desacoplarse.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>Evita que el controller dependa de servicios secundarios.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{badDotnetSnippet}</pre>
                  <p>La request depende de email, CRM y analytics.</p>

                  <h4>Mejor enfoque</h4>
                  <pre>{betterDotnetSnippet}</pre>
                  <p>Luego workers/background jobs hacen email, CRM y analytics.</p>

                  <div className={styles.callout}>Desacoplar reduce latencia y aumenta resiliencia.</div>
                </div>
              </section>

              <section className={styles.section} id="jobs">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Relacion con colas y background jobs</h3>
                    <p className={styles.sub}>Ahora lo conectas con performance y resiliencia.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Dia 34: Background Jobs</li>
                    <li>Dia 35: Colas</li>
                    <li>Dia 36: Eventos</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="production">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Problema tipico en produccion</h3>
                    <p className={styles.sub}>Una request acoplada a servicios externos hereda sus fallos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Request depende de API externa:</p>
                  <pre>{externalServicesSnippet}</pre>
                  <p>Si falla, la request completa falla.</p>
                  <pre>{productionResultSnippet}</pre>
                  <div className={styles.quote}>Sistemas sincronicos muy acoplados son fragiles.</div>
                </div>
              </section>

              <section className={styles.section} id="latency">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Latencia acumulada</h3>
                    <p className={styles.sub}>Cada dependencia agrega tiempo y riesgo.</p>
                  </div>
                  <span className={styles.chip}>Latencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{latencySnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{accumulatedLatencySnippet}</pre>
                  <p>Cada dependencia agrega latencia.</p>
                </div>
              </section>

              <section className={styles.section} id="detect">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como detectar trabajo mal ubicado</h3>
                    <p className={styles.sub}>Si la request espera trabajo no esencial, probablemente hay acoplamiento excesivo.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>La request tarda demasiado?</li>
                    <li>Depende de APIs externas?</li>
                    <li>Hace trabajo pesado?</li>
                    <li>El usuario realmente necesita esperar?</li>
                  </ul>
                  <p>Si varias respuestas son si, probablemente debes desacoplar.</p>
                </div>
              </section>

              <section className={styles.section} id="async-await">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Error tipico</h3>
                    <p className={styles.sub}>async/await no es lo mismo que arquitectura asincrona.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{asyncAwaitSnippet}</pre>
                  <p>No. async/await solo evita bloquear threads. No desacopla el trabajo.</p>

                  <h4>Diferencia importante</h4>
                  <ul className={styles.bullets}>
                    <li>async/await: mejor manejo de threads/I/O</li>
                    <li>procesamiento asincronico real: queues, workers, background jobs</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>Disena que bloquea la respuesta y que se ejecuta fuera.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{requestQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{delegateQuestionSnippet}</pre>

                  <div className={styles.callout}>Backend escalable minimiza trabajo dentro del request HTTP.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Detectar trabajo que deberia desacoplarse.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{checkoutEndpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>guardar orden</li>
                    <li>cobrar pago</li>
                    <li>generar factura PDF</li>
                    <li>mandar email</li>
                    <li>actualizar analytics</li>
                  </ul>

                  <h4>Paso 1 - Clasifica</h4>
                  <p>Critico sincronico:</p>
                  <pre>{criticalSyncSnippet}</pre>
                  <p>Podria ser asincronico:</p>
                  <pre>{possibleAsyncSnippet}</pre>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <pre>{immediateNeedSnippet}</pre>

                  <h4>Paso 3 - Reflexion</h4>
                  <p>Como cambiaria la latencia?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>requests largas degradan sistemas</li>
                    <li>APIs externas vuelven fragil la request</li>
                    <li>desacoplar mejora resiliencia</li>
                    <li>no todo debe ocurrir inmediatamente</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu sistema hace demasiado trabajo?</li>
                    <li>Que operacion podria moverse a una cola?</li>
                    <li>Que request depende demasiado de APIs externas?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior mete logica dentro del request. Backend senior minimiza trabajo sincronico y
                    desacopla operaciones costosas.
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
