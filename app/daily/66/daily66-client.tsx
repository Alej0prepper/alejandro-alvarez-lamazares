"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "danger", label: "3) Por que es peligroso" },
  { id: "mistake", label: "4) Error comun" },
  { id: "risks", label: "5) Riesgos" },
  { id: "mindset", label: "6) Mentalidad backend" },
  { id: "dotnet", label: "7) .NET" },
  { id: "size", label: "8) Tamano maximo" },
  { id: "rename", label: "9) Nombre seguro" },
  { id: "path-traversal", label: "10) Path traversal" },
  { id: "practices", label: "11) Buenas practicas" },
  { id: "testing", label: "12) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const renamedFileSnippet = `virus.exe

foto.jpg`;

const hugeFileSnippet = `10GB upload`;

const dangerousExtensionsSnippet = `.exe
.bat
.sh
.php`;

const fakeMimeSnippet = `image/jpeg`;

const traversalSnippet = `../../../appsettings.json`;

const badDotnetSnippet = `var path = "/uploads/" + file.FileName;

await file.CopyToAsync(stream);`;

const betterDotnetSnippet = `var extension = Path.GetExtension(file.FileName);

var allowed = new[] { ".jpg", ".png", ".pdf" };

if (!allowed.Contains(extension.ToLower()))
{
    throw new Exception("Tipo invalido");
}`;

const sizeLimitSnippet = `if (file.Length > 5 * 1024 * 1024)
{
    throw new Exception("Archivo demasiado grande");
}`;

const innocentFileNameSnippet = `foto.jpg`;

const unsafePathSnippet = `var path = "/uploads/" + file.FileName;`;

const combinedUnsafePathSnippet = `/uploads/../../../appsettings.json`;

const duplicateNameSnippet = `contract.pdf`;

const dangerousCharactersSnippet = `<script>
../../
\\
/
:
unicode raro`;

const sensitiveFileNameSnippet = `passport_alejandro_alvarez.pdf`;

const safeFileNameSnippet = `var fileName = Guid.NewGuid() + extension;`;

const safeFileResultSnippet = `a81f2c9e-3f11-4e4f-bb2a.pdf`;

const fakeExtensionSnippet = `virus.exe.jpg`;

const duplicateUploadSnippet = `contract.pdf
contract.pdf`;

const webRootSnippet = `wwwroot/uploads`;

const uploadEndpointSnippet = `POST /upload`;

const miniProjectRisksSnippet = `archivo enorme
extension falsa
malware
path traversal
nombre duplicado
MIME falso`;

const miniProjectProtectionsSnippet = `size limit
allowed extensions
new filename
safe path
content validation
rate limit`;

export default function Daily66Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/65";
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
            <Link className={styles.btn} href="/daily/65">
              <span className={styles.kbd}>←</span> Dia 65
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
                <div className={styles.createdAt}>11/05/2026</div>
                <div className={styles.badge}>Daily #66 • Backend Foundations</div>
                <h2 className={styles.title}>Seguridad en uploads y manejo de archivos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Uploads</span>
                  <span className={styles.chip}>Tag: Archivos</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Subir archivos parece simple, pero en backend es una superficie de ataque seria: recibes bytes,
                  nombres y metadatos que no debes confiar.
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
                    <p className={styles.sub}>Subir archivos es una entrada binaria controlada por el usuario.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Un upload mal controlado puede comprometer estabilidad, datos o filesystem.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>File Upload Security controla lo que entra antes de guardarlo o procesarlo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    File Upload Security: conjunto de validaciones y controles para evitar que archivos subidos
                    comprometan el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="danger">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que es peligroso</h3>
                    <p className={styles.sub}>Un archivo puede abusar recursos, formatos, nombres y procesamiento.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Un archivo puede ser:</p>
                  <ul className={styles.bullets}>
                    <li>enorme</li>
                    <li>falso</li>
                    <li>ejecutable</li>
                    <li>malicioso</li>
                    <li>manipulado</li>
                  </ul>
                  <p>El backend debe manejarlo sin romperse.</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El error mas comun</h3>
                    <p className={styles.sub}>Confiar en la extension como si demostrara el contenido real.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>&quot;Si tiene extension .jpg, es una imagen&quot; es un error grave.</div>
                  <p>Usuario sube un ejecutable y lo renombra:</p>
                  <pre>{renamedFileSnippet}</pre>
                  <p>Si solo validas extension, tienes un problema.</p>
                </div>
              </section>

              <section className={styles.section} id="risks">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Que riesgos existen</h3>
                    <p className={styles.sub}>Uploads mezclan riesgo de DoS, ejecucion, path traversal y malware.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Archivos enormes</h4>
                  <pre>{hugeFileSnippet}</pre>
                  <p>Consume RAM, disco y ancho de banda. Puede causar DoS.</p>

                  <h4>2) Extensiones peligrosas</h4>
                  <pre>{dangerousExtensionsSnippet}</pre>
                  <p>Riesgo de ejecucion de codigo o abuso del servidor.</p>

                  <h4>3) MIME type falso</h4>
                  <p>Header dice:</p>
                  <pre>{fakeMimeSnippet}</pre>
                  <p>Pero realmente no es una imagen. El MIME tambien puede ser manipulado.</p>

                  <h4>4) Path Traversal</h4>
                  <pre>{traversalSnippet}</pre>
                  <p>Puede intentar salir de la carpeta permitida.</p>

                  <h4>5) Malware</h4>
                  <p>Archivos infectados o preparados para explotar sistemas que los procesan.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No piensa en archivos bonitos; piensa en bytes no confiables.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;el usuario subio un archivo&quot;.</li>
                    <li>Si: &quot;el usuario me esta enviando bytes no confiables&quot;.</li>
                    <li>Tambien: &quot;el usuario esta intentando influir en mi filesystem&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>El nombre original viene del usuario y no debe construir rutas finales.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{badDotnetSnippet}</pre>
                  <p>Peligroso porque <code>file.FileName</code> viene del usuario.</p>

                  <h4>Problemas</h4>
                  <ul className={styles.bullets}>
                    <li>filename controlado por usuario</li>
                    <li>posible path traversal</li>
                    <li>posible sobrescritura</li>
                    <li>extension no confiable</li>
                    <li>caracteres peligrosos</li>
                  </ul>

                  <h4>Mejor enfoque</h4>
                  <pre>{betterDotnetSnippet}</pre>

                  <div className={styles.callout}>
                    Nunca confies en nombre, extension, MIME ni contenido declarado.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="size">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Tamano maximo</h3>
                    <p className={styles.sub}>Limitar tamano evita abuso por archivos gigantes.</p>
                  </div>
                  <span className={styles.chip}>DoS</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{sizeLimitSnippet}</pre>
                  <p>Sin limite, un upload puede consumir disco, RAM y ancho de banda.</p>
                </div>
              </section>

              <section className={styles.section} id="rename">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Por que cambiarle el nombre al archivo</h3>
                    <p className={styles.sub}>El nombre original tambien es input no confiable.</p>
                  </div>
                  <span className={styles.chip}>Filesystem</span>
                </div>
                <div className={styles.sbd}>
                  <p>El nombre original puede parecer inocente:</p>
                  <pre>{innocentFileNameSnippet}</pre>
                  <p>Pero viene del usuario.</p>

                  <h4>Problema 1 - Path Traversal</h4>
                  <pre>{traversalSnippet}</pre>
                  <p>Si el backend hace:</p>
                  <pre>{unsafePathSnippet}</pre>
                  <p>Puede formar:</p>
                  <pre>{combinedUnsafePathSnippet}</pre>

                  <h4>Problema 2 - Sobrescribir archivos</h4>
                  <pre>{duplicateNameSnippet}</pre>
                  <p>Otro usuario puede subir el mismo nombre y sobrescribir el anterior.</p>

                  <h4>Problema 3 - Caracteres peligrosos</h4>
                  <pre>{dangerousCharactersSnippet}</pre>

                  <h4>Problema 4 - Informacion sensible</h4>
                  <pre>{sensitiveFileNameSnippet}</pre>
                  <p>Puede revelar identidad o datos personales.</p>

                  <h4>Nombre de archivo seguro</h4>
                  <pre>{safeFileNameSnippet}</pre>
                  <p>Resultado:</p>
                  <pre>{safeFileResultSnippet}</pre>

                  <h4>Que logras con eso</h4>
                  <ul className={styles.bullets}>
                    <li>evitas path traversal</li>
                    <li>evitas sobrescritura</li>
                    <li>evitas caracteres peligrosos</li>
                    <li>reduces exposicion de informacion sensible</li>
                    <li>controlas tu el nombre final</li>
                  </ul>

                  <p>
                    Cambiar el nombre no reemplaza validar extension, tamano, MIME, contenido, escaneo malware ni ruta
                    segura.
                  </p>
                </div>
              </section>

              <section className={styles.section} id="path-traversal">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Path Traversal explicado</h3>
                    <p className={styles.sub}>El ataque intenta escribir fuera de la carpeta permitida.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Ataque</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{traversalSnippet}</pre>
                  <p>Por eso debes:</p>
                  <ul className={styles.bullets}>
                    <li>ignorar el nombre original</li>
                    <li>generar nombre nuevo</li>
                    <li>construir rutas con APIs seguras</li>
                    <li>guardar en una carpeta controlada</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="practices">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Buenas practicas</h3>
                    <p className={styles.sub}>Defiende por capas: no hay un unico check suficiente.</p>
                  </div>
                  <span className={styles.chip}>Defensa</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>validar tamano</li>
                    <li>validar extension permitida</li>
                    <li>validar contenido real cuando sea posible</li>
                    <li>generar nombre nuevo</li>
                    <li>no confiar en <code>file.FileName</code></li>
                    <li>guardar fuera del web root si no debe ser publico</li>
                    <li>limitar frecuencia de uploads</li>
                    <li>escanear malware si aplica</li>
                    <li>registrar eventos sospechosos</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Prueba tamano, nombre, extension, MIME y repeticion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Archivo enorme</h4>
                  <p>Lo acepta?</p>

                  <h4>Extension falsa</h4>
                  <pre>{fakeExtensionSnippet}</pre>

                  <h4>Nombre raro</h4>
                  <pre>{traversalSnippet}</pre>

                  <h4>MIME falso</h4>
                  <p>Header dice imagen, pero el contenido no lo es.</p>

                  <h4>Upload repetido</h4>
                  <p>Puedes llenar disco?</p>

                  <h4>Nombre duplicado</h4>
                  <pre>{duplicateUploadSnippet}</pre>
                  <p>Sobrescribe?</p>

                  <h4>Error tipico</h4>
                  <p>Guardar uploads dentro del proyecto web:</p>
                  <pre>{webRootSnippet}</pre>
                  <p>Puede ser peligroso si el servidor sirve o ejecuta archivos desde ahi.</p>

                  <div className={styles.callout}>
                    Un archivo es input arbitrario en formato binario. El filename tambien es input no confiable.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Pensar uploads como superficie de ataque.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Evaluar si un endpoint acepta archivos o realmente los controla.</p>

                  <h4>Endpoint</h4>
                  <pre>{uploadEndpointSnippet}</pre>

                  <h4>Paso 1 - Pregunta</h4>
                  <p>Que podria intentar subir alguien?</p>

                  <h4>Paso 2 - Lista riesgos</h4>
                  <pre>{miniProjectRisksSnippet}</pre>

                  <h4>Paso 3 - Protecciones</h4>
                  <pre>{miniProjectProtectionsSnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>Estoy validando el archivo o solo aceptandolo?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>uploads son peligrosos</li>
                    <li>el filename tambien es input</li>
                    <li>validar extension sola no basta</li>
                    <li>cambiar nombre protege, pero no lo resuelve todo</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu sistema permite uploads?</li>
                    <li>Que pasaria si alguien sube 100 archivos gigantes?</li>
                    <li>Que pasaria si sube <code>../../../appsettings.json</code>?</li>
                    <li>Que pasaria si dos usuarios suben <code>contract.pdf</code>?</li>
                  </ul>

                  <div className={styles.quote}>Backend junior guarda archivos. Backend senior desconfia de ellos.</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
