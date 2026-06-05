"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "docker", label: "2) Docker" },
  { id: "problem", label: "3) Problema" },
  { id: "vm", label: "4) VM vs contenedor" },
  { id: "concepts", label: "5) Conceptos" },
  { id: "image", label: "6) Imagen" },
  { id: "container", label: "7) Contenedor" },
  { id: "commands", label: "8) Comandos" },
  { id: "run", label: "9) Run" },
  { id: "lifecycle", label: "10) Ciclo" },
  { id: "industry", label: "11) Industria" },
  { id: "mindset", label: "12) Mentalidad" },
  { id: "mistake", label: "13) Error" },
  { id: "next", label: "14) Siguiente" },
  { id: "project", label: "Practica" },
] as const;

const oldDeploySnippet = `Servidor
↓
Instalar .NET
↓
Instalar dependencias
↓
Copiar aplicacion
↓
Rezar`;

const worksHereSnippet = `en mi maquina funciona`;

const productionFailsSnippet = `no funciona`;

const appNeedsSnippet = `aplicacion
runtime
librerias
configuracion necesaria`;

const dotnetDependenciesSnippet = `.NET 9
Redis Client X
Libreria Y`;

const productionMismatchSnippet = `version distinta
dependencia faltante
configuracion diferente`;

const appEnvironmentSnippet = `su entorno`;

const vmSnippet = `Hardware
↓
Hypervisor
↓
Sistema Operativo completo
↓
Aplicacion`;

const dockerSnippet = `Hardware
↓
Sistema Operativo Host
↓
Docker Engine
↓
Contenedores`;

const vmResultSnippet = `pesadas
mas lentas
mas consumo`;

const containerResultSnippet = `mas ligeros
mas rapidos
menos recursos`;

const dockerfileSnippet = `como construir la imagen`;

const imageSnippet = `ejecutable empaquetado`;

const containerSnippet = `proceso vivo`;

const relationshipSnippet = `Dockerfile
↓
Image
↓
Container`;

const imageContentSnippet = `API .NET`;

const isolatedProcessSnippet = `un proceso aislado`;

const basicCommandsSnippet = `docker images
docker ps
docker ps -a
docker logs <container>
docker stop <container>
docker rm <container>`;

const nginxSnippet = `docker run nginx`;

const dockerRunFlowSnippet = `descarga imagen
crea contenedor
lo ejecuta`;

const lifecycleSnippet = `build
run
logs
stop
rm`;

const oldWorldSnippet = `cada servidor diferente`;

const newWorldSnippet = `misma imagen
en cualquier lugar`;

const juniorQuestionSnippet = `como despliego mi aplicacion?`;

const seniorQuestionSnippet = `como hago que la aplicacion sea portable y reproducible?`;

const wrongIdeaSnippet = `contenedor = servidor`;

const ephemeralSnippet = `efimero
reemplazable
desechable`;

const nextConceptsSnippet = `Dockerfile
Image
Container`;

const nextClassSnippet = `Dockerfiles reales en produccion`;

const executionNeedsSnippet = `que necesita para ejecutarse`;

const portabilityQuestionSnippet = `podria ejecutar exactamente esa imagen
en otra maquina sin cambiar nada?`;

const levelTwoSnippet = `docker run nginx
docker ps
docker logs <container>
docker stop <container>`;

export default function Daily91Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/90";
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
            <Link className={styles.btn} href="/daily/90">
              <span className={styles.kbd}>←</span> Dia 90
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
                <div className={styles.createdAt}>05/06/2026</div>
                <div className={styles.badge}>Daily #91 • Docker Foundations</div>
                <h2 className={styles.title}>Docker desde cero para Backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Docker</span>
                  <span className={styles.chip}>Tag: Contenedores</span>
                  <span className={styles.chip}>Tag: Deploy</span>
                  <span className={styles.chip}>Tag: Backend</span>
                </div>

                <p className={styles.lead}>
                  Docker ayuda a que una aplicacion viaje con su entorno y se ejecute de forma consistente en laptop,
                  servidor, cloud o Kubernetes.
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
                    <p className={styles.sub}>Por que casi nadie despliega aplicaciones directamente.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Durante anos el proceso tipico era este:</p>
                  <pre>{oldDeploySnippet}</pre>
                  <p>Y aparecia el famoso problema:</p>
                  <pre>{worksHereSnippet}</pre>
                  <p>Pero en produccion:</p>
                  <pre>{productionFailsSnippet}</pre>
                  <div className={styles.callout}>Docker nacio para resolver precisamente eso.</div>
                </div>
              </section>

              <section className={styles.section} id="docker">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es Docker</h3>
                    <p className={styles.sub}>Una caja cerrada para ejecutar lo mismo en distintos entornos.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Docker permite empaquetar una aplicacion junto con todo lo que necesita para ejecutarse.</p>
                  <pre>{appNeedsSnippet}</pre>
                  <p>Esa caja puede ejecutarse en tu laptop, en un servidor, en AWS, en Azure o en Kubernetes.</p>
                  <div className={styles.quote}>Docker elimina gran parte de las diferencias entre entornos.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema que resuelve</h3>
                    <p className={styles.sub}>La aplicacion no deberia depender de una maquina preparada a mano.</p>
                  </div>
                  <span className={styles.chip}>Entorno</span>
                </div>
                <div className={styles.sbd}>
                  <p>Supongamos que tu API usa:</p>
                  <pre>{dotnetDependenciesSnippet}</pre>
                  <p>En tu maquina esta todo instalado. En produccion puedes encontrar:</p>
                  <pre>{productionMismatchSnippet}</pre>
                  <p>Con Docker empaquetas todo. La aplicacion viaja con:</p>
                  <pre>{appEnvironmentSnippet}</pre>
                  <div className={styles.callout}>Resultado: menos sorpresas.</div>
                </div>
              </section>

              <section className={styles.section} id="vm">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Contenedor vs maquina virtual</h3>
                    <p className={styles.sub}>Un contenedor no es una VM pequena.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Maquina virtual</h4>
                  <pre>{vmSnippet}</pre>
                  <p>Cada VM tiene kernel propio y sistema operativo completo.</p>
                  <pre>{vmResultSnippet}</pre>
                  <h4>Docker</h4>
                  <pre>{dockerSnippet}</pre>
                  <p>Los contenedores comparten el kernel del host.</p>
                  <pre>{containerResultSnippet}</pre>
                  <div className={styles.quote}>Un contenedor NO es una maquina virtual pequena.</div>
                </div>
              </section>

              <section className={styles.section} id="concepts">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Conceptos fundamentales</h3>
                    <p className={styles.sub}>Dockerfile, imagen y contenedor son cosas distintas.</p>
                  </div>
                  <span className={styles.chip}>Fundamentos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Dockerfile</h4>
                  <p>Es la receta. Define:</p>
                  <pre>{dockerfileSnippet}</pre>
                  <h4>Image</h4>
                  <p>Es una plantilla inmutable, equivalente a:</p>
                  <pre>{imageSnippet}</pre>
                  <h4>Container</h4>
                  <p>Es una instancia ejecutandose, equivalente a:</p>
                  <pre>{containerSnippet}</pre>
                  <h4>Relacion</h4>
                  <pre>{relationshipSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="image">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que contiene una imagen</h3>
                    <p className={styles.sub}>Todo lo necesario para iniciar la aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Imagen</span>
                </div>
                <div className={styles.sbd}>
                  <p>Por ejemplo, una imagen puede contener:</p>
                  <pre>{imageContentSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>runtime .NET</li>
                    <li>DLLs</li>
                    <li>configuracion base</li>
                    <li>dependencias</li>
                  </ul>
                  <p>Todo empaquetado.</p>
                </div>
              </section>

              <section className={styles.section} id="container">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que es realmente un contenedor</h3>
                    <p className={styles.sub}>No es servidor, maquina ni VM.</p>
                  </div>
                  <span className={styles.chip}>Contenedor</span>
                </div>
                <div className={styles.sbd}>
                  <p>Un contenedor es:</p>
                  <pre>{isolatedProcessSnippet}</pre>
                  <p>No es una VM. No es un servidor. No es una maquina.</p>
                  <div className={styles.callout}>Es un proceso aislado por Docker.</div>
                </div>
              </section>

              <section className={styles.section} id="commands">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Comandos basicos</h3>
                    <p className={styles.sub}>Los usaras constantemente.</p>
                  </div>
                  <span className={styles.chip}>CLI</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{basicCommandsSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>
                      <strong>docker images:</strong> ver imagenes.
                    </li>
                    <li>
                      <strong>docker ps:</strong> ver contenedores ejecutandose.
                    </li>
                    <li>
                      <strong>docker logs:</strong> leer salida de un contenedor.
                    </li>
                    <li>
                      <strong>docker stop / rm:</strong> detener y eliminar.
                    </li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="run">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Crear un contenedor simple</h3>
                    <p className={styles.sub}>Docker puede descargar, crear y ejecutar en un solo comando.</p>
                  </div>
                  <span className={styles.chip}>Run</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nginxSnippet}</pre>
                  <p>Con eso Docker hace:</p>
                  <pre>{dockerRunFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="lifecycle">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Ciclo de vida</h3>
                    <p className={styles.sub}>Construir, ejecutar, inspeccionar, detener y eliminar.</p>
                  </div>
                  <span className={styles.chip}>Ciclo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{lifecycleSnippet}</pre>
                  <p>Ese es el ciclo basico de Docker.</p>
                </div>
              </section>

              <section className={styles.section} id="industry">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Por que Docker cambio la industria</h3>
                    <p className={styles.sub}>De servidores diferentes a imagenes reproducibles.</p>
                  </div>
                  <span className={styles.chip}>Produccion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Antes</h4>
                  <pre>{oldWorldSnippet}</pre>
                  <h4>Ahora</h4>
                  <pre>{newWorldSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>despliegues mas simples</li>
                    <li>mas reproducibilidad</li>
                    <li>menos errores</li>
                  </ul>
                  <div className={styles.callout}>Por eso Kubernetes existe sobre contenedores.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como cambia la mentalidad backend</h3>
                    <p className={styles.sub}>Docker responde una pregunta mas grande que deploy.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior pregunta</h4>
                  <pre>{juniorQuestionSnippet}</pre>
                  <h4>Backend senior pregunta</h4>
                  <pre>{seniorQuestionSnippet}</pre>
                  <div className={styles.quote}>Docker responde esa pregunta.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Error tipico</h3>
                    <p className={styles.sub}>Pensar que un contenedor es un servidor.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{wrongIdeaSnippet}</pre>
                  <p>No. El contenedor debe ser:</p>
                  <pre>{ephemeralSnippet}</pre>
                  <p>Porque Kubernetes los crea y destruye constantemente.</p>
                  <div className={styles.callout}>Este cambio mental sera importante en las proximas clases.</div>
                </div>
              </section>

              <section className={styles.section} id="next">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Que aprenderemos despues</h3>
                    <p className={styles.sub}>Ahora que tienes el mapa basico, toca construir imagenes reales.</p>
                  </div>
                  <span className={styles.chip}>Ruta</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ya entiendes:</p>
                  <pre>{nextConceptsSnippet}</pre>
                  <p>La siguiente clase sera:</p>
                  <pre>{nextClassSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>multi-stage builds</li>
                    <li>imagenes pequenas</li>
                    <li>optimizacion</li>
                    <li>seguridad</li>
                    <li>buenas practicas reales</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Visualizar el ciclo completo de Docker.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>10 min</span>
                </div>
                <div className={styles.sbd}>
                  <p>Toma una API .NET que conozcas.</p>
                  <h4>Paso 1</h4>
                  <p>Identifica:</p>
                  <pre>{executionNeedsSnippet}</pre>
                  <h4>Paso 2</h4>
                  <p>Imagina empaquetarlo todo dentro de una imagen.</p>
                  <h4>Paso 3</h4>
                  <p>Pregunta:</p>
                  <pre>{portabilityQuestionSnippet}</pre>
                  <p>Si la respuesta es si, acabas de entender el principal valor de Docker.</p>

                  <h4>Nivel 2</h4>
                  <p>Instala Docker, si aun no lo tienes, y ejecuta:</p>
                  <pre>{levelTwoSnippet}</pre>

                  <div className={styles.quote}>
                    Docker no sirve solo para ejecutar aplicaciones. Sirve para ejecutarlas de forma consistente en
                    cualquier entorno.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/90">
                      ← Dia 90
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
                  <p>Dia 91 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> Docker empaqueta una app con su entorno para ejecutarla igual en
                  distintos lugares.
                </div>
                <div className={styles.li}>
                  <strong>Distincion:</strong> Dockerfile es receta, imagen es plantilla y contenedor es instancia viva.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> pensar que un contenedor es un servidor permanente.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> corre nginx, inspecciona logs, detiene el contenedor y elimina la instancia.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
