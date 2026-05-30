"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "problem", label: "3) Problema" },
  { id: "mindset", label: "4) Mentalidad" },
  { id: "example", label: "5) Ejemplo" },
  { id: "uses", label: "6) Casos" },
  { id: "rollback", label: "7) Rollback" },
  { id: "gradual", label: "8) Gradual" },
  { id: "dotnet", label: "9) .NET" },
  { id: "debt", label: "10) Deuda" },
  { id: "logic", label: "11) Logica" },
  { id: "config", label: "12) Config" },
  { id: "realistic", label: "13) Realista" },
  { id: "relation", label: "14) Relacion" },
  { id: "senior", label: "15) Senior" },
  { id: "mini-project", label: "Practica" },
] as const;

const deployEqualsReleaseSnippet = `nuevo codigo -> nuevo deploy`;

const deployDisabledSnippet = `nuevo codigo -> produccion -> desactivado`;

const featureFlagsSnippet = `Feature Flags`;

const newFeatureSnippet = `funcionalidad nueva`;

const executeOrNotSnippet = `si se ejecuta o no`;

const newPaymentSnippet = `nuevo sistema de pagos`;

const withoutFlagsSnippet = `deploy
  |
todos los usuarios lo reciben`;

const withFlagsSnippet = `deploy
  |
funcionalidad apagada
  |
activacion gradual`;

const juniorSnippet = `deploy = activar`;

const seniorSnippet = `deploy y activar son cosas diferentes`;

const checkoutSnippet = `nuevo checkout`;

const checkoutCodeSnippet = `if (featureFlags.NewCheckoutEnabled)
{
    return NewCheckout();
}

return OldCheckout();`;

const trueFalseSnippet = `true
false`;

const rollbackWithoutSnippet = `bug
  |
nuevo deploy
  |
esperar`;

const rollbackWithSnippet = `bug
  |
desactivar flag
  |
2 segundos`;

const usersSnippet = `100.000 usuarios`;

const rolloutSnippet = `1%
5%
20%
50%
100%`;

const featureManagementSnippet = `Microsoft.FeatureManagement`;

const addFeatureManagementSnippet = `builder.Services.AddFeatureManagement();`;

const jsonConfigSnippet = `{
  "FeatureManagement": {
    "NewCheckout": true
  }
}`;

const usageSnippet = `if (await featureManager.IsEnabledAsync("NewCheckout"))
{
    // nueva funcionalidad
}`;

const flagDebtSnippet = `flag1
flag2
flag3
flag37
flag92`;

const nestedFlagsSnippet = `20 ifs anidados`;

const unreadableCodeSnippet = `codigo ilegible`;

const configSnippet = `URL
Timeout
API Key`;

const flagSnippet = `activar funcionalidad
desactivar funcionalidad`;

const discountAlgorithmSnippet = `nuevo algoritmo de descuentos`;

const deployAndPraySnippet = `deploy
rezar`;

const safeLaunchSnippet = `deploy
activar para empleados
observar
activar para clientes`;

const deployQuestionSnippet = `"como desplegamos esto?"`;

const impactQuestionSnippet = `como limitamos el impacto si sale mal?`;

const launchStrategySnippet = `empleados
1%
10%
50%
100%`;

const shutdownQuestionSnippet = `si aparece un bug critico, como lo apagarias en menos de 10 segundos?`;

const deployActivateSnippet = `desplegar y activar son procesos diferentes`;

export default function Daily84Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/83";
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
            <Link className={styles.btn} href="/daily/83">
              <span className={styles.kbd}>←</span> Dia 83
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
                <div className={styles.createdAt}>29/05/2026</div>
                <div className={styles.badge}>Daily #84 • Backend Operations</div>
                <h2 className={styles.title}>Feature Flags</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Feature Flags</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Feature flags separan desplegar codigo de activar funcionalidades. En produccion moderna, eso reduce
                  riesgo y permite reaccionar rapido si algo sale mal.
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
                    <p className={styles.sub}>Nuevo deploy no siempre significa funcionalidad activa.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos desarrolladores piensan:</p>
                  <pre>{deployEqualsReleaseSnippet}</pre>
                  <p>En sistemas grandes muchas veces ocurre:</p>
                  <pre>{deployDisabledSnippet}</pre>
                  <p>Aqui aparecen los:</p>
                  <pre>{featureFlagsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Activar o desactivar funcionalidad sin redesplegar.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Feature Flag es un mecanismo que permite activar o desactivar funcionalidades sin cambiar ni redesplegar codigo.</p>
                  <p>Tu codigo puede contener:</p>
                  <pre>{newFeatureSnippet}</pre>
                  <p>pero decidir:</p>
                  <pre>{executeOrNotSnippet}</pre>
                  <div className={styles.callout}>Despliegue y liberacion dejan de ser la misma cosa.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema que resuelve</h3>
                    <p className={styles.sub}>Reduce el radio de impacto de una funcionalidad nueva.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{newPaymentSnippet}</pre>
                  <h4>Sin feature flags</h4>
                  <pre>{withoutFlagsSnippet}</pre>
                  <p>Si algo falla, produccion queda afectada.</p>

                  <h4>Con feature flags</h4>
                  <pre>{withFlagsSnippet}</pre>
                  <div className={styles.callout}>Muchisimo menos riesgo.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa el backend</h3>
                    <p className={styles.sub}>Deploy y activacion son procesos distintos.</p>
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
                    <p className={styles.sub}>La funcionalidad ya esta instalada; decides si usarla.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Codigo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checkoutSnippet}</pre>
                  <pre>{checkoutCodeSnippet}</pre>
                  <p>Puedes cambiar:</p>
                  <pre>{trueFalseSnippet}</pre>
                  <p>sin desplegar nuevamente.</p>
                  <div className={styles.callout}>La funcionalidad ya esta instalada. Solo decides si usarla.</div>
                </div>
              </section>

              <section className={styles.section} id="uses">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Casos de uso reales</h3>
                    <p className={styles.sub}>Feature flags son una herramienta operativa, no solo tecnica.</p>
                  </div>
                  <span className={styles.chip}>Uso</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>lanzamientos graduales</li>
                    <li>pruebas en produccion</li>
                    <li>A/B Testing</li>
                    <li>rollback instantaneo</li>
                    <li>activar funciones premium</li>
                    <li>desactivar modulos problematicos</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Rollback instantaneo</h3>
                    <p className={styles.sub}>La ventaja operativa es reducir tiempo de reaccion.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin feature flag</h4>
                  <pre>{rollbackWithoutSnippet}</pre>

                  <h4>Con feature flag</h4>
                  <pre>{rollbackWithSnippet}</pre>

                  <div className={styles.callout}>Una de las mayores ventajas es reducir el tiempo de reaccion.</div>
                </div>
              </section>

              <section className={styles.section} id="gradual">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Activacion gradual</h3>
                    <p className={styles.sub}>No expones a todos los usuarios de golpe.</p>
                  </div>
                  <span className={styles.chip}>Rollout</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supón:</p>
                  <pre>{usersSnippet}</pre>
                  <p>No quieres exponerlos todos. Entonces:</p>
                  <pre>{rolloutSnippet}</pre>
                  <p>Observas metricas en cada etapa.</p>
                  <div className={styles.quote}>Asi despliegan muchas empresas grandes.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como se ve en .NET</h3>
                    <p className={styles.sub}>Microsoft tiene soporte mediante FeatureManagement.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{featureManagementSnippet}</pre>
                  <h4>Registro</h4>
                  <pre>{addFeatureManagementSnippet}</pre>
                  <h4>Configuracion</h4>
                  <pre>{jsonConfigSnippet}</pre>
                  <h4>Uso</h4>
                  <pre>{usageSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="debt">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Error tipico</h3>
                    <p className={styles.sub}>Crear flags y nunca eliminarlos.</p>
                  </div>
                  <span className={styles.chip}>Deuda</span>
                </div>
                <div className={styles.sbd}>
                  <p>Despues de años:</p>
                  <pre>{flagDebtSnippet}</pre>
                  <p>Caos.</p>
                  <div className={styles.callout}>Los feature flags tambien generan deuda tecnica.</div>
                </div>
              </section>

              <section className={styles.section} id="logic">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Otro error tipico</h3>
                    <p className={styles.sub}>Meter demasiada logica de negocio dentro de flags.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nestedFlagsSnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{unreadableCodeSnippet}</pre>
                  <div className={styles.callout}>Los flags deben ser temporales.</div>
                </div>
              </section>

              <section className={styles.section} id="config">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Feature Flag vs Configuracion</h3>
                    <p className={styles.sub}>Objetivos distintos.</p>
                  </div>
                  <span className={styles.chip}>Distincion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Configuracion</h4>
                  <pre>{configSnippet}</pre>
                  <h4>Feature Flag</h4>
                  <pre>{flagSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="realistic">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Ejemplo realista</h3>
                    <p className={styles.sub}>Nuevo algoritmo de descuentos con activacion controlada.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{discountAlgorithmSnippet}</pre>
                  <h4>Sin feature flag</h4>
                  <pre>{deployAndPraySnippet}</pre>
                  <h4>Con feature flag</h4>
                  <pre>{safeLaunchSnippet}</pre>
                  <div className={styles.callout}>Los feature flags reducen el riesgo de los despliegues.</div>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Relacion con todo lo visto</h3>
                    <p className={styles.sub}>Ayudan a operar produccion con menos riesgo.</p>
                  </div>
                  <span className={styles.chip}>Operacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Feature flags ayudan a:</p>
                  <ul className={styles.bullets}>
                    <li>resiliencia</li>
                    <li>despliegues seguros</li>
                    <li>observabilidad</li>
                    <li>rollback rapido</li>
                    <li>reduccion de riesgo</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como piensa alguien senior</h3>
                    <p className={styles.sub}>La pregunta real es como limitar impacto.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{deployQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{impactQuestionSnippet}</pre>
                  <div className={styles.quote}>
                    Un deploy exitoso no significa que una funcionalidad deba activarse inmediatamente.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Disenar un lanzamiento controlado.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{checkoutSnippet}</pre>

                  <h4>Paso 1</h4>
                  <p>Lo activarias para todos?</p>

                  <h4>Paso 2 - Estrategia</h4>
                  <pre>{launchStrategySnippet}</pre>

                  <h4>Paso 3 - Pregunta clave</h4>
                  <pre>{shutdownQuestionSnippet}</pre>

                  <h4>Paso 4 - Reflexion</h4>
                  <pre>{deployActivateSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>feature flags reducen riesgo</li>
                    <li>permiten rollback instantaneo</li>
                    <li>permiten lanzamientos graduales</li>
                    <li>son fundamentales en produccion moderna</li>
                    <li>tambien generan deuda tecnica si no se gestionan bien</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que funcionalidad de tu sistema seria buena candidata para un feature flag?</li>
                    <li>Que harias si un deploy funciona tecnicamente pero rompe el negocio?</li>
                    <li>Como activarias una funcionalidad para solo un grupo pequeno de usuarios?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior despliega funcionalidades. Backend senior controla cuando, como y para quien se
                    activan.
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
