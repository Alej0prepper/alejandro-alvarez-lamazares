import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import shell from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "GitHub Actions - Tests automáticos",
  description:
    "Clase práctica sobre GitHub Actions, tests automáticos, servicios efímeros y protección de la rama develop.",
};

const workflow = [
  "name: Backend tests",
  "",
  "on:",
  "  push:",
  "    branches:",
  "      - develop",
  "      - 'release/**'",
  "  pull_request:",
  "    branches:",
  "      - develop",
  "",
  "jobs:",
  "  tests:",
  "    runs-on: ubuntu-latest",
  "",
  "    services:",
  "      postgres:",
  "        image: postgres:17",
  "        env:",
  "          POSTGRES_USER: postgres",
  "          POSTGRES_PASSWORD: postgres",
  "          POSTGRES_DB: app_test",
  "        ports:",
  "          - 5432:5432",
  "        options: >-",
  "          --health-cmd \"pg_isready -U postgres -d app_test\"",
  "          --health-interval 10s",
  "          --health-timeout 5s",
  "          --health-retries 5",
  "",
  "      mongo:",
  "        image: mongo:8",
  "        ports:",
  "          - 27017:27017",
  "",
  "      redis:",
  "        image: redis:7",
  "        ports:",
  "          - 6379:6379",
  "",
  "    steps:",
  "      - name: Descargar código",
  "        uses: actions/checkout@v4",
  "",
  "      - name: Instalar .NET",
  "        uses: actions/setup-dotnet@v4",
  "        with:",
  "          dotnet-version: '10.0.x'",
  "",
  "      - name: Restaurar dependencias",
  "        run: dotnet restore",
  "",
  "      - name: Compilar proyecto",
  "        run: dotnet build --no-restore --configuration Release",
  "",
  "      - name: Ejecutar tests unitarios",
  "        run: dotnet test Tests/unit/common-store-admin-api.Tests/common-store-admin-api.Tests.csproj --no-build --configuration Release",
  "",
  "      - name: Ejecutar tests de integración",
  "        run: dotnet test Tests/integration/common-store-admin-api.IntegrationTests/common-store-admin-api.IntegrationTests.csproj --no-build --configuration Release",
  "",
  "      - name: Publicar resultados y cobertura",
  "        if: always()",
  "        uses: actions/upload-artifact@v4",
  "        with:",
  "          name: test-results",
  "          path: |",
  "            **/TestResults/**",
  "            **/coverage/**",
].join("\n");

const basicWorkflow = [
  "name: Tests",
  "",
  "on:",
  "  push:",
  "    branches:",
  "      - develop",
  "  pull_request:",
  "    branches:",
  "      - develop",
  "",
  "jobs:",
  "  tests:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - name: Descargar código",
  "        uses: actions/checkout@v4",
  "      - name: Instalar .NET",
  "        uses: actions/setup-dotnet@v4",
  "        with:",
  "          dotnet-version: '10.0.x'",
  "      - name: Restaurar dependencias",
  "        run: dotnet restore",
  "      - name: Compilar proyecto",
  "        run: dotnet build --no-restore --configuration Release",
  "      - name: Ejecutar tests",
  "        run: dotnet test --no-build --configuration Release",
].join("\n");

const commands = [
  "git add .github/workflows/tests.yml",
  "git commit -m \"ci: add automated tests\"",
  "git push",
].join("\n");

const testCommand =
  "dotnet test Tests/unit/common-store-admin-api.Tests/common-store-admin-api.Tests.csproj";

const tocItems = [
  ["idea", "La idea clave"],
  ["workflow", "El workflow"],
  ["services", "Servicios efímeros"],
  ["copy", "Copiar a otro repo"],
  ["quality", "Quality gate"],
  ["debug", "Cuando falla"],
  ["practice", "Práctica"],
  ["checklist", "Checklist"],
] as const;

function LessonSection({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionNumber}>{number}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export default function GithubTestingPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={styles.hero}>
          <div>
            <p className={shell.kicker}>Clase práctica · CI/CD</p>
            <h1>GitHub Actions y tests automáticos</h1>
            <p className={shell.subtitle}>
              Cómo convertir cada push y cada Pull Request en una verificación repetible de la salud del backend.
            </p>
            <div className={shell.tags}>
              <span>GitHub Actions</span>
              <span>.NET 10</span>
              <span>PostgreSQL</span>
              <span>MongoDB</span>
              <span>Redis</span>
            </div>
          </div>
          <div className={styles.heroAside}>
            <span className={styles.eyebrow}>Resultado de la clase</span>
            <strong>Un Pull Request con evidencia automática</strong>
            <span>Tests · build · servicios · reportes</span>
          </div>
        </header>

        <div className={styles.actions}>
          <Link href="/" className={shell.button}>
            Volver al inicio
          </Link>
          <Link href="#idea" className={shell.buttonPrimary}>
            Empezar la clase ↓
          </Link>
        </div>

        <nav className={styles.toc} aria-label="Índice de la clase">
          {tocItems.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <article className={styles.article}>
          <LessonSection
            id="idea"
            number="01"
            title="La idea más sencilla"
            description="El repositorio puede comprobarse solo, cada vez que cambia."
          >
            <p>
              GitHub tiene una herramienta llamada <strong>GitHub Actions</strong>. Esta herramienta permite que, cada
              vez que alguien sube código o crea un Pull Request, GitHub ejecute automáticamente los tests del proyecto.
            </p>
            <div className={styles.callout}>
              <strong>La promesa:</strong> el mismo comando que usamos en local queda ejecutándose en un entorno limpio,
              sin depender de que alguien recuerde lanzarlo manualmente.
            </div>
            <div className={styles.flow} aria-label="Flujo de integración continua">
              <div><b>01</b><span>Push / PR</span></div>
              <i>→</i>
              <div><b>02</b><span>Actions</span></div>
              <i>→</i>
              <div><b>03</b><span>Build + tests</span></div>
              <i>→</i>
              <div className={styles.flowOk}><b>04</b><span>Check</span></div>
            </div>
            <p>En este repositorio, la configuración vive en:</p>
            <pre>.github/workflows/backend-tests.yml</pre>
          </LessonSection>

          <LessonSection
            id="workflow"
            number="02"
            title="Qué le dice el workflow a GitHub"
            description="Un archivo YAML describe los eventos, la máquina, los servicios y los comandos."
          >
            <div className={styles.twoColumns}>
              <div>
                <h3>Cuándo se ejecuta</h3>
                <ul>
                  <li>Cuando se hace <code>push</code> a <code>develop</code>.</li>
                  <li>Cuando se hace <code>push</code> a una rama <code>release</code>.</li>
                  <li>Cuando se crea un Pull Request hacia <code>develop</code>.</li>
                </ul>
              </div>
              <div>
                <h3>Qué ejecuta</h3>
                <ul>
                  <li>Descarga el código y prepara .NET 10.</li>
                  <li>Restaura dependencias y compila en Release.</li>
                  <li>Ejecuta unit tests e integration tests.</li>
                  <li>Conserva resultados y cobertura.</li>
                </ul>
              </div>
            </div>
            <pre>{workflow}</pre>
            <div className={styles.explainGrid}>
              <div><code>on</code><span>Define los eventos que disparan el workflow.</span></div>
              <div><code>jobs</code><span>Agrupa el trabajo que GitHub debe realizar.</span></div>
              <div><code>runs-on</code><span>Elige la máquina virtual, aquí Ubuntu.</span></div>
              <div><code>steps</code><span>Lista las acciones y comandos en orden.</span></div>
            </div>
          </LessonSection>

          <LessonSection
            id="services"
            number="03"
            title="Por qué aparecen PostgreSQL, MongoDB y Redis"
            description="Los tests de integración necesitan dependencias reales para comprobar el flujo completo."
          >
            <p>
              Un test unitario suele aislar una clase o una función. Un test de integración, en cambio, verifica que
              varias piezas colaboran: API, persistencia, caché, serialización y reglas de infraestructura.
            </p>
            <div className={styles.serviceGrid}>
              <div><span className={styles.serviceDot}>●</span><strong>PostgreSQL</strong><p>Relaciones, migraciones y consultas SQL.</p></div>
              <div><span className={`${styles.serviceDot} ${styles.dotOrange}`}>●</span><strong>MongoDB</strong><p>Documentos y persistencia no relacional.</p></div>
              <div><span className={`${styles.serviceDot} ${styles.dotRed}`}>●</span><strong>Redis</strong><p>Caché, locks, sesiones o colas.</p></div>
            </div>
            <p>
              GitHub los levanta como <strong>servicios temporales</strong> dentro de la ejecución. No son las bases de
              datos de producción: empiezan limpias y desaparecen al terminar el job.
            </p>
            <div className={styles.calloutWarning}>
              <strong>Importante:</strong> la aplicación debe usar los mismos hosts, puertos, usuarios y nombres de
              base de datos que declara el workflow. Si no coinciden, el test fallará aunque el código esté bien.
            </div>
          </LessonSection>

          <LessonSection
            id="copy"
            number="04"
            title="Cómo copiarlo a otro repositorio"
            description="Empieza por una versión mínima y adapta después la infraestructura real del proyecto."
          >
            <p>En el otro repositorio hay que crear esta estructura:</p>
            <pre>{[
              ".github/",
              "└── workflows/",
              "    └── tests.yml",
            ].join("\n")}</pre>
            <p>Dentro de <code>tests.yml</code> se coloca una configuración similar a esta:</p>
            <pre>{basicWorkflow}</pre>
            <p>Después se sube el archivo a GitHub:</p>
            <pre>{commands}</pre>
            <div className={styles.note}>
              <strong>Adaptación obligatoria:</strong> los nombres de las carpetas, los proyectos <code>.csproj</code>,
              la versión de .NET, las variables de entorno y los comandos <code>dotnet test</code> deben cambiarse según
              la estructura del nuevo repositorio.
            </div>
          </LessonSection>

          <LessonSection
            id="quality"
            number="05"
            title="De ejecutar tests a proteger la rama"
            description="El valor de CI aparece cuando el resultado influye en la decisión de hacer merge."
          >
            <div className={styles.statusCompare}>
              <div className={styles.statusPassed}><span>✓</span><div><strong>Tests — Passed</strong><p>El cambio supera los checks configurados.</p></div></div>
              <div className={styles.statusFailed}><span>!</span><div><strong>Tests — Failed</strong><p>Hay que corregir o investigar antes de mezclar.</p></div></div>
            </div>
            <p>
              Desde <strong>Settings → Branches → Branch protection rules</strong> se puede activar:
            </p>
            <ul>
              <li><strong>Require a pull request before merging.</strong></li>
              <li><strong>Require status checks to pass before merging.</strong></li>
            </ul>
            <p>
              Así, nadie podrá hacer merge a <code>develop</code> mientras los tests estén fallando. El check deja de
              ser una sugerencia y se convierte en una regla del equipo.
            </p>
          </LessonSection>

          <LessonSection
            id="debug"
            number="06"
            title="Cómo leer un fallo"
            description="Un check rojo es una señal; el log indica en qué capa está el problema."
          >
            <div className={styles.debugTable}>
              <div><strong>Falla restore</strong><span>Dependencia, feed privado o archivo de solución.</span></div>
              <div><strong>Falla build</strong><span>Compilación, SDK incorrecto o warnings tratados como errores.</span></div>
              <div><strong>Falla unit test</strong><span>Regresión en lógica aislada o test desactualizado.</span></div>
              <div><strong>Falla integration test</strong><span>Servicio, conexión, migración, datos o configuración.</span></div>
              <div><strong>Timeout / conexión</strong><span>El servicio no está healthy, el puerto no coincide o falta espera.</span></div>
            </div>
            <p>
              Para investigar, abre el job en la pestaña <strong>Actions</strong> y sigue la primera causa real, no solo
              el último error mostrado.
            </p>
            <pre>{[
              "1. ¿Qué job falló?",
              "2. ¿Qué step fue el primero en fallar?",
              "3. ¿Es un error de código o de entorno?",
              "4. ¿Se reproduce con el mismo comando en local?",
              "5. ¿El log contiene secretos que debamos ocultar?",
            ].join("\n")}</pre>
            <p>
              Si un servicio requiere inicialización adicional, el workflow puede esperar a su health check, ejecutar
              migraciones o preparar datos de prueba antes de lanzar <code>dotnet test</code>.
            </p>
          </LessonSection>

          <LessonSection
            id="practice"
            number="07"
            title="Práctica guiada"
            description="Construye el pipeline en pequeños pasos para saber qué aporta cada parte."
          >
            <ol className={styles.steps}>
              <li><span>01</span><div><strong>Descubre los comandos oficiales.</strong><p>Confirma cómo se restaura, compila y ejecuta la suite en local.</p></div></li>
              <li><span>02</span><div><strong>Haz pasar el build.</strong><p>Configura checkout, setup-dotnet, restore y build antes de añadir bases de datos.</p></div></li>
              <li><span>03</span><div><strong>Añade los unit tests.</strong><p>Comprueba que el check puede detectar una regresión rápida y determinista.</p></div></li>
              <li><span>04</span><div><strong>Levanta los servicios.</strong><p>Incorpora PostgreSQL, MongoDB y Redis solo si la suite los necesita.</p></div></li>
              <li><span>05</span><div><strong>Añade integración y artefactos.</strong><p>Guarda resultados incluso cuando el test falle con <code>if: always()</code>.</p></div></li>
            </ol>
            <p>El comando que prueba los unit tests en este proyecto de ejemplo es:</p>
            <pre>{testCommand}</pre>
            <div className={styles.callout}>
              La pipeline debe ser una versión automatizada de la forma correcta de trabajar en local, no un conjunto de
              comandos desconocidos.
            </div>
          </LessonSection>

          <LessonSection
            id="checklist"
            number="08"
            title="Checklist final"
            description="Antes de dar la clase por terminada, verifica estas piezas."
          >
            <div className={styles.checklist}>
              <label><input type="checkbox" /> El workflow está dentro de <code>.github/workflows/</code>.</label>
              <label><input type="checkbox" /> Los eventos apuntan a las ramas correctas.</label>
              <label><input type="checkbox" /> La versión del SDK coincide con el proyecto.</label>
              <label><input type="checkbox" /> Restore, build y test funcionan con la configuración del repositorio.</label>
              <label><input type="checkbox" /> Los servicios tienen puertos, credenciales y health checks coherentes.</label>
              <label><input type="checkbox" /> Unit tests e integration tests están separados y visibles.</label>
              <label><input type="checkbox" /> Los resultados y la cobertura se guardan como artefactos.</label>
              <label><input type="checkbox" /> La rama <code>develop</code> exige los checks antes del merge.</label>
            </div>
            <div className={styles.finalQuote}>
              <span>Idea que te llevas</span>
              <p>Un pipeline no solo ejecuta tests: convierte la calidad en una conversación objetiva antes de integrar código.</p>
            </div>
          </LessonSection>
        </article>

        <footer className={styles.footer}>
          <span>GitHub Actions · backend-knowledge-lab</span>
          <Link href="#idea">Volver arriba ↑</Link>
        </footer>
      </section>
    </main>
  );
}
