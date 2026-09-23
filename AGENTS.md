# Instrucciones para agentes

## Identidad del repositorio

Backend Knowledge Lab es un sitio editorial de aprendizaje tecnico. Cada clase debe demostrar criterio de ingenieria: explicar un problema, la evidencia disponible, la decision tomada y sus limites. No es una coleccion de definiciones ni una landing de marketing.

La ruta publica de perfil es `/profile`; el archivo editorial vive en `/daily`; cada clase publicada tiene su propia ruta `/daily/<dia>`.

## Direccion actual

La proxima etapa esta documentada en [`docs/ROADMAP_BACKEND_PRODUCCION_176_195.md`](docs/ROADMAP_BACKEND_PRODUCCION_176_195.md). Antes de preparar una clase de los dias 176–195, leela completa y respeta su secuencia. Son clases planeadas, no publicadas: no deben aparecer como disponibles hasta que su implementacion este terminada.

El enfoque es backend en produccion aplicado a sistemas reales: Odoo 17, Docker, PostgreSQL, Nginx, VPS y Playwright. AWS, Docker base y estrategia de testing ya tienen bloques anteriores; enlazarlos y profundizar desde casos reales es preferible a repetir teoria generica.

## Forma de trabajar

1. Inspecciona el repositorio y el estado de Git antes de editar. Conserva cambios ajenos.
2. Lee la clase, el roadmap aplicable y la documentacion relacionada antes de implementar.
3. Mantente dentro del alcance del dia. No adelantes contenido de clases futuras ni hagas refactors generales sin necesidad.
4. Reutiliza el patron de una leccion existente: pagina con metadata, cliente de la leccion y estilos compartidos o consistentes.
5. Verifica los cambios con las comprobaciones relevantes y revisa el diff final. Nunca afirmes una verificacion que no ejecutaste.

## Calidad editorial

Para contenido basado en produccion, organiza la explicacion asi:

```text
Sintoma -> hipotesis -> comprobacion -> decision -> aprendizaje
```

- Distingue un hecho observado de una inferencia o una recomendacion.
- Prioriza diagramas compactos, comandos explicados y condiciones verificables.
- Un test que navega o hace clic no demuestra un resultado: debe tener aserciones sobre el comportamiento esperado.
- Evita esperas arbitrarias cuando exista una condicion observable que pueda esperarse.
- No publiques una restauracion, deploy, backup o health check como confiable sin una validacion concreta.

## Seguridad y datos reales

- Nunca incluyas IPs reales, dominios internos, usuarios, contraseñas, tokens, cookies, backups, dumps, configuraciones completas ni datos de produccion.
- Usa nombres y valores ficticios; explica que la configuracion real debe aportarse fuera del repositorio.
- No debilites controles de seguridad para simplificar una demo o un test.
- El acceso de observacion a un sistema existente no autoriza cambios en ese sistema.

## Documentacion y publicacion

- `titulos-de-clases.md` enumera solo clases que ya existen en `app/daily`; no agregues ahi dias planificados.
- Al publicar una nueva clase, actualiza los registros y fuentes de calendario que correspondan siguiendo las convenciones existentes.
- No hagas commits, push, despliegues ni operaciones destructivas salvo autorizacion expresa del usuario.
