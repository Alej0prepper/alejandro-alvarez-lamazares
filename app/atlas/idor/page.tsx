import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - IDOR",
  description:
    "Que es un IDOR, por que ocurre, como se ve en .NET y Python, y como prevenirlo validando autorizacion por recurso.",
};

export default function IdorConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>IDOR</h2>
          <p>Insecure Direct Object Reference explicado con ejemplos en APIs, .NET y Python.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/atlas" className={shell.button}>
              Volver al Atlas
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. La idea clave</h2>
            <p>
              IDOR significa <strong>Insecure Direct Object Reference</strong>. Es una vulnerabilidad que ocurre cuando
              una aplicacion permite acceder a un recurso usando un identificador directo sin verificar correctamente
              si el usuario tiene permiso para verlo o modificarlo.
            </p>
            <blockquote>Un IDOR ocurre cuando el sistema confia demasiado en el identificador que recibe.</blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Imagina que una API tiene este endpoint:</p>
            <pre>{`GET /orders/1001`}</pre>

            <p>El usuario autenticado puede ver su pedido `1001`, pero luego cambia manualmente la URL a:</p>
            <pre>{`GET /orders/1002`}</pre>

            <p>
              Si la aplicacion responde con el pedido `1002` sin comprobar si realmente pertenece a ese usuario,
              entonces hay un IDOR.
            </p>
            <p>El problema no es que exista un ID en la URL.</p>
            <blockquote>El backend usa ese ID, pero no valida autorizacion sobre el recurso.</blockquote>
          </section>

          <section>
            <h2>3. Por que es peligroso</h2>
            <p>Permite que un usuario acceda a objetos que no le pertenecen.</p>
            <ul>
              <li>perfiles de otros usuarios</li>
              <li>facturas ajenas</li>
              <li>pedidos de otros clientes</li>
              <li>archivos privados</li>
              <li>registros internos</li>
              <li>datos sensibles</li>
            </ul>
            <p>
              No siempre requiere tecnicas complejas. Muchas veces basta con cambiar un numero en una URL o en el body
              de una request.
            </p>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>Piensa en un hotel. Cada habitacion tiene un numero:</p>
            <pre>{`101
102
103`}</pre>

            <p>
              Ahora imagina que el recepcionista deja entrar a cualquiera solo porque dijo un numero de habitacion, sin
              comprobar si realmente tiene acceso.
            </p>
            <p>Eso seria parecido a un IDOR.</p>
            <blockquote>El problema no es el numero. El problema es que no se valido si esa persona tenia permiso.</blockquote>
          </section>

          <section>
            <h2>5. Donde suele aparecer</h2>
            <p>IDOR suele aparecer en lugares como:</p>
            <ul>
              <li>URLs con IDs</li>
              <li>parametros query</li>
              <li>formularios</li>
              <li>bodies JSON</li>
              <li>APIs REST</li>
              <li>rutas de descarga de archivos</li>
              <li>endpoints de edicion o eliminacion</li>
            </ul>

            <p>Ejemplos tipicos:</p>
            <pre>{`/users/5
/invoices/80
/files/abc123`}</pre>

            <p>
              Si el backend toma ese identificador y devuelve el recurso sin control de autorizacion, aparece la
              vulnerabilidad.
            </p>
          </section>

          <section>
            <h2>6. El error real no es usar IDs</h2>
            <p>Usar un ID en una ruta puede ser totalmente valido:</p>
            <pre>{`GET /users/5`}</pre>

            <p>El problema aparece cuando el sistema hace algo como esto:</p>
            <pre>{`"si me dieron el id 5, devuelvo el usuario 5"`}</pre>

            <p>sin comprobar si el usuario autenticado puede realmente acceder a ese recurso.</p>
            <blockquote>El error real es falta de control de acceso a nivel de objeto.</blockquote>
          </section>

          <section>
            <h2>7. Como se ve en .NET</h2>
            <p>Ejemplo incorrecto en ASP.NET Core:</p>
            <pre>{`[HttpGet("{id}")]
public IActionResult GetOrder(int id)
{
    var order = _context.Orders.FirstOrDefault(o => o.Id == id);

    if (order == null)
        return NotFound();

    return Ok(order);
}`}</pre>

            <h3>Que problema tiene</h3>
            <p>
              El backend busca el pedido solo por `Id`. No verifica si ese pedido pertenece al usuario autenticado, asi
              que alguien podria cambiar el `id` y obtener pedidos ajenos.
            </p>

            <h3>Forma mas segura</h3>
            <pre>{`[HttpGet("{id}")]
public IActionResult GetOrder(int id)
{
    var userId = GetCurrentUserId();

    var order = _context.Orders
        .FirstOrDefault(o => o.Id == id && o.UserId == userId);

    if (order == null)
        return NotFound();

    return Ok(order);
}`}</pre>

            <h3>Que mejora aqui</h3>
            <p>Ahora no basta con que el pedido exista. Ademas, debe pertenecer al usuario autenticado.</p>
          </section>

          <section>
            <h2>8. Como se ve en Python</h2>
            <p>Ejemplo incorrecto en FastAPI:</p>
            <pre>{`@app.get("/orders/{order_id}")
def get_order(order_id: int):
    order = db_get_order_by_id(order_id)

    if not order:
        return {"error": "Order not found"}

    return order`}</pre>

            <h3>Que problema tiene</h3>
            <p>El endpoint busca por `order_id`, pero no valida si ese pedido pertenece al usuario autenticado.</p>

            <h3>Forma mas segura</h3>
            <pre>{`@app.get("/orders/{order_id}")
def get_order(order_id: int, current_user=Depends(get_current_user)):
    order = db_get_order_by_id_and_user(order_id, current_user.id)

    if not order:
        return {"error": "Order not found"}

    return order`}</pre>

            <h3>Que mejora aqui</h3>
            <p>Ya no se busca solo por el ID del objeto. Tambien se valida que este asociado al usuario correcto.</p>
          </section>

          <section>
            <h2>9. Como suele descubrirse</h2>
            <p>Muchas veces se detecta asi:</p>
            <ol>
              <li>un usuario autenticado accede a un recurso propio</li>
              <li>cambia manualmente el identificador</li>
              <li>prueba otro valor</li>
              <li>obtiene acceso a un recurso ajeno</li>
            </ol>

            <p>Ejemplos tipicos:</p>
            <pre>{`/profile/10  -> cambio a /profile/11
/invoice/501 -> cambio a /invoice/502`}</pre>

            <p>Si el sistema responde con datos de otro usuario, probablemente hay un IDOR.</p>
          </section>

          <section>
            <h2>10. Como prevenirlo</h2>
            <p>La prevencion real no es ocultar el ID.</p>
            <p>La prevencion real es validar autorizacion en cada acceso al recurso.</p>
            <ul>
              <li>este pedido pertenece al usuario autenticado</li>
              <li>este archivo puede ser visto por este rol</li>
              <li>esta factura corresponde a esta cuenta</li>
              <li>este registro esta dentro del tenant correcto</li>
            </ul>
            <blockquote>No confies en el identificador que llega desde el cliente.</blockquote>
          </section>

          <section>
            <h2>11. Usar GUIDs o IDs dificiles no soluciona el problema</h2>
            <p>A veces se piensa que usar UUID en vez de enteros elimina el IDOR.</p>
            <p>
              Puede hacer la explotacion menos trivial, pero no corrige el fallo de autorizacion. Si el sistema sigue
              devolviendo el recurso solo porque recibio un identificador valido, el problema sigue existiendo.
            </p>
            <ul>
              <li>cambiar el formato del ID puede ayudar un poco</li>
              <li>pero no reemplaza la verificacion de permisos</li>
            </ul>
          </section>

          <section>
            <h2>12. Que tiene que revisar el backend</h2>
            <p>El backend debe responder preguntas como estas:</p>
            <ul>
              <li>quien es el usuario autenticado?</li>
              <li>puede este usuario acceder a este objeto?</li>
              <li>este recurso le pertenece?</li>
              <li>su rol permite esta operacion?</li>
              <li>esta dentro del tenant correcto?</li>
            </ul>
            <p>Si eso no se valida, el endpoint puede quedar vulnerable.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un IDOR ocurre cuando una aplicacion permite acceder a un recurso usando un identificador directo sin
              comprobar correctamente si el usuario tiene permiso para hacerlo.
            </blockquote>
            <p>El problema no es el ID en si. El problema es confiar en el sin validar autorizacion.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
