"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "surface", label: "3) Superficie" },
  { id: "image", label: "4) Imagen" },
  { id: "root", label: "5) Root" },
  { id: "least-privilege", label: "6) Minimo privilegio" },
  { id: "scan", label: "7) Escaneo" },
  { id: "cves", label: "8) CVEs" },
  { id: "signing", label: "9) Firmas" },
  { id: "secrets", label: "10) Secrets" },
  { id: "rbac", label: "11) RBAC" },
  { id: "network", label: "12) Network" },
  { id: "pod-security", label: "13) Pod Security" },
  { id: "attack", label: "14) Ataque" },
  { id: "defense", label: "15) Defensa" },
  { id: "mindset", label: "16) Mentalidad" },
  { id: "checklist", label: "17) Checklist" },
  { id: "relation", label: "18) Relacion" },
  { id: "project", label: "Practica" },
] as const;

const protectedCodeSnippet = `el codigo`;

const protectedPlatformSnippet = `la plataforma`;

const surfaceSnippet = `Cluster
↓
Node
↓
Pod
↓
Container
↓
Application`;

const moreSurfaceSnippet = `mas superficie de ataque`;

const badImageSnippet = `SDK
herramientas
shells
utilidades`;

const goodImageSnippet = `solo runtime`;

const vulnerabilitySnippet = `codigo
↓
posibles vulnerabilidades`;

const rootSnippet = `root`;

const compromisedSnippet = `que ocurre si alguien compromete la aplicacion?`;

const userSnippet = `USER appuser`;

const leastPrivilegeSnippet = `Cada componente debe tener unicamente los permisos estrictamente necesarios.`;

const apiPermissionsSnippet = `leer pedidos
crear pedidos`;

const forbiddenActionSnippet = `eliminar toda la base de datos`;

const scanQuestionSnippet = `como sabemos si nuestra imagen tiene vulnerabilidades?`;

const scanToolsSnippet = `Trivy
Snyk
Docker Scout`;

const opensslSnippet = `OpenSSL vulnerable`;

const signatureQuestionSnippet = `como sabemos que esta imagen es autentica?`;

const maliciousImageSnippet = `my-api:v1`;

const signaturesSnippet = `image signatures`;

const authSnippet = `quien construyo la imagen`;

const badSecretYamlSnippet = `env:
  - name: DB_PASSWORD
    value: "123456"`;

const secretRefSnippet = `secretKeyRef`;

const secretManagersSnippet = `Vault
AWS Secrets Manager
Azure Key Vault`;

const rbacSnippet = `Role Based Access Control`;

const devSnippet = `leer logs`;

const forbiddenProdSnippet = `borrar produccion`;

const networkQuestionSnippet = `todos los Pods deberian hablar con todos?`;

const openNetworkSnippet = `todo puede hablar con todo`;

const apiToDbSnippet = `API
↓
PostgreSQL`;

const frontendToDbSnippet = `Frontend
↓
PostgreSQL`;

const podQuestionSnippet = `que puede hacer un Pod?`;

const isolatedSnippet = `el atacante quede encerrado`;

const attackChainSnippet = `Aplicacion vulnerable
↓
Compromiso del Pod
↓
Acceso a secretos
↓
Movimiento lateral
↓
Mas Pods
↓
Cluster`;

const defenseSnippet = `Aplicacion segura
+ Imagen segura
+ RBAC
+ Network Policies
+ Secrets seguros`;

const juniorSnippet = `mi codigo esta protegido`;

const seniorSnippet = `que ocurre si comprometen el contenedor?
que ocurre si comprometen el Pod?
que ocurre si consiguen credenciales?`;

const checklistSnippet = `Imagen escaneada?
Usuario no root?
Secrets fuera del codigo?
RBAC configurado?
Network Policies?
Dependencias actualizadas?
Accesos auditados?`;

const relationSnippet = `secretos
minimo privilegio
autenticacion
autorizacion
threat modeling`;

const infrastructureSnippet = `a nivel de infraestructura`;

const systemSnippet = `API
Redis
PostgreSQL`;

const compromiseSnippet = `si un Pod es comprometido,
el daño deberia quedar contenido`;

export default function Daily99Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/98";
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
            <Link className={styles.btn} href="/daily/98">
              <span className={styles.kbd}>←</span> Dia 98
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
                <div className={styles.createdAt}>15/06/2026</div>
                <div className={styles.badge}>Daily #99 • Security</div>
                <h2 className={styles.title}>Seguridad de contenedores y cluster</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Docker</span>
                  <span className={styles.chip}>Tag: Kubernetes</span>
                  <span className={styles.chip}>Tag: Defensa</span>
                </div>

                <p className={styles.lead}>
                  La seguridad no termina en el codigo. Tambien debes proteger el contenedor, la red, los secretos y
                  el cluster donde vive tu backend.
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
                    <p className={styles.sub}>Proteger la plataforma donde vive tu backend.</p>
                  </div>
                  <span className={styles.chip}>Plataforma</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ya hablamos de seguridad de aplicaciones. Ahora la pregunta cambia:</p>
                  <pre>{protectedCodeSnippet}</pre>
                  <p>Tambien hay que proteger:</p>
                  <pre>{protectedPlatformSnippet}</pre>
                  <div className={styles.callout}>A partir de cierto tamaño, el atacante busca romper tu infraestructura.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El error mas comun</h3>
                    <p className={styles.sub}>Si la API es segura, no significa que todo el sistema lo sea.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>imagenes Docker</li>
                    <li>contenedores</li>
                    <li>nodos</li>
                    <li>Kubernetes</li>
                    <li>secretos</li>
                    <li>red interna</li>
                  </ul>
                  <div className={styles.quote}>La seguridad debe existir en todas las capas.</div>
                </div>
              </section>

              <section className={styles.section} id="surface">
                <div className={styles.shd}>
                  <div>
                    <h3>3. La superficie de ataque cambia</h3>
                    <p className={styles.sub}>Mas componentes significa mas cosas que proteger.</p>
                  </div>
                  <span className={styles.chip}>Superficie</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{surfaceSnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{moreSurfaceSnippet}</pre>
                  <div className={styles.callout}>Mas componentes = mas riesgo.</div>
                </div>
              </section>

              <section className={styles.section} id="image">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Primera regla: minimizar la imagen</h3>
                    <p className={styles.sub}>Menos software dentro de la imagen reduce la exposicion.</p>
                  </div>
                  <span className={styles.chip}>Imagen</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Malo</h4>
                  <pre>{badImageSnippet}</pre>
                  <h4>Mejor</h4>
                  <pre>{goodImageSnippet}</pre>
                  <pre>{vulnerabilitySnippet}</pre>
                  <div className={styles.quote}>Menos software = menos riesgo.</div>
                </div>
              </section>

              <section className={styles.section} id="root">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Ejecutar como root</h3>
                    <p className={styles.sub}>El error mas comun en imagenes y contenedores.</p>
                  </div>
                  <span className={styles.chip}>Privilegios</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rootSnippet}</pre>
                  <pre>{compromisedSnippet}</pre>
                  <p>Mejor:</p>
                  <pre>{userSnippet}</pre>
                  <div className={styles.callout}>Principio de minimo privilegio.</div>
                </div>
              </section>

              <section className={styles.section} id="least-privilege">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que es el principio de minimo privilegio</h3>
                    <p className={styles.sub}>Cada componente debe tener solo lo necesario.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{leastPrivilegeSnippet}</pre>
                  <p>Tu API necesita:</p>
                  <pre>{apiPermissionsSnippet}</pre>
                  <p>No necesita:</p>
                  <pre>{forbiddenActionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="scan">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Escaneo de imagenes</h3>
                    <p className={styles.sub}>Como detectar vulnerabilidades conocidas en una imagen.</p>
                  </div>
                  <span className={styles.chip}>Scan</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{scanQuestionSnippet}</pre>
                  <pre>{scanToolsSnippet}</pre>
                  <div className={styles.callout}>Analizan librerias, paquetes, dependencias y CVEs conocidas.</div>
                </div>
              </section>

              <section className={styles.section} id="cves">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Vulnerabilidades conocidas</h3>
                    <p className={styles.sub}>Tu codigo puede ser perfecto y seguir siendo vulnerable.</p>
                  </div>
                  <span className={styles.chip}>CVEs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{opensslSnippet}</pre>
                  <div className={styles.quote}>La seguridad no depende solo de tu codigo.</div>
                </div>
              </section>

              <section className={styles.section} id="signing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Firmado de imagenes</h3>
                    <p className={styles.sub}>Verificar autenticidad y cadena de confianza.</p>
                  </div>
                  <span className={styles.chip}>Confianza</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{signatureQuestionSnippet}</pre>
                  <pre>{maliciousImageSnippet}</pre>
                  <pre>{signaturesSnippet}</pre>
                  <pre>{authSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="secrets">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Secrets en Kubernetes</h3>
                    <p className={styles.sub}>Los secretos no deben quedar en Git ni en el YAML.</p>
                  </div>
                  <span className={styles.chip}>Secrets</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Malo</h4>
                  <pre>{badSecretYamlSnippet}</pre>
                  <p>Mejor:</p>
                  <pre>{secretRefSnippet}</pre>
                  <pre>{secretManagersSnippet}</pre>
                  <div className={styles.callout}>Secretos fuera del codigo.</div>
                </div>
              </section>

              <section className={styles.section} id="rbac">
                <div className={styles.shd}>
                  <div>
                    <h3>11. RBAC</h3>
                    <p className={styles.sub}>Controla quien puede hacer que dentro del cluster.</p>
                  </div>
                  <span className={styles.chip}>RBAC</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{rbacSnippet}</pre>
                  <p>Ejemplo:</p>
                  <pre>{devSnippet}</pre>
                  <pre>{forbiddenProdSnippet}</pre>
                  <div className={styles.quote}>Fundamental en entornos grandes.</div>
                </div>
              </section>

              <section className={styles.section} id="network">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Network Policies</h3>
                    <p className={styles.sub}>No todos los Pods deberian hablar con todos.</p>
                  </div>
                  <span className={styles.chip}>Red</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{networkQuestionSnippet}</pre>
                  <pre>{openNetworkSnippet}</pre>
                  <pre>{apiToDbSnippet}</pre>
                  <pre>{frontendToDbSnippet}</pre>
                  <div className={styles.callout}>Segmentacion de red.</div>
                </div>
              </section>

              <section className={styles.section} id="pod-security">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Pod Security</h3>
                    <p className={styles.sub}>Reducir lo que un Pod puede hacer.</p>
                  </div>
                  <span className={styles.chip}>Pod</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{podQuestionSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>privilegios</li>
                    <li>acceso al host</li>
                    <li>montaje de dispositivos</li>
                    <li>capacidades Linux</li>
                  </ul>
                  <pre>{isolatedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="attack">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Ataque tipico en Kubernetes</h3>
                    <p className={styles.sub}>Una vulnerabilidad puede moverse lateralmente por el cluster.</p>
                  </div>
                  <span className={styles.chip}>Ataque</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{attackChainSnippet}</pre>
                  <div className={styles.quote}>Por eso existen multiples capas de proteccion.</div>
                </div>
              </section>

              <section className={styles.section} id="defense">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Defensa en profundidad</h3>
                    <p className={styles.sub}>No confiar en una sola defensa.</p>
                  </div>
                  <span className={styles.chip}>Defensa</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{defenseSnippet}</pre>
                  <div className={styles.callout}>Varias capas siempre superan una sola.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No mira solo el codigo.</p>
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

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Checklist minimo de seguridad</h3>
                    <p className={styles.sub}>Antes de produccion.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checklistSnippet}</pre>
                  <div className={styles.callout}>Mínimo razonable.</div>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Relacion con todo lo visto</h3>
                    <p className={styles.sub}>Seguridad aplicada a la infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Relacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{relationSnippet}</pre>
                  <pre>{infrastructureSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Auditar mentalmente un despliegue Kubernetes.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>corre como root?</li>
                    <li>donde estan los secretos?</li>
                    <li>que Pods pueden comunicarse entre si?</li>
                    <li>quien tiene permisos de administrador?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{compromiseSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Las imagenes tambien tienen vulnerabilidades.</li>
                    <li>Ejecutar como root aumenta el riesgo.</li>
                    <li>RBAC controla permisos dentro del cluster.</li>
                    <li>Network Policies limitan movimiento lateral.</li>
                    <li>La seguridad efectiva es multicapa.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>La imagen se escanea automaticamente?</li>
                    <li>Existe algun secreto en Git?</li>
                    <li>Los Pods tienen permisos excesivos?</li>
                    <li>Hay segmentacion de red?</li>
                    <li>Que ocurriria si un contenedor fuese comprometido hoy?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior protege endpoints. Backend senior protege tambien la plataforma completa donde esos
                    endpoints viven, escalan y operan cada dia.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/98">
                      ← Dia 98
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
                  <p>Dia 99 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Imagen:</strong> minimalizar runtime y reducir superficie de ataque.
                </div>
                <div className={styles.li}>
                  <strong>RBAC:</strong> limitar acciones dentro del cluster.
                </div>
                <div className={styles.li}>
                  <strong>Red:</strong> Network Policies cortan movimiento lateral.
                </div>
                <div className={styles.li}>
                  <strong>Seguridad real:</strong> defensa en profundidad en todas las capas.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
