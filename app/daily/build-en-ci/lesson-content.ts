export const sections = [
  {
    "id": "idea",
    "title": "Idea central: construir, publicar y desplegar",
    "paragraphs": [
      "Una aplicación puede construirse en integración continua y ejecutarse en otro servidor. Docker transporta el resultado como una imagen. El Dockerfile define el build; Compose define cómo se ejecuta. Cambiar el lugar de construcción no exige cambiar el comportamiento de la aplicación.",
      "Código → build en GitHub Actions → imagen en GHCR → servidor descarga → contenedor nuevo.",
      "Síntoma del caso didáctico: el VPS agota memoria compilando catalogo-api. Hipótesis: mover el build a CI aliviará ese trabajo. Comprobación: revisar consumo y logs durante la compilación, y contrastarlos con el arranque. Decisión: construir en un runner y conservar la configuración de ejecución. Esto reduce trabajo de compilación; no resuelve por sí solo la memoria que consume la aplicación al funcionar."
    ]
  },
  {
    "id": "preparar",
    "title": "1. Preparar un ejemplo reutilizable",
    "paragraphs": [
      "Supongamos un repositorio ficticio tu-usuario/catalogo-api con rama develop, un Dockerfile funcional en la raíz y un archivo VERSION que contiene 2.3.0. Si tu proyecto usa package.json o un .csproj, puedes leer allí la versión; VERSION hace este ejemplo independiente del lenguaje.",
      "La imagen debe escuchar en 0.0.0.0:8080 dentro del contenedor. El ejemplo construye para un servidor Linux amd64; ajusta la plataforma si tu servidor es ARM. Conserva el Dockerfile, puertos, variables, redes y volúmenes que necesita tu aplicación real. Excluye secretos del contexto mediante .dockerignore."
    ]
  },
  {
    "id": "workflow",
    "title": "2. Workflow: construir y subir a GHCR",
    "paragraphs": [
      "Guarda este ejemplo como .github/workflows/publish-image.yml en el repositorio de la aplicación que deseas construir. Es material didáctico: esta clase no activa un pipeline Docker en el sitio."
    ],
    "code": "name: Construir y publicar imagen\n\non:\n  push:\n    branches: [develop]\n  workflow_dispatch:\n\npermissions:\n  contents: read\n  packages: write\n\nconcurrency:\n  group: publicar-${{ github.ref }}\n  cancel-in-progress: false\n\njobs:\n  publicar:\n    # La ejecución manual también debe usar develop.\n    if: github.ref == 'refs/heads/develop'\n    runs-on: ubuntu-latest\n    steps:\n      - name: Descargar código\n        uses: actions/checkout@v4\n\n      - name: Preparar etiquetas\n        id: meta\n        env:\n          REPOSITORY: ${{ github.repository }}\n        run: |\n          IMAGE=\"ghcr.io/${REPOSITORY,,}\"\n          VERSION=\"$(tr -d '\\r\\n' < VERSION)\"\n          [[ \"$VERSION\" =~ ^[0-9]+\\.[0-9]+\\.[0-9]+$ ]]\n          SHA_SHORT=\"${GITHUB_SHA:0:7}\"\n          echo \"image=$IMAGE\" >> \"$GITHUB_OUTPUT\"\n          echo \"tag=$VERSION-$SHA_SHORT\" >> \"$GITHUB_OUTPUT\"\n\n      - name: Preparar Buildx\n        uses: docker/setup-buildx-action@v4\n\n      - name: Autenticar en GHCR\n        uses: docker/login-action@v4\n        with:\n          registry: ghcr.io\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n\n      - name: Construir y publicar\n        uses: docker/build-push-action@v7\n        with:\n          context: .\n          file: ./Dockerfile\n          platforms: linux/amd64\n          push: true\n          tags: |\n            ${{ steps.meta.outputs.image }}:${{ steps.meta.outputs.tag }}\n            ${{ steps.meta.outputs.image }}:develop\n          labels: |\n            org.opencontainers.image.source=https://github.com/${{ github.repository }}\n            org.opencontainers.image.revision=${{ github.sha }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max",
    "language": "yaml",
    "caption": ".github/workflows/publish-image.yml",
    "after": [
      "Cada push a develop descarga el código, genera etiquetas en minúsculas, inicia Buildx, autentica y publica con push: true. GitHub aporta GITHUB_TOKEN automáticamente; packages: write permite publicar. El paquete debe permitir acceso al repositorio del workflow, especialmente si ya existía. La etiqueta source vincula la imagen con su origen.",
      "Resultado del ejemplo: ghcr.io/tu-usuario/catalogo-api:2.3.0-a1b2c3d y :develop. La primera identifica versión + commit; develop es un alias móvil. No sobrescribas las etiquetas de versión si quieres usarlas para recuperación: una etiqueta puede cambiar. Para fijar exactamente el contenido, usa un digest ghcr.io/tu-usuario/catalogo-api@sha256:… real.",
      "La caché acelera builds; no contiene la configuración del servidor. Este workflow construye y publica, pero no ejecuta tests ni despliega. Añade las pruebas apropiadas como requisito previo a publicar en un pipeline real. Para mayor control, fija las acciones a SHAs verificados y actualízalos de forma deliberada."
    ]
  },
  {
    "id": "compose",
    "title": "3. Compose: ejecutar la imagen en el servidor",
    "paragraphs": [
      "En el VPS guarda compose.yaml y api.env. Reemplaza tu-usuario por el namespace real en minúsculas. api.env contiene las variables que tu aplicación ya necesita; no lo subas al repositorio. La imagen se selecciona con IMAGE_TAG, que por defecto vale develop."
    ],
    "code": "services:\n  api:\n    image: ghcr.io/tu-usuario/catalogo-api:${IMAGE_TAG:-develop}\n    restart: unless-stopped\n    ports:\n      - \"127.0.0.1:5000:8080\"\n    env_file:\n      - ./api.env",
    "language": "yaml",
    "caption": "compose.yaml",
    "after": [
      "El servidor usa image en lugar de build. No necesita el código fuente para compilar, pero sí su configuración de ejecución. Un mount sobre el directorio de la aplicación podría ocultar los archivos de la nueva imagen: conserva solo los mounts necesarios.",
      "127.0.0.1:5000 permite probar desde el VPS o usar un proxy instalado en el host. Si tu proxy vive en Docker, conserva la red y el direccionamiento de ese diseño. La aplicación sigue escuchando en 8080 dentro del contenedor. Este ejemplo mínimo no incluye base de datos: conserva las dependencias, redes y volúmenes de tu Compose real."
    ]
  },
  {
    "id": "auth",
    "title": "4. Permisos de descarga",
    "paragraphs": [
      "Una imagen pública de GHCR permite descarga anónima. Para una privada, autentica en el servidor con un token personal clásico con read:packages y acceso al paquete; autoriza SSO si la organización lo exige. El GITHUB_TOKEN del workflow no es una credencial permanente del VPS."
    ],
    "code": "# GHCR_USER y GHCR_TOKEN se aportan fuera del repositorio.\nprintf '%s' \"$GHCR_TOKEN\" | docker login ghcr.io \\\n  -u \"$GHCR_USER\" --password-stdin",
    "language": "bash",
    "caption": "Login para un paquete privado",
    "after": [
      "No escribas el token literal en Compose, comandos guardados ni Git. Docker guarda credenciales o usa un gestor de credenciales: configura ese almacenamiento según tu servidor. Un error denied se investiga revisando identidad, permisos y visibilidad del paquete."
    ]
  },
  {
    "id": "deploy",
    "title": "5. Descargar y recrear",
    "paragraphs": [
      "Ejecuta la actualización en el mismo proyecto Compose que ya opera el servicio. Descargar una imagen no reemplaza el contenedor que está funcionando."
    ],
    "code": "# Desde el directorio que contiene compose.yaml y api.env:\ndocker compose pull api && \\\n  docker compose up -d --no-build --no-deps api\n\n# Alternativa en un solo comando:\n# docker compose up -d --pull always --no-build --no-deps api",
    "language": "bash",
    "caption": "Actualizar únicamente api",
    "after": [
      "El && impide avanzar si falla la descarga. up recrea el contenedor cuando cambia la imagen; --no-build evita compilar y --no-deps limita la operación a api. Sus dependencias deben estar funcionando: en un primer despliegue arráncalas según tu configuración.",
      "docker compose restart reinicia el contenedor existente con la imagen que ya tenía. Si publicaste develop y sigue la versión antigua, comprueba la descarga y la recreación. Esta actualización puede causar una interrupción breve; no es una estrategia de cero downtime."
    ]
  },
  {
    "id": "qa",
    "title": "Mirada QA: verificar el resultado",
    "paragraphs": [
      "Build exitoso prueba que se pudo construir y publicar. No demuestra que el servicio funcione con las variables, redes y bases de datos del VPS. Después de actualizar, verifica la imagen, el arranque y un resultado funcional."
    ],
    "code": "docker compose ps api\ndocker compose logs --tail=100 api\n\nCONTAINER_ID=$(docker compose ps -q api)\ndocker inspect --format '{{.Config.Image}} | {{.Image}}' \"$CONTAINER_ID\"\ndocker image inspect ghcr.io/tu-usuario/catalogo-api:develop \\\n  --format '{{.Id}} | {{index .Config.Labels \"org.opencontainers.image.revision\"}}'\n\n# Ejemplo: /health y /products deben existir en tu aplicación.\ncurl --fail --show-error http://127.0.0.1:5000/health\ncurl --fail --show-error http://127.0.0.1:5000/products",
    "language": "bash",
    "caption": "Imagen, logs y smoke test",
    "after": [
      "Compara .Image del contenedor con .Id de la imagen descargada y la etiqueta revision con el commit esperado. Ver solo :develop no demuestra qué contenido está ejecutándose. Revisa errores y reinicios en logs.",
      "curl --fail detecta errores HTTP, pero un 200 no basta: comprueba el cuerpo esperado de /health y que /products devuelve un producto conocido del entorno de prueba. Ajusta rutas, autenticación y aserciones a tu API. Un proceso Up puede seguir sin acceso a su base de datos."
    ]
  },
  {
    "id": "rollback",
    "title": "Volver a una construcción anterior",
    "paragraphs": [
      "Registra la etiqueta o digest anterior antes de actualizar y conserva esa imagen en el registro. Si falla la nueva versión, selecciona la anterior y repite el smoke test."
    ],
    "code": "# Sustituye por una etiqueta anterior que realmente exista:\nIMAGE_TAG=2.3.0-a1b2c3d docker compose up -d \\\n  --pull always --no-build --no-deps api",
    "language": "bash",
    "caption": "Rollback por etiqueta",
    "after": [
      "Persiste luego IMAGE_TAG en el .env de Compose para que la siguiente operación no vuelva accidentalmente a develop. Este .env controla la interpolación de Compose; api.env aporta variables al contenedor. Volver a la imagen anterior no revierte migraciones ni datos: confirma compatibilidad del esquema y plan de recuperación."
    ]
  },
  {
    "id": "reto",
    "title": "Regla mental, mini reto y cierre",
    "paragraphs": [
      "Construir, publicar y desplegar son tres pasos distintos. Un push puede automatizar los dos primeros; el tercero ocurre cuando el servidor descarga y recrea, y se valida con un smoke test.",
      "Mini reto: el workflow publicó develop, ejecutaste docker compose pull api y el navegador muestra la versión vieja. ¿Qué paso falta? ¿Cómo demostrarías qué commit se ejecuta?"
    ],
    "answer": "Falta docker compose up -d --no-build --no-deps api. Compara el ID de imagen del contenedor con el de la imagen descargada y su label revision con el SHA esperado; después afirma un comportamiento de esa versión. Si sigue vieja, revisa el proyecto Compose, mounts, proxy y cachés con evidencia.",
    "after": [
      "Mover el build a CI reduce la carga de compilación del servidor. Conserva el contrato de ejecución y valida después de cada actualización. La imagen entregada y el servicio funcionando son dos evidencias diferentes."
    ]
  }
];
