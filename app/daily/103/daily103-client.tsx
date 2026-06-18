"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "architect", label: "3) Arquitecto" },
  { id: "before-programming", label: "4) Antes de programar" },
  { id: "flow", label: "5) Flujo" },
  { id: "mistakes", label: "6) Error comun" },
  { id: "order", label: "7) Orden correcto" },
  { id: "checks", label: "8) Revisar primero" },
  { id: "objective", label: "9) Objetivo" },
  { id: "changes", label: "10) Que cambia" },
  { id: "roadmap", label: "11) Roadmap" },
  { id: "senior", label: "12) Senior" },
  { id: "project", label: "13) Mini ejercicio" },
  { id: "final", label: "14) Cierre" },
] as const;

const projectNameSnippet = `OrderFlow API`;

const existingScopeSnippet = `Products
EF Core
PostgreSQL
CRUD
Migraciones`;

const missingScopeSnippet = `Orders
Payments
AuditLog
Dockerizacion completa
Kubernetes`;

const coreQuestionSnippet = `que debo terminar?`;

const seniorAnswerSnippet = `lo que falta para que el sistema este completo`;

const architectQuestionSnippet = `que falta para que el sistema este completo?`;

const juniorQuestionSnippet = `que endpoint hago ahora?`;

const domainEntitiesSnippet = `Order
OrderItem
Payment
AuditLog`;

const orderQuestionsSnippet = `Puede una orden estar vacia?
Puede pagarse dos veces?
Puede confirmarse sin productos?
Como se calcula el total?`;

const flowSnippet = `Crear orden
Agregar productos
Confirmar orden
Pagar
Registrar auditoria`;

const commonMistakeSnippet = `Empezar por Docker

O peor:

Empezar por Kubernetes`;

const wrongOutcomeSnippet = `Una aplicacion incompleta
dentro de un contenedor perfecto`;

const buildOrderSnippet = `Dominio
Persistencia
Casos de uso
Controllers
Hardening
Docker
Kubernetes`;

const firstReviewSnippet = `validar el dominio`;

const implementationQuestionsSnippet = `Que pasa si una orden se confirma dos veces?
Que pasa si un pago llega tarde?
Que pasa si falla la persistencia?
Que queda auditado?`;

const goalSnippet = `completar OrderFlow como una aplicacion funcional`;

const changesSnippet = `Antes:
Aprendiamos conceptos

Ahora:
Construimos un sistema`;

const roadmapSnippet = `104 Dominio
105 Repositorios
106 Servicios
107 Controllers
108 Payments
109 AuditLog
110 Hardening
111 Docker
112 Kubernetes`;

const seniorMindsetSnippet = `No pienso:
Que codigo escribo hoy?

Pienso:
Cual es el siguiente cuello de botella
para terminar el proyecto?`;

const focusSnippet = `identificar que falta, priorizar correctamente y ejecutar en el orden adecuado`;

const projectExerciseSnippet = `ROADMAP_IMPLEMENTACION.md`;

const roadmapSectionsSnippet = `Dominio
Persistencia
Servicios
Controllers
Docker
Kubernetes`;

const finishStateSnippet = `tener un backend completo
funcional
desplegable`;

const finalReflectionSnippet = `Construir software no consiste en anadir funcionalidades sin parar.
Consiste en identificar que falta, priorizar correctamente y ejecutar en el orden adecuado.`;

const nextStepSnippet = `Dia 104: Dominio`;

const nextTopicsSnippet = `Order
OrderItem
Value Objects
Reglas de negocio
Invariantes
Casos de uso
Persistencia
Pruebas de dominio`;

export default function Daily103Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/102";
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
            <Link className={styles.btn} href="/daily/102">
              <span className={styles.kbd}>←</span> Dia 102
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
                <div className={styles.createdAt}>17/06/2026</div>
                <div className={styles.badge}>Daily #103 • Planificacion</div>
                <h2 className={styles.title}>Pausa estrategica: antes de seguir construyendo, toca ordenar el proyecto</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Planificacion</span>
                  <span className={styles.chip}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Ejecucion</span>
                  <span className={styles.chip}>Tag: Roadmap</span>
                </div>

                <p className={styles.lead}>
                  El conocimiento solo genera valor cuando se convierte en implementacion.
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
                    <p className={styles.sub}>Aprender sin terminar nada no produce valor real.</p>
                  </div>
                  <span className={styles.chip}>Pausa</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{projectNameSnippet}</pre>
                  <div className={styles.callout}>Hoy no toca aprender mas. Toca convertir lo aprendido en un plan ejecutable.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema real</h3>
                    <p className={styles.sub}>La pregunta correcta ya no es que mas estudiar, sino que falta terminar.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{existingScopeSnippet}</pre>
                  <pre>{missingScopeSnippet}</pre>
                  <pre>{coreQuestionSnippet}</pre>
                  <pre>{seniorAnswerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="architect">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Pensar como un arquitecto</h3>
                    <p className={styles.sub}>Un senior mira el sistema completo, no solo el siguiente endpoint.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{juniorQuestionSnippet}</pre>
                  <pre>{architectQuestionSnippet}</pre>
                  <div className={styles.quote}>Son formas distintas de pensar el trabajo.</div>
                </div>
              </section>

              <section className={styles.section} id="before-programming">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Antes de programar</h3>
                    <p className={styles.sub}>Primero se valida el dominio. Si el dominio falla, todo lo demas arrastra el error.</p>
                  </div>
                  <span className={styles.chip}>Dominio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{domainEntitiesSnippet}</pre>
                  <pre>{firstReviewSnippet}</pre>
                  <pre>{implementationQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="flow">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que vamos a construir</h3>
                    <p className={styles.sub}>Todo debe acercarnos al flujo real del negocio.</p>
                  </div>
                  <span className={styles.chip}>Flujo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{flowSnippet}</pre>
                  <div className={styles.callout}>Cada dia debe mover este flujo hacia una aplicacion funcional.</div>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>6. El error mas comun</h3>
                    <p className={styles.sub}>Empezar por infraestructura antes de cerrar la logica del negocio.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{commonMistakeSnippet}</pre>
                  <pre>{wrongOutcomeSnippet}</pre>
                  <div className={styles.quote}>Un contenedor perfecto no arregla una aplicacion incompleta.</div>
                </div>
              </section>

              <section className={styles.section} id="order">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Orden correcto de construccion</h3>
                    <p className={styles.sub}>La secuencia importa. Primero negocio, despues despliegue.</p>
                  </div>
                  <span className={styles.chip}>Secuencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{buildOrderSnippet}</pre>
                  <div className={styles.callout}>No al reves.</div>
                </div>
              </section>

              <section className={styles.section} id="checks">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que revisar primero</h3>
                    <p className={styles.sub}>Las preguntas de dominio son mas importantes que cualquier endpoint.</p>
                  </div>
                  <span className={styles.chip}>Chequeo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderQuestionsSnippet}</pre>
                  <div className={styles.quote}>Si el dominio esta mal, repositorios, servicios y controllers tambien lo estaran.</div>
                </div>
              </section>

              <section className={styles.section} id="objective">
                <div className={styles.shd}>
                  <div>
                    <h3>9. El objetivo de esta fase</h3>
                    <p className={styles.sub}>No es aprender algo nuevo. Es conectar todo lo aprendido.</p>
                  </div>
                  <span className={styles.chip}>Objetivo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{goalSnippet}</pre>
                  <div className={styles.callout}>La prioridad cambia de teoria a ejecucion.</div>
                </div>
              </section>

              <section className={styles.section} id="changes">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Que cambia a partir de hoy</h3>
                    <p className={styles.sub}>Pasamos de entender conceptos a construir un sistema.</p>
                  </div>
                  <span className={styles.chip}>Cambio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{changesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="roadmap">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Roadmap de implementacion</h3>
                    <p className={styles.sub}>La siguiente fase ya tiene una ruta de trabajo clara.</p>
                  </div>
                  <span className={styles.chip}>Roadmap</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{roadmapSnippet}</pre>
                  <div className={styles.callout}>Cada paso reduce incertidumbre y acerca el sistema a produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como piensa un backend senior</h3>
                    <p className={styles.sub}>Busca el siguiente cuello de botella para terminar el proyecto.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{seniorMindsetSnippet}</pre>
                  <pre>{focusSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Mini ejercicio</h3>
                    <p className={styles.sub}>Dejar el plan visible y marcar lo que falta.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{projectExerciseSnippet}</pre>
                  <pre>{roadmapSectionsSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Marcar que ya esta terminado.</li>
                    <li>Marcar que todavia falta.</li>
                    <li>Ordenar el trabajo por dependencias reales.</li>
                  </ul>
                  <div className={styles.callout}>El roadmap convierte ideas dispersas en ejecucion concreta.</div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Cierre</h3>
                    <p className={styles.sub}>El objetivo de los proximos dias es terminar un backend completo y desplegable.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finishStateSnippet}</pre>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/102">
                      <span className={styles.kbd}>←</span> Dia 102
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
                  <p>Dia 103 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Situacion:</strong> OrderFlow ya tiene base, pero todavia no esta completo.
                </div>
                <div className={styles.li}>
                  <strong>Prioridad:</strong> cerrar dominio, persistencia y casos de uso antes de tocar infraestructura.
                </div>
                <div className={styles.li}>
                  <strong>Direccion:</strong> convertir aprendizaje en un roadmap concreto y ejecutable.
                </div>
                <div className={styles.li}>
                  <strong>Resultado:</strong> un backend completo, funcional y desplegable.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
