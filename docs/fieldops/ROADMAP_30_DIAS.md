# Roadmap Odoo 17 - FieldOps 360 en 30 dias

Cada dia debe producir un cambio pequeno, real y acumulativo en el mismo modulo `fieldops`.

| Dia | Clase | Mejora en FieldOps 360 |
| ---: | --- | --- |
| 1 | Que es Odoo y como piensa un desarrollador ERP | Problema de negocio, actores, modulos y arquitectura inicial. |
| 2 | Arquitectura de Odoo 17 | Servidor, PostgreSQL, addons, registry y Environment. |
| 3 | Entorno profesional de desarrollo | Odoo, PostgreSQL, `custom_addons`, configuracion, logs y Developer Mode. |
| 4 | Anatomia de un modulo Odoo | Crear `fieldops`, `__manifest__.py` y estructura inicial. |
| 5 | Primer modelo con el ORM | Crear `fieldops.equipment` para equipos instalados. |
| 6 | Recordsets, `self` y `env` | Activar, retirar y consultar equipos. |
| 7 | Fields y opciones importantes | Serie, instalacion, estado, garantia, notas e indices. |
| 8 | Many2one, One2many y Many2many | Relacionar equipos, clientes, tecnicos y ordenes. |
| 9 | CRUD, domains, context y Command API | Consultas y modificacion correcta de relaciones. |
| 10 | Computed, related y `@api.depends` | Antiguedad, garantia activa e intervenciones. |
| 11 | Constraints, onchange y reglas | Series duplicadas, fechas invalidas y estados inconsistentes. |
| 12 | `_inherit` | Extender `res.partner` sin tocar el core. |
| 13 | Overrides y `super()` | Comportamiento controlado en crear y modificar registros. |
| 14 | XML, external IDs y datos | Estados, tipos de servicio y datos iniciales. |
| 15 | Views Form, List y Search | Interfaz para administrar equipos. |
| 16 | View inheritance y XPath | Insertar FieldOps en contactos. |
| 17 | Actions, menus, filters y navegacion | Menus operativos, acciones y busquedas. |
| 18 | Tickets y ordenes de trabajo | `fieldops.ticket` y `fieldops.work.order` con estados. |
| 19 | Grupos, ACL e `ir.model.access.csv` | Roles de tecnico, supervisor y administrador. |
| 20 | Record Rules y `sudo()` | Aislamiento por tecnico, equipo y permisos. |
| 21 | Multi-company | Aislamiento correcto mediante `company_id`. |
| 22 | Chatter, tracking y actividades | Historial, seguidores, cambios y proximas acciones. |
| 23 | Wizards con `TransientModel` | Cerrar varias ordenes y registrar observaciones. |
| 24 | QWeb y reportes PDF | Informe tecnico con cliente, equipo, materiales y firma. |
| 25 | Cron jobs y automatizacion | Detectar SLA vencidos y crear actividades. |
| 26 | Controllers e integraciones | Recibir o consultar solicitudes de servicio por HTTP. |
| 27 | Testing profesional | Dominio, permisos, estados, automatizaciones e integracion. |
| 28 | Debugging y performance | N+1, consultas, XML/XPath y permisos. |
| 29 | Mantener y desplegar | Upgrade, datos existentes, staging, backups y rollback. |
| 30 | Portfolio y release | Documentacion, demo, screenshots, tests, Docker y `v1.0.0`. |

## Hitos

### Dia 7: modelo base

```text
fieldops/
├── __init__.py
├── __manifest__.py
├── models/
│   └── equipment.py
├── views/
└── security/
```

Debe ser posible crear equipos mediante el ORM.

### Dia 10: dominio relacionado

```text
Cliente
   |
   └── Equipos
          ├── Serie
          ├── Garantia
          ├── Estado
          └── Tecnicos
```

### Dia 18: flujo empresarial

```text
Cliente -> Equipo -> Ticket -> Work Order
                               ├── Assigned
                               ├── In Progress
                               ├── Waiting Parts
                               ├── Done
                               └── Cancelled
```

### Dia 24: cierre operativo

El flujo completo termina en un informe PDF con cliente, equipo, diagnostico, materiales, horas y firma.

### Dia 27: calidad

```text
Codigo + Seguridad + Tests + Reglas de negocio
```

El modulo debe demostrar comportamiento, no solo apariencia.

## Estructura final esperada

```text
fieldops/
├── controllers/
│   └── service_api.py
├── data/
│   ├── service_types.xml
│   ├── mail_activity_data.xml
│   └── cron.xml
├── models/
│   ├── equipment.py
│   ├── res_partner.py
│   ├── service_ticket.py
│   └── work_order.py
├── report/
│   ├── work_order_report.xml
│   └── work_order_templates.xml
├── security/
│   ├── fieldops_security.xml
│   └── ir.model.access.csv
├── tests/
│   ├── test_equipment.py
│   ├── test_security.py
│   ├── test_ticket.py
│   └── test_work_order.py
├── views/
│   ├── equipment_views.xml
│   ├── res_partner_views.xml
│   ├── service_ticket_views.xml
│   ├── work_order_views.xml
│   └── menus.xml
├── wizard/
│   ├── close_work_orders.py
│   └── close_work_orders_views.xml
├── __init__.py
└── __manifest__.py
```

## Definition of done

- El dominio representa clientes, equipos, tickets y ordenes.
- Las transiciones invalidas estan bloqueadas.
- Los permisos se prueban con usuarios y companias diferentes.
- Los reportes y automatizaciones son reproducibles.
- El upgrade del modulo se prueba sobre datos existentes.
- La documentacion permite levantar y demostrar el proyecto desde cero.
