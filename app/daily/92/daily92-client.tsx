"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "dockerfile", label: "2) Dockerfile" },
  { id: "beginner", label: "3) Principiante" },
  { id: "multistage", label: "4) Multi-stage" },
  { id: "real", label: "5) Real" },
  { id: "benefits", label: "6) Beneficios" },
  { id: "copy", label: "7) COPY" },
  { id: "cache", label: "8) Cache" },
  { id: "ignore", label: "9) .dockerignore" },
  { id: "env", label: "10) Env" },
  { id: "user", label: "11) Usuario" },
  { id: "exclude", label: "12) No incluir" },
  { id: "mindset", label: "13) Mentalidad" },
  { id: "production", label: "14) Produccion" },
  { id: "kubernetes", label: "15) Kubernetes" },
  { id: "project", label: "Practica" },
] as const;

const previousModelSnippet = `Dockerfile
↓
Image
↓
Container`;

const worksSnippet = `que funcione`;

const worksWellSnippet = `que funcione bien`;

const minimalDockerfileSnippet = `FROM nginx`;

const beginnerDockerfileSnippet = `FROM mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet build
RUN dotnet publish -c Release

CMD ["dotnet", "MyApi.dll"]`;

const sdkSnippet = `SDK`;

const runtimeSnippet = `Runtime`;

const multistageDockerfileSnippet = `FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

COPY --from=build /publish .

ENTRYPOINT ["dotnet", "MyApi.dll"]`;

const compileSnippet = `compilar`;

const runSnippet = `ejecutar`;

const finalImageSnippet = `solo runtime`;

const sizeSnippet = `1.2 GB
↓
200 MB`;

const copyAllSnippet = `COPY . .`;

const changedFileSnippet = `un archivo`;

const copyProjectSnippet = `COPY *.csproj .`;

const restoreSnippet = `RUN dotnet restore`;

const cacheDockerfileSnippet = `COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish`;

const restoreCachedSnippet = `restore reutilizado`;

const gitignoreSnippet = `.gitignore`;

const dockerignoreSnippet = `bin/
obj/
.git/
.vscode/`;

const unnecessaryTrashSnippet = `basura innecesaria`;

const badSecretSnippet = `ENV DB_PASSWORD=123456`;

const runtimeSecretSnippet = `docker run -e DB_PASSWORD=xxxx`;

const rootSnippet = `root`;

const nonRootSnippet = `RUN adduser appuser

USER appuser`;

const juniorSnippet = `quiero que construya`;

const seniorSnippet = `quiero que construya rapido
sea pequena
sea segura
sea reproducible`;

const productionDockerfileSnippet = `FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY *.sln .
COPY src/MyApi/*.csproj ./src/MyApi/

RUN dotnet restore

COPY . .

RUN dotnet publish src/MyApi \\
-c Release \\
-o /publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

COPY --from=build /publish .

USER 1001

ENTRYPOINT ["dotnet", "MyApi.dll"]`;

const dockerImagesSnippet = `imagenes Docker`;

const kubernetesHappySnippet = `Dockerfile bueno
=
Kubernetes feliz`;

const seniorQuestionsSnippet = `es pequena?
es segura?
es reproducible?
es rapida de construir?`;

const compileNeedsSnippet = `que se necesita para compilar`;

const executeNeedsSnippet = `que se necesita para ejecutar`;

const splitQuestionSnippet = `puedo separar ambas cosas?`;

const stagesSnippet = `build stage
runtime stage`;

const finalReflectionSnippet = `la imagen final deberia contener unicamente lo necesario para ejecutar`;

export default function Daily92Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/91";
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
            <Link className={styles.btn} href="/daily/91">
              <span className={styles.kbd}>←</span> Dia 91
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
                <div className={styles.createdAt}>06/06/2026</div>
                <div className={styles.badge}>Daily #92 • Docker Production</div>
                <h2 className={styles.title}>Dockerfiles reales en produccion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dockerfile</span>
                  <span className={styles.chip}>Tag: Multi-stage</span>
                  <span className={styles.chip}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Produccion</span>
                </div>

                <p className={styles.lead}>
                  Un Dockerfile profesional no busca solo que la aplicacion arranque: busca imagenes pequenas, seguras,
                  reproducibles y rapidas de construir.
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
                    <p className={styles.sub}>Construir una imagen real es distinto a hacer que algo funcione.</p>
                  </div>
                  <span className={styles.chip}>Criterio</span>
                </div>
                <div className={styles.sbd}>
                  <p>En la clase anterior vimos:</p>
                  <pre>{previousModelSnippet}</pre>
                  <p>Pero todavia falta una pregunta importante: como se construye una imagen de verdad para produccion?</p>
                  <h4>Una cosa es</h4>
                  <pre>{worksSnippet}</pre>
                  <h4>Otra muy distinta es</h4>
                  <pre>{worksWellSnippet}</pre>
                  <div className={styles.callout}>Hoy vamos a construir Dockerfiles que podrian terminar en produccion.</div>
                </div>
              </section>

              <section className={styles.section} id="dockerfile">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un Dockerfile realmente</h3>
                    <p className={styles.sub}>Un archivo de instrucciones para construir una imagen.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Este es un Dockerfile valido:</p>
                  <pre>{minimalDockerfileSnippet}</pre>
                  <p>Pero para backend normalmente necesitamos mucho mas.</p>
                </div>
              </section>

              <section className={styles.section} id="beginner">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Dockerfile tipico de principiante</h3>
                    <p className={styles.sub}>Funciona, pero arrastra demasiadas cosas a produccion.</p>
                  </div>
                  <span className={styles.chip}>Anti-patron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{beginnerDockerfileSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>imagen enorme</li>
                    <li>incluye SDK completo</li>
                    <li>build lento</li>
                    <li>mas superficie de ataque</li>
                  </ul>
                  <div className={styles.callout}>Funcionar no es suficiente.</div>
                </div>
              </section>

              <section className={styles.section} id="multistage">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Multi-stage builds</h3>
                    <p className={styles.sub}>Probablemente la tecnica mas importante en Docker para backend.</p>
                  </div>
                  <span className={styles.chip}>Patron</span>
                </div>
                <div className={styles.sbd}>
                  <p>Para compilar necesitas:</p>
                  <pre>{sdkSnippet}</pre>
                  <p>Pero para ejecutar solo necesitas:</p>
                  <pre>{runtimeSnippet}</pre>
                  <p>Entonces, por que llevar el SDK a produccion?</p>
                  <div className={styles.quote}>No deberias.</div>
                </div>
              </section>

              <section className={styles.section} id="real">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Dockerfile multi-stage</h3>
                    <p className={styles.sub}>Una fase compila y otra fase ejecuta.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{multistageDockerfileSnippet}</pre>
                  <h4>Primera fase</h4>
                  <pre>{compileSnippet}</pre>
                  <h4>Segunda fase</h4>
                  <pre>{runSnippet}</pre>
                  <p>La imagen final contiene:</p>
                  <pre>{finalImageSnippet}</pre>
                  <div className={styles.callout}>Mucho mas pequena.</div>
                </div>
              </section>

              <section className={styles.section} id="benefits">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Beneficios reales</h3>
                    <p className={styles.sub}>Menos peso, menos riesgo y despliegues mas rapidos.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{sizeSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>menor superficie de ataque</li>
                    <li>menor tiempo de descarga</li>
                    <li>menor tiempo de despliegue</li>
                    <li>menor coste</li>
                  </ul>
                  <div className={styles.quote}>Por eso casi todas las imagenes modernas usan multi-stage.</div>
                </div>
              </section>

              <section className={styles.section} id="copy">
                <div className={styles.shd}>
                  <div>
                    <h3>7. COPY inteligente</h3>
                    <p className={styles.sub}>El orden de instrucciones afecta el cache y el tiempo de build.</p>
                  </div>
                  <span className={styles.chip}>Cache</span>
                </div>
                <div className={styles.sbd}>
                  <p>Un error comun es hacer esto al principio:</p>
                  <pre>{copyAllSnippet}</pre>
                  <p>Si cambias:</p>
                  <pre>{changedFileSnippet}</pre>
                  <p>Docker invalida capas y reconstruye demasiado.</p>
                  <h4>Mejor enfoque</h4>
                  <pre>{copyProjectSnippet}</pre>
                  <pre>{restoreSnippet}</pre>
                  <pre>{copyAllSnippet}</pre>
                  <div className={styles.callout}>Resultado: Docker reutiliza cache y los builds son mas rapidos.</div>
                </div>
              </section>

              <section className={styles.section} id="cache">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como funciona el cache</h3>
                    <p className={styles.sub}>Docker construye por capas.</p>
                  </div>
                  <span className={styles.chip}>Capas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{cacheDockerfileSnippet}</pre>
                  <p>Si solo cambias codigo:</p>
                  <pre>{restoreCachedSnippet}</pre>
                  <div className={styles.quote}>Entender las capas mejora mucho los tiempos de build.</div>
                </div>
              </section>

              <section className={styles.section} id="ignore">
                <div className={styles.shd}>
                  <div>
                    <h3>9. .dockerignore</h3>
                    <p className={styles.sub}>Es parecido a .gitignore, pero para el contexto de Docker.</p>
                  </div>
                  <span className={styles.chip}>Higiene</span>
                </div>
                <div className={styles.sbd}>
                  <p>Parecido a:</p>
                  <pre>{gitignoreSnippet}</pre>
                  <p>Ejemplo:</p>
                  <pre>{dockerignoreSnippet}</pre>
                  <p>Si no existe, Docker puede copiar:</p>
                  <pre>{unnecessaryTrashSnippet}</pre>
                  <div className={styles.callout}>Siempre usa .dockerignore.</div>
                </div>
              </section>

              <section className={styles.section} id="env">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Variables de entorno</h3>
                    <p className={styles.sub}>Los secretos nunca pertenecen a la imagen.</p>
                  </div>
                  <span className={styles.chip}>Secretos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Malo</h4>
                  <pre>{badSecretSnippet}</pre>
                  <h4>Mejor</h4>
                  <pre>{runtimeSecretSnippet}</pre>
                  <div className={styles.quote}>Secretos nunca dentro de la imagen.</div>
                </div>
              </section>

              <section className={styles.section} id="user">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Usuario root</h3>
                    <p className={styles.sub}>Otro error comun en imagenes de backend.</p>
                  </div>
                  <span className={styles.chip}>Seguridad</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchas imagenes ejecutan como:</p>
                  <pre>{rootSnippet}</pre>
                  <p>Si la aplicacion es comprometida, el atacante gana privilegios elevados dentro del contenedor.</p>
                  <h4>Mejor</h4>
                  <pre>{nonRootSnippet}</pre>
                  <div className={styles.callout}>Es una buena practica de seguridad.</div>
                </div>
              </section>

              <section className={styles.section} id="exclude">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Que NO debe contener una imagen</h3>
                    <p className={styles.sub}>Menos contenido es menor riesgo.</p>
                  </div>
                  <span className={styles.chip}>Superficie</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>contrasenas</li>
                    <li>secrets</li>
                    <li>certificados privados</li>
                    <li>archivos temporales</li>
                    <li>logs</li>
                    <li>codigo fuente innecesario</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Como piensa un backend senior</h3>
                    <p className={styles.sub}>No basta con construir.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Backend junior</h4>
                  <pre>{juniorSnippet}</pre>
                  <h4>Backend senior</h4>
                  <pre>{seniorSnippet}</pre>
                  <div className={styles.callout}>Esa es la diferencia.</div>
                </div>
              </section>

              <section className={styles.section} id="production">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Dockerfile real de produccion</h3>
                    <p className={styles.sub}>Simplificado, pero ya tiene forma profesional.</p>
                  </div>
                  <span className={styles.chip}>Produccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{productionDockerfileSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>multi-stage</li>
                    <li>cache optimizado</li>
                    <li>runtime separado</li>
                    <li>usuario no root</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="kubernetes">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Relacion con Kubernetes</h3>
                    <p className={styles.sub}>Kubernetes no despliega codigo.</p>
                  </div>
                  <span className={styles.chip}>Plataforma</span>
                </div>
                <div className={styles.sbd}>
                  <p>Kubernetes despliega:</p>
                  <pre>{dockerImagesSnippet}</pre>
                  <pre>{kubernetesHappySnippet}</pre>
                  <p>Lo que hagas en el Dockerfile impacta todo lo demas.</p>
                  <h4>Alguien senior pregunta</h4>
                  <pre>{seniorQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto</h3>
                    <p className={styles.sub}>Analizar una API .NET desde la perspectiva de Docker.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>15 min</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1</h4>
                  <pre>{compileNeedsSnippet}</pre>
                  <h4>Paso 2</h4>
                  <pre>{executeNeedsSnippet}</pre>
                  <h4>Paso 3</h4>
                  <pre>{splitQuestionSnippet}</pre>
                  <h4>Paso 4</h4>
                  <pre>{stagesSnippet}</pre>
                  <h4>Paso 5</h4>
                  <pre>{finalReflectionSnippet}</pre>
                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Cuanto pesa tu imagen actual?</li>
                    <li>Esta usando multi-stage build?</li>
                    <li>Corre como root?</li>
                    <li>Tiene .dockerignore?</li>
                    <li>Contiene secretos?</li>
                  </ul>
                  <div className={styles.quote}>
                    Backend junior crea imagenes que funcionan. Backend senior crea imagenes pequenas, seguras,
                    reproducibles y preparadas para produccion.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/91">
                      ← Dia 91
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
                  <p>Dia 92 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> una imagen profesional debe ser pequena, segura, reproducible y rapida de
                  construir.
                </div>
                <div className={styles.li}>
                  <strong>Dockerfile:</strong> usa multi-stage para separar build y runtime.
                </div>
                <div className={styles.li}>
                  <strong>Cache:</strong> copia primero archivos de proyecto, restaura dependencias y despues copia el
                  resto.
                </div>
                <div className={styles.li}>
                  <strong>Seguridad:</strong> no metas secretos y evita correr como root.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
