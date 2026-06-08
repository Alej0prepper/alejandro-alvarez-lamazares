"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "networking", label: "3) Networking" },
  { id: "ports", label: "4) Puertos" },
  { id: "bridge", label: "5) Bridge" },
  { id: "data", label: "6) Datos" },
  { id: "volumes", label: "7) Volumes" },
  { id: "volume-example", label: "8) Ejemplo" },
  { id: "bind", label: "9) Bind mounts" },
  { id: "env", label: "10) Env" },
  { id: "dotnet", label: "11) .NET" },
  { id: "localhost", label: "12) Localhost" },
  { id: "secrets", label: "13) Secretos" },
  { id: "secret-types", label: "14) Tipos" },
  { id: "secret-handling", label: "15) Gestion" },
  { id: "compose", label: "16) Compose" },
  { id: "mindset", label: "17) Mentalidad" },
  { id: "next", label: "18) Siguiente" },
  { id: "project", label: "Practica" },
] as const;

const previousModelSnippet = `Dockerfile
↓
Image
↓
Container`;

const fourConceptsSnippet = `Networking
Volumes
Environment Variables
Secrets`;

const systemSnippet = `API
PostgreSQL
Redis`;

const discoveryQuestionSnippet = `Como se encuentran entre si?`;

const networkSnippet = `API
↓
Docker Network
↓
PostgreSQL`;

const postgresNameSnippet = `postgres`;

const postgresHostSnippet = `Host=postgres`;

const nginxRunSnippet = `docker run nginx`;

const publishPortSnippet = `docker run -p 8080:80 nginx`;

const portMappingSnippet = `Puerto Host: 8080
↓
Puerto Contenedor: 80`;

const localhost8080Snippet = `localhost:8080`;

const bridgeSnippet = `Bridge Network`;

const createNetworkSnippet = `docker network create my-network`;

const runNetworkSnippet = `docker run --network my-network`;

const postgresSnippet = `PostgreSQL`;

const dataLostSnippet = `datos perdidos`;

const dataSurvivesSnippet = `los datos sobreviven`;

const createVolumeSnippet = `docker volume create postgres-data`;

const useVolumeSnippet = `docker run \\
-v postgres-data:/var/lib/postgresql/data`;

const containerDeletedSnippet = `contenedor eliminado`;

const dataIntactSnippet = `datos intactos`;

const bindMountSnippet = `docker run \\
-v ./logs:/app/logs`;

const bindMeaningSnippet = `carpeta host
↓
carpeta contenedor`;

const configQuestionSnippet = `Como configuramos el contenedor?`;

const envRunSnippet = `docker run \\
-e DB_HOST=postgres`;

const envInsideSnippet = `DB_HOST=postgres`;

const dotnetEnvSnippet = `var host =
Environment.GetEnvironmentVariable(
    "DB_HOST");`;

const localhostSnippet = `localhost`;

const ownContainerSnippet = `el propio contenedor`;

const passwordQuestionSnippet = `Donde guardamos passwords?`;

const badSecretSnippet = `ENV DB_PASSWORD=123456`;

const devSecretsSnippet = `.env
User Secrets`;

const prodSecretsSnippet = `Vault
AWS Secrets Manager
Azure Key Vault
Kubernetes Secrets`;

const realisticSystemSnippet = `API
Postgres
Redis`;

const injectedConfigSnippet = `DB_HOST=postgres
REDIS_HOST=redis
JWT_SECRET=xxxx`;

const injectedSnippet = `inyectados`;

const composeSnippet = `services:
  api:
  postgres:
  redis:`;

const wholeSystemSnippet = `todo el sistema`;

const juniorSnippet = `quiero que la aplicacion arranque`;

const seniorSnippet = `quiero que sea portable
configurable
persistente
segura`;

const scaleQuestionSnippet = `que pasa cuando tienes
100 contenedores
en lugar de 1?`;

const dockerSolvesSnippet = `empaquetar`;

const k8sSolvesSnippet = `operar a escala`;

const reflectionSnippet = `los contenedores son temporales
los datos y la configuracion no`;

export default function Daily93Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/92";
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
            <Link className={styles.btn} href="/daily/92">
              <span className={styles.kbd}>←</span> Dia 92
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
                <div className={styles.createdAt}>07/06/2026</div>
                <div className={styles.badge}>Daily #93 • Docker Runtime</div>
                <h2 className={styles.title}>Contenedores reales: redes, volumenes, env y secretos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Docker</span>
                  <span className={styles.chip}>Tag: Networking</span>
                  <span className={styles.chip}>Tag: Persistencia</span>
                  <span className={styles.chip}>Tag: Secretos</span>
                </div>

                <p className={styles.lead}>
                  Un contenedor aislado es util, pero un sistema real necesita comunicarse, persistir datos,
                  configurarse dinamicamente y manejar secretos con seguridad.
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
                    <p className={styles.sub}>Como se comunica un contenedor con el mundo real.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Hasta ahora vimos:</p>
                  <pre>{previousModelSnippet}</pre>
                  <p>Pero una API real necesita recibir trafico, hablar con base de datos, guardar informacion, leer configuracion y manejar secretos.</p>
                  <pre>{fourConceptsSnippet}</pre>
                  <div className={styles.callout}>Ahi aparecen networking, volumes, environment variables y secrets.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Cada contenedor vive aislado por defecto.</p>
                  </div>
                  <span className={styles.chip}>Aislamiento</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supongamos que tienes:</p>
                  <pre>{systemSnippet}</pre>
                  <p>La pregunta es:</p>
                  <pre>{discoveryQuestionSnippet}</pre>
                  <div className={styles.quote}>Los contenedores estan aislados por defecto.</div>
                </div>
              </section>

              <section className={styles.section} id="networking">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Networking</h3>
                    <p className={styles.sub}>Docker crea redes virtuales y DNS interno.</p>
                  </div>
                  <span className={styles.chip}>Red</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{networkSnippet}</pre>
                  <p>La API y PostgreSQL pueden comunicarse aunque esten en contenedores diferentes.</p>
                  <h4>Ejemplo</h4>
                  <p>Si el contenedor se llama:</p>
                  <pre>{postgresNameSnippet}</pre>
                  <p>La API puede usar:</p>
                  <pre>{postgresHostSnippet}</pre>
                  <div className={styles.callout}>No necesitas IPs fijas.</div>
                </div>
              </section>

              <section className={styles.section} id="ports">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Publicar puertos</h3>
                    <p className={styles.sub}>Por defecto un contenedor no es accesible desde fuera.</p>
                  </div>
                  <span className={styles.chip}>Puertos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nginxRunSnippet}</pre>
                  <p>Nginx esta ejecutandose, pero nadie puede verlo desde el host.</p>
                  <h4>Para exponerlo</h4>
                  <pre>{publishPortSnippet}</pre>
                  <pre>{portMappingSnippet}</pre>
                  <p>Ahora puedes acceder desde:</p>
                  <pre>{localhost8080Snippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="bridge">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Redes Bridge</h3>
                    <p className={styles.sub}>La red mas comun en Docker.</p>
                  </div>
                  <span className={styles.chip}>Bridge</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{bridgeSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>comunicacion entre contenedores</li>
                    <li>aislamiento del host</li>
                    <li>DNS interno</li>
                  </ul>
                  <pre>{createNetworkSnippet}</pre>
                  <pre>{runNetworkSnippet}</pre>
                  <div className={styles.callout}>Resultado: los contenedores se ven entre si.</div>
                </div>
              </section>

              <section className={styles.section} id="data">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que pasa con los datos</h3>
                    <p className={styles.sub}>Los contenedores pueden desaparecer; tus datos no deberian.</p>
                  </div>
                  <span className={styles.chip}>Persistencia</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supon que:</p>
                  <pre>{postgresSnippet}</pre>
                  <p>almacena informacion. Si el contenedor se elimina, sin configuracion adicional ocurre:</p>
                  <pre>{dataLostSnippet}</pre>
                  <div className={styles.callout}>Aqui aparecen los volumenes.</div>
                </div>
              </section>

              <section className={styles.section} id="volumes">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Volumes</h3>
                    <p className={styles.sub}>Almacenan datos fuera del ciclo de vida del contenedor.</p>
                  </div>
                  <span className={styles.chip}>Volumes</span>
                </div>
                <div className={styles.sbd}>
                  <p>Aunque el contenedor muera:</p>
                  <pre>{dataSurvivesSnippet}</pre>
                  <div className={styles.quote}>Los contenedores son efimeros. Los datos no deberian serlo.</div>
                </div>
              </section>

              <section className={styles.section} id="volume-example">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo con volumen</h3>
                    <p className={styles.sub}>Crear un volumen y montarlo en PostgreSQL.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{createVolumeSnippet}</pre>
                  <pre>{useVolumeSnippet}</pre>
                  <p>Ahora puede ocurrir:</p>
                  <pre>{containerDeletedSnippet}</pre>
                  <p>Pero los datos quedan:</p>
                  <pre>{dataIntactSnippet}</pre>
                  <div className={styles.callout}>Fundamental para bases de datos.</div>
                </div>
              </section>

              <section className={styles.section} id="bind">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Bind Mounts</h3>
                    <p className={styles.sub}>Otra forma de persistencia, conectada al filesystem del host.</p>
                  </div>
                  <span className={styles.chip}>Mounts</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{bindMountSnippet}</pre>
                  <p>Significa:</p>
                  <pre>{bindMeaningSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>logs</li>
                    <li>archivos</li>
                    <li>desarrollo</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="env">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Variables de entorno</h3>
                    <p className={styles.sub}>Configuracion no es codigo.</p>
                  </div>
                  <span className={styles.chip}>Config</span>
                </div>
                <div className={styles.sbd}>
                  <p>La pregunta es:</p>
                  <pre>{configQuestionSnippet}</pre>
                  <pre>{envRunSnippet}</pre>
                  <p>Dentro del contenedor:</p>
                  <pre>{envInsideSnippet}</pre>
                  <div className={styles.quote}>La aplicacion puede leerlo sin hardcodearlo.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Ejemplo real .NET</h3>
                    <p className={styles.sub}>La aplicacion no necesita conocer el host de antemano.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dotnetEnvSnippet}</pre>
                  <p>La aplicacion no sabe donde esta la base. Docker lo proporciona en runtime.</p>
                  <div className={styles.callout}>Muy importante para produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="localhost">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Error tipico: localhost</h3>
                    <p className={styles.sub}>Dentro de un contenedor, localhost no es tu maquina.</p>
                  </div>
                  <span className={styles.chip}>Error comun</span>
                </div>
                <div className={styles.sbd}>
                  <p>Hardcodear esto rompe muchos setups:</p>
                  <pre>{localhostSnippet}</pre>
                  <p>Dentro del contenedor significa:</p>
                  <pre>{ownContainerSnippet}</pre>
                  <div className={styles.callout}>No es el host. Es un error extremadamente comun.</div>
                </div>
              </section>

              <section className={styles.section} id="secrets">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Secretos</h3>
                    <p className={styles.sub}>Passwords y credenciales no pertenecen al Dockerfile.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <p>La pregunta critica es:</p>
                  <pre>{passwordQuestionSnippet}</pre>
                  <h4>Mala practica</h4>
                  <pre>{badSecretSnippet}</pre>
                  <p>La contrasena termina dentro de la imagen y cualquiera con acceso podria verla.</p>
                  <div className={styles.quote}>Los secretos NO pertenecen al Dockerfile.</div>
                </div>
              </section>

              <section className={styles.section} id="secret-types">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Que es un secreto</h3>
                    <p className={styles.sub}>Todo valor sensible que no debe viajar dentro de la imagen.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>passwords</li>
                    <li>API keys</li>
                    <li>JWT secrets</li>
                    <li>certificados privados</li>
                    <li>connection strings sensibles</li>
                  </ul>
                  <div className={styles.callout}>Todo eso debe gestionarse externamente.</div>
                </div>
              </section>

              <section className={styles.section} id="secret-handling">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como manejar secretos</h3>
                    <p className={styles.sub}>Desarrollo y produccion usan mecanismos distintos.</p>
                  </div>
                  <span className={styles.chip}>Gestion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Desarrollo</h4>
                  <pre>{devSecretsSnippet}</pre>
                  <h4>Produccion</h4>
                  <pre>{prodSecretsSnippet}</pre>
                  <h4>Ejemplo realista</h4>
                  <pre>{realisticSystemSnippet}</pre>
                  <pre>{injectedConfigSnippet}</pre>
                  <p>Todos los valores son:</p>
                  <pre>{injectedSnippet}</pre>
                  <div className={styles.quote}>No hardcodeados. Arquitectura moderna.</div>
                </div>
              </section>

              <section className={styles.section} id="compose">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Docker Compose</h3>
                    <p className={styles.sub}>Donde normalmente todo se conecta en desarrollo.</p>
                  </div>
                  <span className={styles.chip}>Compose</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{composeSnippet}</pre>
                  <p>Compose permite levantar:</p>
                  <pre>{wholeSystemSnippet}</pre>
                  <p>con un solo comando. Lo veremos mas adelante.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Como piensa un backend senior</h3>
                    <p className={styles.sub}>Arrancar no basta; el contenedor debe operar bien.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Esa diferencia es enorme.</div>
                </div>
              </section>

              <section className={styles.section} id="next">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Que aprenderemos despues</h3>
                    <p className={styles.sub}>De un contenedor a operar muchos contenedores.</p>
                  </div>
                  <span className={styles.chip}>Ruta</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ya entiendes imagenes, contenedores, redes, volumenes, configuracion y secretos.</p>
                  <p>La siguiente clase sera Kubernetes Fundamental, donde responderemos:</p>
                  <pre>{scaleQuestionSnippet}</pre>
                  <p>Docker resuelve:</p>
                  <pre>{dockerSolvesSnippet}</pre>
                  <p>Pero Kubernetes resuelve:</p>
                  <pre>{k8sSolvesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Disenar mentalmente una aplicacion containerizada.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sistema</h4>
                  <pre>{systemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Paso 1: como se comunicarian?</li>
                    <li>Paso 2: que datos necesitan persistir?</li>
                    <li>Paso 3: que variables deberian ser configurables?</li>
                    <li>Paso 4: que valores son secretos?</li>
                  </ul>
                  <h4>Reflexion clave</h4>
                  <pre>{reflectionSnippet}</pre>
                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Docker Networking permite comunicacion.</li>
                    <li>Los volumenes evitan perdida de datos.</li>
                    <li>Las variables de entorno permiten configurar.</li>
                    <li>Los secretos deben mantenerse fuera de las imagenes.</li>
                    <li>localhost dentro de un contenedor no significa lo mismo que en tu maquina.</li>
                  </ul>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que puertos expone tu proyecto?</li>
                    <li>Que datos necesita persistir?</li>
                    <li>Que variables deberian salir del codigo?</li>
                    <li>Que secretos existen?</li>
                    <li>Que ocurriria si eliminas el contenedor ahora mismo?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior ejecuta contenedores. Backend senior disena ecosistemas de contenedores que pueden
                    comunicarse, persistir datos, configurarse dinamicamente y operar de forma segura.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/92">
                      ← Dia 92
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
                  <p>Dia 93 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Networking:</strong> los contenedores se comunican por redes virtuales y DNS interno.
                </div>
                <div className={styles.li}>
                  <strong>Puertos:</strong> `-p 8080:80` publica un puerto del contenedor en el host.
                </div>
                <div className={styles.li}>
                  <strong>Persistencia:</strong> los volumenes sobreviven al ciclo de vida del contenedor.
                </div>
                <div className={styles.li}>
                  <strong>Config:</strong> variables y secretos se inyectan en runtime, no se hardcodean.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
