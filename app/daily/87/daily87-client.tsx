"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "mistake", label: "4) Error comun" },
  { id: "compatible", label: "5) Compatible" },
  { id: "destructive", label: "6) Destructivas" },
  { id: "indexes", label: "7) Indices" },
  { id: "rollback", label: "8) Rollback" },
  { id: "coordination", label: "9) Coordinacion" },
  { id: "expand-contract", label: "10) Expand-contract" },
  { id: "real", label: "11) Ejemplo" },
  { id: "senior", label: "12) Senior" },
  { id: "checklist", label: "13) Checklist" },
  { id: "relation", label: "14) Relacion" },
  { id: "final", label: "Idea final" },
  { id: "mini-project", label: "Practica" },
] as const;

const smallChangeSnippet = `"solo anadi una columna"`;

const productionImpactSnippet = `tabla bloqueada
timeouts
aplicacion caida`;

const juniorSnippet = `Add-Migration
Update-Database
listo`;

const seniorSnippet = `que impacto tendra esto sobre los datos y usuarios actuales?`;

const dropEmailSnippet = `ALTER TABLE Users
DROP COLUMN Email;`;

const userEmailSnippet = `user.Email`;

const brokenProdSnippet = `errores
500
produccion rota`;

const oldNameSnippet = `nombre`;

const newNameSnippet = `full_name`;

const destructiveSnippet = `DROP TABLE
DROP COLUMN
TRUNCATE`;

const recoveryQuestionSnippet = `puedo recuperarme si sale mal?`;

const createIndexSnippet = `CREATE INDEX`;

const hugeTableSnippet = `millones de filas`;

const rollbackQuestionSnippet = `como vuelvo atras?`;

const noIdeaSnippet = `no se`;

const easyRollbackSnippet = `ADD COLUMN`;

const hardRollbackSnippet = `DROP COLUMN
DELETE DATA`;

const newColumnSnippet = `columna nueva`;

const phoneSnippet = `Phone`;

const phoneSplitSnippet = `CountryCode
Number`;

const migrationQuestionSnippet = `"funciona la migracion?"`;

const deploymentQuestionsSnippet = `funciona durante el despliegue?
funciona durante el rollback?
funciona con trafico real?`;

const changeDbSnippet = `"voy a cambiar la base"`;

const liveSystemSnippet = `voy a cambiar un sistema que esta siendo usado ahora mismo`;

const emailSnippet = `Users.Email`;

const emailSplitSnippet = `Username
Domain`;

const gradualChangeSnippet = `los cambios peligrosos se hacen gradualmente`;

export default function Daily87Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/86";
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
            <Link className={styles.btn} href="/daily/86">
              <span className={styles.kbd}>←</span> Dia 86
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
                <div className={styles.createdAt}>02/06/2026</div>
                <div className={styles.badge}>Daily #87 • Backend Operations</div>
                <h2 className={styles.title}>Migraciones en produccion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Base de datos</span>
                  <span className={styles.chip}>Tag: Deployments</span>
                  <span className={styles.chip}>Tag: Rollback</span>
                  <span className={styles.chip}>Tag: Produccion</span>
                </div>

                <p className={styles.lead}>
                  Las migraciones no son simples scripts SQL. En produccion son cambios sobre datos vivos, trafico real
                  y aplicaciones que siguen corriendo.
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
                    <p className={styles.sub}>En produccion la base de datos esta viva.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos desarrolladores piensan:</p>
                  <pre>{smallChangeSnippet}</pre>
                  <p>Pero en produccion puede significar:</p>
                  <pre>{productionImpactSnippet}</pre>
                  <p>La DB tiene usuarios conectados, escrituras, lecturas y procesos ejecutandose.</p>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Una migracion cambia estructura de datos.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Migracion es un cambio controlado sobre la estructura de la base de datos.</p>
                  <ul className={styles.bullets}>
                    <li>crear tablas</li>
                    <li>eliminar tablas</li>
                    <li>anadir columnas</li>
                    <li>modificar indices</li>
                    <li>cambiar restricciones</li>
                  </ul>
                  <div className={styles.callout}>Cambiar una base de datos en produccion es una operacion de riesgo.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa el backend</h3>
                    <p className={styles.sub}>No basta con que la migracion ejecute.</p>
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

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El error mas comun</h3>
                    <p className={styles.sub}>Eliminar algo que el codigo todavia usa.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dropEmailSnippet}</pre>
                  <p>Todavia existe codigo usando:</p>
                  <pre>{userEmailSnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{brokenProdSnippet}</pre>
                  <div className={styles.callout}>Una migracion no afecta solo la base de datos. Afecta todo el sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="compatible">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Migraciones compatibles hacia adelante</h3>
                    <p className={styles.sub}>Cambios graduales son mas seguros.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Compatibilidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Malo</h4>
                  <p>Cambiar:</p>
                  <pre>{oldNameSnippet}</pre>
                  <p>por:</p>
                  <pre>{newNameSnippet}</pre>
                  <p>en una sola operacion. Codigo viejo y nuevo esperan columnas distintas.</p>

                  <h4>Mejor</h4>
                  <ol className={styles.bullets}>
                    <li>Agregar full_name.</li>
                    <li>Actualizar aplicacion.</li>
                    <li>Migrar datos.</li>
                    <li>Eliminar columna vieja.</li>
                  </ol>
                  <div className={styles.callout}>Cambios graduales son mas seguros.</div>
                </div>
              </section>

              <section className={styles.section} id="destructive">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Migraciones destructivas</h3>
                    <p className={styles.sub}>Nunca elimines datos sin plan de rollback.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{destructiveSnippet}</pre>
                  <p>Antes de ejecutarlas pregunta:</p>
                  <pre>{recoveryQuestionSnippet}</pre>
                  <div className={styles.callout}>Nunca elimines datos sin plan de rollback.</div>
                </div>
              </section>

              <section className={styles.section} id="indexes">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Indices</h3>
                    <p className={styles.sub}>Una migracion pequena puede ser costosa en tablas gigantes.</p>
                  </div>
                  <span className={styles.chip}>Performance</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{createIndexSnippet}</pre>
                  <p>En tablas con:</p>
                  <pre>{hugeTableSnippet}</pre>
                  <p>puede bloquear, consumir CPU y afectar rendimiento.</p>
                </div>
              </section>

              <section className={styles.section} id="rollback">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Rollback de migraciones</h3>
                    <p className={styles.sub}>Si no sabes volver atras, la migracion es peligrosa.</p>
                  </div>
                  <span className={styles.chip}>Rollback</span>
                </div>
                <div className={styles.sbd}>
                  <p>Pregunta senior:</p>
                  <pre>{rollbackQuestionSnippet}</pre>
                  <p>Si la respuesta es:</p>
                  <pre>{noIdeaSnippet}</pre>
                  <p>la migracion es peligrosa.</p>

                  <h4>Facil de revertir</h4>
                  <pre>{easyRollbackSnippet}</pre>
                  <h4>Dificil</h4>
                  <pre>{hardRollbackSnippet}</pre>
                  <p>Porque la informacion desaparece.</p>
                </div>
              </section>

              <section className={styles.section} id="coordination">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Codigo y migracion deben coordinarse</h3>
                    <p className={styles.sub}>Codigo y base de datos evolucionan juntos.</p>
                  </div>
                  <span className={styles.chip}>Deploy</span>
                </div>
                <div className={styles.sbd}>
                  <p>Deploy codigo nuevo. Migracion falla. Resultado:</p>
                  <pre>{newColumnSnippet}</pre>
                  <p>El codigo la espera, pero no existe.</p>
                  <div className={styles.callout}>Codigo y base de datos evolucionan juntos.</div>
                </div>
              </section>

              <section className={styles.section} id="expand-contract">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Estrategia expand-contract</h3>
                    <p className={styles.sub}>Muy usada en sistemas grandes.</p>
                  </div>
                  <span className={styles.chip}>Patron</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Expand</h4>
                  <p>Agregar estructura nueva.</p>
                  <h4>Deploy</h4>
                  <p>Codigo compatible con ambas versiones.</p>
                  <h4>Migrar datos</h4>
                  <p>Copiar o transformar informacion.</p>
                  <h4>Contract</h4>
                  <p>Eliminar estructura antigua.</p>
                  <div className={styles.callout}>Esto minimiza incompatibilidades.</div>
                </div>
              </section>

              <section className={styles.section} id="real">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Ejemplo real</h3>
                    <p className={styles.sub}>Separar Phone en CountryCode y Number.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supón:</p>
                  <pre>{phoneSnippet}</pre>
                  <p>debe convertirse en:</p>
                  <pre>{phoneSplitSnippet}</pre>
                  <h4>Malo</h4>
                  <p>Eliminar Phone directamente.</p>
                  <h4>Mejor</h4>
                  <ul className={styles.bullets}>
                    <li>agregar CountryCode y Number</li>
                    <li>poblar datos</li>
                    <li>actualizar aplicacion</li>
                    <li>eliminar Phone semanas despues</li>
                  </ul>
                  <div className={styles.quote}>Asi trabajan muchos sistemas grandes.</div>
                </div>
              </section>

              <section className={styles.section} id="senior">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como piensa alguien senior</h3>
                    <p className={styles.sub}>Piensa en trafico real, despliegue y rollback.</p>
                  </div>
                  <span className={styles.chip}>Senior</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{migrationQuestionSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{deploymentQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Checklist mental antes de migrar</h3>
                    <p className={styles.sub}>Preguntas extremadamente importantes.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Hay backup?</li>
                    <li>Existe rollback?</li>
                    <li>La migracion bloquea tablas?</li>
                    <li>Es compatible con la version actual?</li>
                    <li>Es compatible con la nueva version?</li>
                    <li>Que ocurre si falla a mitad?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Relacion con todo lo visto</h3>
                    <p className={styles.sub}>Una mala migracion puede destruir una app sana.</p>
                  </div>
                  <span className={styles.chip}>Conexion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Migraciones conectan con:</p>
                  <ul className={styles.bullets}>
                    <li>deploys seguros</li>
                    <li>health checks</li>
                    <li>rollback</li>
                    <li>observabilidad</li>
                    <li>resiliencia</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea final</h3>
                    <p className={styles.sub}>Estas cambiando datos vivos.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <p>No piensa:</p>
                  <pre>{changeDbSnippet}</pre>
                  <p>Piensa:</p>
                  <pre>{liveSystemSnippet}</pre>
                  <div className={styles.quote}>
                    Las migraciones no son scripts SQL. Son cambios de arquitectura sobre datos vivos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Disenar una migracion segura.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Escenario</h4>
                  <pre>{emailSnippet}</pre>
                  <p>Necesitas dividirlo en:</p>
                  <pre>{emailSplitSnippet}</pre>

                  <h4>Paso 1</h4>
                  <p>Como harias el cambio sin romper la aplicacion?</p>

                  <h4>Paso 2</h4>
                  <p>Como migrarias los datos existentes?</p>

                  <h4>Paso 3</h4>
                  <p>Como harias rollback?</p>

                  <h4>Paso 4 - Reflexion clave</h4>
                  <pre>{gradualChangeSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>las bases de datos en produccion estan vivas</li>
                    <li>migrar datos implica riesgo</li>
                    <li>rollback es obligatorio</li>
                    <li>expand-contract es una tecnica fundamental</li>
                    <li>una migracion segura suele hacerse en varias etapas</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que migracion de tu proyecto actual seria dificil de revertir?</li>
                    <li>Que tabla tiene mas riesgo si queda bloqueada?</li>
                    <li>Como harias una migracion compatible con dos versiones de la aplicacion?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior ejecuta migraciones. Backend senior disena migraciones que sobreviven despliegues,
                    trafico real y posibles fallos.
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
