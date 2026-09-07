# Resumen de trabajo — Integración de TradeOps 360 con Odoo 17 local

Hoy conseguimos pasar de tener **Odoo 17 funcionando por un lado** y **TradeOps 360 desarrollado por otro**, a tener ambos preparados para trabajar juntos en un mismo entorno local.

---

## 1. Confirmamos que PostgreSQL funciona correctamente

Partíamos de:

```bash
sudo systemctl status postgresql
```

donde aparecía:

```text
Active: active (exited)
```

Confirmamos que esto puede ser normal en Ubuntu/Linux Mint porque `postgresql.service` actúa como wrapper de los clusters PostgreSQL.

Comprobamos el cluster real con:

```bash
pg_lsclusters
```

Resultado:

```text
PostgreSQL 16
Cluster: main
Port: 5432
Status: online
Owner: postgres
```

Por tanto:

```text
PostgreSQL 16 ✅
Puerto 5432   ✅
Cluster online ✅
```

---

## 2. Creamos el usuario PostgreSQL de Odoo

Creamos:

```text
odoo17
```

con capacidad para crear bases de datos.

La comprobación con:

```bash
sudo -u postgres psql -c "\du"
```

mostró:

```text
odoo17 | Create DB
```

Esto permite que Odoo cree y gestione bases de desarrollo como:

```text
tradeops_dev
```

---

## 3. Configuramos la autenticación PostgreSQL

Inicialmente Odoo intentaba conectarse mediante socket Unix y PostgreSQL respondió:

```text
FATAL: Peer authentication failed for user "odoo17"
```

El problema era:

```text
Usuario Linux:       alejo
Usuario PostgreSQL:  odoo17
```

y la autenticación `peer` esperaba correspondencia entre ambos.

Decidimos utilizar una conexión TCP autenticada.

Asignamos contraseña al usuario:

```sql
ALTER USER odoo17 WITH PASSWORD 'odoo17_dev';
```

Y configuramos Odoo con:

```ini
db_host = 127.0.0.1
db_port = 5432
db_user = odoo17
db_password = odoo17_dev
```

Con esto Odoo quedó conectado correctamente a:

```text
odoo17@127.0.0.1:5432
```

---

## 4. Conseguimos levantar Odoo 17

Instalamos las dependencias Python de Odoo y comprobamos:

```bash
./odoo-bin --help
```

Posteriormente arrancamos el servidor y vimos:

```text
Odoo version 17.0
database: odoo17@127.0.0.1:5432
HTTP service (werkzeug) running on ...:8069
```

Esto confirmó:

```text
Odoo 17            ✅
Python              ✅
PostgreSQL          ✅
psycopg2            ✅
Servidor HTTP       ✅
localhost:8069      ✅
```

---

# 5. Definimos las rutas definitivas del proyecto

Al principio habíamos trabajado utilizando:

```text
~/dev/odoo17
```

pero hoy aclaramos que las rutas reales que queremos utilizar son:

```text
/home/alejo/Github/Odoo/
```

con esta estructura:

```text
/home/alejo/Github/Odoo/
│
├── odoo17/
│
└── TradeOps_360/
```

Por tanto, desde ahora esas son las ubicaciones oficiales de trabajo.

---

# 6. Ruta definitiva de Odoo 17

Nuestro runtime de Odoo vive en:

```text
/home/alejo/Github/Odoo/odoo17/
```

Con una estructura parecida a:

```text
odoo17/
├── odoo/
├── venv/
├── config/
│   └── odoo.conf
└── custom_addons/
```

---

# 7. Ruta definitiva de TradeOps 360

El repositorio del proyecto vive en:

```text
/home/alejo/Github/Odoo/TradeOps_360/
```

Y contiene:

```text
TradeOps_360/
├── .git/
├── README.md
├── CHANGELOG.md
├── AGENTS.md
├── docs/
└── custom_addons/
    ├── trade_core/
    ├── trade_import/
    └── trade_presale/
```

Confirmamos físicamente:

```bash
ls /home/alejo/Github/Odoo/TradeOps_360/custom_addons
```

Resultado:

```text
trade_core
trade_import
trade_presale
```

---

# 8. Revisamos el proyecto TradeOps existente

Descubrimos que TradeOps **ya está implementado como addons de Odoo**.

Esto fue importante porque inicialmente estábamos pensando en crear:

```text
trade_core
trade_import
trade_presale
```

desde cero.

Pero el proyecto ya contiene esos módulos.

La arquitectura prevista de TradeOps es precisamente una suite de módulos custom que reutiliza Odoo estándar en lugar de reconstruir ERP, Sales, Inventory o Contacts.

Por tanto decidimos:

> No reescribir TradeOps y no copiar sus módulos manualmente dentro del source de Odoo.

---

# 9. Decidimos mantener Odoo y TradeOps como proyectos separados

La arquitectura definitiva será:

```text
/home/alejo/Github/Odoo/
│
├── odoo17/
│   ├── odoo/
│   ├── venv/
│   ├── config/
│   └── custom_addons/
│
└── TradeOps_360/
    ├── .git/
    ├── docs/
    └── custom_addons/
        ├── trade_core/
        ├── trade_import/
        └── trade_presale/
```

Esto conserva:

```text
Odoo source
```

independiente de:

```text
TradeOps Git repository
```

---

# 10. Conectamos TradeOps con Odoo mediante `addons_path`

Modificamos:

```text
/home/alejo/Github/Odoo/odoo17/config/odoo.conf
```

Y dejamos:

```ini
addons_path = /home/alejo/Github/Odoo/odoo17/odoo/addons,/home/alejo/Github/Odoo/odoo17/custom_addons,/home/alejo/Github/Odoo/TradeOps_360/custom_addons
```

Confirmamos:

```bash
grep addons_path /home/alejo/Github/Odoo/odoo17/config/odoo.conf
```

y apareció correctamente la ruta:

```text
/home/alejo/Github/Odoo/TradeOps_360/custom_addons
```

Esta es realmente la unión entre ambos proyectos.

Ahora:

```text
Odoo 17
   ↓
addons_path
   ↓
TradeOps_360/custom_addons
   ↓
trade_core
trade_import
trade_presale
```

---

# 11. Descubrimos que el `venv` había quedado roto

Cuando intentamos arrancar el Odoo ubicado en:

```text
/home/alejo/Github/Odoo/odoo17/
```

apareció:

```text
ModuleNotFoundError: No module named 'psycopg2'
```

Después descubrimos algo más importante:

```text
bash: .../venv/bin/pip: cannot execute: required file not found
```

y:

```bash
which pip
```

devolvía:

```text
/usr/bin/pip
```

mientras `python` ni siquiera existía dentro del entorno.

Esto demostraba que el `venv` había quedado inválido, probablemente después del movimiento/cambio de ubicación del workspace.

---

# 12. Recreamos completamente el entorno virtual

Eliminamos únicamente:

```text
venv/
```

y lo recreamos en su ubicación definitiva:

```text
/home/alejo/Github/Odoo/odoo17/venv/
```

Posteriormente reinstalamos:

```text
pip
wheel
setuptools
```

y todas las dependencias de:

```text
odoo/requirements.txt
```

Con esto recuperamos:

```text
Python ✅
pip ✅
psycopg2 ✅
Odoo dependencies ✅
```

---

# 13. Arrancamos Odoo desde la ubicación definitiva

Finalmente pudimos ejecutar:

```bash
cd /home/alejo/Github/Odoo/odoo17
source venv/bin/activate

cd odoo

./odoo-bin \
    -c ../config/odoo.conf \
    -d tradeops_dev
```

Odoo comenzó a cargar módulos correctamente.

Al final apareció:

```text
Modules loaded.
Registry loaded.
```

Esto significa que:

```text
Odoo ✅
venv ✅
PostgreSQL ✅
tradeops_dev ✅
Registry ✅
```

están funcionando desde la nueva ubicación.

---

# 14. Confirmamos que `tradeops_dev` existe y funciona

Odoo consiguió cargar correctamente la base:

```text
tradeops_dev
```

Por tanto no tuvimos que crear una nueva base de datos.

La arquitectura actual queda:

```text
PostgreSQL 16
     │
     ▼
tradeops_dev
     ▲
     │
   Odoo ORM
     ▲
     │
   Odoo 17
```

---

# 15. Intentamos entrar en Odoo

Al abrir:

```text
http://localhost:8069
```

Odoo solicitó usuario y contraseña.

Inicialmente intentamos utilizar:

```text
admin@tradeops.local
```

pero no funcionó.

En lugar de seguir adivinando credenciales, entramos directamente al Odoo shell.

---

# 16. Consultamos los usuarios reales con Odoo ORM

Ejecutamos:

```bash
./odoo-bin shell \
    -c ../config/odoo.conf \
    -d tradeops_dev
```

Dentro del shell:

```python
users = env["res.users"].sudo().search([])
```

y:

```python
[(u.id, u.login, u.name, u.active) for u in users]
```

Obtuvimos:

```python
[
    (7, 'portal', 'Joel Willis', True),
    (6, 'demo', 'Marc Demo', True),
    (2, 'admin', 'Mitchell Admin', True)
]
```

Así descubrimos que el administrador real era:

```text
ID:    2
Login: admin
Name:  Mitchell Admin
```

---

# 17. Reseteamos la contraseña del administrador

Desde Odoo shell utilizamos el propio ORM:

```python
admin = env["res.users"].sudo().browse(2)
admin.write({"password": "admin"})
env.cr.commit()
```

Después pudimos entrar correctamente con:

```text
Usuario:
admin

Contraseña:
admin
```

---

# 18. Odoo ya es accesible desde el navegador

Finalmente conseguimos entrar correctamente en:

```text
http://localhost:8069
```

utilizando:

```text
Database: tradeops_dev
User: admin
```

Por tanto:

```text
Login Odoo ✅
tradeops_dev ✅
localhost:8069 ✅
```

---

# 19. Estado actual de TradeOps

Conceptualmente, TradeOps ya está diseñado hasta la integración de Preventa con `sale.order`.

El flujo previsto actualmente es:

```text
Importación
     ↓
Productos + gastos
     ↓
Costo real
     ↓
Recepción
     ↓
Preventa
     ↓
sale.order
```



Y los módulos actuales son:

```text
trade_core
     ↓
trade_import
     ↓
trade_presale
```

La idea sigue siendo no crear módulos futuros hasta que realmente se necesiten.

---

# 20. Estado actual del entorno completo

Ahora tenemos:

```text
PostgreSQL 16                           ✅
Cluster main                            ✅
Puerto 5432                             ✅

Usuario PostgreSQL odoo17               ✅
Create DB                               ✅
Conexión TCP                            ✅

Odoo 17 source                          ✅
Python virtualenv                       ✅
requirements                            ✅
psycopg2                                ✅

tradeops_dev                            ✅
Registry                                ✅
localhost:8069                          ✅
Login admin                             ✅

TradeOps_360 repo                       ✅
trade_core                              ✅ código existente
trade_import                            ✅ código existente
trade_presale                           ✅ código existente

TradeOps añadido a addons_path          ✅
```

---

# 21. Arquitectura final conseguida hoy

```text
                    Browser
                       │
                       │ localhost:8069
                       ▼
                    Odoo 17
                       │
             ┌─────────┴─────────┐
             │                   │
      Odoo standard         addons_path
          addons                 │
                                 ▼
                         TradeOps_360
                         custom_addons
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
          trade_core        trade_import      trade_presale
               │                 │                 │
               └─────────────────┴─────────────────┘
                                 │
                              Odoo ORM
                                 │
                                 ▼
                           PostgreSQL 16
                                 │
                                 ▼
                           tradeops_dev
```

---

# 22. Flujo de trabajo que utilizaremos desde ahora

El código de TradeOps se modifica directamente en:

```text
/home/alejo/Github/Odoo/TradeOps_360/
```

Por ejemplo:

```text
/home/alejo/Github/Odoo/TradeOps_360/custom_addons/trade_import/
```

El código de Odoo vive en:

```text
/home/alejo/Github/Odoo/odoo17/odoo/
```

El runtime Python en:

```text
/home/alejo/Github/Odoo/odoo17/venv/
```

La configuración en:

```text
/home/alejo/Github/Odoo/odoo17/config/odoo.conf
```

Y la base:

```text
tradeops_dev
```

Por tanto, nuestro flujo de desarrollo será:

```text
Editar TradeOps
      ↓
reiniciar / actualizar addon
      ↓
Odoo Registry
      ↓
ORM
      ↓
tradeops_dev
      ↓
probar desde navegador
```

---

# 23. Próximo paso

Ahora que la infraestructura está funcionando, ya podemos dejar de trabajar en la instalación.

El siguiente objetivo es comprobar que Odoo detecte los addons y comenzar a instalarlos en este orden:

```text
1. trade_core
       ↓
2. trade_import
       ↓
3. trade_presale
```

Después ejecutaremos el primer vertical slice real:

```text
Crear Importación
       ↓
Añadir productos
       ↓
Añadir gastos
       ↓
Calcular costo real
       ↓
Crear Preventa
       ↓
Confirmar Preventa
       ↓
Convertir
       ↓
sale.order estándar de Odoo
```

Ese es precisamente el objetivo práctico que habíamos establecido para dejar de mantener TradeOps únicamente como teoría y comenzar a ejecutarlo realmente sobre Odoo 17.

# Resultado del día

Hoy pasamos de:

```text
Odoo por un lado

+

TradeOps por otro
```

a tener:

```text
Odoo 17 funcionando
        +
PostgreSQL funcionando
        +
tradeops_dev funcionando
        +
TradeOps añadido al addons_path
        +
entorno Python reparado
        +
login administrador recuperado
        =
entorno real de desarrollo de TradeOps 360 listo
```

A partir de este punto, el trabajo deja de ser principalmente **montar infraestructura** y pasa a ser realmente **desarrollar, instalar, probar y depurar TradeOps 360 dentro de Odoo 17**.