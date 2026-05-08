"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "example", label: "4) Ejemplo" },
  { id: "critical-factors", label: "5) Que lo hace critico" },
  { id: "mindset", label: "6) Mentalidad backend" },
  { id: "dotnet", label: "7) .NET" },
  { id: "priority", label: "8) Que revisar primero" },
  { id: "testing", label: "9) Testing" },
  { id: "protections", label: "10) Protecciones" },
  { id: "mini-project", label: "Practica" },
] as const;

const lowRiskSnippet = `GET /health`;
const highRiskSnippet = `POST /payments/refund`;

const moneySnippet = `payments
refunds
subscriptions`;

const identitySnippet = `login
reset-password
users
roles`;

const privateDataSnippet = `orders
documents
medical-data`;

const stateChangeSnippet = `delete
approve
cancel
ship`;

const heavyResourcesSnippet = `reports
exports
heavy queries`;

const dotnetSnippet = `[Authorize]
[HttpPost("refund")]
public async Task Refund(Guid paymentId)
{
}`;

const firstReviewSnippet = `login
payments
admin
roles
users`;

const secondReviewSnippet = `reportes
exports
uploads`;

const powerEndpointSnippet = `DELETE /users/{id}`;

const lowImpactBugSnippet = `GET /health`;
const highImpactBugSnippet = `POST /admin/users/delete`;

const miniProjectListSnippet = `POST /login
GET /orders/{id}
POST /refund
DELETE /users/{id}
GET /health`;

const riskScaleSnippet = `bajo
medio
alto
critico`;

const justificationSnippet = `impacto
datos
privilegios
dinero`;

export default function Daily62Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/61";
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
            <Link className={styles.btn} href="/daily/61">
              <span className={styles.kbd}>←</span> Dia 61
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
                <div className={styles.createdAt}>07/05/2026</div>
                <div className={styles.badge}>Daily #62 • Backend Foundations</div>
                <h2 className={styles.title}>Endpoints criticos: que proteger primero</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Riesgo</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: Priorizacion</span>
                </div>

                <p className={styles.lead}>
                  No todos los endpoints tienen el mismo impacto: proteger primero los mas peligrosos cambia el nivel de
                  seguridad real.
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
                    <p className={styles.sub}>Algunos endpoints son mucho mas peligrosos que otros.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Backend senior sabe que proteger primero.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Un endpoint critico puede causar alto impacto si falla o se abusa.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Endpoint critico: endpoint cuyo abuso, acceso indebido o fallo puede causar impacto importante en
                    el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Pensar que todos los endpoints son iguales.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>No lo son.</div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>No tiene el mismo riesgo un endpoint operativo que uno financiero.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Comparacion:</p>
                  <pre>{lowRiskSnippet}</pre>
                  <p>vs</p>
                  <pre>{highRiskSnippet}</pre>
                  <p>Claramente uno es mucho mas sensible.</p>
                </div>
              </section>

              <section className={styles.section} id="critical-factors">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que hace critico a un endpoint</h3>
                    <p className={styles.sub}>El impacto viene por dinero, identidad, datos, estado y recursos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Maneja dinero</h4>
                  <pre>{moneySnippet}</pre>

                  <h4>2) Maneja identidad</h4>
                  <pre>{identitySnippet}</pre>

                  <h4>3) Accede a datos privados</h4>
                  <pre>{privateDataSnippet}</pre>

                  <h4>4) Modifica estado importante</h4>
                  <pre>{stateChangeSnippet}</pre>

                  <h4>5) Consume muchos recursos</h4>
                  <pre>{heavyResourcesSnippet}</pre>
                  <p>Tambien es critico por riesgo de DoS.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No basta con que funcione: hay que pensar en abuso.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;funciona?&quot;.</li>
                    <li>Si: &quot;que pasa si alguien abusa esto?&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>En endpoints sensibles, seguridad debe ser explicita y verificable.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dotnetSnippet}</pre>
                  <p>Preguntas de seguridad:</p>
                  <ul className={styles.bullets}>
                    <li>Quien puede ejecutar esto?</li>
                    <li>Hay rate limiting?</li>
                    <li>Hay logging?</li>
                    <li>Hay auditoria?</li>
                    <li>Hay doble validacion?</li>
                  </ul>
                  <div className={styles.callout}>
                    Cuanto mayor el impacto, mayor el nivel de proteccion necesario.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="priority">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que deberias revisar primero</h3>
                    <p className={styles.sub}>Entrar a una API sin priorizar es perder tiempo en seguridad.</p>
                  </div>
                  <span className={styles.chip}>Prioridad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Primero</h4>
                  <pre>{firstReviewSnippet}</pre>

                  <h4>Luego</h4>
                  <pre>{secondReviewSnippet}</pre>

                  <h4>Despues</h4>
                  <p>Resto de endpoints.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Haz preguntas por impacto, no por cantidad de endpoints.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Que endpoint me da mas poder?</h4>
                  <pre>{powerEndpointSnippet}</pre>

                  <h4>Que endpoint afecta mas datos?</h4>
                  <h4>Que endpoint podria tumbar el sistema?</h4>
                  <h4>Que endpoint expondria mas informacion?</h4>

                  <div className={styles.quote}>No todas las vulnerabilidades tienen el mismo impacto.</div>

                  <p>Un bug en:</p>
                  <pre>{lowImpactBugSnippet}</pre>
                  <p>no es igual que uno en:</p>
                  <pre>{highImpactBugSnippet}</pre>

                  <p>Auditar endpoints al azar es un error tipico: backend senior prioriza.</p>
                </div>
              </section>

              <section className={styles.section} id="protections">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Que protecciones suelen necesitar</h3>
                    <p className={styles.sub}>Los endpoints criticos requieren mas controles simultaneos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Defensa</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>autorizacion estricta</li>
                    <li>ownership checks</li>
                    <li>rate limiting</li>
                    <li>logging</li>
                    <li>auditoria</li>
                    <li>validacion fuerte</li>
                    <li>monitoreo</li>
                  </ul>
                  <div className={styles.callout}>La seguridad tambien es saber priorizar riesgos.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Aprender a clasificar y priorizar endpoints por impacto real.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Aprender a priorizar endpoints.</p>

                  <h4>Lista 5 endpoints</h4>
                  <pre>{miniProjectListSnippet}</pre>

                  <h4>Paso 1 - Clasifica riesgo</h4>
                  <pre>{riskScaleSnippet}</pre>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <p>Si solo pudieras auditar uno primero, cual escogerias?</p>

                  <h4>Paso 3 - Justifica</h4>
                  <pre>{justificationSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>La seguridad tiene prioridades.</li>
                    <li>El impacto importa mas que la cantidad.</li>
                    <li>Algunos endpoints merecen mucha mas atencion.</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu proyecto te preocuparia mas si fuera vulnerable?</li>
                    <li>Cual protegerias primero?</li>
                  </ul>

                  <div className={styles.quote}>Backend junior revisa endpoints. Backend senior evalua impacto.</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
