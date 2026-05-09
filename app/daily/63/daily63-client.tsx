"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "example", label: "4) Ejemplo" },
  { id: "what-to-log", label: "5) Que loggear" },
  { id: "dotnet", label: "6) .NET" },
  { id: "do-not-log", label: "7) Que no loggear" },
  { id: "mindset", label: "8) Mentalidad backend" },
  { id: "monitoring", label: "9) Monitoreo" },
  { id: "tools", label: "10) Herramientas" },
  { id: "testing", label: "11) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const loginEndpointSnippet = `POST /login`;

const bruteForceLogSnippet = `1000 intentos desde misma IP`;

const authEventsSnippet = `login exitoso
login fallido
logout`;

const authorizationEventsSnippet = `acceso denegado`;

const criticalActionsSnippet = `refunds
delete user
role changes`;

const importantErrorsSnippet = `500s
exceptions
timeouts`;

const rateLimitSnippet = `429 Too Many Requests`;

const basicLoggingSnippet = `_logger.LogInformation("Usuario {UserId} inicio sesion", userId);`;

const errorLoggingSnippet = `_logger.LogError(ex, "Error procesando pedido");`;

const warningLoggingSnippet = `_logger.LogWarning("Multiples intentos fallidos desde IP {Ip}", ip);`;

const dangerousJwtSnippet = `_logger.LogInformation("JWT: {Token}", token);`;

const badLogsSnippet = `"Error"
"Algo salio mal"`;

const miniProjectEventsSnippet = `login success
login fail
rate limit`;

const miniProjectDangerSnippet = `password
JWT completo
secretos`;

const failedLoginsSnippet = `1000 logins fallidos`;

export default function Daily63Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/62";
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
            <Link className={styles.btn} href="/daily/62">
              <span className={styles.kbd}>←</span> Dia 62
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
                <div className={styles.createdAt}>08/05/2026</div>
                <div className={styles.badge}>Daily #63 • Backend Foundations</div>
                <h2 className={styles.title}>Logging y monitoreo: como detectar ataques y abuso</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Logging</span>
                  <span className={styles.chip}>Tag: Monitoreo</span>
                  <span className={styles.chip}>Tag: Observabilidad</span>
                </div>

                <p className={styles.lead}>
                  Puedes tener buena seguridad, pero si no sabes que esta pasando, no puedes detectar abuso ni
                  investigar incidentes.
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
                    <p className={styles.sub}>Sin visibilidad, tu backend opera a ciegas.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Si no sabes lo que esta pasando, estas ciego.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Logging registra eventos; monitoreo observa patrones.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Logging</h4>
                  <div className={styles.quote}>Registrar eventos importantes del sistema.</div>

                  <h4>Monitoreo</h4>
                  <div className={styles.quote}>Observar esos eventos para detectar problemas, abuso o ataques.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Creer que los logs solo sirven para errores.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <p>Tambien sirven para:</p>
                  <ul className={styles.bullets}>
                    <li>detectar ataques</li>
                    <li>detectar abuso</li>
                    <li>investigar incidentes</li>
                    <li>entender comportamiento sospechoso</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo real</h3>
                    <p className={styles.sub}>Un patron en logs puede revelar un ataque activo.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loginEndpointSnippet}</pre>
                  <p>Y ves en logs:</p>
                  <pre>{bruteForceLogSnippet}</pre>
                  <p>Probablemente estas viendo brute force.</p>
                </div>
              </section>

              <section className={styles.section} id="what-to-log">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que deberias loggear</h3>
                    <p className={styles.sub}>Registra eventos que ayuden a detectar abuso y reconstruir incidentes.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Autenticacion</h4>
                  <pre>{authEventsSnippet}</pre>

                  <h4>Autorizacion</h4>
                  <pre>{authorizationEventsSnippet}</pre>

                  <h4>Acciones criticas</h4>
                  <pre>{criticalActionsSnippet}</pre>

                  <h4>Errores importantes</h4>
                  <pre>{importantErrorsSnippet}</pre>

                  <h4>Rate limiting</h4>
                  <pre>{rateLimitSnippet}</pre>
                  <p>Muy util para detectar abuso.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como se ve en .NET</h3>
                    <p className={styles.sub}>Usa severidad y contexto para que el log sea investigable.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Logging basico</h4>
                  <pre>{basicLoggingSnippet}</pre>

                  <h4>Error</h4>
                  <pre>{errorLoggingSnippet}</pre>

                  <h4>Warning sospechoso</h4>
                  <pre>{warningLoggingSnippet}</pre>

                  <div className={styles.callout}>Los logs deben ayudarte a responder: que paso?</div>
                </div>
              </section>

              <section className={styles.section} id="do-not-log">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que no deberias loggear</h3>
                    <p className={styles.sub}>Los logs no deben convertirse en una fuga de secretos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Critico</span>
                </div>
                <div className={styles.sbd}>
                  <p>Nunca registres:</p>
                  <ul className={styles.bullets}>
                    <li>passwords</li>
                    <li>tokens completos</li>
                    <li>API keys</li>
                    <li>secretos</li>
                    <li>datos sensibles innecesarios</li>
                  </ul>

                  <h4>Ejemplo peligroso</h4>
                  <pre>{dangerousJwtSnippet}</pre>
                  <p>Esto es grave porque expone credenciales reutilizables.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No imprime mensajes: deja evidencia util para investigar.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;voy a imprimir mensajes&quot;.</li>
                    <li>Si: &quot;si manana hay un incidente, podre investigarlo?&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="monitoring">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Monitoreo</h3>
                    <p className={styles.sub}>Logging sin monitoreo es ruido.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <p>Monitoreo es detectar patrones:</p>
                  <ul className={styles.bullets}>
                    <li>muchos 401</li>
                    <li>muchos 500</li>
                    <li>muchos logins</li>
                    <li>picos de trafico</li>
                    <li>endpoints lentos</li>
                  </ul>
                  <p>Esas senales pueden indicar ataque o fallo.</p>
                </div>
              </section>

              <section className={styles.section} id="tools">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Herramientas comunes</h3>
                    <p className={styles.sub}>No necesitas dominarlas ahora, pero conviene reconocerlas.</p>
                  </div>
                  <span className={styles.chip}>Herramientas</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Serilog</li>
                    <li>Seq</li>
                    <li>ELK Stack</li>
                    <li>Datadog</li>
                    <li>Grafana</li>
                    <li>Application Insights</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Evalua si los logs dan visibilidad sin filtrar secretos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Se registran eventos importantes?</li>
                    <li>Los logs ayudan o son inutiles?</li>
                    <li>Se exponen secretos?</li>
                    <li>Se pueden detectar ataques?</li>
                  </ul>

                  <div className={styles.quote}>Un ataque que no puedes ver, no puedes investigarlo.</div>

                  <h4>Error tipico</h4>
                  <pre>{badLogsSnippet}</pre>

                  <h4>Buen logging debe incluir</h4>
                  <ul className={styles.bullets}>
                    <li>que paso</li>
                    <li>cuando</li>
                    <li>quien</li>
                    <li>donde</li>
                    <li>severidad</li>
                  </ul>

                  <div className={styles.callout}>Logging no es debug. Es observabilidad y seguridad.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Evaluar logs desde perspectiva de seguridad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Detectar que eventos ayudan a investigar ataques y cuales nunca deben registrarse.</p>

                  <h4>Endpoint</h4>
                  <pre>{loginEndpointSnippet}</pre>

                  <h4>Paso 1 - Eventos importantes</h4>
                  <p>Que deberias loggear?</p>
                  <pre>{miniProjectEventsSnippet}</pre>

                  <h4>Paso 2 - Eventos peligrosos</h4>
                  <p>Que no deberias loggear?</p>
                  <pre>{miniProjectDangerSnippet}</pre>

                  <h4>Paso 3 - Simulacion</h4>
                  <pre>{failedLoginsSnippet}</pre>
                  <p>Podrias detectarlo?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Logs ayudan a detectar ataques.</li>
                    <li>Malos logs filtran informacion.</li>
                    <li>Buen monitoreo da visibilidad real.</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu sistema registra intentos fallidos?</li>
                    <li>Los logs tienen contexto util?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior usa logs para debug. Backend senior usa logs para entender y proteger sistemas.
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
