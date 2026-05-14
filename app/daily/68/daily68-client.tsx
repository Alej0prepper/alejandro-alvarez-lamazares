"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "meaning", label: "3) Que significa" },
  { id: "attacker", label: "4) Atacante" },
  { id: "senior", label: "5) Backend senior" },
  { id: "reset-password", label: "6) Ejemplo" },
  { id: "mental-model", label: "7) Modelo mental" },
  { id: "upload-avatar", label: "8) Ejemplo realista" },
  { id: "stride", label: "9) STRIDE" },
  { id: "testing", label: "10) Testing" },
  { id: "mistake", label: "11) Error tipico" },
  { id: "mini-project", label: "Practica" },
] as const;

const resetPasswordSnippet = `POST /reset-password`;

const accessQuestionSnippet = `quien puede usar esto?`;

const inputQuestionSnippet = `que controla el usuario?`;

const impactQuestionSnippet = `que pasa si esto falla?`;

const abuseQuestionSnippet = `como podria abusarse?`;

const escalationQuestionSnippet = `puede dar mas privilegios?`;

const availabilityQuestionSnippet = `puede tumbar el sistema?`;

const uploadAvatarSnippet = `POST /upload-avatar`;

const strideSpoofingSnippet = `hacerse pasar por otro`;

const strideTamperingSnippet = `modificar datos`;

const strideRepudiationSnippet = `negar acciones realizadas`;

const strideInformationDisclosureSnippet = `filtrar informacion`;

const strideDosSnippet = `tumbar sistema`;

const strideElevationSnippet = `ganar mas permisos`;

const refundEndpointSnippet = `POST /payments/refund`;

const breakFeatureSnippet = `como intentaria romper esto?`;

export default function Daily68Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/67";
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
            <Link className={styles.btn} href="/daily/67">
              <span className={styles.kbd}>←</span> Dia 67
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
                <div className={styles.createdAt}>13/05/2026</div>
                <div className={styles.badge}>Daily #68 • Backend Foundations</div>
                <h2 className={styles.title}>Threat Modeling: aprender a pensar como un atacante</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Threat Modeling</span>
                  <span className={styles.chip}>Tag: Riesgo</span>
                  <span className={styles.chip}>Tag: STRIDE</span>
                </div>

                <p className={styles.lead}>
                  Threat modeling es aprender a detectar riesgos antes de que ocurran, haciendo preguntas incomodas
                  sobre abuso, impacto y superficie de ataque.
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
                    <p className={styles.sub}>La seguridad fuerte empieza antes de encontrar bugs concretos.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ya viste vulnerabilidades como IDOR, brute force, SQL Injection, secretos y uploads.</p>
                  <div className={styles.callout}>Ahora toca aprender a detectar riesgos antes de que ocurran.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Threat modeling identifica amenazas durante diseno o antes de implementar.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Threat Modeling: proceso de identificar posibles amenazas, riesgos y ataques contra un sistema antes
                    o durante su diseno.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="meaning">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que significa realmente</h3>
                    <p className={styles.sub}>No es buscar bugs: es imaginar como podria romperse el sistema.</p>
                  </div>
                  <span className={styles.chip}>Enfoque</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;buscar bugs&quot;.</li>
                    <li>Si: &quot;imaginar como podria romperse el sistema&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="attacker">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un atacante</h3>
                    <p className={styles.sub}>Busca poder, input controlado, abuso y caminos para romper reglas.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que endpoint tiene mas poder?</li>
                    <li>Que input controla el usuario?</li>
                    <li>Que puedo abusar?</li>
                    <li>Que pasa si mando esto 1000 veces?</li>
                    <li>Que pasa si cambio este ID?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer senior</h3>
                    <p className={styles.sub}>Antes de programar, evalua superficie, impacto y abuso.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que puede salir mal?</li>
                    <li>Que superficie de ataque tengo?</li>
                    <li>Que pasa si comprometen esto?</li>
                    <li>Que endpoint es critico?</li>
                    <li>Que pasa si alguien abusa esta funcionalidad?</li>
                  </ul>
                  <p>Eso es threat modeling.</p>
                </div>
              </section>

              <section className={styles.section} id="reset-password">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Ejemplo simple</h3>
                    <p className={styles.sub}>Un endpoint de reset password concentra muchos riesgos comunes.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resetPasswordSnippet}</pre>
                  <h4>Threat modeling mental</h4>
                  <ul className={styles.bullets}>
                    <li>Puede hacerse brute force?</li>
                    <li>Filtra si el email existe?</li>
                    <li>Tiene rate limiting?</li>
                    <li>El token expira?</li>
                    <li>Que pasa si interceptan el link?</li>
                  </ul>
                  <div className={styles.callout}>Threat modeling = hacer preguntas incomodas antes del problema.</div>
                </div>
              </section>

              <section className={styles.section} id="mental-model">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Modelo mental practico</h3>
                    <p className={styles.sub}>Para cualquier funcionalidad, revisa acceso, input, impacto, abuso y disponibilidad.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Acceso</h4>
                  <pre>{accessQuestionSnippet}</pre>

                  <h4>Input</h4>
                  <pre>{inputQuestionSnippet}</pre>

                  <h4>Impacto</h4>
                  <pre>{impactQuestionSnippet}</pre>

                  <h4>Abuso</h4>
                  <pre>{abuseQuestionSnippet}</pre>

                  <h4>Escalacion</h4>
                  <pre>{escalationQuestionSnippet}</pre>

                  <h4>Disponibilidad</h4>
                  <pre>{availabilityQuestionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="upload-avatar">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo mas realista</h3>
                    <p className={styles.sub}>Una feature simple puede esconder muchos vectores de abuso.</p>
                  </div>
                  <span className={styles.chip}>Feature</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{uploadAvatarSnippet}</pre>

                  <h4>Backend junior piensa</h4>
                  <div className={styles.quote}>Sube foto.</div>

                  <h4>Backend senior piensa</h4>
                  <ul className={styles.bullets}>
                    <li>archivo enorme?</li>
                    <li>malware?</li>
                    <li>path traversal?</li>
                    <li>extension falsa?</li>
                    <li>DoS?</li>
                    <li>sobrescritura?</li>
                    <li>storage ilimitado?</li>
                  </ul>
                  <p>Eso ya es pensar amenazas.</p>
                </div>
              </section>

              <section className={styles.section} id="stride">
                <div className={styles.shd}>
                  <div>
                    <h3>9. STRIDE</h3>
                    <p className={styles.sub}>Un modelo famoso para clasificar amenazas.</p>
                  </div>
                  <span className={styles.chip}>Modelo</span>
                </div>
                <div className={styles.sbd}>
                  <p>No necesitas memorizarlo ahora, pero conviene reconocer la idea.</p>

                  <h4>S - Spoofing</h4>
                  <pre>{strideSpoofingSnippet}</pre>

                  <h4>T - Tampering</h4>
                  <pre>{strideTamperingSnippet}</pre>

                  <h4>R - Repudiation</h4>
                  <pre>{strideRepudiationSnippet}</pre>

                  <h4>I - Information Disclosure</h4>
                  <pre>{strideInformationDisclosureSnippet}</pre>

                  <h4>D - Denial of Service</h4>
                  <pre>{strideDosSnippet}</pre>

                  <h4>E - Elevation of Privilege</h4>
                  <pre>{strideElevationSnippet}</pre>

                  <div className={styles.callout}>Realmente ya viste casi todos estos conceptos en practica.</div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Haz preguntas de abuso antes de tocar casos tecnicos concretos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que controla el usuario?</li>
                    <li>Que endpoint tiene mas impacto?</li>
                    <li>Que pasa si algo falla?</li>
                    <li>Que intentaria abusar yo primero?</li>
                  </ul>
                  <div className={styles.quote}>La seguridad fuerte empieza antes del codigo.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Pensar que la seguridad se agrega al final.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <p>La seguridad buena:</p>
                  <ul className={styles.bullets}>
                    <li>se disena</li>
                    <li>se piensa</li>
                    <li>se modela</li>
                  </ul>
                  <div className={styles.callout}>Threat modeling es pensar en riesgos antes de que existan.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (10 min)</h3>
                    <p className={styles.sub}>Practicar mentalidad de atacante y controlador de riesgos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Analizar un endpoint sensible antes de implementarlo o auditarlo.</p>

                  <h4>Endpoint</h4>
                  <pre>{refundEndpointSnippet}</pre>

                  <h4>Paso 1 - Pregunta acceso</h4>
                  <p>Quien deberia usar esto?</p>

                  <h4>Paso 2 - Pregunta abuso</h4>
                  <p>Que pasa si llaman esto 1000 veces?</p>

                  <h4>Paso 3 - Pregunta impacto</h4>
                  <p>Que pasa si falla autorizacion?</p>

                  <h4>Paso 4 - Pregunta input</h4>
                  <p>Que datos controla el usuario?</p>

                  <h4>Paso 5 - Pregunta disponibilidad</h4>
                  <p>Puede tumbarse el sistema?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>ya no piensas solo en funcionalidad</li>
                    <li>piensas en riesgos</li>
                    <li>piensas en abuso</li>
                    <li>piensas en impacto</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <p>Toma cualquier feature de tu proyecto y preguntate:</p>
                  <pre>{breakFeatureSnippet}</pre>
                  <p>Eso es lo que hace un backend engineer senior orientado a seguridad.</p>

                  <div className={styles.quote}>
                    Backend junior implementa features. Backend senior imagina como podrian romperse.
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
