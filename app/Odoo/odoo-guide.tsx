"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Step = {
  title: string;
  description: string;
  command?: string;
};

const steps: Step[] = [
  {
    title: "Instala PostgreSQL y las herramientas base",
    description: "Actualiza el sistema e instala Git, Python, compiladores y PostgreSQL.",
    command: `sudo apt update\n\nsudo apt install -y \\\n+  git python3-pip python3-venv python3-dev build-essential \\\n+  libpq-dev postgresql postgresql-client`,
  },
  {
    title: "Crea el usuario de base de datos",
    description: "Odoo utilizará este usuario para crear sus bases de datos de desarrollo.",
    command: "sudo -u postgres createuser -d -R -S odoo17",
  },
  {
    title: "Prepara el espacio de trabajo y descarga Odoo 17",
    description: "La rama 17.0 contiene el código fuente de la versión que vamos a ejecutar.",
    command: `mkdir -p ~/dev/odoo17\ncd ~/dev/odoo17\ngit clone --depth 1 --branch 17.0 https://github.com/odoo/odoo.git`,
  },
  {
    title: "Crea el entorno virtual e instala dependencias",
    description: "Mantener Python aislado evita conflictos con paquetes del sistema.",
    command: `cd ~/dev/odoo17\npython3 -m venv venv\nsource venv/bin/activate\npip install --upgrade pip wheel setuptools\ncd odoo\npip install -r requirements.txt`,
  },
  {
    title: "Añade tus módulos y la configuración",
    description: "Guarda el código propio fuera del core de Odoo, en custom_addons.",
    command: `mkdir -p ~/dev/odoo17/custom_addons ~/dev/odoo17/config\nnano ~/dev/odoo17/config/odoo.conf`,
  },
  {
    title: "Configura PostgreSQL por TCP",
    description: "Asigna una contraseña de desarrollo al usuario odoo17. No la compartas ni la subas a Git.",
    command: `sudo -u postgres psql\nALTER USER odoo17 WITH PASSWORD '<DB_PASSWORD>';\n\\q`,
  },
  {
    title: "Inicia Odoo",
    description: "Con el entorno virtual activo, ejecuta Odoo con el archivo de configuración.",
    command: `cd ~/dev/odoo17/odoo\n./odoo-bin -c ../config/odoo.conf`,
  },
];

const config = `[options]
admin_passwd = <ODOO_MASTER_PASSWORD>
db_host = 127.0.0.1
db_port = 5432
db_user = odoo17
db_password = <DB_PASSWORD>
addons_path = /home/user/dev/odoo17/odoo/addons,/home/user/dev/odoo17/custom_addons
http_port = 8069
log_level = info`;

export default function OdooGuide() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <main className={styles.page}>
        <button className={styles.startButton} type="button" onClick={() => setIsOpen(true)}>
          Cómo poner Odoo a funcionar en tu PC Linux
        </button>
      </main>
    );
  }

  return (
    <main className={styles.guidePage}>
      <article className={styles.guide}>
        <header className={styles.header}>
          <button className={styles.backButton} type="button" onClick={() => setIsOpen(false)}>
            ← Volver
          </button>
          <p className={styles.eyebrow}>Odoo 17 · Linux Mint</p>
          <h1>Cómo poner Odoo a funcionar en tu PC Linux</h1>
          <p>Instalación desde código fuente con PostgreSQL local y un espacio separado para tus módulos.</p>
        </header>

        <section className={styles.content}>
          <div className={styles.notice}>
            <strong>Antes de empezar:</strong> sustituye <code>user</code> por tu usuario de Linux y nunca publiques los valores de contraseña de ejemplo.
          </div>

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
                {step.command && <pre><code>{step.command}</code></pre>}
              </li>
            ))}
          </ol>

          <section className={styles.configuration}>
            <h2>Contenido de <code>odoo.conf</code></h2>
            <pre><code>{config}</code></pre>
          </section>

          <section className={styles.finish}>
            <h2>Abre Odoo y úsalo cada día</h2>
            <p>Cuando el servidor indique que está escuchando en el puerto 8069, abre:</p>
            <a href="http://localhost:8069" target="_blank" rel="noreferrer">http://localhost:8069</a>
            <p>Para el arranque diario, crea un <code>run.sh</code> que active el entorno virtual y ejecute <code>./odoo-bin -c ../config/odoo.conf -d odoo_dev</code>. Mantén tus desarrollos en <code>custom_addons/</code>, no dentro del core de Odoo.</p>
          </section>
        </section>
      </article>
    </main>
  );
}
