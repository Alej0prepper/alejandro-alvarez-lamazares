# Guía completa para instalar y arrancar Odoo 17 en Linux Mint

Esta guía documenta cómo levantar **Odoo 17 desde código fuente** en Linux Mint utilizando PostgreSQL local, Python, un entorno virtual y un directorio independiente para módulos personalizados.

La estructura final será:

```text
/home/user/dev/odoo17/
├── odoo/
├── custom_addons/
├── config/
│   └── odoo.conf
├── venv/
└── run.sh
```

> En esta guía `user` representa tu usuario de Linux. Sustitúyelo por el resultado de `whoami` cuando sea necesario.

---

# 1. Instalar PostgreSQL y dependencias básicas

```bash
sudo apt update

sudo apt install -y \
  git \
  python3-pip \
  python3-venv \
  python3-dev \
  build-essential \
  libpq-dev \
  postgresql \
  postgresql-client
```

---

# 2. Comprobar PostgreSQL

```bash
sudo systemctl status postgresql
```

En distribuciones basadas en Ubuntu puede aparecer:

```text
Active: active (exited)
```

Esto no significa necesariamente que PostgreSQL esté detenido. `postgresql.service` puede actuar como servicio general encargado de administrar los clusters.

Comprueba el cluster real:

```bash
pg_lsclusters
```

Un resultado correcto puede ser:

```text
Ver Cluster Port Status Owner    Data directory
16  main    5432 online postgres /var/lib/postgresql/16/main
```

Lo importante es:

```text
Status = online
Port   = 5432
```

---

# 3. Crear un usuario PostgreSQL para Odoo

Creamos un usuario específico para Odoo:

```bash
sudo -u postgres createuser -d -R -S odoo17
```

Los parámetros utilizados son:

```text
-d    Permite crear bases de datos
-R    No permite crear otros roles
-S    No convierte el usuario en superusuario
```

Comprueba:

```bash
sudo -u postgres psql -c "\du"
```

Deberías encontrar algo similar a:

```text
 Role name | Attributes
-----------+----------------
 odoo17    | Create DB
 postgres  | Superuser, ...
```

Odoo podrá utilizar `odoo17` para crear posteriormente sus bases de datos.

---

# 4. Crear el workspace

```bash
mkdir -p ~/dev/odoo17
cd ~/dev/odoo17
```

Comprueba:

```bash
pwd
```

Debería corresponder a:

```text
/home/user/dev/odoo17
```

---

# 5. Descargar Odoo 17

Clona directamente la rama 17.0:

```bash
git clone --depth 1 --branch 17.0 https://github.com/odoo/odoo.git
```

Entra:

```bash
cd odoo
```

Comprueba la rama:

```bash
git branch --show-current
```

Debe responder:

```text
17.0
```

---

# 6. Crear el entorno virtual de Python

Vuelve al workspace:

```bash
cd ~/dev/odoo17
```

Crea el entorno:

```bash
python3 -m venv venv
```

Actívalo:

```bash
source venv/bin/activate
```

La terminal debería mostrar algo parecido a:

```text
(venv) user@machine:~/dev/odoo17$
```

Actualiza las herramientas básicas:

```bash
pip install --upgrade pip wheel setuptools
```

Comprueba:

```bash
python --version
pip --version
```

Y verifica que realmente estás utilizando el entorno virtual:

```bash
which python
which pip
```

Deberías obtener rutas similares a:

```text
/home/user/dev/odoo17/venv/bin/python
/home/user/dev/odoo17/venv/bin/pip
```

---

# 7. Instalar dependencias nativas

```bash
sudo apt install -y \
  libldap2-dev \
  libsasl2-dev \
  libxml2-dev \
  libxslt1-dev \
  libjpeg-dev \
  zlib1g-dev \
  libffi-dev \
  libssl-dev
```

---

# 8. Instalar dependencias Python de Odoo

Con el entorno virtual activo:

```bash
cd ~/dev/odoo17/odoo
```

Ejecuta:

```bash
pip install -r requirements.txt
```

La instalación puede tardar porque algunos paquetes necesitan compilarse.

Al finalizar deberías obtener:

```text
Successfully installed ...
```

---

# 9. Comprobar que Odoo puede ejecutarse

Desde:

```text
~/dev/odoo17/odoo
```

ejecuta:

```bash
./odoo-bin --help
```

Una instalación correcta mostrará:

```text
Usage: odoo-bin server [options]
```

Esto confirma que Python, las dependencias y el ejecutable de Odoo funcionan.

---

# 10. Crear `custom_addons`

No es recomendable mezclar nuestros módulos con los addons estándar de Odoo.

Crea:

```bash
mkdir -p ~/dev/odoo17/custom_addons
```

La separación será:

```text
Odoo oficial
    │
    └── odoo/addons/

Código propio
    │
    └── custom_addons/
```

Posteriormente podríamos tener:

```text
custom_addons/
├── custom_core/
├── custom_import/
└── custom_presale/
```

---

# 11. Crear el directorio de configuración

```bash
mkdir -p ~/dev/odoo17/config
```

Comprueba:

```bash
ls -ld ~/dev/odoo17/config
```

---

# 12. Configurar la autenticación PostgreSQL

En determinadas configuraciones locales, utilizar:

```ini
db_host = False
db_user = odoo17
db_password = False
```

puede provocar:

```text
FATAL: Peer authentication failed for user "odoo17"
```

Esto ocurre porque una conexión mediante socket Unix puede utilizar autenticación `peer`.

Por ejemplo:

```text
Usuario Linux       Usuario PostgreSQL
user                 odoo17
  │                    │
  └──── diferentes ────┘
```

Una solución apropiada para un entorno local consiste en utilizar una conexión TCP con contraseña.

Entra en PostgreSQL:

```bash
sudo -u postgres psql
```

Asigna una contraseña de desarrollo:

```sql
ALTER USER odoo17 WITH PASSWORD '<DB_PASSWORD>';
```

Sal:

```sql
\q
```

> Sustituye `<DB_PASSWORD>` por una contraseña propia. No publiques ni almacenes credenciales reales en Git.

---

# 13. Crear `odoo.conf`

```bash
nano ~/dev/odoo17/config/odoo.conf
```

Configuración:

```ini
[options]

admin_passwd = <ODOO_MASTER_PASSWORD>

db_host = 127.0.0.1
db_port = 5432
db_user = odoo17
db_password = <DB_PASSWORD>

addons_path = /home/user/dev/odoo17/odoo/addons,/home/user/dev/odoo17/custom_addons

http_port = 8069

log_level = info
```

Debes sustituir:

```text
<ODOO_MASTER_PASSWORD>
<DB_PASSWORD>
```

por valores propios.

También debes sustituir `/home/user/` por tu directorio real si tu usuario Linux tiene otro nombre.

Puedes comprobarlo con:

```bash
whoami
```

---

# 14. Probar PostgreSQL antes de arrancar Odoo

Puedes comprobar directamente las credenciales:

```bash
PGPASSWORD='<DB_PASSWORD>' \
psql -h 127.0.0.1 \
     -U odoo17 \
     -d postgres \
     -c "SELECT current_user;"
```

Deberías obtener:

```text
 current_user
--------------
 odoo17
```

Esto permite separar los problemas de PostgreSQL de los problemas de Odoo.

---

# 15. Arrancar Odoo

Activa el entorno:

```bash
source ~/dev/odoo17/venv/bin/activate
```

Entra en Odoo:

```bash
cd ~/dev/odoo17/odoo
```

Arranca:

```bash
./odoo-bin -c ../config/odoo.conf
```

Una ejecución correcta mostrará logs similares a:

```text
Odoo version 17.0
Using configuration file at /home/user/dev/odoo17/config/odoo.conf
database: odoo17@127.0.0.1:5432
HTTP service (werkzeug) running on ...:8069
```

El último mensaje confirma que el servidor HTTP está levantado.

---

# 16. Aviso de `wkhtmltopdf`

Es posible encontrar:

```text
You need Wkhtmltopdf to print a pdf version of the reports.
```

Este aviso no impide utilizar Odoo.

Indica que todavía falta configurar `wkhtmltopdf` para determinadas funcionalidades relacionadas con generación de reportes PDF.

Puede resolverse posteriormente si el proyecto necesita esa funcionalidad.

---

# 17. Abrir Odoo

Con el proceso anterior ejecutándose, abre:

```text
http://localhost:8069
```

Deberías llegar al Database Manager de Odoo.

---

# 18. Crear una base de datos

Utiliza como Master Password el valor definido previamente en:

```ini
admin_passwd = <ODOO_MASTER_PASSWORD>
```

Puedes utilizar, por ejemplo:

```text
Database Name:
odoo_dev

Email:
admin@example.local

Password:
<ADMIN_PASSWORD>
```

Selecciona el idioma correspondiente.

Para una base limpia de desarrollo puedes desactivar:

```text
Demo Data
```

Pulsa:

```text
Create Database
```

Odoo utilizará el usuario PostgreSQL `odoo17`, que dispone de `Create DB`, para crear la nueva base.

---

# 19. Activar Developer Mode

Una vez dentro:

```text
Settings
   ↓
Developer Tools
   ↓
Activate Developer Mode
```

También puede activarse mediante:

```text
?debug=1
```

Por ejemplo:

```text
http://localhost:8069/web?debug=1
```

Developer Mode expone numerosas herramientas técnicas necesarias durante el desarrollo de módulos.

---

# 20. Instalar aplicaciones necesarias

Desde:

```text
Apps
```

puedes instalar módulos estándar como:

```text
Contacts
Products
Sales
Inventory
```

Odoo resolverá automáticamente las dependencias entre módulos.

Una regla importante durante el desarrollo es:

> No reimplementar mediante módulos personalizados aquello que Odoo estándar ya resuelve correctamente.

---

# 21. Crear un script de arranque

Una vez creada la base de datos, evita escribir manualmente todos los comandos cada vez.

Crea:

```bash
nano ~/dev/odoo17/run.sh
```

Contenido:

```bash
#!/bin/bash

set -e

cd "$HOME/dev/odoo17"

source venv/bin/activate

cd odoo

exec ./odoo-bin \
    -c ../config/odoo.conf \
    -d odoo_dev
```

Dale permisos:

```bash
chmod +x ~/dev/odoo17/run.sh
```

Ahora puedes arrancar Odoo con:

```bash
cd ~/dev/odoo17
./run.sh
```

---

# 22. Qué hace `run.sh`

El flujo es:

```text
run.sh
   │
   ├── entra al workspace
   │
   ├── activa venv
   │
   ├── entra en odoo/
   │
   ├── carga odoo.conf
   │
   ├── conecta con PostgreSQL
   │
   ├── selecciona odoo_dev
   │
   └── levanta el servidor HTTP
```

Después:

```text
http://localhost:8069
```

---

# 23. Detener Odoo

En la terminal donde está ejecutándose:

```text
Ctrl + C
```

Esto detiene Odoo, pero PostgreSQL puede permanecer funcionando.

---

# 24. Arrancar Odoo diariamente

Una vez instalado todo, el flujo habitual queda reducido a:

```bash
cd ~/dev/odoo17
./run.sh
```

Después:

```text
http://localhost:8069
```

Si necesitas comprobar PostgreSQL:

```bash
pg_lsclusters
```

Debería mostrar el cluster como:

```text
online
```

---

# 25. Arquitectura resultante

```text
                       Linux Mint
                           │
              ┌────────────┴────────────┐
              │                         │
        PostgreSQL                 Python
              │                         │
              │                       venv
              │                         │
              │                      Odoo 17
              │                         │
              │             ┌───────────┴───────────┐
              │             │                       │
              │      Standard Addons          custom_addons
              │                                     │
              │                               módulos propios
              │
              └──────────── odoo_dev
```

La comunicación principal:

```text
Browser
   │
   │ http://localhost:8069
   ▼
Odoo 17
   │
   │ psycopg2 / TCP
   ▼
127.0.0.1:5432
   │
   ▼
PostgreSQL
   │
   ▼
odoo_dev
```

---

# 26. Estructura final

```text
/home/user/dev/odoo17/
│
├── odoo/
│   ├── addons/
│   ├── odoo/
│   ├── odoo-bin
│   ├── requirements.txt
│   └── ...
│
├── custom_addons/
│
├── config/
│   └── odoo.conf
│
├── venv/
│   ├── bin/
│   ├── lib/
│   └── ...
│
└── run.sh
```

---

# 27. Qué modificar y qué no modificar

El directorio:

```text
odoo/
```

contiene el código fuente del framework.

Normalmente no debemos modificar el core de Odoo para implementar requisitos de negocio.

Nuestro código debe vivir en:

```text
custom_addons/
```

Por ejemplo:

```text
custom_addons/
├── custom_core/
├── custom_import/
└── custom_presale/
```

La regla general es:

> **Extender Odoo mediante módulos personalizados en lugar de modificar directamente el core.**

---

# 28. Credenciales y seguridad

No publiques credenciales reales en:

```text
README.md
GitHub
capturas de pantalla
logs
commits
documentación pública
```

En documentación utiliza placeholders:

```text
PostgreSQL:
Host: 127.0.0.1
Port: 5432
User: odoo17
Password: <DB_PASSWORD>

Odoo:
Master Password: <ODOO_MASTER_PASSWORD>

Database:
odoo_dev

Administrator:
admin@example.local
Password: <ADMIN_PASSWORD>
```

Si `odoo.conf` contiene credenciales reales, tampoco debería subirse accidentalmente a un repositorio público.

---

# 29. Diagnóstico de problemas encontrados

## PostgreSQL muestra `active (exited)`

No asumir inmediatamente que PostgreSQL está caído.

Ejecuta:

```bash
pg_lsclusters
```

Comprueba que aparezca:

```text
online
```

## `Peer authentication failed for user "odoo17"`

Una configuración como:

```ini
db_host = False
db_user = odoo17
db_password = False
```

puede utilizar un socket Unix y encontrarse con autenticación `peer`.

La configuración:

```ini
db_host = 127.0.0.1
db_port = 5432
db_user = odoo17
db_password = <DB_PASSWORD>
```

permite utilizar una conexión TCP autenticada.

Conceptualmente:

```text
Socket Unix + peer
        │
        └── puede fallar si los usuarios no coinciden

TCP + usuario/password
        │
        └── autenticación explícita
```

---

# 30. Comandos esenciales

### PostgreSQL

```bash
pg_lsclusters
```

### Activar Python

```bash
source ~/dev/odoo17/venv/bin/activate
```

### Arrancar manualmente Odoo

```bash
cd ~/dev/odoo17/odoo
./odoo-bin -c ../config/odoo.conf
```

### Arrancar una base específica

```bash
./odoo-bin \
  -c ../config/odoo.conf \
  -d odoo_dev
```

### Arranque cotidiano

```bash
cd ~/dev/odoo17
./run.sh
```

### Abrir Odoo

```text
http://localhost:8069
```

---

# 31. Checklist final

Al terminar deberíamos tener:

```text
PostgreSQL                  ✅
Cluster PostgreSQL online   ✅
Usuario odoo17              ✅
Permiso Create DB           ✅

Código fuente Odoo 17       ✅
Rama 17.0                   ✅

Python                      ✅
venv                        ✅
Dependencias Python         ✅
odoo-bin                    ✅

config/                     ✅
odoo.conf                   ✅
custom_addons/              ✅

Conexión PostgreSQL         ✅
127.0.0.1:5432              ✅

Servidor HTTP Odoo          ✅
localhost:8069              ✅

Base de desarrollo          ✅
Developer Mode              ✅
run.sh                      ✅

wkhtmltopdf                  ⚠️ Opcional/pendiente
```

# Resultado

Al finalizar tendremos:

```text
Browser
   │
   ▼
localhost:8069
   │
   ▼
Odoo 17
   │
   ├── código oficial
   ├── configuración local
   ├── standard addons
   ├── custom_addons
   └── entorno Python aislado
          │
          ▼
      PostgreSQL
          │
          ▼
      odoo_dev
```

Este entorno proporciona una base limpia para comenzar a estudiar y desarrollar módulos personalizados sobre **Odoo 17** sin modificar directamente el core del framework.
