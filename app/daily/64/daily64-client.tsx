"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error comun" },
  { id: "risks", label: "4) Riesgos" },
  { id: "mindset", label: "5) Mentalidad backend" },
  { id: "validation", label: "6) Validacion" },
  { id: "dotnet", label: "7) .NET" },
  { id: "webhooks", label: "8) Webhooks" },
  { id: "resilience", label: "9) Resiliencia" },
  { id: "certificates", label: "10) Certificados" },
  { id: "testing", label: "11) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const invalidExternalDataSnippet = `{
  "price": null
}`;

const fakeWebhookSnippet = `{
  "paymentStatus": "PAID"
}`;

const badDotnetSnippet = `var response = await client.GetAsync(url);

var dto = JsonSerializer.Deserialize<Response>(content);

Process(dto);`;

const betterDotnetSnippet = `if (dto == null)
    throw new Exception("Respuesta invalida");

if (dto.Price <= 0)
    throw new Exception("Precio invalido");`;

const webhookExampleSnippet = `Stripe -> tu backend`;

const unsafeWebhookSnippet = `paymentStatus = PAID`;

const slowExternalApiSnippet = `API externa tarda 30 segundos`;

const unsafeCertificateSnippet = `ServerCertificateCustomValidationCallback =
    (msg, cert, chain, errors) => true;`;

const miniProjectEndpointSnippet = `Tu backend llama:
POST https://payments.com/api/pay`;

const miniProjectRisksSnippet = `nulls
timeouts
respuesta manipulada
certificado falso`;

const miniProjectProtectionsSnippet = `validacion
timeouts
firma
logging`;

export default function Daily64Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/63";
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
            <Link className={styles.btn} href="/daily/63">
              <span className={styles.kbd}>←</span> Dia 63
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
                <div className={styles.createdAt}>09/05/2026</div>
                <div className={styles.badge}>Daily #64 • Backend Foundations</div>
                <h2 className={styles.title}>Seguridad en integraciones externas y APIs de terceros</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Integraciones</span>
                  <span className={styles.chip}>Tag: Webhooks</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                </div>

                <p className={styles.lead}>
                  Las APIs externas tambien son input no confiable: valida respuestas, autentica webhooks y controla
                  timeouts antes de depender de ellas.
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
                    <p className={styles.sub}>Muchos backends modernos hablan con otros sistemas.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Tu backend puede depender de APIs externas, webhooks, gateways de pago, servicios cloud o microservicios.</p>
                  <div className={styles.callout}>Nunca confies completamente en sistemas externos.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Una integracion externa conecta tu backend con otro sistema.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Integracion externa: comunicacion entre tu backend y otro sistema externo mediante HTTP, APIs,
                    mensajes o webhooks.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Asumir que una respuesta externa es correcta solo por venir de otra API.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>&quot;Si viene de otra API, debe ser correcto&quot; es un error peligroso.</div>
                </div>
              </section>

              <section className={styles.section} id="risks">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Que riesgos aparecen</h3>
                    <p className={styles.sub}>Los fallos externos pueden romper tu sistema si los aceptas sin control.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Datos invalidos</h4>
                  <pre>{invalidExternalDataSnippet}</pre>
                  <p>Si tu sistema no lo espera, puede explotar.</p>

                  <h4>Datos manipulados</h4>
                  <pre>{fakeWebhookSnippet}</pre>
                  <p>Si confias ciegamente en un webhook falso, puedes abrir la puerta a fraude.</p>

                  <h4>Timeouts</h4>
                  <p>Si una API externa tarda demasiado, tu backend queda esperando, ocupa recursos y se degrada.</p>

                  <h4>Certificados inseguros</h4>
                  <p>Aceptar cualquier certificado HTTPS expone el sistema a riesgo MITM (Man-in-the-Middle).</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No basta con recibir una respuesta: hay que decidir si es confiable.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;la API respondio&quot;.</li>
                    <li>Si: &quot;puedo confiar en esta respuesta?&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="validation">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Validacion de respuestas externas</h3>
                    <p className={styles.sub}>Una respuesta externa debe pasar controles antes de afectar tu dominio.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <p>Siempre deberias validar:</p>
                  <ul className={styles.bullets}>
                    <li>nulls</li>
                    <li>formatos</li>
                    <li>tipos</li>
                    <li>rangos</li>
                    <li>estados esperados</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>Consumir una API no significa que su payload ya sea valido.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{badDotnetSnippet}</pre>
                  <p>Asume que todo es valido.</p>

                  <h4>Mejor enfoque</h4>
                  <pre>{betterDotnetSnippet}</pre>

                  <div className={styles.callout}>Los datos externos tambien son input no confiable.</div>
                </div>
              </section>

              <section className={styles.section} id="webhooks">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Webhooks</h3>
                    <p className={styles.sub}>Los webhooks son especialmente sensibles porque entran a tu sistema.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Critico</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Ejemplo</h4>
                  <pre>{webhookExampleSnippet}</pre>

                  <h4>Error critico</h4>
                  <pre>{unsafeWebhookSnippet}</pre>
                  <p>Aceptar ese estado sin verificar origen puede generar fraude.</p>

                  <h4>Correcto</h4>
                  <ul className={styles.bullets}>
                    <li>validar firma del webhook</li>
                    <li>validar origen</li>
                    <li>validar autenticidad</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="resilience">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Timeout y resiliencia</h3>
                    <p className={styles.sub}>Una dependencia lenta puede degradar todo tu backend.</p>
                  </div>
                  <span className={styles.chip}>Resiliencia</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{slowExternalApiSnippet}</pre>
                  <p>Tu backend puede quedar bloqueado esperando esa respuesta.</p>

                  <h4>Buenas practicas</h4>
                  <ul className={styles.bullets}>
                    <li>timeouts</li>
                    <li>retries controlados</li>
                    <li>circuit breakers</li>
                    <li>fallbacks</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="certificates">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Certificados inseguros</h3>
                    <p className={styles.sub}>Desactivar validacion TLS puede ser comodo en desarrollo y peligroso en produccion.</p>
                  </div>
                  <span className={styles.chip}>TLS</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Error tipico</h4>
                  <pre>{unsafeCertificateSnippet}</pre>
                  <p>Esto es extremadamente peligroso en produccion.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Busca exceso de confianza en respuestas, webhooks y transporte.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Validan respuestas externas?</li>
                    <li>Manejan nulls y errores?</li>
                    <li>Los webhooks validan firma?</li>
                    <li>Hay timeouts?</li>
                    <li>Aceptan cualquier certificado?</li>
                  </ul>

                  <div className={styles.quote}>
                    Tu sistema es tan seguro como la confianza que entrega a otros sistemas.
                  </div>

                  <p>Muchas veces el problema viene de afuera: integraciones, dependencias y confianza excesiva.</p>
                  <div className={styles.callout}>
                    Una API externa no es segura por defecto. Es otro input que debes controlar.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Pensar una integracion como superficie de ataque.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Identificar riesgos y protecciones en una integracion externa.</p>

                  <h4>Escenario</h4>
                  <pre>{miniProjectEndpointSnippet}</pre>

                  <h4>Paso 1 - Pregunta</h4>
                  <p>Que podria salir mal?</p>

                  <h4>Paso 2 - Lista riesgos</h4>
                  <pre>{miniProjectRisksSnippet}</pre>

                  <h4>Paso 3 - Protecciones</h4>
                  <pre>{miniProjectProtectionsSnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>Estoy confiando demasiado en sistemas externos?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>APIs externas tambien fallan.</li>
                    <li>Integraciones son superficies de ataque.</li>
                    <li>Confianza excesiva rompe sistemas.</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que integracion de tu sistema seria mas peligrosa si fuera comprometida?</li>
                    <li>Validas realmente sus respuestas?</li>
                  </ul>

                  <div className={styles.quote}>Backend junior consume APIs. Backend senior desconfia de ellas.</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
