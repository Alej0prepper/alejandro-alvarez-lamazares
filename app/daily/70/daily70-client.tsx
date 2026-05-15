"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "realistic-audit", label: "3) Auditoria realista" },
  { id: "scenario", label: "4) Escenario" },
  { id: "attack-surface", label: "5) Superficie" },
  { id: "auth", label: "6) Autenticacion" },
  { id: "authorization", label: "7) Autorizacion" },
  { id: "critical", label: "8) Criticos" },
  { id: "uploads", label: "9) Uploads" },
  { id: "availability", label: "10) Disponibilidad" },
  { id: "logs", label: "11) Logs" },
  { id: "secrets", label: "12) Secretos" },
  { id: "integrations", label: "13) Integraciones" },
  { id: "senior", label: "14) Senior" },
  { id: "findings", label: "15) Hallazgos" },
  { id: "mini-project", label: "Practica final" },
] as const;

const badAuditSnippet = `leer 200 mil lineas de codigo`;

const endpointsSnippet = `POST /login
GET /orders/{id}
POST /payments/refund
POST /upload
GET /reports/export`;

const attackSurfaceQuestionSnippet = `que endpoints son mas peligrosos?`;

const criticalEndpointsSnippet = `/login
/payments/refund
/upload
/reports/export`;

const ordersEndpointSnippet = `GET /orders/{id}`;

const idorQuestionSnippet = `el usuario puede acceder a pedidos ajenos?`;

const idorTestSnippet = `/orders/100
/orders/101`;

const refundEndpointSnippet = `POST /payments/refund`;

const uploadEndpointSnippet = `POST /upload`;

const reportsEndpointSnippet = `GET /reports/export`;

const secretsSearchSnippet = `apikey
password
connection string`;

const seniorPrioritySnippet = `que tiene mas impacto
que es mas explotable
que seria mas grave`;

const breakQuestionSnippet = `como podria romperse esto?`;

const criticalListSnippet = `login
payments
uploads
admin`;

const severitySnippet = `critico
alto
medio`;

const findingSnippet = `problema
impacto
fix`;

const firstFixSnippet = `que arreglaria primero?`;

export default function Daily70Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/69";
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
            <Link className={styles.btn} href="/daily/69">
              <span className={styles.kbd}>←</span> Dia 69
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
                <div className={styles.createdAt}>15/05/2026</div>
                <div className={styles.badge}>Daily #70 • Backend Foundations</div>
                <h2 className={styles.title}>Auditoria completa simulada: aplicar todo junto</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Auditoria</span>
                  <span className={styles.chip}>Tag: Riesgo</span>
                  <span className={styles.chip}>Tag: Final</span>
                </div>

                <p className={styles.lead}>
                  La auditoria completa junta todo: autenticacion, autorizacion, IDOR, uploads, rate limiting, logs,
                  secretos, DoS, SQL Injection y threat modeling.
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
                    <p className={styles.sub}>El siguiente nivel es mirar un sistema completo y evaluarlo mentalmente.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Hasta ahora viste piezas separadas:</p>
                  <ul className={styles.bullets}>
                    <li>autenticacion</li>
                    <li>autorizacion</li>
                    <li>IDOR</li>
                    <li>uploads</li>
                    <li>rate limiting</li>
                    <li>logs</li>
                    <li>secretos</li>
                    <li>DoS</li>
                    <li>SQL Injection</li>
                    <li>threat modeling</li>
                  </ul>
                  <div className={styles.callout}>Ahora haces lo que hace alguien senior: evaluar el sistema completo.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Auditar backend es revisar riesgos, vulnerabilidades y superficies de ataque.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Auditoria de seguridad backend: proceso de revisar un sistema para identificar riesgos,
                    vulnerabilidades y superficies de ataque.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="realistic-audit">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que no es una auditoria realista</h3>
                    <p className={styles.sub}>No se trata de leer todo sin estrategia.</p>
                  </div>
                  <span className={styles.chip}>Metodo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badAuditSnippet}</pre>
                  <p>Eso no escala.</p>

                  <h4>Como se audita realmente</h4>
                  <ul className={styles.bullets}>
                    <li>priorizacion</li>
                    <li>analisis de riesgo</li>
                    <li>pruebas dirigidas</li>
                    <li>pensamiento critico</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="scenario">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Escenario de auditoria</h3>
                    <p className={styles.sub}>Una API pequena ya puede concentrar riesgos importantes.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoints</h4>
                  <pre>{endpointsSnippet}</pre>

                  <h4>Sistema</h4>
                  <ul className={styles.bullets}>
                    <li>JWT auth</li>
                    <li>uploads</li>
                    <li>integracion de pagos</li>
                    <li>usuarios y roles</li>
                  </ul>
                  <p>Ahora piensas como auditor/backend senior.</p>
                </div>
              </section>

              <section className={styles.section} id="attack-surface">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Paso 1 - Superficie de ataque</h3>
                    <p className={styles.sub}>Primero identifica donde esta el mayor poder o impacto.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Prioridad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{attackSurfaceQuestionSnippet}</pre>

                  <h4>Criticos</h4>
                  <pre>{criticalEndpointsSnippet}</pre>

                  <h4>Por que</h4>
                  <ul className={styles.bullets}>
                    <li>autenticacion</li>
                    <li>dinero</li>
                    <li>archivos</li>
                    <li>alto consumo de recursos</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="auth">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Paso 2 - Autenticacion</h3>
                    <p className={styles.sub}>Aqui buscas bypass.</p>
                  </div>
                  <span className={styles.chip}>Auth</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin token bloquea?</li>
                    <li>JWT invalido bloquea?</li>
                    <li>JWT expirado bloquea?</li>
                    <li>Valida issuer y audience?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="authorization">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Paso 3 - Autorizacion</h3>
                    <p className={styles.sub}>El objetivo es detectar IDOR y acceso cruzado.</p>
                  </div>
                  <span className={styles.chip}>IDOR</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ordersEndpointSnippet}</pre>

                  <h4>Pregunta clave</h4>
                  <pre>{idorQuestionSnippet}</pre>

                  <h4>Prueba mental</h4>
                  <pre>{idorTestSnippet}</pre>
                  <p>Aqui buscas IDOR.</p>
                </div>
              </section>

              <section className={styles.section} id="critical">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Paso 4 - Endpoints criticos</h3>
                    <p className={styles.sub}>En endpoints de alto impacto, revisa permisos y trazabilidad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{refundEndpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>quien puede usarlo?</li>
                    <li>requiere permisos especiales?</li>
                    <li>hay logging?</li>
                    <li>hay rate limiting?</li>
                    <li>hay auditoria?</li>
                  </ul>
                  <p>Aqui piensas impacto.</p>
                </div>
              </section>

              <section className={styles.section} id="uploads">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Paso 5 - Uploads</h3>
                    <p className={styles.sub}>Un upload es input arbitrario en formato binario.</p>
                  </div>
                  <span className={styles.chip}>Archivos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{uploadEndpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>limita tamano?</li>
                    <li>valida extension?</li>
                    <li>renombra archivo?</li>
                    <li>previene path traversal?</li>
                    <li>permite malware?</li>
                    <li>puede llenarse el disco?</li>
                  </ul>
                  <p>Aqui piensas input arbitrario.</p>
                </div>
              </section>

              <section className={styles.section} id="availability">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Paso 6 - Disponibilidad y abuso</h3>
                    <p className={styles.sub}>Un endpoint pesado puede convertirse en DoS.</p>
                  </div>
                  <span className={styles.chip}>DoS</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{reportsEndpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>query pesada?</li>
                    <li>rate limiting?</li>
                    <li>cache?</li>
                    <li>timeout?</li>
                    <li>puede hacerse spam?</li>
                  </ul>
                  <p>Aqui piensas DoS.</p>
                </div>
              </section>

              <section className={styles.section} id="logs">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Paso 7 - Logs y monitoreo</h3>
                    <p className={styles.sub}>Sin visibilidad, no puedes investigar ataques ni abuso.</p>
                  </div>
                  <span className={styles.chip}>Observabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>registran login failures?</li>
                    <li>registran refunds?</li>
                    <li>registran accesos denegados?</li>
                    <li>hay alertas?</li>
                    <li>se filtran secretos?</li>
                  </ul>
                  <p>Aqui piensas visibilidad.</p>
                </div>
              </section>

              <section className={styles.section} id="secrets">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Paso 8 - Secretos</h3>
                    <p className={styles.sub}>Secretos expuestos convierten un bug pequeno en una brecha grave.</p>
                  </div>
                  <span className={styles.chip}>Secretos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Buscar</h4>
                  <pre>{secretsSearchSnippet}</pre>

                  <h4>Preguntas</h4>
                  <ul className={styles.bullets}>
                    <li>estan en appsettings?</li>
                    <li>estan hardcodeados?</li>
                    <li>hay secretos en logs?</li>
                    <li>la app usa root/admin?</li>
                  </ul>
                  <p>Aqui piensas impacto si comprometen la app.</p>
                </div>
              </section>

              <section className={styles.section} id="integrations">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Paso 9 - Integraciones externas</h3>
                    <p className={styles.sub}>Una API externa tambien es input no confiable.</p>
                  </div>
                  <span className={styles.chip}>Integraciones</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>validan webhooks?</li>
                    <li>timeouts?</li>
                    <li>retry infinito?</li>
                    <li>aceptan cualquier certificado?</li>
                    <li>confian demasiado en respuestas externas?</li>
                  </ul>
                  <p>Aqui piensas confianza.</p>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Como piensa alguien senior realmente</h3>
                    <p className={styles.sub}>No recorre endpoints al azar: prioriza constantemente.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{seniorPrioritySnippet}</pre>
                  <p>La auditoria real es priorizacion constante.</p>
                </div>
              </section>

              <section className={styles.section} id="findings">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Hallazgos tipicos que probablemente encontrarias</h3>
                    <p className={styles.sub}>Clasifica por impacto para decidir que corregir primero.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Findings</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Criticos</h4>
                  <ul className={styles.bullets}>
                    <li>IDOR</li>
                    <li>auth bypass</li>
                    <li>secretos expuestos</li>
                  </ul>

                  <h4>Altos</h4>
                  <ul className={styles.bullets}>
                    <li>uploads inseguros</li>
                    <li>brute force</li>
                    <li>rate limiting ausente</li>
                  </ul>

                  <h4>Medios</h4>
                  <ul className={styles.bullets}>
                    <li>info leakage</li>
                    <li>logging pobre</li>
                    <li>validacion insuficiente</li>
                  </ul>

                  <div className={styles.callout}>La seguridad no consiste en memorizar ataques.</div>
                  <p>Consiste en aprender a preguntar:</p>
                  <pre>{breakQuestionSnippet}</pre>
                  <div className={styles.quote}>
                    Auditar seguridad es analizar riesgo, impacto y abuso de forma sistematica.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto final (15 min)</h3>
                    <p className={styles.sub}>Hacer tu primera mini auditoria mental completa.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Usa cualquier API real o imaginaria y analizala por riesgo.</p>

                  <h4>Paso 1 - Lista endpoints criticos</h4>
                  <pre>{criticalListSnippet}</pre>

                  <h4>Paso 2 - Revisa</h4>
                  <ul className={styles.bullets}>
                    <li>auth</li>
                    <li>autorizacion</li>
                    <li>IDOR</li>
                    <li>uploads</li>
                    <li>rate limiting</li>
                    <li>logs</li>
                    <li>secretos</li>
                  </ul>

                  <h4>Paso 3 - Detecta 3 riesgos</h4>
                  <pre>{severitySnippet}</pre>

                  <h4>Paso 4 - Escribe findings simples</h4>
                  <pre>{findingSnippet}</pre>

                  <h4>Paso 5 - Prioriza</h4>
                  <pre>{firstFixSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>ya no piensas como usuario</li>
                    <li>piensas como evaluador de riesgo</li>
                    <li>ves superficies de ataque naturalmente</li>
                    <li>priorizas impacto</li>
                  </ul>

                  <h4>Lo que lograste realmente</h4>
                  <ul className={styles.bullets}>
                    <li>evaluar APIs con criterio</li>
                    <li>detectar problemas comunes</li>
                    <li>entender impacto real</li>
                    <li>hablar de seguridad backend seriamente</li>
                    <li>escribir hallazgos profesionales</li>
                    <li>pensar como backend engineer senior orientado a seguridad</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior implementa funcionalidades. Backend senior piensa constantemente: como podria
                    romperse esto y que tan grave seria?
                  </div>
                  <div className={styles.callout}>Fin del bloque de Seguridad Backend.</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
