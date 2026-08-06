"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  { id: "idea", label: "1) Idea clave", title: "Que es AWS", subtitle: "Cloud permite consumir infraestructura bajo demanda sin administrar fisicamente cada servidor.", chip: "Cloud", content: "AWS = Amazon Web Services\n\nEn lugar de comprar servidores, discos, switches y configurar un centro de datos, alquilamos recursos y servicios administrados.\n\nAWS ayuda a escalar aplicaciones, balancear trafico, almacenar archivos, operar bases de datos, ejecutar procesos y monitorizar sistemas." },
  { id: "cloud", label: "2) Cloud Computing", title: "De la infraestructura fisica a los servicios", subtitle: "La nube cambia la velocidad y el modelo operativo, pero no elimina las decisiones de arquitectura.", chip: "Fundamentos", content: "Antes:\nComprar hardware -> configurar red -> instalar sistema -> publicar.\n\nAhora:\nCrear recurso -> configurar seguridad -> desplegar -> observar.\n\nPay As You Go significa pagar por el uso, aunque el coste debe controlarse con limites, presupuestos y alertas." },
  { id: "global", label: "3) Infraestructura global", title: "Regiones y Availability Zones", subtitle: "La ubicacion de los recursos afecta latencia, disponibilidad, cumplimiento y coste.", chip: "Regiones", content: "Region = area geografica.\nAvailability Zone = centro de datos aislado dentro de una region.\n\nUna aplicacion critica distribuye sus componentes entre varias zonas para sobrevivir al fallo de una de ellas. Elegir region requiere revisar usuarios, datos, servicios disponibles y regulacion." },
  { id: "availability", label: "4) Alta disponibilidad", title: "Diseñar para que una zona pueda fallar", subtitle: "La nube no garantiza por si sola la disponibilidad: la arquitectura debe utilizar redundancia.", chip: "Resiliencia", content: "Load Balancer\n      |\n  +---+---+\n  |       |\n App AZ-a  App AZ-b\n\nLa base de datos, almacenamiento y procesos tambien necesitan una estrategia de redundancia, backups y recuperacion. Alta disponibilidad no significa que nada pueda fallar." },
  { id: "responsibility", label: "5) Responsabilidad", title: "Modelo de responsabilidad compartida", subtitle: "AWS protege la infraestructura; el equipo protege configuracion, datos, identidades y aplicaciones.", chip: "Seguridad", content: "AWS suele proteger:\n- edificios y hardware\n- red fisica\n- hipervisor\n\nEl equipo debe proteger:\n- IAM y permisos\n- sistema operativo cuando corresponda\n- reglas de red\n- datos y backups\n- secretos\n- codigo y configuracion\n\nUsar un servicio administrado no elimina la responsabilidad." },
  { id: "compute", label: "6) Compute", title: "EC2, ECS, Fargate y Lambda", subtitle: "AWS ofrece distintos niveles de control para ejecutar backend y workers.", chip: "Compute", content: "EC2: maquina virtual con control del sistema operativo.\nECS: ejecutar contenedores como tareas y servicios.\nFargate: contenedores sin administrar servidores.\nLambda: funciones bajo demanda, sin mantener procesos permanentes.\n\nLa eleccion depende de control requerido, duracion, trafico, cold starts, operacion y coste." },
  { id: "containers", label: "7) Contenedores", title: "AWS no sustituye Docker", subtitle: "Docker empaqueta la aplicacion; AWS ofrece lugares donde ejecutar esa imagen.", chip: "Docker", content: "Dockerfile -> imagen -> registry -> ECS/Fargate/EKS\n\nDocker resuelve empaquetado y reproducibilidad. AWS resuelve infraestructura, red, permisos, escalado y operacion. Son capas diferentes y complementarias." },
  { id: "storage", label: "8) Storage", title: "S3 para objetos y archivos", subtitle: "S3 es almacenamiento durable para objetos, no una base de datos relacional.", chip: "Storage", content: "Usos comunes:\n- imagenes y documentos\n- backups\n- logs\n- artefactos de CI/CD\n- archivos estaticos\n\nPensar en buckets, politicas IAM, cifrado, versionado, lifecycle y acceso privado. No exponer un bucket por comodidad." },
  { id: "databases", label: "9) Bases de datos", title: "RDS y DynamoDB", subtitle: "Elegir persistencia depende del modelo de datos y del patron de acceso, no de la moda.", chip: "Databases", content: "RDS ofrece motores relacionales administrados como PostgreSQL, con backups, replicas y mantenimiento gestionado.\n\nDynamoDB es NoSQL administrado y escala con un modelo basado en claves y patrones de acceso definidos.\n\nPara OrderFlow, RDS puede encajar con el dominio relacional; DynamoDB exige diseñar primero como se consultaran los datos." },
  { id: "cache", label: "10) Cache", title: "Cachear sin perder consistencia", subtitle: "El cache reduce latencia y carga, pero agrega invalidacion, coste y decisiones de consistencia.", chip: "Redis", content: "Una opcion habitual es ElastiCache con Redis.\n\nDefinir:\n- que datos se cachean\n- TTL\n- estrategia de invalidacion\n- comportamiento ante cache miss\n- limite de memoria\n\nNunca tratar el cache como unica fuente de verdad si el negocio necesita persistencia durable." },
  { id: "network", label: "11) Redes", title: "VPC, subnets y Load Balancer", subtitle: "La red define que puede hablar con que y como entra el trafico al sistema.", chip: "Networking", content: "VPC\n  |\n  +-- Public subnet: Load Balancer\n  +-- Private subnet: API y workers\n  +-- Private subnet: PostgreSQL\n\nEl Load Balancer distribuye peticiones. Las bases de datos normalmente no deben exponerse a Internet. Security Groups y rutas deben aplicar el minimo acceso necesario." },
  { id: "iam", label: "12) IAM", title: "Identidad y permisos", subtitle: "IAM controla quien puede hacer que sobre cada recurso de AWS.", chip: "IAM", content: "Principios:\n- minimo privilegio\n- roles en lugar de claves permanentes\n- permisos especificos por recurso\n- separar ambientes\n- MFA para accesos humanos\n- revisar y rotar credenciales\n\nUna aplicacion no necesita permisos de administrador para leer una cola o escribir un bucket concreto." },
  { id: "secrets", label: "13) Secrets Manager", title: "Gestionar secretos de forma segura", subtitle: "Las credenciales deben inyectarse en runtime y poder rotarse sin cambiar el codigo.", chip: "Secrets", content: "AWS Secrets Manager puede almacenar credenciales y permitir rotacion.\n\nEl flujo correcto es:\nAplicacion -> IAM Role -> Secrets Manager -> secreto en memoria\n\nNo escribir secretos en Git, imagenes Docker, logs, variables del frontend ni mensajes de error." },
  { id: "observability", label: "14) Observabilidad", title: "Logs, metricas y trazas en AWS", subtitle: "CloudWatch y OpenTelemetry ayudan a entender si el sistema esta sano y cuanto cuesta.", chip: "Observabilidad", content: "Medir:\n- CPU y memoria\n- latencia p95\n- errores 4xx y 5xx\n- throughput\n- reinicios\n- colas pendientes\n- conexiones de base de datos\n- coste por servicio\n\nUn dashboard no reemplaza alertas accionables, runbooks y trazas distribuidas." },
  { id: "architecture", label: "15) Arquitectura", title: "OrderFlow en AWS", subtitle: "Los servicios vistos se combinan en una plataforma ejecutable y observable.", chip: "OrderFlow", content: "Route / Load Balancer\n        |\n      ECS/Fargate o EKS\n        |\n  Orders - Inventory - Payments\n    |          |\n RabbitMQ     RDS PostgreSQL\n        |\n   S3 + Redis + CloudWatch\n\nCada servicio necesita IAM, secretos, health checks, logs, metricas, backups y una estrategia de despliegue." },
  { id: "mistakes", label: "16) Errores", title: "Errores comunes al empezar", subtitle: "Aprender AWS no consiste en memorizar cientos de servicios ni crear recursos sin control.", chip: "Riesgos", content: "- abrir bases de datos a Internet\n- usar root para todo\n- dejar recursos encendidos\n- ignorar costes\n- guardar secretos en Git\n- elegir servicios sin conocer el modelo\n- crear arquitectura compleja sin necesidad\n- no probar backups ni rollback\n\nPrimero entender el problema; despues elegir el servicio minimo que lo resuelve." },
  { id: "checklist", label: "17) Checklist", title: "Que aprender primero", subtitle: "Una ruta practica permite avanzar desde los fundamentos hasta una arquitectura backend real.", chip: "Checklist", content: "Cuenta y billing alerts\nRegiones y Availability Zones\nIAM y roles\nVPC y Security Groups\nEC2 y Load Balancer\nDocker en ECS/Fargate\nS3\nRDS PostgreSQL\nRedis\nRabbitMQ o servicio equivalente\nCloudWatch\nSecrets Manager\nCI/CD\nBackups y rollback\n\nNo necesitas aprender todos los servicios para comenzar." },
  { id: "closing", label: "18) Cierre", title: "Como piensa un backend senior en AWS", subtitle: "La nube no es una lista de productos: es una forma de operar sistemas con decisiones explicitas.", chip: "Cierre", content: "Backend junior:\nQue servicio uso?\n\nBackend senior:\nQue problema resuelvo? Que disponibilidad necesito? Que datos manejo? Como protejo el acceso? Como recupero el sistema? Cuanto cuesta? Como lo observo?\n\nAWS amplia las posibilidades, pero la arquitectura sigue dependiendo del criterio tecnico." },
];

export default function Daily147Client() {
  const [activeSection, setActiveSection] = useState("idea");

  useEffect(() => {
    const nodes = sections.map((section) => document.getElementById(section.id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/146";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>AWS desde cero</div></div></div>
      <nav className={styles.nav} aria-label="Navegacion"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/146"><span className={styles.kbd}>←</span> Dia 146</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>02/08/2026</div><div className={styles.badge}>Daily #147 • AWS Cloud</div><h2 className={styles.title}>AWS desde cero para desarrolladores backend</h2><p className={styles.lead}>AWS permite llevar OrderFlow desde Docker y Kubernetes local hacia una infraestructura global, segura, escalable y observable.</p></div>
      <nav className={styles.toc} aria-label="Indice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/146"><span className={styles.kbd}>←</span> Dia 146</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
