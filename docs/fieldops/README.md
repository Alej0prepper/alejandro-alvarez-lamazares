# FieldOps 360

FieldOps 360 es el proyecto practico de una ruta de 30 dias sobre desarrollo de modulos en Odoo 17. El objetivo es construir un unico modulo empresarial que crezca de forma incremental, en lugar de estudiar ejemplos aislados.

El modulo tecnico se llamara `fieldops` y modelara una empresa que vende equipos y presta servicios de instalacion, mantenimiento y reparacion.

## Flujo de negocio

```text
Clientes de Odoo
        |
        v
Equipos instalados
        |
        v
Tickets de servicio
        |
        v
Ordenes de trabajo
        |
        +-- Tecnico
        +-- Materiales
        +-- Horas trabajadas
        +-- Coste
        |
        v
Cierre / Informe PDF
```

## Capacidades finales

- Extension de `res.partner`.
- Modelos, relaciones, estados y campos calculados.
- Constraints y reglas de negocio.
- Vistas, XPath, acciones y menus.
- ACL, Record Rules, grupos y multi-company.
- Chatter, tracking, actividades, wizard y cron.
- Reportes QWeb/PDF.
- Integracion HTTP y controller.
- Tests, optimizacion, debugging y documentacion.
- Docker y preparacion para portfolio.

## Documentos

- [Roadmap de 30 dias](./ROADMAP_30_DIAS.md)

## Resultado esperado

Al finalizar, `fieldops` debe permitir este flujo:

```text
Cliente reporta problema
          |
          v
Ticket
          |
          v
Supervisor asigna tecnico
          |
          v
Orden de trabajo
          |
          v
Diagnostico -> Reparacion -> Cierre -> Informe PDF
```
