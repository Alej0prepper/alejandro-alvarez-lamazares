"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "expectations", label: "4) Que espera el equipo" },
  { id: "mindset", label: "5) Mentalidad senior" },
  { id: "structure", label: "6) Estructura" },
  { id: "severity", label: "7) Severidad" },
  { id: "full-example", label: "8) Ejemplo completo" },
  { id: "tone", label: "9) Tono profesional" },
  { id: "senior", label: "10) Criterio senior" },
  { id: "testing", label: "11) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const badBugSnippet = `"hay un bug raro"`;

const findingTitleSnippet = `IDOR en GET /orders/{id}`;

const findingDescriptionSnippet = `Un usuario autenticado puede acceder a pedidos de otros usuarios cambiando el ID en la URL.`;

const findingImpactSnippet = `Exposicion de informacion sensible de clientes.`;

const findingEvidenceSnippet = `Usuario A accede a /orders/100
Usuario B accede al mismo recurso exitosamente`;

const findingRecommendationSnippet = `Validar ownership antes de devolver el recurso.`;

const fullTitleSnippet = `Falta de validacion de ownership en GET /orders/{id}`;

const fullDescriptionSnippet = `Usuarios autenticados pueden acceder a pedidos de otros usuarios modificando el ID en la URL.`;

const fullImpactSnippet = `Exposicion de informacion sensible y potencial filtracion de datos de clientes.`;

const fullEvidenceSnippet = `Usuario A:
GET /orders/100

Usuario B:
GET /orders/100

La API devuelve exitosamente el recurso.`;

const fullSeveritySnippet = `Alta`;

const fullRecommendationSnippet = `Validar que el recurso pertenezca al usuario autenticado antes de devolverlo.`;

const emotionalFindingSnippet = `"esto esta muy mal"`;

const technicalFindingSnippet = `"el endpoint permite acceso cruzado entre usuarios autenticados"`;

const miniProjectCaseSnippet = `GET /orders/{id}
permite acceder a pedidos de otros usuarios`;

export default function Daily69Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/68";
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
            <Link className={styles.btn} href="/daily/68">
              <span className={styles.kbd}>←</span> Dia 68
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
                <div className={styles.createdAt}>14/05/2026</div>
                <div className={styles.badge}>Daily #69 • Backend Foundations</div>
                <h2 className={styles.title}>Como reportar hallazgos de seguridad profesionalmente</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Reporting</span>
                  <span className={styles.chip}>Tag: Findings</span>
                  <span className={styles.chip}>Tag: Severidad</span>
                </div>

                <p className={styles.lead}>
                  Encontrar un problema tiene valor, pero comunicarlo con claridad, impacto y accionabilidad es lo que
                  permite que un equipo lo corrija.
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
                    <p className={styles.sub}>El valor real aparece cuando el equipo entiende el riesgo y puede actuar.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Saber comunicar correctamente un hallazgo tambien es seguridad.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Un security finding describe un riesgo detectado durante una revision.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Security Finding: vulnerabilidad, mala practica o riesgo detectado durante una revision de
                    seguridad.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Reportar algo vago no ayuda al equipo a decidir ni corregir.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badBugSnippet}</pre>
                  <p>Eso no explica que ocurre, donde ocurre, ni por que importa.</p>
                </div>
              </section>

              <section className={styles.section} id="expectations">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que espera un equipo realmente</h3>
                    <p className={styles.sub}>Un buen reporte reduce incertidumbre y acelera la correccion.</p>
                  </div>
                  <span className={styles.chip}>Equipo</span>
                </div>
                <div className={styles.sbd}>
                  <p>El equipo necesita entender:</p>
                  <ul className={styles.bullets}>
                    <li>que pasa</li>
                    <li>donde pasa</li>
                    <li>impacto</li>
                    <li>gravedad</li>
                    <li>como reproducirlo</li>
                    <li>como arreglarlo</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer senior</h3>
                    <p className={styles.sub}>No basta con encontrar un fallo: hay que convertirlo en accion.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;encontre un fallo&quot;.</li>
                    <li>Si: &quot;como hago que el equipo entienda el riesgo y pueda actuar?&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="structure">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Estructura profesional de un hallazgo</h3>
                    <p className={styles.sub}>Un finding necesita titulo, descripcion, impacto, evidencia, severidad y recomendacion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Formato</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Titulo</h4>
                  <pre>{findingTitleSnippet}</pre>

                  <h4>Descripcion</h4>
                  <pre>{findingDescriptionSnippet}</pre>

                  <h4>Impacto</h4>
                  <pre>{findingImpactSnippet}</pre>

                  <h4>Evidencia</h4>
                  <pre>{findingEvidenceSnippet}</pre>

                  <h4>Severidad</h4>
                  <p>Nivel del problema segun impacto.</p>

                  <h4>Recomendacion</h4>
                  <pre>{findingRecommendationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="severity">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Severidad</h3>
                    <p className={styles.sub}>La severidad depende del impacto, no de lo interesante que parezca el bug.</p>
                  </div>
                  <span className={styles.chip}>Prioridad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Critico</h4>
                  <ul className={styles.bullets}>
                    <li>acceso a datos</li>
                    <li>ejecucion remota</li>
                    <li>auth bypass</li>
                  </ul>

                  <h4>Alto</h4>
                  <ul className={styles.bullets}>
                    <li>IDOR</li>
                    <li>secretos expuestos</li>
                    <li>privilege escalation</li>
                  </ul>

                  <h4>Medio</h4>
                  <ul className={styles.bullets}>
                    <li>info leakage</li>
                    <li>logs inseguros</li>
                  </ul>

                  <h4>Bajo</h4>
                  <ul className={styles.bullets}>
                    <li>headers faltantes</li>
                    <li>detalles menores</li>
                  </ul>

                  <div className={styles.callout}>
                    La severidad depende del impacto, no de lo interesante del bug.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="full-example">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo completo</h3>
                    <p className={styles.sub}>Un reporte claro permite reproducir, evaluar y corregir.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Titulo</h4>
                  <pre>{fullTitleSnippet}</pre>

                  <h4>Descripcion</h4>
                  <pre>{fullDescriptionSnippet}</pre>

                  <h4>Impacto</h4>
                  <pre>{fullImpactSnippet}</pre>

                  <h4>Evidencia</h4>
                  <pre>{fullEvidenceSnippet}</pre>

                  <h4>Severidad</h4>
                  <pre>{fullSeveritySnippet}</pre>

                  <h4>Recomendacion</h4>
                  <pre>{fullRecommendationSnippet}</pre>

                  <div className={styles.quote}>
                    Un hallazgo mal explicado puede ignorarse. Un hallazgo bien comunicado mueve equipos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="tone">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Tono profesional</h3>
                    <p className={styles.sub}>Evita findings emocionales; usa lenguaje objetivo y tecnico.</p>
                  </div>
                  <span className={styles.chip}>Comunicacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Error tipico</h4>
                  <pre>{emotionalFindingSnippet}</pre>
                  <p>Poco util.</p>

                  <h4>Mejor enfoque</h4>
                  <pre>{technicalFindingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como piensa alguien senior</h3>
                    <p className={styles.sub}>No busca verse inteligente; busca claridad, impacto y accionabilidad.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>claridad</li>
                    <li>impacto</li>
                    <li>accionabilidad</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Antes de reportar, confirma que puedes explicar, reproducir y mitigar.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Puedo explicar el problema claramente?</li>
                    <li>Puedo reproducirlo?</li>
                    <li>Puedo explicar impacto real?</li>
                    <li>Puedo sugerir mitigacion?</li>
                  </ul>
                  <div className={styles.callout}>
                    Encontrar bugs tiene valor. Comunicar riesgos correctamente tiene muchisimo mas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Escribir un hallazgo profesional.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Convertir un problema tecnico en un finding accionable.</p>

                  <h4>Caso</h4>
                  <pre>{miniProjectCaseSnippet}</pre>

                  <h4>Paso 1 - Escribe titulo</h4>
                  <h4>Paso 2 - Describe impacto</h4>
                  <h4>Paso 3 - Explica reproduccion</h4>
                  <h4>Paso 4 - Asigna severidad</h4>
                  <h4>Paso 5 - Propón fix</h4>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>un hallazgo necesita estructura</li>
                    <li>impacto importa muchisimo</li>
                    <li>claridad tecnica vale oro</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Como escribirias findings de tu proyecto real?</li>
                    <li>Que severidad tendria cada uno?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior encuentra problemas. Backend senior comunica riesgos de forma accionable.
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
