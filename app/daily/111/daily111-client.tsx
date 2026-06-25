"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "what", label: "2) Dockerizar" },
  { id: "dockerfile", label: "3) Dockerfile" },
  { id: "build", label: "4) Multi-stage" },
  { id: "env", label: "5) Variables" },
  { id: "compose", label: "6) Docker Compose" },
  { id: "network", label: "7) Red" },
  { id: "persistence", label: "8) Persistencia" },
  { id: "health", label: "9) Health Check" },
  { id: "checklist", label: "10) Checklist" },
  { id: "mistakes", label: "11) Errores comunes" },
  { id: "kubernetes", label: "12) Camino a K8s" },
  { id: "takeaway", label: "13) Cierre" },
] as const;

const dockerfileSnippet = `FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "OrderFlow.Api.dll"]`;

const envSnippet = `ConnectionStrings__DefaultConnection=Host=db;Port=5432;Database=orderflow;Username=postgres;Password=postgres
ASPNETCORE_ENVIRONMENT=Production
JWT__Secret=super-secret-key`;

const composeSnippet = `services:
  api:
    build: .
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Host=db;Port=5432;Database=orderflow;Username=postgres;Password=postgres
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data`;

const networkSnippet = `Host=db

NO:
localhost`;

const persistenceSnippet = `volumes:
  pgdata:`;

const healthSnippet = `GET /health`;

const checklistSnippet = `[x] La API compila
[x] Las migraciones funcionan
[x] No hay dependencias locales
[x] Variables externas
[x] Secrets fuera del codigo
[x] appsettings limpios`;

const mistakeSnippet = `appsettings.Development.json
hardcodear strings
usar localhost entre contenedores
no usar volumenes`;

const takeawaySnippet = `Docker no arregla problemas del proyecto.
Los hace reproducibles.`;

export default function Daily111Client() {
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
              <div className={styles.brandSub}>Dockerización de la API • portable • reproducible</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/110">
              <span className={styles.kbd}>←</span> Clase anterior
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/112">
              Siguiente clase <span className={styles.kbd}>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>25/06/2026</div>
                <div className={styles.badge}>
                  Daily #111 • Dockerización
                </div>
                <h2 className={styles.title}>
                  Dockerización de la API: convertir un proyecto de desarrollo en una aplicación portable
                </h2>
                <p className={styles.lead}>
                  La meta no es meter la API en un contenedor: es empaquetarla para que funcione igual en cualquier
                  entorno, con configuración externa, dependencias claras y un punto de arranque reproducible.
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
                    <p className={styles.sub}>Una API local funciona. Una API portable funciona igual fuera de tu máquina.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Docker existe para eliminar el clásico &quot;en mi máquina funciona&quot; y volver el entorno predecible.
                  </div>
                  <ul className={styles.bullets}>
                    <li>La API depende de runtime, base de datos, variables y configuración.</li>
                    <li>La imagen debe viajar entre máquinas sin cambiar el comportamiento.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="what">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Qué significa dockerizar</h3>
                    <p className={styles.sub}>Empaquetar la aplicación junto con todo lo necesario para ejecutarla.</p>
                  </div>
                  <span className={styles.chip}>Base</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{`Código + Runtime + Configuración + Dependencias = Imagen Docker`}</pre>
                  <ul className={styles.bullets}>
                    <li>No dockerizamos Visual Studio.</li>
                    <li>Dockerizamos OrderFlow API.</li>
                    <li>La imagen es el artefacto que viaja entre entornos.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dockerfile">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El Dockerfile</h3>
                    <p className={styles.sub}>La receta que define cómo construir, publicar y arrancar la aplicación.</p>
                  </div>
                  <span className={styles.chip}>Build</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Describe la construcción de la imagen.</li>
                    <li>Separa el proceso de build del runtime final.</li>
                  </ul>
                  <pre>{dockerfileSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="build">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Multi-stage build</h3>
                    <p className={styles.sub}>Compilar en una fase y ejecutar en otra reduce el tamaño de la imagen.</p>
                  </div>
                  <span className={styles.chip}>Optimización</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Fase 1: SDK completo para compilar.</li>
                    <li>Fase 2: runtime mínimo para ejecutar.</li>
                    <li>Producción solo necesita ejecutar, no compilar.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="env">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Variables de entorno</h3>
                    <p className={styles.sub}>La configuración cambia entre entornos; la imagen no.</p>
                  </div>
                  <span className={styles.chip}>Config</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No hardcodear connection strings ni secretos.</li>
                    <li>La configuración debe venir del entorno.</li>
                  </ul>
                  <pre>{envSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="compose">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Docker Compose</h3>
                    <p className={styles.sub}>Levantar API y PostgreSQL con un solo comando.</p>
                  </div>
                  <span className={styles.chip}>Orquestación</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>API + PostgreSQL suelen vivir juntos en desarrollo.</li>
                    <li>Mañana pueden sumarse Redis o RabbitMQ.</li>
                  </ul>
                  <pre>{composeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="network">
                <div className={styles.shd}>
                  <div>
                    <h3>7. La red entre contenedores</h3>
                    <p className={styles.sub}>Dentro de Docker no se usa localhost para hablar entre servicios.</p>
                  </div>
                  <span className={styles.chip}>Networking</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Usá el nombre del servicio: Host=db, no Host=localhost.</div>
                  <pre>{networkSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="persistence">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Persistencia</h3>
                    <p className={styles.sub}>Contenedor y datos no son lo mismo.</p>
                  </div>
                  <span className={styles.chip}>Volúmenes</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Si borrás el contenedor sin volumen, perdés la base de datos.</li>
                    <li>Con volumen, los datos sobreviven al ciclo del contenedor.</li>
                  </ul>
                  <pre>{persistenceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Health Check</h3>
                    <p className={styles.sub}>No basta con que el proceso exista: tiene que responder bien.</p>
                  </div>
                  <span className={styles.chip}>Salud</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>La API debería exponer /health.</li>
                    <li>Docker y Kubernetes usan esta señal para tomar decisiones.</li>
                  </ul>
                  <pre>{healthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Qué revisar antes de dockerizar</h3>
                    <p className={styles.sub}>La imagen no arregla problemas previos: los vuelve reproducibles.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{checklistSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>La API compila.</li>
                    <li>Las migraciones funcionan.</li>
                    <li>No hay dependencias locales críticas.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mistakes">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Errores comunes</h3>
                    <p className={styles.sub}>Los fallos típicos aparecen antes de llegar a producción.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Usar appsettings.Development.json en producción.</li>
                    <li>Subir secretos al repositorio.</li>
                    <li>Usar localhost para conectar contenedores.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="kubernetes">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Camino a Kubernetes</h3>
                    <p className={styles.sub}>Docker no es el objetivo final, pero sí el paso obligatorio.</p>
                  </div>
                  <span className={styles.chip}>Infra</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Docker produce imágenes.</li>
                    <li>Kubernetes consume imágenes.</li>
                    <li>Primero portable, después orquestable.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>La dockerización buena no agrega magia, agrega reproducibilidad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>{takeawaySnippet}</div>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/110">
                      Clase anterior
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/112">
                      Siguiente clase
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
                  <p>Lo esencial para pasar del proyecto local a una app portable.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Imagen:</strong> build multi-stage con runtime mínimo.
                </div>
                <div className={styles.li}>
                  <strong>Entorno:</strong> variables externas, no hardcode.
                </div>
                <div className={styles.li}>
                  <strong>Red:</strong> entre contenedores, usar el nombre del servicio.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
