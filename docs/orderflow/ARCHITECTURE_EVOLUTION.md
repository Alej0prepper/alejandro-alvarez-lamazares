# Architecture Evolution

## 1. Contexto actual

OrderFlow comenzo como una API unica para practicar backend profesional con un alcance pequeno y controlado. El sistema atiende productos, ordenes, pagos simulados y auditoria dentro de una sola aplicacion.

## 2. Estado del monolito

Arquitectura actual:

```text
Cliente
  ↓
OrderFlow API
  ↓
PostgreSQL
```

Caracteristicas actuales:

* un solo proceso
* un solo despliegue
* una sola unidad de escalado
* una base de codigo compartida
* transacciones locales sencillas

Conclusiones:

* el monolito no es un error
* fue la decision correcta para aprender el dominio
* evita complejidad distribuida prematura

## 3. Nuevo escenario de negocio

Se imagina un nuevo cliente grande que exige un contexto mas realista de produccion.

Supuestos:

* 10 000 ordenes diarias de base
* picos de 50 000 ordenes diarias
* catalogo con miles de productos
* inventario real
* pasarela de pago externa
* notificaciones
* auditoria completa
* trazabilidad extremo a extremo
* tolerancia a fallos
* crecimiento sin detener la plataforma

## 4. Limitaciones detectadas

### Escalado acoplado

Catalog, Orders, Payments y Notifications comparten la misma unidad de escalado. Si Catalog necesita mas capacidad, el monolito entero se replica.

### Despliegue acoplado

Un cambio pequeno en notificaciones obliga a redesplegar la aplicacion completa, incluyendo modulos sin relacion.

### Aislamiento de fallos insuficiente

Una integracion lenta o caida en Payments puede degradar Orders, Gateway y la experiencia completa del usuario.

### Propiedad de datos poco clara

Dominios con reglas propias, como Inventory, siguen viviendo dentro del mismo proceso y el mismo ciclo operativo.

### Autonomia de equipos limitada

Con varios equipos, el mismo repositorio y despliegue generan conflictos, coordinacion obligatoria y propiedad difusa.

### Procesamiento secundario demasiado acoplado

Acciones como notificaciones o analitica no deberian bloquear una venta.

### Trazabilidad distribuida aun inexistente

El flujo de compra real requiere TraceId, CorrelationId, metricas y logs estructurados entre componentes independientes.

## 5. Alternativas consideradas

### Mantener el monolito actual

Ventajas:

* simple de operar
* rapido de depurar
* transacciones locales

Limitaciones:

* no resuelve autonomia operativa
* no permite escalado fino
* no aisla bien integraciones externas

### Evolucionar a monolito modular

Ventajas:

* orden interno del dominio
* separacion logica clara
* menos complejidad operativa que microservicios

Limitaciones:

* sigue existiendo un solo despliegue
* sigue existiendo una sola unidad de escalado
* no aporta independencia real entre equipos y proveedores

### Evolucion progresiva a microservicios

Ventajas:

* escalado independiente
* despliegues independientes
* aislamiento de fallos
* propiedad clara de datos
* autonomia de equipos

Coste:

* mas latencia
* fallos parciales
* consistencia eventual
* observabilidad distribuida
* operacion mas compleja

## 6. Decision arquitectonica

Se decide evolucionar OrderFlow de forma progresiva hacia una arquitectura de microservicios porque el escenario inventado exige independencia operativa, aislamiento de fallos y escalado diferenciado.

Contextos iniciales propuestos:

```text
Catalog
Orders
Inventory
Payments
Notifications
```

Regla principal:

> La separacion sera por capacidades del negocio, no por entidades ni tablas.

## 7. Riesgos

Riesgos introducidos por la migracion:

* llamadas de red entre componentes
* latencia adicional
* fallos parciales
* mensajes duplicados
* consistencia eventual
* contratos entre servicios
* varias bases de datos
* mayor complejidad de despliegue
* observabilidad distribuida obligatoria
* mayor coste operativo

Punto clave:

> Los microservicios no eliminan complejidad. La redistribuyen.

## 8. Estrategia de migracion

Secuencia propuesta:

1. Documentar el sistema actual
2. Definir casos de uso
3. Identificar bounded contexts
4. Definir contratos entre servicios
5. Extraer Catalog
6. Extraer Orders
7. Separar Inventory y Payments
8. Introducir mensajeria
9. Agregar resiliencia y observabilidad
10. Probar el sistema completo

Regla operativa:

```text
Monolito actual
  ↓
Definir limites
  ↓
Extraer un servicio
  ↓
Validar
  ↓
Extraer el siguiente
```

## 9. Criterios de exito

La migracion solo se considerara util si produce mejoras verificables:

* Catalog puede escalar sin escalar Payments
* Notification puede caer sin bloquear ordenes
* Payments puede desplegarse sin redesplegar Catalog
* cada servicio controla su propia base de datos
* los eventos no se pierden aunque RabbitMQ falle temporalmente
* un mensaje duplicado no ejecuta dos veces el mismo efecto
* una compensacion libera reservas si el pago falla
* una operacion completa puede seguirse con TraceId y CorrelationId

## 10. Condiciones para detener o revertir la migracion

La migracion debe revisarse o frenarse si ocurre cualquiera de estas condiciones:

* la separacion no aporta autonomia real
* el equipo no puede operar varios servicios con seguridad
* la infraestructura consume mas tiempo que el problema de negocio
* los limites del dominio siguen siendo confusos
* la observabilidad es insuficiente
* el coste operativo supera el beneficio

Conclusion:

> La decision arquitectonica debe seguir siendo revisable. Si la independencia operativa no compensa la complejidad introducida, la migracion no se justifica.
