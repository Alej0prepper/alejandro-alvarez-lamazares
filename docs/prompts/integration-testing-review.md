# Prompt reutilizable: revisar cambios y mantener los tests

Usa este prompt desde la raiz de `common-store-admin` cada vez que exista un cambio funcional, correccion o refactor que deba verificarse.

```text
Actua como responsable de calidad y mantenimiento de este repositorio ASP.NET Core/.NET 10. Tu trabajo no termina al ejecutar los tests existentes: entiende todos los cambios, determina su impacto, crea o actualiza los tests necesarios, ejecutalos y deja evidencia verificable.

CONTEXTO OPCIONAL
- Rama base o destino del PR: <BASE_BRANCH>
- Requerimiento o criterio de aceptacion: <REQUERIMIENTO>
- Alcance adicional: <ALCANCE>

OBJETIVO
Revisa los cambios completos de la rama y del working tree. Identifica comportamientos nuevos o modificados, implementa cobertura automatizada significativa y ejecuta las suites unitarias y de integracion correctas. Actualiza Changes.md con lo implementado y probado. No te limites a describir lo que falta: realiza el trabajo hasta verificarlo o documentar un bloqueo externo real.

REGLAS
1. Lee AGENTS.md, Changes.md, los .csproj, la solucion, los comandos de tests, inventario, trazabilidad, factory de integracion y tests cercanos.
2. Conserva todos los cambios del usuario. No descartes ni reviertas trabajo ajeno. No hagas commits salvo solicitud expresa.
3. Inspecciona git status, cambios staged/unstaged, untracked y commits frente a la rama base usando merge-base.
4. Determina la rama base con evidencia; no asumas automaticamente el upstream.
5. Contrasta diff, requerimiento y Changes.md. El changelog no es la unica fuente de verdad.
6. No cambies tests solo para hacerlos verdes. Clasifica regresiones, contratos cambiados, tests fragiles y problemas de entorno.
7. No reduzcas aserciones, deshabilites tests ni uses Skip para cerrar la tarea.
8. Usa fakes y reemplazos DI existentes. No dependas de APIs, correo, AWS u otros servicios reales.
9. No ejecutes comandos destructivos de Docker.
10. Conserva y reporta el mensaje relevante de cada fallo.

ANALISIS
Identifica archivos modificados y consumidores. Busca endpoints, DTOs, validadores, DI, AutoMapper, entidades, EF, migraciones, permisos, mensajes y tests. Presenta una matriz con comportamiento, riesgo, cobertura existente, test faltante y archivo donde implementarlo.

COBERTURA
- DTO o FluentValidation: valores validos, reglas nuevas, limites y codigo MSG###.
- Servicios: flujo exitoso, estados, errores y casos limite.
- Repositorios y EF: resultado, persistencia, relaciones, constraints, includes, orden y migraciones reales.
- API: WebApplicationFactory, status codes, headers, envelope, data, errores, permisos, persistencia y efectos secundarios.
- Seguridad: sin token, token invalido, sin permiso y rol correcto.
- Integraciones externas: fake controlable para exito, rechazo, timeout y excepcion.
- Fechas y concurrencia: datos deterministas, sin sleeps ni orden entre tests.

CONVENCIONES
Respeta xUnit, la organizacion existente, nombres Metodo_Resultado_CuandoCondicion, fixtures y fakes. Reutiliza helpers. Los tests deben ser independientes, repetibles y deterministas.

IMPLEMENTACION
Implementa solo los escenarios de la matriz. Verifica respuesta, contrato, persistencia, relaciones, eventos, ausencia de cambios parciales y efectos secundarios. No cambies produccion solo para hacer pasar un test; si detectas un defecto, documentalo y agrega regresion cuando corresponda.

EJECUCION
1. Tests unitarios relacionados con filtro.
2. Tests de integracion relacionados con filtro.
3. dotnet build common-store-admin-api.sln -c Release
4. dotnet build Tests/integration/common-store-admin-api.IntegrationTests/common-store-admin-api.IntegrationTests.csproj -c Release
5. dotnet test Tests/unit/common-store-admin-api.Tests/common-store-admin-api.Tests.csproj -c Release --no-build -v minimal
6. dotnet test Tests/integration/common-store-admin-api.IntegrationTests/common-store-admin-api.IntegrationTests.csproj -c Release --no-build -v minimal

La solucion puede no incluir el proyecto de integracion: ejecuta siempre ambos csproj explicitamente. Ante un fallo, aisla el test, lee stack trace y setup, clasifica la causa, corrige y repite subconjunto y suites completas.

DOCUMENTACION Y ENTREGA
Actualiza Changes.md con fecha, cambio, archivos y pruebas reales. Actualiza inventario y TEST_TRACEABILITY.md si quedan desactualizados. Revisa el diff final.

Entrega:
1. Resultado: listo, parcialmente listo o bloqueado.
2. Impacto revisado.
3. Tests agregados o actualizados y escenarios.
4. Comandos, pasados, fallidos, omitidos y resultado.
5. Fallos o warnings pendientes con evidencia.
6. Documentacion modificada.
7. Archivos modificados.

No declares terminado mientras una suite requerida no haya sido ejecutada o tenga fallos sin clasificar.
```

## Observaciones

- La suite usa xUnit, SQLite en memoria, migraciones reales, `WebApplicationFactory` y fakes manuales.
- La solucion puede no contener el proyecto de integration tests; los comandos deben ejecutarse por `.csproj`.
- `Changes.md`, el inventario y la trazabilidad deben contrastarse siempre con Git y el codigo.
