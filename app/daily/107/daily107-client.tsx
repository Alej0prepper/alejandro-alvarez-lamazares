"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mistake", label: "3) Error" },
  { id: "better", label: "4) Mejor" },
  { id: "controller", label: "5) Controller" },
  { id: "dtos", label: "6) DTOs" },
  { id: "mapping", label: "7) Mapping" },
  { id: "responses", label: "8) Respuestas" },
  { id: "validation", label: "9) Validacion" },
  { id: "responsibilities", label: "10) No debe" },
  { id: "result", label: "11) Resultado" },
  { id: "exercise", label: "12) Ejercicio" },
  { id: "final", label: "13) Cierre" },
] as const;

const introSnippet = `Ya tenemos el orden correcto:

Dominio
↓
Repositorios
↓
Application Services

Ahora si aparece HTTP.`;

const controllerRuleSnippet = `El controller no debe contener el negocio.`;

const controllerResponsibilitySnippet = `recibe request
llama service
devuelve response`;

const controllerDefinitionSnippet = `Punto de entrada HTTP que traduce requests externas hacia casos de uso internos.`;

const dtoDefinitionSnippet = `Objeto usado para transportar datos entre la API y el exterior.`;

const keySnippet = `El controller habla HTTP.
El service habla casos de uso.
El dominio habla reglas.`;

const badControllerSnippet = `[HttpPost("{id}/confirm")]
public async Task<IActionResult> Confirm(Guid id)
{
    var order = await _context.Orders
        .Include(x => x.Items)
        .FirstOrDefaultAsync(x => x.Id == id);

    if (order == null)
        return NotFound();

    if (!order.Items.Any())
        return BadRequest("Order empty");

    order.Status = OrderStatus.PendingPayment;

    await _context.SaveChangesAsync();

    return Ok(order);
}`;

const badMixSnippet = `HTTP
EF Core
Reglas de negocio
Persistencia
Respuesta`;

const betterControllerSnippet = `[HttpPost("{id}/confirm")]
public async Task<IActionResult> Confirm(Guid id)
{
    await _orderService.ConfirmOrder(id);

    return NoContent();
}`;

const cleanSnippet = `Mucho mas limpio.`;

const noDecisionSnippet = `El controller no decide si una orden puede confirmarse.`;

const controllerNameSnippet = `OrdersController`;

const endpointsSnippet = `POST /orders
GET /orders
GET /orders/{id}
POST /orders/{id}/items
POST /orders/{id}/confirm
POST /orders/{id}/cancel`;

const requestDtosSnippet = `CreateOrderRequest
AddOrderItemRequest`;

const responseDtosSnippet = `OrderResponse
OrderItemResponse`;

const addItemRequestSnippet = `public class AddOrderItemRequest
{
    public Guid ProductId { get; set; }

    public int Quantity { get; set; }
}`;

const requestMeaningSnippet = `El request representa lo que entra por HTTP.
No representa el dominio completo.`;

const orderResponseSnippet = `public class OrderResponse
{
    public Guid Id { get; set; }

    public string Status { get; set; } = string.Empty;

    public decimal Total { get; set; }

    public List<OrderItemResponse> Items { get; set; } = new();
}`;

const responseMeaningSnippet = `Este DTO controla lo que sale.`;

const noEntitySnippet = `El response no tiene que exponer toda la entidad.`;

const mappingDefinitionSnippet = `Mapping es transformar un objeto de un modelo a otro.`;

const orderToResponseSnippet = `Order → OrderResponse`;

const mappingDecisionSnippet = `No es copiar por copiar.
Es decidir qué datos salen y cómo salen.`;

const mapperSnippet = `OrderMapper`;

const mapperRecommendationSnippet = `Porque mantiene el controller más limpio.`;

const createdSnippet = `201 Created`;

const notFoundSnippet = `404 Not Found`;

const noContentSnippet = `204 No Content`;

const badRequestSnippet = `400 Bad Request`;

const conflictSnippet = `409 Conflict`;

const no500Snippet = `No todo error es 500`;

const errorMeaningSnippet = `fallo inesperado del servidor`;

const expectedErrorsSnippet = `orden no existe
producto no existe
orden vacia
estado invalido`;

const errorMappingSnippet = `qué tipo de error es
qué status HTTP representa
qué mensaje debe ver el cliente`;

const basicValidationSnippet = `Quantity > 0
ProductId valido`;

const preventSnippet = `Esto evita basura entrando al sistema.`;

const responsibilitiesSnippet = `usar DbContext directamente
calcular Total
cambiar Order.Status manualmente
crear Payment directamente
tener reglas de negocio
devolver entidades crudas`;

const mustDoSnippet = `validar request basico
llamar service
mapear respuesta
devolver status HTTP correcto`;

const resultSnippet = `OrdersController
DTOs de Orders
Mapping basico
Responses HTTP coherentes`;

const flowSnippet = `POST /orders
POST /orders/{id}/items
POST /orders/{id}/confirm
GET /orders/{id}`;

const finalReflectionSnippet = `El controller no existe para contener logica.
Existe para traducir HTTP hacia casos de uso.`;

const nextStepSnippet = `Dia 108: Payments`;

const nextTopicsSnippet = `POST /orders/{id}/pay
PendingPayment
Payment
Approved
Paid
SaveChanges una sola vez
Unit of Work`;

export default function Daily107Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/106";
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
            <Link className={styles.pill} href="/profile">
              Perfil
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/106">
              <span className={styles.kbd}>←</span> Dia 106
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
                <div className={styles.createdAt}>21/06/2026</div>
                <div className={styles.badge}>Daily #107 • Controllers y DTOs</div>
                <h2 className={styles.title}>Controllers y DTOs: exponer los casos de uso sin ensuciar la API</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>20 min</span>
                  <span className={styles.chip}>Nivel: Senior</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Controllers</span>
                  <span className={styles.chip}>Tag: DTOs</span>
                  <span className={styles.chip}>Tag: HTTP</span>
                  <span className={styles.chip}>Tag: API</span>
                </div>

                <p className={styles.lead}>
                  El controller es una frontera fina: recibe request, llama service y devuelve response.
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
                    <p className={styles.sub}>Ya tenemos la base interna. Ahora hay que exponerla por HTTP sin mezclar responsabilidades.</p>
                  </div>
                  <span className={styles.chip}>Idea</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{introSnippet}</pre>
                  <div className={styles.callout}>Ahora sí aparece HTTP.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Controller y DTO no hacen lo mismo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{controllerDefinitionSnippet}</pre>
                  <pre>{dtoDefinitionSnippet}</pre>
                  <pre>{keySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun</h3>
                    <p className={styles.sub}>Controllers gordos mezclan HTTP, EF Core, reglas y respuesta.</p>
                  </div>
                  <span className={styles.chip}>Error</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badControllerSnippet}</pre>
                  <pre>{badMixSnippet}</pre>
                  <div className={styles.quote}>Eso es mal diseño.</div>
                </div>
              </section>

              <section className={styles.section} id="better">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Mejor enfoque</h3>
                    <p className={styles.sub}>El controller llama al service y devuelve una respuesta simple.</p>
                  </div>
                  <span className={styles.chip}>Mejor</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{betterControllerSnippet}</pre>
                  <pre>{cleanSnippet}</pre>
                  <pre>{noDecisionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="controller">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Qué controller necesitamos</h3>
                    <p className={styles.sub}>Para este punto, el foco es OrdersController.</p>
                  </div>
                  <span className={styles.chip}>Controller</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{controllerNameSnippet}</pre>
                  <pre>{endpointsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dtos">
                <div className={styles.shd}>
                  <div>
                    <h3>6. DTOs necesarios</h3>
                    <p className={styles.sub}>No devuelvas entidades directamente.</p>
                  </div>
                  <span className={styles.chip}>DTOs</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{requestDtosSnippet}</pre>
                  <pre>{responseDtosSnippet}</pre>
                  <pre>{addItemRequestSnippet}</pre>
                  <pre>{requestMeaningSnippet}</pre>
                  <pre>{orderResponseSnippet}</pre>
                  <pre>{responseMeaningSnippet}</pre>
                  <div className={styles.callout}>{noEntitySnippet}</div>
                </div>
              </section>

              <section className={styles.section} id="mapping">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Mapping</h3>
                    <p className={styles.sub}>Transformar un modelo en otro, no copiar por copiar.</p>
                  </div>
                  <span className={styles.chip}>Mapping</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mappingDefinitionSnippet}</pre>
                  <pre>{orderToResponseSnippet}</pre>
                  <pre>{mappingDecisionSnippet}</pre>
                  <pre>{mapperSnippet}</pre>
                  <pre>{mapperRecommendationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="responses">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Respuestas HTTP esperadas</h3>
                    <p className={styles.sub}>El contrato HTTP debe ser claro y predecible.</p>
                  </div>
                  <span className={styles.chip}>HTTP</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Crear orden</h4>
                  <pre>{createdSnippet}</pre>
                  <h4>Obtener orden inexistente</h4>
                  <pre>{notFoundSnippet}</pre>
                  <h4>Confirmar orden</h4>
                  <pre>{noContentSnippet}</pre>
                  <h4>Agregar item invalido</h4>
                  <pre>{badRequestSnippet}</pre>
                  <h4>Operacion conflictiva</h4>
                  <pre>{conflictSnippet}</pre>
                  <div className={styles.callout}>{no500Snippet}</div>
                </div>
              </section>

              <section className={styles.section} id="validation">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Validaciones basicas</h3>
                    <p className={styles.sub}>El request tambien debe validarse antes de entrar al caso de uso.</p>
                  </div>
                  <span className={styles.chip}>Validacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{basicValidationSnippet}</pre>
                  <pre>{preventSnippet}</pre>
                  <pre>{errorMappingSnippet}</pre>
                  <pre>{errorMeaningSnippet}</pre>
                  <pre>{expectedErrorsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="responsibilities">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Qué no debe hacer el controller</h3>
                    <p className={styles.sub}>Debe ser una capa fina, no una capa de negocio disfrazada.</p>
                  </div>
                  <span className={styles.chip}>Responsabilidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{responsibilitiesSnippet}</pre>
                  <pre>{mustDoSnippet}</pre>
                  <div className={styles.quote}>{controllerRuleSnippet}</div>
                  <pre>{controllerResponsibilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="result">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Resultado esperado</h3>
                    <p className={styles.sub}>Un controller limpio y una API coherente.</p>
                  </div>
                  <span className={styles.chip}>Resultado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{resultSnippet}</pre>
                  <pre>{flowSnippet}</pre>
                  <div className={styles.callout}>Si esta tabla mental queda clara, el contrato HTTP esta bien definido.</div>
                </div>
              </section>

              <section className={styles.section} id="exercise">
                <div className={styles.shd}>
                  <div>
                    <h3>12. Mini ejercicio</h3>
                    <p className={styles.sub}>Arma la tabla de endpoint, service y response esperado.</p>
                  </div>
                  <span className={styles.chip}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.li}>
                    <strong>POST /orders/{`{id}`}/confirm</strong>
                  </div>
                  <pre>→ OrderService.ConfirmOrder(id)</pre>
                  <pre>→ 204 No Content</pre>
                  <div className={styles.callout}>
                    Si no puedes llenar esa tabla, todavia no tienes claro el contrato HTTP.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="final">
                <div className={styles.shd}>
                  <div>
                    <h3>13. Cierre</h3>
                    <p className={styles.sub}>El controller traduce HTTP hacia casos de uso, no al revés.</p>
                  </div>
                  <span className={styles.chip}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{finalReflectionSnippet}</pre>
                  <p>Siguiente paso:</p>
                  <pre>{nextStepSnippet}</pre>
                  <pre>{nextTopicsSnippet}</pre>
                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/106">
                      <span className={styles.kbd}>←</span> Dia 106
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
                  <p>Dia 107 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Foco:</strong> controller fino, DTOs claros y mapping explicito.
                </div>
                <div className={styles.li}>
                  <strong>Contrato:</strong> status HTTP predecible para cada caso.
                </div>
                <div className={styles.li}>
                  <strong>Regla:</strong> no exponer entidades crudas ni meter logica en la capa HTTP.
                </div>
                <div className={styles.li}>
                  <strong>Meta:</strong> abrir la API sin ensuciarla.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
