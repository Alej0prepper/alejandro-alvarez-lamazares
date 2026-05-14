"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "importance", label: "3) Por que importa" },
  { id: "example", label: "4) Ejemplo" },
  { id: "mindset", label: "5) Mentalidad backend" },
  { id: "where", label: "6) Donde aplica" },
  { id: "database", label: "7) DB" },
  { id: "dotnet", label: "8) .NET" },
  { id: "jwt", label: "9) JWT" },
  { id: "testing", label: "10) Testing" },
  { id: "mental-example", label: "11) Ejemplo mental" },
  { id: "connections", label: "12) Relacion" },
  { id: "mini-project", label: "Practica" },
] as const;

const userSnippet = `User`;

const badUserPermissionsSnippet = `delete users
manage roles
refund payments`;

const goodUserPermissionsSnippet = `read own profile
create orders`;

const adminDbSnippet = `db_owner
sysadmin
root`;

const limitedDbSnippet = `read/write solo tablas necesarias`;

const badDotnetSnippet = `[Authorize(Roles = "Admin")]`;

const specificRolesSnippet = `OrderReader
OrderManager
RefundOperator`;

const excessiveJwtSnippet = `{
  "isAdmin": true,
  "canDelete": true,
  "canRefund": true
}`;

const totalAccessSnippet = `todo`;

const limitedAccessSnippet = `leer sus pedidos`;

const rolesSnippet = `User
Support
Admin`;

const userPermissionsSnippet = `ver sus pedidos
editar perfil`;

const supportPermissionsSnippet = `ver pedidos
NO eliminar usuarios`;

const adminPermissionsSnippet = `gestionar sistema`;

const compromisedTokenSnippet = `token comprometido`;

const impactSnippet = `mas privilegios = mas impacto`;

export default function Daily67Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/66";
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
            <Link className={styles.btn} href="/daily/66">
              <span className={styles.kbd}>←</span> Dia 66
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
                <div className={styles.createdAt}>12/05/2026</div>
                <div className={styles.badge}>Daily #67 • Backend Foundations</div>
                <h2 className={styles.title}>Principio de minimo privilegio: menos acceso = mas seguridad</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Autorizacion</span>
                  <span className={styles.chip}>Tag: Permisos</span>
                  <span className={styles.chip}>Tag: JWT</span>
                </div>

                <p className={styles.lead}>
                  Un usuario, servicio o sistema solo debe tener el acceso minimo necesario para hacer su trabajo.
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
                    <p className={styles.sub}>El acceso debe ser suficiente para trabajar, no suficiente para destruir.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Solo concede el acceso minimo necesario para cumplir una responsabilidad concreta.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Least Privilege reduce permisos a lo estrictamente necesario.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Principio de minimo privilegio: dar unicamente los permisos estrictamente necesarios, y nada mas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="importance">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que es tan importante</h3>
                    <p className={styles.sub}>Cuando algo se compromete, el dano queda limitado.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Puede comprometerse:</p>
                  <ul className={styles.bullets}>
                    <li>un usuario</li>
                    <li>un token</li>
                    <li>una API</li>
                    <li>un servicio</li>
                  </ul>
                  <p>El objetivo es que ese compromiso no tenga poder ilimitado.</p>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>Un usuario normal no necesita permisos administrativos.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supongamos un usuario normal:</p>
                  <pre>{userSnippet}</pre>

                  <h4>Mal enfoque</h4>
                  <pre>{badUserPermissionsSnippet}</pre>
                  <p>Innecesario y peligroso.</p>

                  <h4>Buen enfoque</h4>
                  <pre>{goodUserPermissionsSnippet}</pre>
                  <p>Acceso minimo necesario.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>El criterio no es cuanto puedes dar, sino cuanto puedes evitar dar.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;que permisos puedo dar?&quot;.</li>
                    <li>Si: &quot;que permisos puedo evitar dar?&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="where">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Donde se aplica este principio</h3>
                    <p className={styles.sub}>Aplica a usuarios, APIs, base de datos, servicios y tokens.</p>
                  </div>
                  <span className={styles.chip}>Alcance</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usuarios: roles y permisos.</li>
                    <li>APIs: scopes y claims.</li>
                    <li>Base de datos: usuarios DB con permisos limitados.</li>
                    <li>Servicios internos: microservicios con permisos acotados.</li>
                    <li>Tokens JWT: solo claims necesarios.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="database">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo real importante</h3>
                    <p className={styles.sub}>Una app conectada como admin de DB convierte una brecha en control total.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Base de datos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{adminDbSnippet}</pre>
                  <p>Si comprometen la app, pueden obtener control total de la base de datos.</p>

                  <h4>Mejor enfoque</h4>
                  <pre>{limitedDbSnippet}</pre>
                  <p>El dano queda limitado.</p>

                  <div className={styles.callout}>
                    El objetivo no es evitar todos los compromisos. Es limitar el impacto cuando ocurran.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se ve en .NET</h3>
                    <p className={styles.sub}>Usar Admin para todo termina creando permisos excesivos.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal</h4>
                  <pre>{badDotnetSnippet}</pre>
                  <p>Para todo. Muchos usuarios terminan siendo admin porque funciona.</p>

                  <h4>Mejor</h4>
                  <p>Roles especificos:</p>
                  <pre>{specificRolesSnippet}</pre>
                  <p>Permisos mas controlados.</p>
                </div>
              </section>

              <section className={styles.section} id="jwt">
                <div className={styles.shd}>
                  <div>
                    <h3>9. JWT y minimo privilegio</h3>
                    <p className={styles.sub}>Un token no debe cargar poder innecesario.</p>
                  </div>
                  <span className={styles.chip}>JWT</span>
                </div>
                <div className={styles.sbd}>
                  <p>Error comun: JWT lleno de claims innecesarios.</p>
                  <pre>{excessiveJwtSnippet}</pre>
                  <p>Demasiado poder para un token.</p>

                  <div className={styles.quote}>
                    Cuanto mas acceso das, mas dano puede hacer una vulnerabilidad.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Busca permisos excesivos y credenciales demasiado poderosas.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Todos son admin?</li>
                    <li>La app usa credenciales root?</li>
                    <li>Los servicios tienen mas permisos de los necesarios?</li>
                    <li>Usuarios normales pueden hacer acciones sensibles?</li>
                    <li>Los tokens contienen privilegios excesivos?</li>
                  </ul>
                  <p>Dar acceso total para evitar problemas crea problemas mucho peores.</p>
                </div>
              </section>

              <section className={styles.section} id="mental-example">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Ejemplo mental importante</h3>
                    <p className={styles.sub}>Dos sistemas comprometidos pueden tener impactos muy distintos.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema A</h4>
                  <p>Usuario comprometido tiene acceso a:</p>
                  <pre>{totalAccessSnippet}</pre>
                  <p>Desastre total.</p>

                  <h4>Sistema B</h4>
                  <p>Usuario comprometido solo puede:</p>
                  <pre>{limitedAccessSnippet}</pre>
                  <p>Impacto limitado.</p>

                  <div className={styles.callout}>Esa es la esencia del principio.</div>
                </div>
              </section>

              <section className={styles.section} id="connections">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Relacion con dias anteriores</h3>
                    <p className={styles.sub}>Conecta con autorizacion, IDOR y endpoints criticos.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Dia 53: autorizacion.</li>
                    <li>Dia 54: IDOR.</li>
                    <li>Dia 62: endpoints criticos.</li>
                  </ul>
                  <p>Todos tratan de quien puede hacer que y cuanto poder tiene alguien.</p>
                  <div className={styles.callout}>
                    La seguridad no consiste solo en bloquear acceso. Tambien consiste en limitar poder.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Pensar permisos desde impacto.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Evaluar roles por permisos necesarios y dano posible.</p>

                  <h4>Roles</h4>
                  <pre>{rolesSnippet}</pre>

                  <h4>Paso 1 - Define permisos minimos</h4>
                  <p>User:</p>
                  <pre>{userPermissionsSnippet}</pre>
                  <p>Support:</p>
                  <pre>{supportPermissionsSnippet}</pre>
                  <p>Admin:</p>
                  <pre>{adminPermissionsSnippet}</pre>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <p>Hay permisos innecesarios?</p>

                  <h4>Paso 3 - Simulacion</h4>
                  <pre>{compromisedTokenSnippet}</pre>
                  <p>Cuanto dano puede hacer?</p>

                  <h4>Paso 4 - Conclusion</h4>
                  <pre>{impactSnippet}</pre>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>dar permisos de mas es peligroso</li>
                    <li>admin para todos es una mala practica</li>
                    <li>limitar acceso reduce impacto real</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu app usa usuarios admin en DB?</li>
                    <li>Hay roles demasiado poderosos?</li>
                    <li>Que pasaria si roban un JWT de tu sistema?</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior da acceso para que funcione. Backend senior da el minimo acceso posible.
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
