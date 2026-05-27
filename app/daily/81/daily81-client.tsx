"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "mindset", label: "4) Mentalidad" },
  { id: "example", label: "5) Ejemplo" },
  { id: "states", label: "6) Estados" },
  { id: "mental", label: "7) Flujo" },
  { id: "polly", label: "8) Polly" },
  { id: "policies", label: "9) Policies" },
  { id: "dotnet", label: "10) .NET" },
  { id: "client", label: "11) Cliente" },
  { id: "after", label: "12) Despues" },
  { id: "retries", label: "13) Retries" },
  { id: "protects", label: "14) Protege" },
  { id: "cascade", label: "15) Cascadas" },
  { id: "senior", label: "16) Senior" },
  { id: "realistic", label: "17) Checkout" },
  { id: "tradeoff", label: "18) Tradeoff" },
  { id: "mini-project", label: "Practica" },
] as const;

const circuitBreakerSnippet = `Circuit Breaker`;

const stopTryingSnippet = `"deja de intentar, el servicio esta roto"`;

const paymentSlowSnippet = `Payment API lenta o caida`;

const retryStormSnippet = `retry retry retry retry retry`;

const juniorSnippet = `"si falla, retry"`;

const seniorSnippet = `como evitamos que la dependencia caida arrastre nuestro sistema?`;

const withoutBreakerSnippet = `API -> Payment Service (caido)
API -> Payment Service (caido)
API -> Payment Service (caido)`;

const withoutResultSnippet = `latencia enorme
threads bloqueados
saturacion`;

const stopCallsSnippet = `NO llamar mas temporalmente`;

const halfOpenSnippet = `"veamos si ya se recupero"`;

const healthyServiceSnippet = `request -> success`;

const failuresSnippet = `timeout
timeout
500
timeout`;

const noMoreRequestsSnippet = `NO MAS REQUESTS`;

const probeSnippet = `1 request de prueba`;

const pollyMeaningSnippet = `"si una dependencia falla, no voy a dejar que destruya mi backend"`;

const retryPolicySnippet = `si falla -> reintentar`;

const timeoutPolicySnippet = `si tarda demasiado -> cancelar`;

const breakerPolicySnippet = `si falla mucho -> dejar de llamar temporalmente`;

const fallbackPolicySnippet = `usar respuesta alternativa`;

const bulkheadPolicySnippet = `aislar recursos`;

const httpClientPollySnippet = `HttpClientFactory + Polly`;

const dotnetSnippet = `builder.Services.AddHttpClient<PaymentClient>(client =>
{
    client.BaseAddress = new Uri("https://payment-service.com");
    client.Timeout = TimeSpan.FromSeconds(5);
})
.AddTransientHttpErrorPolicy(policy =>
    policy.CircuitBreakerAsync(
        handledEventsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30)
    ));`;

const fiveErrorsSnippet = `5 errores consecutivos`;

const openThirtySnippet = `abre el circuito durante 30 segundos`;

const clientSnippet = `public class PaymentClient
{
    private readonly HttpClient _httpClient;

    public PaymentClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task PayAsync(Guid orderId, decimal amount)
    {
        var response = await _httpClient.PostAsJsonAsync("/payments", new
        {
            OrderId = orderId,
            Amount = amount
        });

        response.EnsureSuccessStatusCode();
    }
}`;

const halfOpenStateSnippet = `Half-Open`;

const transientErrorsSnippet = `errores temporales`;

const retryStormsSnippet = `retry storms`;

const cascadeSnippet = `API A -> API B -> API C`;

const avoidFailureSnippet = `"como evitamos cualquier fallo?"`;

const isolateFailureSnippet = `como aislamos el fallo para que no destruya todo?`;

const waitMoreSnippet = `"si el servicio falla, esperar mas"`;

const checkoutSnippet = `POST /checkout`;

const paymentServiceSnippet = `payment-service`;

const thirtySecondsSnippet = `espera 30 segundos timeout`;

const fast503Snippet = `503 rapidamente`;

const externalShouldWorkSnippet = `"el servicio externo deberia funcionar"`;

const inevitableFailureSnippet = `que hacemos cuando inevitablemente falle?`;

const openBreakerSnippet = `5 fallos -> abrir breaker`;

const fastFailureSnippet = `fallar rapido puede salvar el sistema completo`;

export default function Daily81Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/80";
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
            <Link className={styles.btn} href="/daily/80">
              <span className={styles.kbd}>←</span> Dia 80
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
                <div className={styles.createdAt}>27/05/2026</div>
                <div className={styles.badge}>Daily #81 • Backend Resilience</div>
                <h2 className={styles.title}>Circuit Breaker</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Polly</span>
                  <span className={styles.chip}>Tag: Dependencias</span>
                  <span className={styles.chip}>Tag: Circuit Breaker</span>
                </div>

                <p className={styles.lead}>
                  Circuit Breaker evita que una dependencia lenta o caida arrastre todo tu backend. No arregla el
                  servicio externo: protege tu sistema.
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
                    <p className={styles.sub}>Una dependencia lenta puede destruir un sistema sano.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos sistemas modernos dependen de APIs externas, microservicios, gateways, Redis y cloud.</p>
                  <p>Si una dependencia empieza a fallar o ponerse lenta, aparece este patron:</p>
                  <pre>{circuitBreakerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>El breaker deja temporalmente de llamar a un servicio roto.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Circuit Breaker es un mecanismo que deja temporalmente de llamar a un servicio cuando detecta
                    demasiados fallos.
                  </p>
                  <p>Traduccion simple:</p>
                  <pre>{stopTryingSnippet}</pre>
                  <div className={styles.callout}>
                    El objetivo no es arreglar el servicio externo. El objetivo es proteger tu sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Retries sin control pueden crear cascadas de degradacion.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentSlowSnippet}</pre>
                  <p>Tu backend sigue intentando:</p>
                  <pre>{retryStormSnippet}</pre>
                  <p>Resultado:</p>
                  <ul className={styles.bullets}>
                    <li>threads ocupados</li>
                    <li>timeouts</li>
                    <li>queues creciendo</li>
                    <li>mas retries</li>
                    <li>cascada de degradacion</li>
                  </ul>
                  <div className={styles.callout}>Dependencias lentas pueden destruir sistemas sanos.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>No basta con reintentar: hay que aislar el fallo.</p>
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

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Ejemplo simple</h3>
                    <p className={styles.sub}>Fallar rapido suele ser mejor que esperar eternamente.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin Circuit Breaker</h4>
                  <pre>{withoutBreakerSnippet}</pre>
                  <p>Cada request espera timeout.</p>
                  <pre>{withoutResultSnippet}</pre>

                  <h4>Con Circuit Breaker</h4>
                  <p>Despues de muchos fallos:</p>
                  <pre>{stopCallsSnippet}</pre>
                  <p>Resultado: fallar rapido, proteger recursos y evitar cascada.</p>

                  <div className={styles.callout}>Fallar rapido suele ser mejor que esperar eternamente.</div>
                </div>
              </section>

              <section className={styles.section} id="states">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Estados del Circuit Breaker</h3>
                    <p className={styles.sub}>Closed, Open y Half-Open.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Estados</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Closed</h4>
                  <p>Todo normal. Requests pasan.</p>

                  <h4>Open</h4>
                  <p>Demasiados fallos detectados. Deja de llamar servicio.</p>

                  <h4>Half-Open</h4>
                  <p>Prueba limitada:</p>
                  <pre>{halfOpenSnippet}</pre>

                  <div className={styles.quote}>Igual que un breaker electrico real.</div>
                </div>
              </section>

              <section className={styles.section} id="mental">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo mental</h3>
                    <p className={styles.sub}>El breaker corta llamadas, luego prueba recuperacion.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Servicio sano</h4>
                  <pre>{healthyServiceSnippet}</pre>

                  <h4>Empiezan fallos</h4>
                  <pre>{failuresSnippet}</pre>

                  <h4>Circuit breaker abre</h4>
                  <pre>{noMoreRequestsSnippet}</pre>

                  <h4>Luego prueba recuperacion</h4>
                  <pre>{probeSnippet}</pre>
                  <p>Si funciona, vuelve a closed. Si falla, vuelve a open.</p>
                </div>
              </section>

              <section className={styles.section} id="polly">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que es Polly</h3>
                    <p className={styles.sub}>Polly es una libreria .NET para resiliencia.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <p>Polly ayuda a implementar resiliencia, tolerancia a fallos y manejo controlado de errores transitorios.</p>
                  <pre>{pollyMeaningSnippet}</pre>
                  <p>Ayuda cuando dependencias fallan, se ponen lentas, responden timeout o devuelven errores temporales.</p>
                </div>
              </section>

              <section className={styles.section} id="policies">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Policies en Polly</h3>
                    <p className={styles.sub}>Polly funciona mediante politicas de resiliencia.</p>
                  </div>
                  <span className={styles.chip}>Policies</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Retry</h4>
                  <pre>{retryPolicySnippet}</pre>
                  <h4>Timeout</h4>
                  <pre>{timeoutPolicySnippet}</pre>
                  <h4>Circuit Breaker</h4>
                  <pre>{breakerPolicySnippet}</pre>
                  <h4>Fallback</h4>
                  <pre>{fallbackPolicySnippet}</pre>
                  <h4>Bulkhead</h4>
                  <pre>{bulkheadPolicySnippet}</pre>
                  <div className={styles.callout}>Polly no arregla el servicio externo. Protege tu sistema del impacto.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Implementacion concreta en .NET</h3>
                    <p className={styles.sub}>Normalmente se usa con HttpClientFactory + Polly.</p>
                  </div>
                  <span className={styles.chip}>Codigo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{httpClientPollySnippet}</pre>
                  <pre>{dotnetSnippet}</pre>

                  <p>Si ocurren:</p>
                  <pre>{fiveErrorsSnippet}</pre>
                  <p>Polly:</p>
                  <pre>{openThirtySnippet}</pre>
                  <p>Durante esos 30 segundos no se llama al servicio, las requests fallan rapido y se protegen recursos.</p>
                </div>
              </section>

              <section className={styles.section} id="client">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Ejemplo de cliente</h3>
                    <p className={styles.sub}>El HttpClient queda envuelto por la politica configurada.</p>
                  </div>
                  <span className={styles.chip}>C#</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{clientSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="after">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que pasa despues</h3>
                    <p className={styles.sub}>El breaker entra en Half-Open para probar recuperacion.</p>
                  </div>
                  <span className={styles.chip}>Recuperacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{halfOpenStateSnippet}</pre>
                  <p>Polly hace una request de prueba. Si funciona, vuelve a Closed. Si falla, vuelve a Open.</p>
                  <div className={styles.quote}>Igual que un breaker electrico real.</div>
                </div>
              </section>

              <section className={styles.section} id="retries">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Relacion con retries</h3>
                    <p className={styles.sub}>Retries ayudan, pero infinitos empeoran saturacion.</p>
                  </div>
                  <span className={styles.chip}>Retries</span>
                </div>
                <div className={styles.sbd}>
                  <p>Retries sirven para:</p>
                  <pre>{transientErrorsSnippet}</pre>
                  <p>Pero retries infinitos crean:</p>
                  <pre>{retryStormsSnippet}</pre>
                  <p>Por eso normalmente se combinan timeout, retry limitado y circuit breaker.</p>
                </div>
              </section>

              <section className={styles.section} id="protects">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Que protege realmente</h3>
                    <p className={styles.sub}>A veces rechazar requests salva el sistema completo.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>threads</li>
                    <li>conexiones</li>
                    <li>CPU</li>
                    <li>latencia</li>
                    <li>cascadas de fallos</li>
                  </ul>
                  <div className={styles.callout}>A veces rechazar requests salva el sistema completo.</div>
                </div>
              </section>

              <section className={styles.section} id="cascade">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Cascading failures</h3>
                    <p className={styles.sub}>Un fallo puede propagarse entre servicios.</p>
                  </div>
                  <span className={styles.chip}>Cascada</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cascadeSnippet}</pre>
                  <p>Si API C cae, B se degrada, A espera mas, threads se llenan y retries explotan.</p>
                  <div className={styles.callout}>Circuit breakers ayudan a cortar la cascada.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Como piensa alguien senior</h3>
                    <p className={styles.sub}>No intenta evitar todo fallo. Aisla el impacto.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{avoidFailureSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{isolateFailureSnippet}</pre>

                  <h4>Error tipico</h4>
                  <pre>{waitMoreSnippet}</pre>
                  <p>Muchas veces esperar mas empeora todo. Sistemas grandes prefieren fallar rapido, degradar parcialmente y proteger recursos.</p>
                </div>
              </section>

              <section className={styles.section} id="realistic">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Ejemplo realista</h3>
                    <p className={styles.sub}>Checkout dependiendo de payment-service.</p>
                  </div>
                  <span className={styles.chip}>Checkout</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <p>Depende de:</p>
                  <pre>{paymentServiceSnippet}</pre>

                  <h4>Sin circuit breaker</h4>
                  <pre>{thirtySecondsSnippet}</pre>
                  <p>Resultado: pool agotado, requests acumuladas y sistema colapsando.</p>

                  <h4>Con circuit breaker</h4>
                  <pre>{fast503Snippet}</pre>
                  <p>Resultado: menos presion, menos threads ocupados y sistema sigue respirando.</p>

                  <div className={styles.callout}>A veces fallar rapido salva la plataforma completa.</div>
                </div>
              </section>

              <section className={styles.section} id="tradeoff">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Tradeoff importante</h3>
                    <p className={styles.sub}>Circuit breaker mejora estabilidad, pero sacrifica disponibilidad temporal.</p>
                  </div>
                  <span className={styles.chip}>Tradeoff</span>
                </div>
                <div className={styles.sbd}>
                  <p>Mejora:</p>
                  <ul className={styles.bullets}>
                    <li>resiliencia</li>
                    <li>estabilidad</li>
                    <li>proteccion</li>
                  </ul>
                  <p>Pero sacrifica disponibilidad temporal.</p>

                  <h4>Backend senior</h4>
                  <p>No piensa:</p>
                  <pre>{externalShouldWorkSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{inevitableFailureSnippet}</pre>

                  <div className={styles.quote}>Sistemas resilientes asumen fallos externos y limitan su impacto.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Proteger tu backend de dependencias lentas o caidas.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{checkoutSnippet}</pre>
                  <p>Depende de:</p>
                  <pre>{paymentServiceSnippet}</pre>

                  <h4>Paso 1 - Sin proteccion</h4>
                  <p>Que pasa si tarda 30 segundos?</p>

                  <h4>Paso 2 - Cascada mental</h4>
                  <p>Que se llena primero?</p>
                  <ul className={styles.bullets}>
                    <li>threads</li>
                    <li>queue</li>
                    <li>DB pool</li>
                    <li>requests pendientes</li>
                  </ul>

                  <h4>Paso 3 - Circuit breaker</h4>
                  <pre>{openBreakerSnippet}</pre>
                  <p>Que cambia?</p>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{fastFailureSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>dependencias externas son peligrosas</li>
                    <li>retries infinitos empeoran saturacion</li>
                    <li>circuit breakers reducen cascadas</li>
                    <li>resiliencia implica asumir fallos</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que dependencia externa seria mas peligrosa si se degrada?</li>
                    <li>Que timeout usarias?</li>
                    <li>Que endpoint podria causar cascada de fallos?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior espera que dependencias nunca fallen. Backend senior disena sistemas preparados para
                    sobrevivir cuando fallen.
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
