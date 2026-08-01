"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = { id: string; label: string; title: string; subtitle: string; chip: string; content: string };

const sections: LessonSection[] = [
  { id: "idea", label: "1) Idea clave", title: "Que significa estar listo para produccion", subtitle: "Compilar y tener Docker funcionando no basta: el sistema debe operar durante meses con seguridad y control.", chip: "Produccion", content: "OrderFlow ya tiene arquitectura, microservicios, Docker, Kubernetes, RabbitMQ, Saga, Outbox, Inbox, OpenTelemetry y resiliencia.\n\nAhora falta preparar la operacion real:\n- distintos ambientes\n- secretos protegidos\n- cambios sin recompilar\n- despliegues con bajo riesgo\n- recuperacion rapida" },
  { id: "environments", label: "2) Ambientes", title: "Development, Testing, QA, Staging y Production", subtitle: "El codigo puede ser el mismo mientras cambia la configuracion de cada ambiente.", chip: "Ambientes", content: "Development: logs detallados y debugging.\nTesting: datos aislados y automatizacion.\nQA: validacion funcional.\nStaging: replica controlada de produccion.\nProduction: rendimiento, seguridad y monitoreo.\n\nNo modificar el codigo para cambiar de ambiente." },
  { id: "config", label: "3) Configuracion", title: "ASPNETCORE_ENVIRONMENT y opciones tipadas", subtitle: "La aplicacion descubre su ambiente y valida sus opciones al iniciar.", chip: ".NET", content: "ASPNETCORE_ENVIRONMENT=Development\nASPNETCORE_ENVIRONMENT=Testing\nASPNETCORE_ENVIRONMENT=Staging\nASPNETCORE_ENVIRONMENT=Production\n\nappsettings.json\nappsettings.Development.json\nappsettings.Staging.json\nappsettings.Production.json\n\nUsar clases RabbitMqOptions, PaymentOptions o DatabaseOptions en lugar de strings dispersos. Una configuracion critica ausente debe detener el arranque." },
  { id: "secrets", label: "4) Secretos", title: "Nunca guardar credenciales en el repositorio", subtitle: "Passwords, tokens, connection strings y claves privadas deben vivir fuera del codigo y del historial Git.", chip: "Seguridad", content: "Nunca:\n- secretos hardcodeados\n- secretos en appsettings commiteado\n- secretos en logs\n- secretos en imagenes Docker\n- secretos en el frontend\n\nUsar variables de entorno, secret managers o Kubernetes Secrets. El repositorio contiene referencias, no valores reales." },
  { id: "kubernetes", label: "5) Kubernetes", title: "ConfigMap para configuracion y Secret para credenciales", subtitle: "Separar datos no sensibles de secretos facilita operar y rotar sin reconstruir la imagen.", chip: "Kubernetes", content: "ConfigMap:\n- URLs internas\n- flags no sensibles\n- nombres de colas\n- limites operativos\n\nSecret:\n- passwords\n- tokens\n- connection strings\n- certificados\n\nLa imagen debe ser identica entre ambientes; cambia el entorno que la ejecuta." },
  { id: "rotation", label: "6) Rotacion", title: "Un secreto debe poder cambiar sin desplegar codigo", subtitle: "La rotacion limita el impacto de una filtracion y debe estar contemplada desde el diseño.", chip: "Operaciones", content: "1. Crear el nuevo secreto.\n2. Permitir ambos valores si aplica.\n3. Actualizar consumidores.\n4. Verificar metricas y errores.\n5. Revocar el secreto anterior.\n\nRegistrar quien cambio que y cuando, sin registrar el valor confidencial." },
  { id: "flags", label: "7) Feature Flags", title: "Activar funcionalidad sin desplegar", subtitle: "Una feature flag separa el despliegue tecnico de la activacion funcional.", chip: "Feature Flags", content: "if (flags.NewCheckout)\n{\n    return newCheckout.Execute();\n}\n\nelse\n{\n    return legacyCheckout.Execute();\n}\n\nSirven para releases graduales, canary, kill switches y pruebas controladas. Toda flag necesita dueño, fecha de retirada y default seguro." },
  { id: "deploy", label: "8) Despliegues", title: "Reducir el riesgo del cambio", subtitle: "Desplegar primero, observar despues y activar gradualmente permite recuperar el control.", chip: "Deploy", content: "Commit -> tests -> imagen -> escaneo -> testing -> staging -> production\n\nProduccion con flag apagada\n        |\n        v\nActivacion gradual\n        |\n        v\nObservacion -> rollback o expansion\n\nEl rollback debe estar probado y no depender de datos irreversibles." },
  { id: "observability", label: "9) Operacion", title: "Observar sin exponer informacion sensible", subtitle: "La configuracion de produccion debe equilibrar diagnostico, privacidad y coste operativo.", chip: "Observabilidad", content: "Registrar ambiente, version, cambios de flags, estado de dependencias y CorrelationId.\n\nNo registrar passwords, tokens, headers de autorizacion ni connection strings.\n\nMedir errores de configuracion, reinicios, cambios de flags y efectos sobre latencia y negocio." },
  { id: "checklist", label: "10) Checklist", title: "Produccion preparada", subtitle: "La preparacion real se demuestra revisando configuracion, secretos, flags y recuperacion.", chip: "Checklist", content: "Ambientes separados\nASPNETCORE_ENVIRONMENT definido\nOpciones tipadas y validadas\nSecretos fuera de Git y Docker\nConfigMap y Secret separados\nRotacion documentada\nFeature flags con dueño y expiracion\nDeploy gradual\nRollback probado\nLogs sin datos sensibles\nPipeline con secretos inyectados\nHealth checks y alertas\nRunbook operativo" },
  { id: "closing", label: "11) Cierre", title: "La configuracion tambien es arquitectura", subtitle: "Un backend senior diseña como se ejecuta el sistema, no solo como compila.", chip: "Cierre", content: "Un sistema preparado para produccion:\n- sabe en que ambiente vive\n- valida lo que necesita\n- protege sus secretos\n- activa funciones gradualmente\n- puede cambiar sin recompilar\n- mide los efectos\n- recupera el control cuando algo falla\n\nLa configuracion correcta reduce riesgo tanto como el codigo correcto." },
];

export default function Daily146Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/145";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(() => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`, [activeSection]);

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.topbarInner}>
      <div className={styles.brand}><div className={styles.logo} aria-hidden="true" /><div><h1>Daily Backend</h1><div className={styles.brandSub}>Diseno para produccion</div></div></div>
      <nav className={styles.nav} aria-label="Navegacion"><Link className={styles.pill} href="/daily">Archivo</Link><Link className={styles.pill} href="/calendar">Calendario</Link></nav>
      <div className={styles.actions}><Link className={styles.btn} href="/daily/145"><span className={styles.kbd}>←</span> Dia 145</Link><Link className={`${styles.btn} ${styles.primary}`} href="/calendar">Ver calendario <span className={styles.kbd}>→</span></Link></div>
    </div></header>
    <main className={styles.container}><div className={styles.grid}><article className={styles.card}><div className={styles.bd}>
      <div className={styles.dailyHero}><div className={styles.createdAt}>01/08/2026</div><div className={styles.badge}>Daily #146 • Production Design</div><h2 className={styles.title}>Diseno para produccion: Configuracion por ambientes, secretos y Feature Flags</h2><p className={styles.lead}>Un sistema listo para produccion debe cambiar de ambiente, proteger secretos y activar funcionalidades sin recompilar ni aumentar el riesgo.</p></div>
      <nav className={styles.toc} aria-label="Indice">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}</nav>
      {sections.map((section) => <section className={styles.section} id={section.id} key={section.id}><div className={styles.shd}><div><h3>{section.title}</h3><p className={styles.sub}>{section.subtitle}</p></div><span className={styles.chip}>{section.chip}</span></div><div className={styles.sbd}><pre>{section.content}</pre></div></section>)}
      <div className={styles.footerNav}><Link className={styles.btn} href="/daily/145"><span className={styles.kbd}>←</span> Dia 145</Link><Link className={styles.btn} href="/calendar">Ver calendario</Link></div>
    </div></article></div></main>
  </div>;
}
