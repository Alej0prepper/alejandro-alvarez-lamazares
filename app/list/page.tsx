import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import styles from "./list.module.css";

type ProjectRoute = {
  href: string;
  source: string;
};

async function findPageFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name === "api") continue;

    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findPageFiles(entryPath)));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      files.push(entryPath);
    }
  }

  return files;
}

function toProjectRoute(appDirectory: string, filePath: string): ProjectRoute {
  const relativeDirectory = path.dirname(path.relative(appDirectory, filePath));
  const segments = relativeDirectory === "." ? [] : relativeDirectory.split(path.sep);
  const href = `/${segments.join("/")}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

  return { href, source: filePath.replace(`${process.cwd()}${path.sep}`, "") };
}

async function getProjectRoutes(): Promise<ProjectRoute[]> {
  const appDirectory = path.join(process.cwd(), "app");
  const pageFiles = await findPageFiles(appDirectory);

  return pageFiles
    .map((filePath) => toProjectRoute(appDirectory, filePath))
    .sort((a, b) => a.href.localeCompare(b.href, "en", { numeric: true }));
}

export default async function ListPage() {
  const routes = await getProjectRoutes();

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Project routes</p>
            <h1>All URLs</h1>
            <p className={styles.subtitle}>{routes.length} rutas publicas detectadas automaticamente.</p>
          </div>
          <Link href="/profile" className={styles.backLink}>Volver al perfil</Link>
        </header>

        <div className={styles.list}>
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className={styles.route}>
              <span className={styles.path}>{route.href}</span>
              <span className={styles.source}>{route.source}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
