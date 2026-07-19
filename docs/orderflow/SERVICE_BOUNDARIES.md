# OrderFlow Service Boundaries

## Objetivo

Este documento define los bounded contexts iniciales de OrderFlow y fija que responsabilidad, datos, endpoints y eventos pertenecen a cada servicio antes de extraer codigo a microservicios reales.

## Catalog

### Responsabilidad

Administrar el catalogo de productos.

### Datos propios

- Products
- Categories
- Brands
- Prices

### Endpoints

- GET /products
- GET /products/{id}
- POST /products
- PUT /products/{id}

### Eventos publicados

- ProductCreated
- ProductUpdated
- PriceChanged

### Eventos consumidos

- Ninguno por ahora

### Lo que no debe hacer

- crear ordenes
- reservar inventario
- cobrar pagos

## Orders

### Responsabilidad

Gestionar el ciclo de vida de una compra.

### Datos propios

- Orders
- OrderItems
- OrderStatus
- HistoricalProductSnapshot

### Endpoints

- POST /orders
- GET /orders/{id}
- POST /orders/{id}/items
- POST /orders/{id}/confirm
- POST /orders/{id}/cancel

### Eventos publicados

- OrderCreated
- OrderConfirmed
- OrderCompleted
- OrderCancelled

### Eventos consumidos

- InventoryReserved
- InventoryReservationFailed
- PaymentApproved
- PaymentRejected
- InventoryReleased

### Lo que no debe hacer

- administrar catalogo
- controlar stock real
- comunicarse directamente con la pasarela de pagos

## Inventory

### Responsabilidad

Controlar stock, reservas y disponibilidad.

### Datos propios

- Stock
- Reservations
- StockMovements

### Endpoints

- GET /inventory/{productId}
- POST /inventory/reservations
- POST /inventory/release

### Eventos publicados

- InventoryReserved
- InventoryReleased
- InventoryUpdated
- InventoryReservationFailed

### Eventos consumidos

- OrderConfirmed
- ReleaseInventory

### Lo que no debe hacer

- crear ordenes
- calcular pagos
- enviar emails

## Payments

### Responsabilidad

Gestionar cobros, rechazos, reembolsos e integracion con el proveedor externo.

### Datos propios

- PaymentAttempts
- Refunds
- ProviderTransactions

### Endpoints

- POST /payments/process
- POST /payments/refund
- GET /payments/{orderId}

### Eventos publicados

- PaymentApproved
- PaymentRejected
- RefundCompleted

### Eventos consumidos

- PaymentRequested

### Lo que no debe hacer

- consultar catalogo
- controlar stock
- modificar ordenes directamente

## Notifications

### Responsabilidad

Comunicar eventos al usuario mediante correo u otros canales.

### Datos propios

- Templates
- EmailQueue
- DeliveryStatus

### Endpoints

- GET /notifications/{id}
- POST /notifications/retry

### Eventos publicados

- EmailSent
- EmailFailed

### Eventos consumidos

- OrderCompleted
- PaymentRejected
- OrderCancelled

### Lo que no debe hacer

- cambiar el estado de una orden
- reservar inventario
- aprobar pagos

## Reglas de frontera

1. Cada servicio es dueno exclusivo de sus datos.
2. Ningun servicio modifica directamente tablas de otro.
3. La comunicacion inmediata usa contratos HTTP bien definidos.
4. La comunicacion diferida usa eventos o comandos sobre mensajeria.
5. Duplicar datos historicos de lectura no implica ceder propiedad.
6. La separacion es por capacidad del negocio, no por tabla ni por carpeta.

## Validacion de limites

Un limite es bueno si:

- tiene una responsabilidad clara
- controla datos propios
- puede desplegarse solo
- puede escalar solo
- puede evolucionar con bajo acoplamiento
- podria tener un equipo responsable definido
