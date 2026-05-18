"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "what-to-cache", label: "4) Que cachear" },
  { id: "what-not", label: "5) Que no cachear" },
  { id: "mindset", label: "6) Mentalidad" },
  { id: "types", label: "7) Tipos" },
  { id: "dotnet", label: "8) .NET" },
  { id: "invalidation", label: "9) Invalidation" },
  { id: "stampede", label: "10) Stampede" },
  { id: "detect", label: "11) Detectar cache" },
  { id: "risks", label: "12) Riesgos" },
  { id: "senior", label: "13) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const noCacheSnippet = `request -> DB -> respuesta
request -> DB -> respuesta
request -> DB -> respuesta`;

const cacheSnippet = `primera request -> DB
siguientes -> cache`;

const dbCanHandleSnippet = `"la DB aguanta"`;

const stableDataSnippet = `categorias
productos
configuracion`;

const realTimeBalanceSnippet = `saldo bancario en tiempo real`;

const juniorMindsetSnippet = `"hago query y listo"`;

const seniorMindsetSnippet = `realmente necesito recalcular esto?`;

const memoryCacheSnippet = `MemoryCache`;

const multipleInstancesSnippet = `cada servidor tiene su propia cache`;

const redisSnippet = `Redis`;

const addMemoryCacheSnippet = `builder.Services.AddMemoryCache();`;

const memoryCacheUsageSnippet = `if (!_cache.TryGetValue("products", out List<Product> products))
{
    products = await _repo.GetProducts();

    _cache.Set("products", products, TimeSpan.FromMinutes(5));
}`;

const productsCacheKeySnippet = `products`;

const staleDataSnippet = `datos incorrectos`;

const stampedeRequestsSnippet = `1000 requests simultaneos`;

const cacheEverythingSnippet = `"pongamos cache en todo"`;

const expensiveWorkSnippet = `que trabajo es caro y repetitivo?`;

const productsEndpointSnippet = `GET /products`;

const productsAmountSnippet = `5000 productos`;

const productsTrafficSnippet = `1000 requests por minuto`;

const fiveMinuteCacheSnippet = `cache por 5 minutos`;

export default function Daily73Client() {
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
                <div className={styles.createdAt}>18/05/2026</div>
                <div className={styles.badge}>Daily #73 • Backend Performance</div>
                <h2 className={styles.title}>Caching: evitar trabajo innecesario</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Cache</span>
                  <span className={styles.chip}>Tag: Redis</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Cache evita repetir trabajo caro: intercambia memoria por velocidad, pero tambien introduce
                  complejidad.
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
                    <p className={styles.sub}>Muchos sistemas lentos hacen el mismo trabajo una y otra vez.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>El recurso mas rapido es el que no necesitas consultar.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Cache guarda temporalmente datos para evitar trabajo repetido.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cache: almacenamiento temporal de datos para evitar recalcular o volver a pedir informacion costosa.
                  </div>

                  <h4>Sin cache</h4>
                  <pre>{noCacheSnippet}</pre>

                  <h4>Con cache</h4>
                  <pre>{cacheSnippet}</pre>
                  <p>Mucho mas rapido y barato.</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Confiar en que la DB soportara toda la repeticion para siempre.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dbCanHandleSnippet}</pre>
                  <p>Hasta que deja de aguantar.</p>
                </div>
              </section>

              <section className={styles.section} id="what-to-cache">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que suele cachearse</h3>
                    <p className={styles.sub}>Cache funciona bien cuando el dato cambia poco o cuesta mucho obtenerlo.</p>
                  </div>
                  <span className={styles.chip}>Oportunidades</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Datos poco cambiantes</h4>
                  <pre>{stableDataSnippet}</pre>

                  <h4>Queries costosas</h4>
                  <p>Consultas pesadas que se repiten mucho.</p>

                  <h4>Respuestas externas</h4>
                  <p>APIs de terceros con latencia o costo alto.</p>

                  <h4>Calculos pesados</h4>
                  <p>Resultados que no vale la pena recalcular en cada request.</p>
                </div>
              </section>

              <section className={styles.section} id="what-not">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que no suele cachearse</h3>
                    <p className={styles.sub}>No todo dato gana por estar en cache.</p>
                  </div>
                  <span className={styles.chip}>Cuidado</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Datos ultra dinamicos</h4>
                  <pre>{realTimeBalanceSnippet}</pre>

                  <h4>Informacion sensible compartida</h4>
                  <p>Un cache mal separado puede filtrar datos entre usuarios.</p>

                  <h4>Datos que cambian constantemente</h4>
                  <p>La invalidacion puede costar mas que la optimizacion.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como cambia la mentalidad</h3>
                    <p className={styles.sub}>La pregunta importante es si el trabajo realmente debe repetirse.</p>
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

              <section className={styles.section} id="types">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Tipos de cache</h3>
                    <p className={styles.sub}>La ubicacion del cache cambia su comportamiento.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tipos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>In-Memory Cache</h4>
                  <p>Cache dentro de la app. Muy rapido.</p>
                  <pre>{memoryCacheSnippet}</pre>

                  <h4>Problema</h4>
                  <pre>{multipleInstancesSnippet}</pre>

                  <h4>Distributed Cache</h4>
                  <p>Cache compartido entre instancias.</p>
                  <pre>{redisSnippet}</pre>
                  <p>Mucho mas usado en sistemas grandes.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se ve en .NET</h3>
                    <p className={styles.sub}>MemoryCache permite evitar hits repetidos a DB dentro de una instancia.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Memory Cache</h4>
                  <pre>{addMemoryCacheSnippet}</pre>

                  <h4>Uso</h4>
                  <pre>{memoryCacheUsageSnippet}</pre>
                  <p>Primera vez: DB. Siguientes: cache.</p>

                  <div className={styles.callout}>Cache cambia latencia y tambien cambia escalabilidad.</div>
                </div>
              </section>

              <section className={styles.section} id="invalidation">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Problema importante: Cache Invalidation</h3>
                    <p className={styles.sub}>Cache mejora performance, pero introduce complejidad.</p>
                  </div>
                  <span className={styles.chip}>Invalidacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cacheas productos:</p>
                  <pre>{productsCacheKeySnippet}</pre>
                  <p>Pero alguien actualiza precio. La cache sigue vieja.</p>
                  <p>Resultado:</p>
                  <pre>{staleDataSnippet}</pre>

                  <div className={styles.callout}>Cache mejora performance, pero introduce complejidad.</div>
                </div>
              </section>

              <section className={styles.section} id="stampede">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Cache Stampede</h3>
                    <p className={styles.sub}>Cuando la cache expira, muchas requests pueden golpear DB al mismo tiempo.</p>
                  </div>
                  <span className={styles.chip}>Carga</span>
                </div>
                <div className={styles.sbd}>
                  <p>Cache expira. Entonces llegan:</p>
                  <pre>{stampedeRequestsSnippet}</pre>
                  <p>Todos golpean DB al mismo tiempo.</p>

                  <h4>Soluciones</h4>
                  <ul className={styles.bullets}>
                    <li>locking</li>
                    <li>refresh anticipado</li>
                    <li>expiracion escalonada</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="detect">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como detectar necesidad de cache</h3>
                    <p className={styles.sub}>Cache tiene sentido cuando trabajo caro se repite mucho.</p>
                  </div>
                  <span className={styles.chip}>Diagnostico</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>La query es costosa?</li>
                    <li>Se repite mucho?</li>
                    <li>Los datos cambian poco?</li>
                    <li>La DB esta saturada?</li>
                  </ul>
                  <p>Si varias respuestas son si, probablemente necesitas cache.</p>
                </div>
              </section>

              <section className={styles.section} id="risks">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que puede salir mal con cache</h3>
                    <p className={styles.sub}>Cache no arregla mal diseno: solo evita trabajo repetido.</p>
                  </div>
                  <span className={styles.chip}>Riesgos</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>datos stale o viejos</li>
                    <li>memoria excesiva</li>
                    <li>inconsistencia</li>
                    <li>cache distribuida caida</li>
                  </ul>
                  <div className={styles.quote}>Cache no arregla mal diseno. Solo evita trabajo repetido.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>No cachea todo: busca trabajo caro, repetitivo y estable.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{cacheEverythingSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{expensiveWorkSnippet}</pre>

                  <div className={styles.callout}>Cache consiste en intercambiar memoria por velocidad.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Aprender a detectar oportunidades reales de cache.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{productsEndpointSnippet}</pre>
                  <p>Hace query a DB:</p>
                  <pre>{productsAmountSnippet}</pre>
                  <p>Y recibe:</p>
                  <pre>{productsTrafficSnippet}</pre>

                  <h4>Paso 1 - Pregunta</h4>
                  <p>La informacion cambia mucho?</p>

                  <h4>Paso 2 - Piensa costo</h4>
                  <p>Cuantas queries esta haciendo la DB?</p>

                  <h4>Paso 3 - Cache mental</h4>
                  <pre>{fiveMinuteCacheSnippet}</pre>
                  <p>Que cambia en DB, latencia y throughput?</p>

                  <h4>Paso 4 - Problema mental</h4>
                  <p>Ahora actualizan un producto. Que pasa con cache?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>cache reduce trabajo</li>
                    <li>cache mejora escalabilidad</li>
                    <li>cache introduce complejidad</li>
                    <li>invalidar cache es dificil</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu sistema se repite muchisimo?</li>
                    <li>Que endpoint golpea demasiado la DB?</li>
                    <li>Que informacion cambia poco?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior hace queries. Backend senior evita trabajo innecesario.
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
