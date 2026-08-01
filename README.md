# Backend Knowledge Lab

Repositorio de aprendizaje backend construido con **Next.js + TypeScript**.  
El objetivo es documentar conocimiento técnico en formato de clases diarias y notas prácticas sobre arquitectura, APIs, resiliencia, seguridad y operación en producción.

## Objetivos

- Publicar una lección diaria (`/daily/:day`) con enfoque práctico.
- Consolidar conceptos backend en español.
- Mantener una base de conocimiento navegable, incremental y reutilizable.
- Combinar contenido de estudio con enfoque de ingeniería real.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules
- Node.js (scripts de scaffolding)

## Dashboard Logística Comercial

La ruta `/dashboard` procesa localmente un control logístico en formato `.xlsx` y genera una vista ejecutiva de vehículos, inventarios, consignaciones, cargas y calidad de datos. El archivo no se envía al servidor.

## Estructura del proyecto

```txt
app/
  daily/
    page.tsx                 # Calendario / archivo de lecciones
    daily-calendar-client.tsx
    [numero]/
      page.tsx               # Metadata y entrada de cada lección
      dailyNN-client.tsx     # Contenido de la lección
  atlas/                     # Notas/temas de referencia técnica
  rest-lite/                 # Sección dedicada a REST (versión ligera)
scripts/
  scaffold-daily.mjs         # Generador de nuevas lecciones
commits_con_fechas.txt       # Fuente para mapear lecciones publicadas por fecha
