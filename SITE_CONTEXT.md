# Site Context - Backend Knowledge Lab

## Proposito del sitio

Backend Knowledge Lab es un sitio personal de aprendizaje y divulgacion tecnica. El foco no es marketing ni ventas: el sitio existe para mostrar contenido tecnico concreto, ordenar lecciones diarias y exponer un perfil profesional claro.

La experiencia principal combina:

- una pagina publica de perfil en `/profile`
- un archivo de lecciones diarias en `/daily`
- paginas de leccion individual en `/daily/:day`

La ruta `/` no muestra contenido. Devuelve 404 a proposito para evitar que la home publica quede accesible por accidente.

## Estructura del sitio

### Rutas principales

- `/` -> 404 intencional
- `/profile` -> pagina publica de presentacion personal
- `/daily` -> calendario / archivo de lecciones
- `/daily/:day` -> leccion individual

### Intencion por ruta

- `/profile`: es la cara publica del sitio. Debe comunicar quien soy, que hago y dar acceso rapido a la arquitectura de contenido.
- `/daily`: debe permitir navegar el historial de lecciones con claridad visual y densidad razonable.
- `/daily/:day`: debe sentirse como una pieza editorial tecnica, con jerarquia clara, indice, contenido largo y navegacion previa/siguiente.

## Direccion visual

El sitio usa una estetica tecnica, sobria y con bastante contraste. La sensacion general debe ser:

- backend serio
- interfaz utilitaria
- densidad de informacion moderada a alta
- foco en lectura y navegacion
- nada de estilo landing page clasica

### Lenguaje visual actual

- fondo base azul oscuro
- paneles oscuros con borde tenue
- acentos rojos, celestes y verdes
- tipografia limpia, fuerte y legible
- elementos con borde redondeado moderado
- botones y chips pequenos, nada exagerado

### Lo que no debe parecer

- no debe parecer una pagina de marketing
- no debe parecer una app juguetona
- no debe depender de decoracion blanda o brillante
- no debe usar bloques enormes vacios
- no debe esconder la informacion tecnica detras de exceso de diseño

## Sistema visual observado

### Perfil

La pagina `/profile` usa una hero section fuerte con:

- nombre visible en primer plano
- subtitulo profesional
- tags breves
- botones de navegacion
- imagen de perfil o placeholder visual

La pagina tambien incluye un bloque de lecciones recientes en forma de cards.

### Daily lessons

Las lecciones individuales usan una estructura repetible:

- topbar sticky
- marca "Daily Backend"
- botones de navegacion
- hero de leccion con fecha, badge, titulo y metadatos
- indice lateral o superior con scroll spy
- secciones largas con subtitulos, snippets, quotes y callouts
- sidebar con resumen rapido

### Calendar / archivo

El calendario en `/daily` debe permitir escanear fechas y titulos rapidamente. Es un archivo, no una landing. Debe priorizar:

- fecha
- titulo
- navegacion directa
- lectura rapida

## Comportamiento de interfaz

### Navegacion

- la topbar debe ser clara y repetible
- el archivo debe estar siempre accesible
- el perfil debe estar accesible desde las lecciones
- las lecciones deben tener navegacion al bloque anterior

### Lectura

- las lecciones deben tener jerarquia fuerte entre titulo, subtitulo, metadatos y contenido
- las secciones deben ser faciles de escanear
- el indice debe servir para navegar dentro de una pieza larga
- el contenido tecnico debe quedar en bloques compactos y legibles

### Densidad

- el sitio soporta contenido largo
- no hay que adelgazarlo demasiado
- la pagina debe parecer util, no ornamental

## Reglas de UI a respetar

- usar paneles oscuros con borde tenue
- usar chips para metadatos
- usar botones con texto corto y claro
- evitar cards gigantes vacias
- evitar hero marketing vacio
- evitar elementos decorativos sin funcion
- mantener las secciones legibles en mobile
- mantener el texto dentro de sus contenedores

## Patrón de contenido

Las lecciones siguen un patron muy claro:

- titulo del dia
- idea central
- problema real
- ejemplo de mal enfoque
- mejor enfoque
- bloques de razonamiento
- mini ejercicio
- cierre con idea util

Eso hace que el contenido funcione como material de estudio y como referencia tecnica.

## Tono del contenido

El tono es:

- tecnico
- directo
- pedagogico
- senior
- sin exceso de adornos

Debe sonar a alguien que explica decisiones de arquitectura y backend real, no a una pagina promocional.

## Contexto de negocio / marca

El sitio pertenece a una marca personal de backend y conocimiento tecnico. La marca visible en el contenido es:

- `Backend Knowledge Lab`
- `Daily Backend`

El nombre personal aparece en `/profile`.

## Decisiones ya tomadas

- `/` devuelve 404 intencionalmente
- la pagina publica real es `/profile`
- el archivo de contenido vive en `/daily`
- cada leccion tiene su propia ruta
- las lecciones siguen un estilo editorial tecnico
- el sitio prioriza claridad, no efectos decorativos

## Que pedirle a ChatGPT con este documento

Este documento sirve para pedirle a ChatGPT ayuda sobre:

- consistencia visual
- jerarquia tipografica
- arquitectura de pagina
- tono de la interfaz
- patrones de cards, topbar, sidebar e indice
- mejoras de mobile
- reorganizacion del archivo o del perfil
- nuevos componentes para lecciones

## Preguntas utiles para ChatGPT

- Esta pagina sigue pareciendo una herramienta tecnica o se parece demasiado a una landing?
- La jerarquia visual deja claro que es un sitio de contenido y no de marketing?
- El archivo de lecciones se puede escanear rapido?
- La pagina de perfil comunica bien la identidad profesional?
- Hay algun bloque que convenga simplificar sin perder utilidad?
- Las lecciones largas siguen siendo faciles de navegar en mobile?

## Resumen corto

Backend Knowledge Lab es un sitio tecnico, serio y editorial. La home no existe publicamente, `/profile` actua como presentacion profesional y `/daily` organiza lecciones densas en un formato limpio, oscuro y utilitario. El diseño debe reforzar claridad, lectura y navegacion, no decoracion.
