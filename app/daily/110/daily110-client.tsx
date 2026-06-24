"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error" },
  { id: "cleanup", label: "4) Limpieza" },
  { id: "responses", label: "5) Respuestas" },
  { id: "bad-request", label: "6) 400" },
  { id: "not-found", label: "7) 404" },
  { id: "conflict", label: "8) 409" },
  { id: "internal", label: "9) 500" },
  { id: "middleware", label: "10) Middleware" },
  { id: "format", label: "11) Formato" },
  { id: "validation", label: "12) Validacion" },
  { id: "security", label: "13) Seguridad" },
  { id: "critical", label: "14) Endpoints" },
  { id: "result", label: "15) Resultado" },
  { id: "exercise", label: "16) Ejercicio" },
  { id: "final", label: "17) Cierre" },
] as const;

const introSnippet = `Hasta ahora hemos construido:

Dominio
Repositorios
Services
Controllers
Payments
Auditoria`;

const hardeningSnippet = `Preparar el sistema para la realidad.`;

const hardeningMeaningSnippet = `estabilidad
seguridad
mantenibilidad
operacion`;

const caseHappySnippet = `producto existe
orden existe
base de datos responde
todo sale bien`;

const caseRealSnippet = `producto inexistente
orden inexistente
estado invalido
timeout
error inesperado`;

const cleanSnippet = `WeatherForecast`;

const whyCleanSnippet = `no aporta negocio
genera ruido
confunde`;

const responseQuestionSnippet = `Que devuelve la API cuando falla?`;

const badLoopSnippet = `500
500
500
500`;

const badRequestSnippet = `Quantity = 0

Price negativo

Body invalido`;

const badRequestMeaningSnippet = `Error del cliente.

No del servidor.`;

const notFoundSnippet = `Order inexistente
Product inexistente`;

const notFoundMeaningSnippet = `Recurso inexistente ≠ error interno.`;

const conflictSnippet = `Confirmar orden ya pagada
Cancelar orden cancelada
Pagar orden ya pagada`;

const conflictMeaningSnippet = `La peticion es correcta.

Pero viola una regla.`;

const internalSnippet = `DB caida

NullReference inesperado

Bug`;

const internalMeaningSnippet = `algo salio mal dentro del sistema`;

const errorHandlingSnippet = `try
{
}
catch
{
}`;

const middlewareSnippet = `Exception Middleware`;

const middlewareTasksSnippet = `capturar excepciones
registrar logs
devolver respuesta consistente`;

const formatSnippet = `{
  "status": 404,
  "message": "Order not found"
}`;

const inconsistentSnippet = `{
  "error": "bad"
}

{
  "message": "something happened"
}

{
  "detail": "..."
}`;

const predictableSnippet = `APIs predecibles son mas faciles de consumir.`;

const validationSnippet = `Quantity > 0
Price > 0
Name requerido
SKU requerido`;

const validationMeaningSnippet = `Validar temprano.`;

const noInternalsSnippet = `stack trace completo`;

const safeClientSnippet = `{
 "message":
 "Unexpected error"
}`;

const endpointsSnippet = `Create Product
Create Order
Pay Order
Delete Product`;

const reviewSnippet = `nulls
estados invalidos
datos faltantes`;

const juniorSnippet = `si algo falla, throw Exception`;

const seniorSnippet = `que tipo de error es
que status HTTP representa
que mensaje debe ver el cliente`;

const resultSnippet = `API
errores consistentes
validacion temprana
middleware centralizado
respuestas predecibles`;

const finalReflectionSnippet = `Hardening no agrega funcionalidades visibles.
Hace que la API sea robusta, segura y predecible.`;

const nextStepSnippet = `Dia 111: Dockerizacion revisada`;

const nextTopicsSnippet = `Dockerfile
docker-compose.yml
.dockerignore
appsettings
variables de entorno
connection string
API arranca desde cero
PostgreSQL persiste`;

export default function Daily110Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/109";
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
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/109">
              <span className={styles.kbd}>←</span> Dia 109
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
                <div className={styles.createdAt}>24/06/2026</div>
                <div className={styles.badge}>Daily #110 • Hardening</div>
                <h2 className={styles.title}>
                  Hardening de API: convertir una API que funciona en una API preparada para errores reales
                </h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Hardening</span>
                  <span className={styles.chip}>Tag: Errores</span>
                  <span className={styles.chip}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: API</span>
                </div>

                <p className={styles.lead}>
                  Hardening no agrega funcionalidades visibles. Hace que el sistema sea mas robusto y predecible.
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
                    <p className={styles.sub}>Una API puede funcionar y aun así no estar lista para produccion.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <div className={styles.callout}>Hardening significa preparar el sistema para la realidad.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es Hardening</h3>
                    <p className={styles.sub}>Robustez, seguridad, mantenibilidad y operacion.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{hardeningSnippet}</pre>
                  <pre>{hardeningMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Construir solo el caso feliz y olvidar la realidad de produccion.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{caseHappySnippet}</pre>
                  <pre>{caseRealSnippet}</pre>
                  <div className={styles.quote}>Produccion vive en esos escenarios.</div>
                </div>
              </section>

              <section className={styles.section} id="cleanup">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Eliminar basura del proyecto</h3>
                    <p className={styles.sub}>Si no aporta negocio, genera ruido.</p>
                  </div>
                  <span className={styles.chip}>Limpieza</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cleanSnippet}</pre>
                  <pre>{whyCleanSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="responses">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Respuestas HTTP consistentes</h3>
                    <p className={styles.sub}>Cada error debe mapearse al status correcto.</p>
                  </div>
                  <span className={styles.chip}>HTTP</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{responseQuestionSnippet}</pre>
                  <pre>{badLoopSnippet}</pre>
                  <div className={styles.callout}>Eso es incorrecto.</div>
                </div>
              </section>

              <section className={styles.section} id="bad-request">
                <div className={styles.shd}>
                  <div>
                    <h3>6. 400 Bad Request</h3>
                    <p className={styles.sub}>Cuando el cliente envía algo inválido.</p>
                  </div>
                  <span className={styles.chip}>400</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badRequestSnippet}</pre>
                  <pre>{badRequestMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="not-found">
                <div className={styles.shd}>
                  <div>
                    <h3>7. 404 Not Found</h3>
                    <p className={styles.sub}>Cuando el recurso no existe.</p>
                  </div>
                  <span className={styles.chip}>404</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notFoundSnippet}</pre>
                  <pre>{notFoundMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="conflict">
                <div className={styles.shd}>
                  <div>
                    <h3>8. 409 Conflict</h3>
                    <p className={styles.sub}>La peticion es valida, pero el estado actual no lo permite.</p>
                  </div>
                  <span className={styles.chip}>409</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{conflictSnippet}</pre>
                  <pre>{conflictMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="internal">
                <div className={styles.shd}>
                  <div>
                    <h3>9. 500 Internal Server Error</h3>
                    <p className={styles.sub}>Reservado para errores inesperados dentro del sistema.</p>
                  </div>
                  <span className={styles.chip}>500</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{internalSnippet}</pre>
                  <pre>{internalMeaningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="middleware">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Error handling centralizado</h3>
                    <p className={styles.sub}>Un middleware unico evita repetir try/catch en todos los controllers.</p>
                  </div>
                  <span className={styles.chip}>Middleware</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorHandlingSnippet}</pre>
                  <pre>{middlewareSnippet}</pre>
                  <pre>{middlewareTasksSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="format">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Formato consistente de errores</h3>
                    <p className={styles.sub}>Las APIs predecibles se consumen mejor.</p>
                  </div>
                  <span className={styles.chip}>Formato</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{formatSnippet}</pre>
                  <pre>{inconsistentSnippet}</pre>
                  <div className={styles.callout}>{predictableSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="validation">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Validaciones</h3>
                    <p className={styles.sub}>Validar temprano evita basura entrando al sistema.</p>
                  </div>
                  <span className={styles.chip}>Validacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{validationSnippet}</pre>
                  <pre>{validationMeaningSnippet}</pre>
                  <div className={styles.quote}>Validar temprano.</div>
                </div>
              </section>

              <section className={styles.section} id="security">
                <div className={styles.shd}>
                  <div>
                    <h3>13. No exponer detalles internos</h3>
                    <p className={styles.sub}>La respuesta al cliente no debe revelar stack traces ni clases internas.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{noInternalsSnippet}</pre>
                  <pre>{safeClientSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="critical">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Revisar endpoints criticos</h3>
                    <p className={styles.sub}>Hay operaciones que merecen una mirada extra porque rompen el sistema con facilidad.</p>
                  </div>
                  <span className={styles.chip}>Críticos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{endpointsSnippet}</pre>
                  <pre>{reviewSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No responde solo si funciona; piensa en tipos de error y respuestas claras.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Senior</h4>
                  <pre>{seniorSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="result">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Resultado esperado</h3>
                    <p className={styles.sub}>Una API robusta, segura y predecible.</p>
                  </div>
                  <span className={styles.chip}>Resultado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <div className={styles.callout}>{finalReflectionSnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Mapea errores y status antes de tocar el codigo.</p>
                  </div>
                  <span className={styles.chip}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.li}>
                    <strong>Quantity = 0</strong>
                  </div>
                  <pre>→ 400 Bad Request</pre>
                  <div className={styles.li}>
                    <strong>Order inexistente</strong>
                  </div>
                  <pre>→ 404 Not Found</pre>
                  <div className={styles.li}>
                    <strong>Orden ya pagada</strong>
                  </div>
                  <pre>→ 409 Conflict</pre>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>Hardening prepara el sistema para escenarios reales y errores esperables.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/109">
                      <span className={styles.kbd}>←</span> Dia 109
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily">
                      Ver calendario
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 110 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> respuesta consistente y errores bien clasificados.
                </div>
                <div className={styles.li}>
                  <strong>Seguridad:</strong> no exponer detalles internos al cliente.
                </div>
                <div className={styles.li}>
                  <strong>Operacion:</strong> middleware centralizado para capturar excepciones.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> pasar de una API que funciona a una API preparada para errores reales.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
