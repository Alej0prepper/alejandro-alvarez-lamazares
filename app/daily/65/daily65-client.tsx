"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "example", label: "3) Ejemplo" },
  { id: "dotnet", label: "4) .NET" },
  { id: "testing", label: "5) Testing" },
  { id: "protection", label: "6) Proteccion" },
  { id: "mini-project", label: "Practica" },
] as const;

const vulnerableQuerySnippet = `var sql = $"SELECT * FROM Users WHERE Email = '{email}'";`;

const payloadSnippet = `' OR 1=1 --`;

const injectedQuerySnippet = `SELECT * FROM Users WHERE Email = '' OR 1=1 --'`;

const dapperUnsafeSnippet = `var sql = $"SELECT * FROM Users WHERE Email = '{email}'";

await connection.QueryAsync<User>(sql);`;

const dapperSafeSnippet = `var sql = "SELECT * FROM Users WHERE Email = @Email";

await connection.QueryAsync<User>(sql, new { Email = email });`;

const efSafeSnippet = `_context.Users.FirstOrDefault(x => x.Email == email);`;

const efUnsafeSnippet = `_context.Users
    .FromSqlRaw($"SELECT * FROM Users WHERE Email = '{email}'");`;

const testerChecklistSnippet = `'
' OR 1=1 --
SQL syntax error
search
filters
login
reports`;

const miniProjectSnippet = `$"SELECT * FROM..."

Pregunta 1: hay input concatenado?
Pregunta 2: el payload altera la query?
Clasifica: seguro | vulnerable | riesgo medio
Pregunta clave: el usuario puede influir en el SQL?`;

export default function Daily65Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/64";
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
            <Link className={styles.btn} href="/daily/64">
              <span className={styles.kbd}>←</span> Dia 64
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
                <div className={styles.createdAt}>10/05/2026</div>
                <div className={styles.badge}>Daily #65 • Backend Foundations</div>
                <h2 className={styles.title}>SQL Injection: como romper una base de datos desde input</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: SQL</span>
                  <span className={styles.chip}>Tag: .NET</span>
                  <span className={styles.chip}>Tag: EF Core</span>
                </div>

                <p className={styles.lead}>
                  SQL Injection ocurre cuando el usuario controla parte del SQL. EF ayuda, pero raw SQL e interpolacion
                  pueden reabrir la vulnerabilidad.
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
                    <p className={styles.sub}>Uno de los ataques mas famosos de backend y sigue vigente.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Aunque hoy los ORMs reducen mucho el riesgo, SQL Injection sigue apareciendo en codigo real.</p>
                  <div className={styles.callout}>El problema no es SQL: el problema es concatenar input en SQL.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Vulnerabilidad donde el input altera una consulta SQL no prevista.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    SQL Injection: vulnerabilidad donde input del usuario altera una consulta SQL de forma no prevista.
                  </div>
                  <ul className={styles.bullets}>
                    <li>Bypass de login.</li>
                    <li>Lectura masiva de datos.</li>
                    <li>Modificacion o borrado de informacion.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>El atacante envia un payload que cambia la logica del WHERE.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Query vulnerable construida con string interpolation:</p>
                  <pre>{vulnerableQuerySnippet}</pre>
                  <p>Payload tipico:</p>
                  <pre>{payloadSnippet}</pre>
                  <p>Query final alterada:</p>
                  <pre>{injectedQuerySnippet}</pre>
                  <div className={styles.callout}>`1=1` siempre es verdadero, por eso puede devolver todos los usuarios.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Dapper y EF Core pueden ser seguros o vulnerables segun como los uses.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Dapper vulnerable:</p>
                  <pre>{dapperUnsafeSnippet}</pre>
                  <p>Dapper seguro con parametros:</p>
                  <pre>{dapperSafeSnippet}</pre>
                  <p>EF Core normalmente parametriza:</p>
                  <pre>{efSafeSnippet}</pre>
                  <p>Pero puedes romper esa proteccion con raw SQL interpolado:</p>
                  <pre>{efUnsafeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas basicas que suelen exponer esta clase de fallos rapido.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Enviar comilla simple para buscar roturas de sintaxis.</li>
                    <li>Probar `&apos; OR 1=1 --` en login, filtros, busquedas y reportes.</li>
                    <li>Buscar mensajes tipo `SQL syntax error`.</li>
                    <li>Revisar especialmente endpoints con query dinamica.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="protection">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como protegerte</h3>
                    <p className={styles.sub}>Controla la influencia del usuario sobre el SQL.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Acciones</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usar siempre queries parametrizadas.</li>
                    <li>Validar input antes de componer filtros dinamicos.</li>
                    <li>Aplicar menor privilegio en DB: la app no debe ser admin.</li>
                    <li>Evitar SQL dinamico innecesario.</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior construye queries. Backend senior controla quien puede influirlas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar queries vulnerables en codigo existente.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>
                      Buscar patrones como <code>{`$"SELECT * FROM..."`}</code>.
                    </li>
                    <li>Preguntar si hay input concatenado.</li>
                    <li>Aplicar payload mental `&apos; OR 1=1 --`.</li>
                    <li>Clasificar cada caso: seguro, vulnerable o riesgo medio.</li>
                  </ul>
                  <pre>{miniProjectSnippet}</pre>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/64">
                      ← Dia 64
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/rest-lite#aprendizaje-diario">
                      REST Lite
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
                  <p>Dia 65 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> input del usuario no debe controlar SQL.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> parametriza en Dapper y evita `FromSqlRaw` interpolado.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> bypass de login, filtrado de datos y borrado de informacion.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
