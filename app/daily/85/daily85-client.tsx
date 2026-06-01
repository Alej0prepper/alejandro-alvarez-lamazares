"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "environments", label: "3) Ambientes" },
  { id: "mindset", label: "4) Mentalidad" },
  { id: "changes", label: "5) Que cambia" },
  { id: "hardcode", label: "6) Hardcode" },
  { id: "dotnet", label: "7) .NET" },
  { id: "env-vars", label: "8) Variables" },
  { id: "secrets", label: "9) Secretos" },
  { id: "deployments", label: "10) Deployments" },
  { id: "staging", label: "11) Staging" },
  { id: "observability", label: "12) Observabilidad" },
  { id: "senior", label: "13) Senior" },
  { id: "realistic", label: "14) Realista" },
  { id: "portable", label: "Idea final" },
  { id: "mini-project", label: "Practica" },
] as const;

const sameEnvironmentSnippet = `mi maquina
=
testing
=
produccion`;

const environmentConfigSnippet = `Environment Configuration`;

const devGoalSnippet = `desarrollar rapido`;

const qaGoalSnippet = `detectar errores antes de produccion`;

const stagingGoalSnippet = `ensayar despliegues reales`;

const prodGoalSnippet = `estabilidad
seguridad
disponibilidad`;

const juniorSnippet = `"funciona en mi maquina"`;

const seniorSnippet = `funciona igual en todos los ambientes?`;

const devConnectionSnippet = `localhost`;

const prodConnectionSnippet = `db-prod.company.com`;

const badConnectionSnippet = `var connection =
"Server=localhost;Database=MyDb";`;

const goodConnectionSnippet = `builder.Configuration
    .GetConnectionString("Default");`;

const appsettingsFilesSnippet = `appsettings.json
appsettings.Development.json
appsettings.Production.json`;

const connectionJsonSnippet = `{
  "ConnectionStrings": {
    "Default": "..."
  }
}`;

const envVarsSnippet = `Environment Variables`;

const envExamplesSnippet = `DB_HOST
REDIS_HOST
JWT_SECRET`;

const secretsSnippet = `passwords
API keys
JWT secrets`;

const sameContainerSnippet = `mismo contenedor`;

const environmentsSnippet = `dev
qa
staging
prod`;

const configOnlySnippet = `variables
configuracion`;

const qaProdBreakSnippet = `funciona en QA
rompe en PROD`;

const devLogsSnippet = `logs detallados`;

const prodLogsSnippet = `logs seguros`;

const loggingRiskSnippet = `demasiado logging
=
coste
riesgo`;

const valueQuestionSnippet = `"que valor pongo aqui?"`;

const configQuestionSnippet = `esto pertenece al codigo o a la configuracion?`;

const paymentServiceSnippet = `PaymentService`;

const sandboxSnippet = `sandbox`;

const realGatewaySnippet = `gateway real`;

const sameCodeSnippet = `exactamente el mismo`;

const onlyConfigSnippet = `la configuracion`;

const machineWorksSnippet = `"mi maquina funciona"`;

const consistentBehaviorSnippet = `como garantizamos comportamiento consistente entre ambientes?`;

const changesQuestionSnippet = `esto cambia entre Dev y Prod?`;

const reflectionSnippet = `el codigo implementa comportamiento
la configuracion adapta el entorno`;

export default function Daily85Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/84";
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
            <Link className={styles.btn} href="/daily/84">
              <span className={styles.kbd}>←</span> Dia 84
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
                <div className={styles.createdAt}>01/06/2026</div>
                <div className={styles.badge}>Daily #85 • Backend Operations</div>
                <h2 className={styles.title}>Configuracion por ambiente</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Configuracion</span>
                  <span className={styles.chip}>Tag: DevOps</span>
                  <span className={styles.chip}>Tag: Secretos</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Development, QA, Staging y Production no son iguales. El codigo deberia cambiar poco; la configuracion
                  debe adaptarse al ambiente.
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
                    <p className={styles.sub}>Tu maquina, testing y produccion no son iguales.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Un error peligroso es asumir:</p>
                  <pre>{sameEnvironmentSnippet}</pre>
                  <p>Muchos problemas aparecen cuando el codigo llega a un ambiente diferente.</p>
                  <pre>{environmentConfigSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Misma aplicacion, distinta configuracion.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Configuracion por ambiente es la capacidad de ejecutar la misma aplicacion con comportamientos y
                    configuraciones diferentes segun donde este desplegada.
                  </p>
                  <p>El codigo es el mismo. Cambian configuracion, recursos, credenciales e integraciones.</p>
                  <div className={styles.callout}>
                    El codigo deberia cambiar poco entre ambientes. La configuracion cambia mucho.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="environments">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ambientes tipicos</h3>
                    <p className={styles.sub}>Cada ambiente tiene un objetivo distinto.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Ambientes</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Development</h4>
                  <pre>{devGoalSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>logs detallados</li>
                    <li>datos de prueba</li>
                    <li>debugging</li>
                    <li>servicios simulados</li>
                  </ul>

                  <h4>Testing / QA</h4>
                  <pre>{qaGoalSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>pruebas funcionales</li>
                    <li>integracion</li>
                    <li>validaciones</li>
                  </ul>

                  <h4>Staging</h4>
                  <pre>{stagingGoalSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>infraestructura similar</li>
                    <li>mismas dependencias</li>
                    <li>mismos procesos</li>
                  </ul>

                  <h4>Production</h4>
                  <pre>{prodGoalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa el backend</h3>
                    <p className={styles.sub}>Funcionar localmente no prueba portabilidad real.</p>
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

              <section className={styles.section} id="changes">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que cambia entre ambientes</h3>
                    <p className={styles.sub}>Todo esto debe ser configurable.</p>
                  </div>
                  <span className={styles.chip}>Config</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Connection Strings</h4>
                  <p>Dev:</p>
                  <pre>{devConnectionSnippet}</pre>
                  <p>Prod:</p>
                  <pre>{prodConnectionSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>Redis</li>
                    <li>API Keys</li>
                    <li>JWT Secrets</li>
                    <li>URLs externas</li>
                    <li>logging</li>
                    <li>feature flags</li>
                    <li>CPU, RAM y almacenamiento</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="hardcode">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Error muy comun</h3>
                    <p className={styles.sub}>Hardcodear valores del ambiente en el codigo.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal</h4>
                  <pre>{badConnectionSnippet}</pre>
                  <p>Produccion rota.</p>
                  <h4>Mejor</h4>
                  <pre>{goodConnectionSnippet}</pre>
                  <div className={styles.callout}>El codigo no deberia conocer los detalles del ambiente.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se hace en .NET</h3>
                    <p className={styles.sub}>ASP.NET Core tiene soporte nativo.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Archivos</h4>
                  <pre>{appsettingsFilesSnippet}</pre>
                  <h4>Ejemplo</h4>
                  <pre>{connectionJsonSnippet}</pre>
                  <p>Y otro archivo puede tener otro valor para otro ambiente.</p>
                  <div className={styles.callout}>Mismo codigo, distinta configuracion.</div>
                </div>
              </section>

              <section className={styles.section} id="env-vars">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Variables de entorno</h3>
                    <p className={styles.sub}>Estandar en Docker y Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Env</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{envVarsSnippet}</pre>
                  <p>Permiten cambiar configuracion sin recompilar ni modificar codigo.</p>
                  <pre>{envExamplesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="secrets">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Secretos</h3>
                    <p className={styles.sub}>Secretos no son configuracion normal.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Error grave</h4>
                  <pre>{secretsSnippet}</pre>
                  <p>guardados en Git producen fuga de credenciales.</p>

                  <h4>Mejor enfoque</h4>
                  <ul className={styles.bullets}>
                    <li>variables de entorno</li>
                    <li>Secret Manager</li>
                    <li>Vault</li>
                    <li>AWS Secrets Manager</li>
                    <li>Azure Key Vault</li>
                  </ul>

                  <div className={styles.callout}>Secretos no son configuracion normal.</div>
                </div>
              </section>

              <section className={styles.section} id="deployments">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Configuracion y despliegues</h3>
                    <p className={styles.sub}>El mismo artefacto puede correr en varios ambientes.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <p>Imagina:</p>
                  <pre>{sameContainerSnippet}</pre>
                  <p>En:</p>
                  <pre>{environmentsSnippet}</pre>
                  <p>Lo unico que cambia:</p>
                  <pre>{configOnlySnippet}</pre>
                  <p>Exactamente como deberia ser.</p>
                </div>
              </section>

              <section className={styles.section} id="staging">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Error tipico</h3>
                    <p className={styles.sub}>Configurar algo solo en produccion.</p>
                  </div>
                  <span className={styles.chip}>Staging</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{qaProdBreakSnippet}</pre>
                  <p>Por eso existe Staging: debe parecerse a produccion.</p>
                </div>
              </section>

              <section className={styles.section} id="observability">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Configuracion y observabilidad</h3>
                    <p className={styles.sub}>Logging tambien cambia por ambiente.</p>
                  </div>
                  <span className={styles.chip}>Logs</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Dev</h4>
                  <pre>{devLogsSnippet}</pre>
                  <h4>Prod</h4>
                  <pre>{prodLogsSnippet}</pre>
                  <p>Porque:</p>
                  <pre>{loggingRiskSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa alguien senior</h3>
                    <p className={styles.sub}>La pregunta correcta separa codigo de configuracion.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{valueQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{configQuestionSnippet}</pre>
                  <div className={styles.callout}>Esa pregunta evita muchos problemas.</div>
                </div>
              </section>

              <section className={styles.section} id="realistic">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ejemplo realista</h3>
                    <p className={styles.sub}>Mismo codigo, distinto gateway de pago.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{paymentServiceSnippet}</pre>
                  <p>En Dev:</p>
                  <pre>{sandboxSnippet}</pre>
                  <p>En Prod:</p>
                  <pre>{realGatewaySnippet}</pre>
                  <p>El codigo deberia ser:</p>
                  <pre>{sameCodeSnippet}</pre>
                  <p>Solo cambia:</p>
                  <pre>{onlyConfigSnippet}</pre>
                  <div className={styles.quote}>Arquitectura limpia.</div>
                </div>
              </section>

              <section className={styles.section} id="portable">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea final</h3>
                    <p className={styles.sub}>El codigo debe ser portable.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{machineWorksSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{consistentBehaviorSnippet}</pre>
                  <div className={styles.quote}>
                    El codigo debe ser portable. La configuracion debe adaptarse al ambiente.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Identificar que deberia salir del codigo y pasar a configuracion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <p>Imagina una API con DB, Redis, JWT, Email y Payment Service.</p>

                  <h4>Paso 1</h4>
                  <p>Lista todo lo configurable.</p>

                  <h4>Paso 2</h4>
                  <pre>{changesQuestionSnippet}</pre>

                  <h4>Paso 3</h4>
                  <p>Si la respuesta es si, probablemente pertenece a configuracion.</p>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>ambientes existen por una razon</li>
                    <li>secretos deben separarse</li>
                    <li>configuracion y codigo son cosas distintas</li>
                    <li>produccion debe parecerse a staging</li>
                    <li>funciona en mi maquina no es una garantia</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que valores de tu proyecto actual estan hardcodeados?</li>
                    <li>Que secretos viven en archivos que no deberian?</li>
                    <li>Podrias mover tu aplicacion de un ambiente a otro sin recompilar?</li>
                  </ul>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
