"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "problem", label: "2) Problema" },
  { id: "definition", label: "3) Definicion" },
  { id: "dns", label: "4) DNS interno" },
  { id: "without", label: "5) Sin discovery" },
  { id: "with", label: "6) Con discovery" },
  { id: "kubernetes", label: "7) Kubernetes" },
  { id: "balance", label: "8) Balanceo" },
  { id: "failure", label: "9) Fallos" },
  { id: "mistake", label: "10) Error" },
  { id: "outside", label: "11) Fuera de K8s" },
  { id: "gateway", label: "12) Gateway" },
  { id: "health", label: "13) Health checks" },
  { id: "orderflow", label: "14) OrderFlow" },
  { id: "architecture", label: "15) Arquitectura" },
  { id: "thinking", label: "16) Mentalidad" },
  { id: "exercise", label: "17) Ejercicio" },
  { id: "closing", label: "18) Cierre" },
] as const;

const ideaSnippet = `¿Como encuentra el Gateway
al Product Service?

¿Como encuentra Order Service
a Payment Service?`;

const podChangeSnippet = `Payment Service
IP: 10.1.5.12

Kubernetes reinicia Payment

Nueva IP: 10.1.9.44

Order Service sigue llamando:
10.1.5.12`;

const definitionSnippet = `Service Discovery

Mecanismo mediante el cual un servicio
encuentra automaticamente a otro
sin conocer su direccion fisica.`;

const nameSnippet = `No:
http://10.1.5.12

Si:
http://payment-service`;

const dnsSnippet = `google.com
↓
DNS
↓
142.xxx.xxx.xxx`;

const withoutSnippet = `Order
↓
10.1.5.12

Si cambia la IP:
todo deja de funcionar`;

const withSnippet = `Order
↓
payment-service
↓
Kubernetes resuelve:
10.1.9.44`;

const kubernetesSnippet = `Service:
payment-service

Cualquier Pod puede llamar:
http://payment-service`;

const balanceSnippet = `payment-service

Payment Pod 1
Payment Pod 2
Payment Pod 3`;

const failureSnippet = `Pod 2
↓
Crash

Service deja de enviar trafico alli

Kubernetes crea Pod 4

Service empieza a usarlo`;

const mistakeSnippet = `Payment = 10.1.5.12

Funciona...
hasta que el contenedor reinicia.`;

const outsideSnippet = `Consul
Eureka
ZooKeeper`;

const gatewaySnippet = `Frontend
↓
Gateway
↓
Orders
Products
Payments`;

const healthSnippet = `Readiness Probe falla
↓
Service deja de enviar trafico`;

const orderflowSnippet = `Gateway
↓
Orders
↓
Payments
↓
Products`;

const orderflowCallSnippet = `No:
http://10.1.5.12

Si:
http://payment-service`;

const badArchitectureSnippet = `services.json

Payment=10.1.5.12
Inventory=10.1.5.20`;

const thinkingSnippet = `Backend junior:
¿A que IP me conecto?

Backend senior:
¿Quien resolvera automaticamente
la ubicacion del servicio?`;

const exerciseSnippet = `identity-service
product-service
order-service
payment-service
notification-service`;

const closingSnippet = `Los servicios no conocen direcciones IP.
Conocen nombres.

La infraestructura resuelve automaticamente
donde esta cada instancia.`;

export default function Daily119Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/118";
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
              <div className={styles.brandSub}>Service Discovery en microservicios</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/calendar">
              Calendario
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/118">
              <span className={styles.kbd}>←</span> Dia 118
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/daily/120">
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
                <div className={styles.createdAt}>03/07/2026</div>
                <div className={styles.badge}>Daily #119 • Service Discovery</div>
                <h2 className={styles.title}>
                  Service Discovery: como encuentran los microservicios a otros microservicios
                </h2>
                <p className={styles.lead}>
                  En un cluster moderno las IPs cambian constantemente. Los servicios deben conocerse por nombre y dejar
                  que la infraestructura resuelva la instancia correcta.
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
                    <p className={styles.sub}>El Gateway y los servicios tambien necesitan encontrar a otros servicios.</p>
                  </div>
                  <span className={styles.chip}>Discovery</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <div className={styles.callout}>Ese problema lo resuelve Service Discovery.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema</h3>
                    <p className={styles.sub}>Guardar una IP funciona solo hasta que Kubernetes mueve el Pod.</p>
                  </div>
                  <span className={styles.chip}>IPs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{podChangeSnippet}</pre>
                  <div className={styles.quote}>El servicio existe, pero nadie sabe donde esta.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que es Service Discovery</h3>
                    <p className={styles.sub}>Encontrar servicios sin conocer su direccion fisica.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{definitionSnippet}</pre>
                  <pre>{nameSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dns">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como un DNS interno</h3>
                    <p className={styles.sub}>El concepto es parecido a resolver un dominio publico.</p>
                  </div>
                  <span className={styles.chip}>DNS</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dnsSnippet}</pre>
                  <div className={styles.callout}>Service Discovery hace eso dentro del cluster.</div>
                </div>
              </section>

              <section className={styles.section} id="without">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Sin Service Discovery</h3>
                    <p className={styles.sub}>Una dependencia directa a una IP vuelve fragil todo el flujo.</p>
                  </div>
                  <span className={styles.chip}>Fragil</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{withoutSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="with">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Con Service Discovery</h3>
                    <p className={styles.sub}>La aplicacion llama un nombre estable.</p>
                  </div>
                  <span className={styles.chip}>Robusto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{withSnippet}</pre>
                  <div className={styles.quote}>La aplicacion nunca conoce la IP real.</div>
                </div>
              </section>

              <section className={styles.section} id="kubernetes">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Quien lo hace en Kubernetes</h3>
                    <p className={styles.sub}>Los Kubernetes Services son la base del discovery dentro del cluster.</p>
                  </div>
                  <span className={styles.chip}>K8s</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{kubernetesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="balance">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Balanceo de carga</h3>
                    <p className={styles.sub}>Un Service puede apuntar a varias replicas sanas.</p>
                  </div>
                  <span className={styles.chip}>Balance</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{balanceSnippet}</pre>
                  <div className={styles.callout}>El cliente no decide a que Pod ir; el Service distribuye el trafico.</div>
                </div>
              </section>

              <section className={styles.section} id="failure">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Que pasa si un Pod muere</h3>
                    <p className={styles.sub}>La lista de destinos cambia automaticamente.</p>
                  </div>
                  <span className={styles.chip}>HA</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failureSnippet}</pre>
                  <div className={styles.quote}>Eso aporta alta disponibilidad sin cambiar codigo.</div>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Error tipico</h3>
                    <p className={styles.sub}>Guardar direcciones IP en codigo o configuracion estatica.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mistakeSnippet}</pre>
                  <div className={styles.callout}>Nunca dependas de IPs. Usa nombres de servicio.</div>
                </div>
              </section>

              <section className={styles.section} id="outside">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Fuera de Kubernetes</h3>
                    <p className={styles.sub}>La idea no es exclusiva de Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Registro</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{outsideSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Registran que servicios existen.</li>
                    <li>Indican donde estan.</li>
                    <li>Marcan cuales estan vivos.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="gateway">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Relacion con API Gateway</h3>
                    <p className={styles.sub}>El Gateway tambien es cliente de otros servicios.</p>
                  </div>
                  <span className={styles.chip}>Gateway</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{gatewaySnippet}</pre>
                  <div className={styles.quote}>El Gateway tampoco deberia tener IPs configuradas.</div>
                </div>
              </section>

              <section className={styles.section} id="health">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Relacion con Health Checks</h3>
                    <p className={styles.sub}>Solo deberian descubrirse destinos saludables.</p>
                  </div>
                  <span className={styles.chip}>Health</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{healthSnippet}</pre>
                  <div className={styles.callout}>Esto conecta directamente con readiness probes.</div>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>14. OrderFlow</h3>
                    <p className={styles.sub}>Un servicio llama a otro por nombre, no por direccion fisica.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                  <pre>{orderflowCallSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="architecture">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Error de arquitectura</h3>
                    <p className={styles.sub}>Configurar IPs fijas rompe la elasticidad del cluster.</p>
                  </div>
                  <span className={styles.chip}>Arquitectura</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badArchitectureSnippet}</pre>
                  <div className={styles.quote}>Kubernetes cambia continuamente la infraestructura.</div>
                </div>
              </section>

              <section className={styles.section} id="thinking">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Mentalidad senior</h3>
                    <p className={styles.sub}>Ya no pensamos en maquinas; pensamos en servicios.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{thinkingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Mini ejercicio</h3>
                    <p className={styles.sub}>Piensa como se comunican servicios dentro de Kubernetes.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{exerciseSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Que nombre usaria order-service para llamar a payment-service?</li>
                    <li>Que ocurre si payment-service cambia de Pod?</li>
                    <li>Quien balancea peticiones entre replicas?</li>
                    <li>Que pasa si una replica falla el Readiness Probe?</li>
                    <li>Por que nunca deberias guardar una IP fija en codigo?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>18. Cierre</h3>
                    <p className={styles.sub}>Los servicios usan nombres; la infraestructura resuelve ubicaciones.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/118">
                      <span className={styles.kbd}>←</span> Dia 118
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/120">
                      Siguiente <span className={styles.kbd}>→</span>
                    </Link>
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
