# OrderFlow Use Cases

## Objetivo

Este documento define los comportamientos que OrderFlow debe soportar antes de separar el sistema en microservicios. El foco esta en valor de negocio, reglas, eventos, compensaciones y criterios de demostracion.

## UC-001 Consultar productos

### Actor

Cliente

### Objetivo

Obtener una lista paginada de productos activos para iniciar una compra.

### Precondiciones

- Catalog Service esta disponible
- existen productos registrados
- el cliente puede acceder al Gateway

### Entrada

- page
- pageSize
- category
- searchText
- sort

### Flujo principal

1. El cliente solicita el catalogo.
2. El Gateway enruta la peticion a Catalog.
3. Catalog consulta su base de datos.
4. Catalog devuelve una pagina de productos.
5. El Gateway responde al cliente.

### Flujos alternativos

- Catalog no disponible
- paginacion invalida
- timeout

### Resultado esperado

Lista paginada de productos activos.

### Eventos

Ninguno.

### Criterios de aceptacion

- solo aparecen productos activos
- la respuesta esta paginada
- el precio lo resuelve Catalog
- la peticion incluye TraceId

## UC-002 Crear una orden

### Actor

Cliente

### Objetivo

Crear una orden vacia en estado Draft.

### Precondiciones

- el cliente esta identificado
- Orders Service esta disponible

### Entrada

- customerId

### Flujo principal

1. El cliente solicita crear una orden.
2. Orders valida los datos.
3. Se crea una orden en estado Draft.
4. La orden se guarda en OrdersDb.
5. Se devuelve el identificador.

### Flujos alternativos

- customerId invalido
- error de persistencia

### Resultado esperado

Orden creada con total inicial cero y estado Draft.

### Eventos

Ninguno.

### Criterios de aceptacion

- la orden queda persistida
- el estado inicial es Draft
- no se reserva inventario
- no se llama a Payments

## UC-003 Agregar producto a la orden

### Actor

Cliente

### Objetivo

Agregar un producto a una orden en borrador y conservar el precio historico de compra.

### Precondiciones

- la orden existe
- la orden esta en estado Draft
- el producto existe
- el producto esta activo
- la cantidad es mayor que cero

### Entrada

- orderId
- productId
- quantity

### Flujo principal

1. Orders recibe la solicitud.
2. Orders consulta Catalog.
3. Catalog devuelve nombre y precio actual.
4. Orders agrega el item a la orden.
5. Orders recalcula el total.
6. Orders persiste la orden.

### Flujos alternativos

- orden inexistente
- orden ya confirmada
- producto inexistente
- producto inactivo
- Catalog temporalmente caido

### Resultado esperado

La orden guarda ProductId, ProductNameAtPurchase, UnitPriceAtPurchase y Quantity.

### Eventos

Ninguno.

### Criterios de aceptacion

- solo se modifica una orden Draft
- el precio queda copiado dentro de la orden
- el total se recalcula correctamente
- no se reserva stock todavia

## UC-004 Confirmar orden

### Actor

Cliente

### Objetivo

Marcar la orden como lista para iniciar el procesamiento distribuido.

### Precondiciones

- la orden existe
- esta en estado Draft
- tiene al menos un producto
- el total es mayor que cero

### Entrada

- orderId

### Flujo principal

1. El cliente confirma la orden.
2. Orders valida las reglas.
3. Cambia el estado a PendingProcessing.
4. Guarda la orden.
5. Registra OrderConfirmed en Outbox.
6. Confirma la transaccion.
7. Responde 202 Accepted.

### Flujos alternativos

- orden vacia
- orden inexistente
- orden ya confirmada

### Resultado esperado

La orden queda aceptada para procesamiento asincrono.

### Eventos

- OrderConfirmed

### Criterios de aceptacion

- una orden vacia no puede confirmarse
- orden y outbox se guardan en la misma transaccion
- la respuesta no espera a Payments
- el evento incluye MessageId

## UC-005 Reservar inventario

### Actor

Orders mediante RabbitMQ

### Objetivo

Reservar temporalmente el stock necesario para una orden confirmada.

### Precondiciones

- se recibio OrderConfirmed
- el mensaje no fue procesado antes

### Entrada

- OrderConfirmed

### Flujo principal

1. Inventory recibe el evento.
2. Verifica idempotencia por MessageId.
3. Consulta stock disponible.
4. Crea una reserva.
5. Reduce stock disponible.
6. Aumenta stock reservado.
7. Publica InventoryReserved.

### Flujos alternativos

- stock insuficiente
- mensaje duplicado
- error tecnico reintentable

### Resultado esperado

El inventario queda reservado o se informa que no pudo reservarse.

### Eventos

- InventoryReserved
- InventoryReservationFailed

### Criterios de aceptacion

- un mensaje duplicado no reserva dos veces
- no existe stock negativo
- el procesamiento es transaccional

## UC-006 Procesar pago

### Actor

Saga u Orders mediante RabbitMQ

### Objetivo

Intentar cobrar el total de la orden.

### Precondiciones

- la orden esta en procesamiento
- el inventario ya fue reservado
- el pago no fue aprobado antes

### Entrada

- PaymentRequested

### Flujo principal

1. Payments recibe el mensaje.
2. Comprueba idempotencia.
3. Crea PaymentAttempt.
4. Llama al proveedor externo.
5. Guarda el resultado.
6. Publica PaymentApproved o PaymentRejected.

### Flujos alternativos

- timeout
- conexion rechazada
- HTTP 503
- tarjeta rechazada
- fondos insuficientes

### Resultado esperado

El intento queda auditado y genera un evento de resultado.

### Eventos

- PaymentApproved
- PaymentRejected

### Criterios de aceptacion

- un PaymentRequested duplicado no cobra dos veces
- los errores temporales se distinguen de los de negocio
- el proveedor no bloquea indefinidamente el servicio

## UC-007 Completar orden

### Actor

Saga

### Objetivo

Finalizar la orden cuando inventario y pago ya fueron confirmados.

### Precondiciones

- el inventario esta reservado
- el pago esta aprobado
- la orden no esta completada

### Entrada

- PaymentApproved

### Flujo principal

1. Orders recibe PaymentApproved.
2. Valida el estado actual.
3. Cambia la orden a Completed.
4. Publica OrderCompleted.

### Flujos alternativos

- evento duplicado
- orden en estado incompatible

### Resultado esperado

La orden queda completada una sola vez.

### Eventos

- OrderCompleted

### Criterios de aceptacion

- la orden solo se completa una vez
- Notification no bloquea la finalizacion
- Analytics no bloquea la finalizacion

## UC-008 Rechazar la orden por inventario insuficiente

### Actor

Inventory y Saga

### Objetivo

Cancelar el procesamiento cuando no existe stock suficiente.

### Precondiciones

- se recibio OrderConfirmed
- no hay stock suficiente

### Entrada

- InventoryReservationFailed

### Flujo principal

1. Saga recibe InventoryReservationFailed.
2. Orders cambia la orden a Cancelled.
3. Se registra la causa.

### Flujos alternativos

- mensaje duplicado

### Resultado esperado

La orden queda cancelada y Payments no es invocado.

### Eventos

- InventoryReservationFailed

### Criterios de aceptacion

- no existe cobro
- PaymentRequested no se publica
- la causa queda registrada

## UC-009 Compensar pago rechazado

### Actor

Saga

### Objetivo

Liberar inventario despues de un pago rechazado.

### Precondiciones

- habia inventario reservado
- el pago fue rechazado

### Entrada

- PaymentRejected

### Flujo principal

1. Saga solicita ReleaseInventory.
2. Inventory libera la reserva.
3. Inventory publica InventoryReleased.
4. Orders cambia a PaymentFailed.

### Flujos alternativos

- compensacion duplicada
- error tecnico reintentable

### Resultado esperado

El stock vuelve a estar disponible y la orden queda en PaymentFailed.

### Eventos

- InventoryReleased

### Criterios de aceptacion

- la reserva se libera una unica vez
- la compensacion puede reintentarse
- el sistema no queda bloqueado

## UC-010 Enviar notificacion

### Actor

Notification Worker

### Objetivo

Enviar la confirmacion de una orden completada.

### Precondiciones

- se recibio OrderCompleted

### Entrada

- OrderCompleted

### Flujo principal

1. Notification recibe el evento.
2. Comprueba idempotencia.
3. Construye el correo.
4. Llama al proveedor de email.
5. Registra el resultado.

### Flujos alternativos

- proveedor de email caido
- mensaje duplicado
- error permanente que termina en DLQ

### Resultado esperado

La notificacion se envia o queda pendiente para reintento sin afectar la orden.

### Eventos

Ninguno obligatorio.

### Criterios de aceptacion

- el fallo del email no cambia el estado de la orden
- un mensaje duplicado no envia dos correos
- los errores permanentes terminan en DLQ

## UC-011 Consultar estado de la orden

### Actor

Cliente

### Objetivo

Conocer el estado actual del procesamiento asincrono.

### Precondiciones

- la orden existe

### Entrada

- orderId

### Flujo principal

1. El cliente solicita la orden.
2. Orders busca el estado actual.
3. Orders devuelve items, total y estado de procesamiento.

### Flujos alternativos

- orden inexistente

### Resultado esperado

El cliente puede ver estados intermedios y finales del flujo.

### Eventos

Ninguno.

### Criterios de aceptacion

- la respuesta puede reflejar consistencia eventual
- los estados son coherentes con el proceso

## Matriz resumida

| Codigo | Caso de uso | Servicio principal | Tipo |
| --- | --- | --- | --- |
| UC-001 | Consultar productos | Catalog | Sincrono |
| UC-002 | Crear orden | Orders | Sincrono |
| UC-003 | Agregar producto | Orders/Catalog | Sincrono |
| UC-004 | Confirmar orden | Orders | Sincrono y asincrono |
| UC-005 | Reservar inventario | Inventory | Asincrono |
| UC-006 | Procesar pago | Payments | Asincrono |
| UC-007 | Completar orden | Orders | Asincrono |
| UC-008 | Rechazar por inventario | Inventory/Saga | Asincrono |
| UC-009 | Compensar pago rechazado | Inventory/Saga | Asincrono |
| UC-010 | Enviar notificacion | Notifications | Asincrono |
| UC-011 | Consultar estado | Orders | Sincrono |

## Demostraciones obligatorias

1. Compra exitosa
2. Inventario insuficiente
3. Pago rechazado
4. RabbitMQ caido con Outbox pendiente
5. Mensaje duplicado
6. Mensaje invalido enviado a DLQ
7. Payment lento con timeout y circuit breaker
8. Notification caido sin perder OrderCompleted
9. Trazabilidad distribuida con TraceId
10. Reinicio del consumidor sin repetir el efecto
