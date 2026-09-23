# Roadmap — Backend en produccion: del codigo al sistema real

## Estado

Plan de las proximas clases diarias. El dia 176 ya esta publicado; los dias 177–195 permanecen planificados. Cuando se implemente una clase, se creara su ruta `app/daily/<dia>/`, se incorporara al calendario siguiendo la convencion existente y se actualizara el indice de clases publicadas.

## Proposito del bloque

Este bloque continua el cierre de TradeOps 360 con problemas operativos reales de Odoo 17, Docker, PostgreSQL, Nginx, VPS y Playwright. No pretende repetir una introduccion generica a Docker, AWS o testing ya cubierta en dias anteriores. El foco es investigar un sistema vivo, tomar decisiones seguras y explicar la evidencia que las sostiene.

Cada clase debe partir de un caso real anonimizado y responder:

```text
Sintoma -> hipotesis -> comprobacion -> decision -> aprendizaje
```

Nunca se deben publicar IPs, dominios, usuarios, credenciales, backups, configuraciones completas ni datos de produccion.

## Secuencia propuesta

| Dia | Clase | Caso y resultado de aprendizaje |
| ---: | --- | --- |
| 176 | Como llega una peticion desde Internet hasta tu aplicacion **(publicada)** | Seguir una peticion desde Internet hasta una aplicacion backend y sus dependencias. |
| 177 | Reverse proxy: por que una aplicacion no deberia exponerse directamente | Entender `proxy_pass`, TLS, cabeceras y diagnosticar un 502 sin adivinar. |
| 178 | Puertos, interfaces y exposicion: `127.0.0.1` vs `0.0.0.0` | Distinguir binding, loopback, publicacion de Docker y superficie expuesta. |
| 179 | Persistencia en Docker: que ocurre con los datos cuando muere un contenedor | Separar ciclo de vida del contenedor, volumen y datos de PostgreSQL. |
| 180 | Backups PostgreSQL: que hace realmente `pg_dump` | Explicar origen, formato, destino y limites de un dump verificable. |
| 181 | Restaurar una base no es ejecutar un archivo y esperar | Diseñar una restauracion aislada, controlada y validada. |
| 182 | `pg_dump`, `psql`, formatos de backup y compatibilidad de versiones | Elegir herramienta y formato segun motor, version y objetivo de recuperacion. |
| 183 | Fail Fast vs Best Effort en una restauracion | Decidir cuando detener, registrar errores y declarar un restore no confiable. |
| 184 | Migraciones de software: codigo compatible no equivale a datos compatibles | Analizar incompatibilidades de modulos y datos entre versiones de Odoo. |
| 185 | Gestion de dependencias: aplicacion, Python y sistema | Auditar addons y dependencias sin instalar paquetes a ciegas. |
| 186 | Como auditar un sistema que no desarrollaste | Reconstruir alcance, riesgos y limites con acceso de solo observacion. |
| 187 | Feature discovery: reconstruir un sistema desde UI, codigo y base de datos | Correlacionar modulos instalados, comportamiento visible y persistencia. |
| 188 | Configuracion vs codigo: por que el mismo software cambia entre entornos | Detectar deriva entre local, VPS y produccion sin confundirla con logica de negocio. |
| 189 | Logs como herramienta de investigacion backend | Usar contexto, correlacion y niveles de log para formar y comprobar hipotesis. |
| 190 | Health checks y diagnostico por capas | Diferenciar proceso activo, puerto abierto, HTTP disponible y aplicacion sana. |
| 191 | Playwright desde la perspectiva backend y QA | Tratar el login E2E como evidencia sobre navegador, red, backend y sesion. |
| 192 | Assertions: un test que ejecuta no necesariamente prueba nada | Convertir navegacion exitosa en afirmaciones observables y utiles. |
| 193 | E2E vs Integration vs Unit Tests: donde debe probarse cada cosa | Ubicar cada prueba segun riesgo, velocidad y tipo de fallo. |
| 194 | Testing de autenticacion: sesion, cookies, tokens y estado del navegador | Verificar autenticacion y autorizacion sin exponer secretos. |
| 195 | Pipeline completo: commit -> CI -> tests -> imagen -> deploy -> smoke test | Conectar entrega, trazabilidad, validacion y recuperacion operativa. |

## Relacion con contenido existente

El bloque debe enlazar a las clases previas cuando corresponda y profundizar desde el caso real:

- Dias 91 y 93: fundamentos de Docker, redes, puertos y volumenes.
- Dias 82, 86 y 100: health checks, despliegues seguros y CI/CD.
- Dias 147 a 151: fundamentos y practica local de AWS.
- Dias 152 a 155: estrategia de testing, integracion, contratos y carga.
- Dia 175: cierre de TradeOps 360, backup, rollback y smoke test.
- Ruta `/playwright`: primer caso practico de login E2E; los dias 191 a 194 lo amplian sin duplicarlo literalmente.

## Definition of done de cada clase

- El contenido diferencia hechos observados, hipotesis y recomendaciones.
- El caso real esta anonimizado y no contiene secretos ni datos de produccion.
- Incluye una comprobacion concreta: comando, log, diagrama, asercion o checklist verificable.
- Enlaza al conocimiento previo en vez de reintroducirlo por completo.
- Si implica cambios de codigo, estos respetan el alcance del dia y se verifican antes de publicarse.
