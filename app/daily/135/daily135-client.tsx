"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "bounded-context", label: "2) Bounded Context" },
  { id: "hospital", label: "3) Ejemplo" },
  { id: "orderflow", label: "4) OrderFlow" },
  { id: "discover", label: "5) Descubrir limites" },
  { id: "error-tables", label: "6) Error tablas" },
  { id: "error-crud", label: "7) Error CRUD" },
  { id: "error-db", label: "8) Error base compartida" },
  { id: "contexts", label: "9) Contextos" },
  { id: "ownership", label: "10) Propiedad de datos" },
  { id: "communication", label: "11) Comunicacion" },
  { id: "dependencies", label: "12) Dependencias" },
  { id: "stays-together", label: "13) Lo que sigue junto" },
  { id: "deliverable", label: "14) Entregable" },
  { id: "validation", label: "15) Validacion" },
  { id: "next", label: "16) Siguiente paso" },
  { id: "closing", label: "17) Cierre" },
] as const;

const ideaSnippet = `Ayer definimos:
que debe hacer el sistema
como demostrar que funciona

Hoy definimos:
donde cortar OrderFlow

Pregunta clave:
donde termina una responsabilidad
y empieza la siguiente?

Microservicios
no se dividen
por tablas
ni por carpetas.`;

const centralIdeaSnippet = `Los microservicios
no se dividen
por entidades
ni por tablas.

Se dividen
por capacidades del negocio.`;

const boundedContextSnippet = `Bounded Context
proviene de DDD.

Es un limite claro
dentro del cual
un conjunto de conceptos
tiene un significado unico
y consistente.

En simple:
una parte del negocio
con responsabilidades propias
reglas propias
y datos propios.`;

const hospitalSnippet = `Hospital

Urgencias
Laboratorio
Radiologia
Farmacia
Administracion

Todos hablan del paciente
pero no significan
exactamente lo mismo.

Farmacia:
medicamentos
dosis
alergias

Administracion:
seguro
facturacion
documentacion`;

const orderflowSnippet = `Catalog
productos
categorias
marcas
precios actuales

Orders
ordenes
items
totales
estados

Payments
cobrar
reembolsar
intentos
referencias externas

Inventory
stock
reservas
disponibilidad

Notifications
mensajes
plantillas
destinatarios`;

const discoverSnippet = `Preguntas utiles:

1. Que problema del negocio resuelve?
2. Que datos controla exclusivamente?
3. Que reglas pertenecen solo aqui?
4. Que cambios evolucionan juntos?
5. Que equipo podria ser responsable?

Si no puedes responderlas
el limite aun no esta claro.`;

const errorTablesSnippet = `Mal enfoque:
Product Service
Category Service
Brand Service
Price Service

Resultado:
Product
↓
Category
↓
Brand
↓
Price

Convertimos relaciones en memoria
en llamadas de red.

Mas latencia
mas complejidad
mas fallos
sin mas valor.`;

const errorCrudSnippet = `Otro error:
separar por CRUD

Users API
Products API
Orders API

Pero el negocio habla de:
Confirmar compra
Procesar pago
Reservar inventario
Cancelar pedido

Los verbos del negocio
valen mas que las tablas.`;

const errorDbSnippet = `Error frecuente:
varios servicios
con la misma base de datos

Catalog
Orders
Payments
Inventory
↓
MISMA DB

Regla:
un servicio nunca modifica
directamente
las tablas de otro servicio.`;

const contextsSnippet = `Contextos propuestos:

Catalog
- Products
- Categories
- Brands
- Prices
- eventos: ProductCreated ProductUpdated PriceChanged

Orders
- Orders
- OrderItems
- OrderStatus
- eventos: OrderCreated OrderConfirmed OrderCompleted

Inventory
- Stock
- Reservas
- Movimientos
- eventos: InventoryReserved InventoryReleased

Payments
- PaymentAttempts
- Refunds
- ProviderTransactions
- eventos: PaymentApproved PaymentRejected

Notifications
- Templates
- EmailQueue
- DeliveryStatus
- eventos: EmailSent EmailFailed`;

const ownershipSnippet = `Orders puede necesitar:
nombre del producto
precio

Pero no controla Catalog.

Por eso guarda
una copia historica.

Duplicar lectura historica
no rompe el principio.

Lo rompe
modificar directamente
los datos de otro contexto.`;

const communicationSnippet = `Como colaboran?

Si necesito respuesta inmediata:
REST

Si necesito saber
que algo ocurrio:
Evento

Ejemplos:
Consultar producto -> REST
Orden completada -> Evento

Nunca:
SELECT * FROM Catalog.Products`;

const dependenciesSnippet = `Evitar:
Orders
↓
Inventory
↓
Payments
↓
Catalog
↓
Orders

Preferir:
Gateway
↓
Orders
↓
RabbitMQ
↓
Inventory
↓
Payments
↓
Notifications`;

const staysTogetherSnippet = `No todo se separa.

Dentro de Catalog
siguen juntos:
Productos
Categorias
Marcas

Porque evolucionan juntos.

Separarlos
anade complejidad
sin beneficio.`;

const deliverableSnippet = `docs/orderflow/SERVICE_BOUNDARIES.md

Por cada servicio:
Nombre
Responsabilidad
Datos propios
Endpoints
Eventos publicados
Eventos consumidos
Lo que no debe hacer

Eso fuerza limites claros
antes de extraer codigo.`;

const validationSnippet = `Buen limite si:

Tiene responsabilidad clara
Es dueno de sus datos
Puede desplegarse solo
Puede escalar solo
Puede tener equipo responsable
Puede cambiar sin romper todo

Si la mayoria es si
el corte probablemente sirve.`;

const nextSnippet = `Orden de migracion:
Extraer Catalog
↓
Extraer Orders
↓
Extraer Inventory
↓
Extraer Payments
↓
Agregar RabbitMQ
↓
Agregar Outbox
↓
Agregar Saga

Migracion gradual.
Nunca todo a la vez.`;

const closingSnippet = `Backend junior:
cada tabla sera un microservicio

Backend senior:
que responsabilidad representa?
que datos controla?
que reglas viven aqui?
que cambios evolucionan juntos?

Primero entiende el negocio.
Despues deja que la arquitectura
refleje esos limites.`;

export default function Daily135Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/134";
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
              <div className={styles.brandSub}>Bounded contexts y limites correctos para OrderFlow</div>
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
            <Link className={styles.btn} href="/daily/134">
              <span className={styles.kbd}>←</span> Dia 134
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/calendar">
              Ver calendario <span className={styles.kbd}>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>19/07/2026</div>
                <div className={styles.badge}>Daily #135 • Bounded Contexts</div>
                <h2 className={styles.title}>Identificando los Bounded Contexts: donde cortar OrderFlow correctamente</h2>
                <p className={styles.lead}>
                  Esta clase define los limites de servicio correctos para OrderFlow. El objetivo no es repartir
                  tablas, sino separar capacidades del negocio con datos, reglas y responsabilidades propias.
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
                    <p className={styles.sub}>Antes de extraer microservicios, hay que decidir bien donde hacer el corte.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ideaSnippet}</pre>
                  <pre>{centralIdeaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="bounded-context">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un Bounded Context</h3>
                    <p className={styles.sub}>El limite correcto aparece cuando conceptos, reglas y datos mantienen un significado consistente.</p>
                  </div>
                  <span className={styles.chip}>DDD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{boundedContextSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="hospital">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo fuera del software</h3>
                    <p className={styles.sub}>Un mismo concepto cambia de significado segun el contexto que lo usa.</p>
                  </div>
                  <span className={styles.chip}>Ejemplo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{hospitalSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="orderflow">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Aplicandolo a OrderFlow</h3>
                    <p className={styles.sub}>Catalog, Orders, Payments, Inventory y Notifications no resuelven el mismo problema.</p>
                  </div>
                  <span className={styles.chip}>OrderFlow</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderflowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="discover">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como descubrir un buen limite</h3>
                    <p className={styles.sub}>Las preguntas correctas exponen responsabilidad, propiedad y evolucion conjunta.</p>
                  </div>
                  <span className={styles.chip}>Analisis</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{discoverSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="error-tables">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Error numero uno: separar por tablas</h3>
                    <p className={styles.sub}>Dividir por entidades convierte relaciones simples en demasiadas llamadas de red.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorTablesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="error-crud">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Error numero dos: separar por CRUD</h3>
                    <p className={styles.sub}>El negocio no piensa en CRUD, piensa en acciones con significado real.</p>
                  </div>
                  <span className={styles.chip}>CRUD</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorCrudSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="error-db">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Error numero tres: compartir base de datos</h3>
                    <p className={styles.sub}>Separar servicios sin separar propiedad de datos no resuelve el problema arquitectonico.</p>
                  </div>
                  <span className={styles.chip}>DB</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{errorDbSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="contexts">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Contextos propuestos para OrderFlow</h3>
                    <p className={styles.sub}>Cada servicio se define por su responsabilidad, sus datos y los eventos que emite.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{contextsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ownership">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Quien es dueno de que</h3>
                    <p className={styles.sub}>Copiar datos historicos no es lo mismo que invadir el control de otro contexto.</p>
                  </div>
                  <span className={styles.chip}>Ownership</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{ownershipSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="communication">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Comunicacion entre contextos</h3>
                    <p className={styles.sub}>La colaboracion se hace por contratos, no por SQL cruzado ni tablas compartidas.</p>
                  </div>
                  <span className={styles.chip}>Contratos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{communicationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dependencies">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Mapa de dependencias</h3>
                    <p className={styles.sub}>La arquitectura debe evitar ciclos y conocer solo las dependencias estrictamente necesarias.</p>
                  </div>
                  <span className={styles.chip}>Dependencias</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dependenciesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="stays-together">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Lo que todavia permanece junto</h3>
                    <p className={styles.sub}>No todo merece un servicio separado. Algunas piezas cambian y viven naturalmente juntas.</p>
                  </div>
                  <span className={styles.chip}>Pragmatismo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{staysTogetherSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="deliverable">
                <div className={styles.shd}>
                  <div>
                    <h3>14. Documento del dia</h3>
                    <p className={styles.sub}>La separacion empieza documentando responsabilidades y fronteras, no creando proyectos vacios.</p>
                  </div>
                  <span className={styles.chip}>Entregable</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{deliverableSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="validation">
                <div className={styles.shd}>
                  <div>
                    <h3>15. Como validar si el corte es bueno</h3>
                    <p className={styles.sub}>Un buen limite permite propiedad clara, despliegue independiente y cambios sin arrastrar a todos.</p>
                  </div>
                  <span className={styles.chip}>Validacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{validationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="next">
                <div className={styles.shd}>
                  <div>
                    <h3>16. Que implementaremos despues</h3>
                    <p className={styles.sub}>La migracion sera secuencial y reversible, no una ruptura masiva de la aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Roadmap</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{nextSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="closing">
                <div className={styles.shd}>
                  <div>
                    <h3>17. Cierre</h3>
                    <p className={styles.sub}>Primero se entiende el negocio y sus limites. Despues se decide si esos limites merecen servicios.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{closingSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/134">
                      <span className={styles.kbd}>←</span> Dia 134
                    </Link>
                    <Link className={styles.btn} href="/calendar">
                      Ver calendario
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
