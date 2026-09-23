"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

type LessonSection = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  chip: string;
  content: string;
};

const sections: LessonSection[] = [
  {
    id: "problem",
    label: "1) Problema",
    title: "Una URL no llega directamente al codigo",
    subtitle: "En produccion una peticion atraviesa varias fronteras; cada una puede fallar de una manera distinta.",
    chip: "Modelo mental",
    content:
      "Desarrollo local:\nCliente -> Backend\n\nProduccion:\nCliente -> Internet -> Servidor -> Reverse Proxy -> Backend -> Base de datos\n\nLa pregunta util deja de ser ‘por que no funciona?’ y pasa a ser ‘en que capa dejo de avanzar la peticion?’",
  },
  {
    id: "route",
    label: "2) Recorrido",
    title: "El camino completo de un GET",
    subtitle: "Una sola peticion puede usar nombres, direcciones, puertos y redes diferentes antes de ejecutar una accion de negocio.",
    chip: "Request flow",
    content:
      "GET https://api.example.com/orders/42\n\nNavegador\n  -> DNS: api.example.com\n  -> IP publica del servidor\n  -> :443\n  -> Nginx\n  -> 127.0.0.1:5000\n  -> Docker port mapping\n  -> ASP.NET Core :8080\n  -> OrdersController\n  -> Application / Domain\n  -> PostgreSQL\n\nLa respuesta vuelve por las mismas capas en sentido inverso.",
  },
  {
    id: "ip-port",
    label: "3) IP y puerto",
    title: "IP responde a la maquina; el puerto al servicio",
    subtitle: "Un host puede ejecutar muchos procesos de red sin que todos sean el mismo servicio.",
    chip: "Networking",
    content:
      "IP\n  -> que interfaz o maquina queremos alcanzar?\n\nPuerto\n  -> que punto de servicio queremos alcanzar?\n\nServidor\n  :22   SSH\n  :80   HTTP\n  :443  HTTPS\n  :5000 Backend interno\n  :5432 PostgreSQL\n\nhttps://api.example.com usa convencionalmente :443. No implica que el backend escuche en ese mismo puerto.",
  },
  {
    id: "proxy",
    label: "4) Proxy",
    title: "Nginx recibe el trafico publico y lo reenvia",
    subtitle: "El reverse proxy oculta los detalles internos del backend y concentra la entrada HTTP/HTTPS.",
    chip: "Nginx",
    content:
      "location / {\n    proxy_pass http://127.0.0.1:5000;\n}\n\nCliente conoce:\nhttps://api.example.com\n\nNginx reenvia:\nhttp://127.0.0.1:5000/orders/42\n\nEl cliente no necesita conocer el puerto interno, el contenedor ni la topologia de la aplicacion.",
  },
  {
    id: "binding",
    label: "5) Binding",
    title: "Escuchar en loopback no es escuchar en todas partes",
    subtitle: "La direccion de binding define desde que interfaces puede aceptar conexiones un proceso.",
    chip: "Exposure",
    content:
      "127.0.0.1:5000\n  -> accesible desde el propio host mediante loopback\n\n0.0.0.0:5000\n  -> acepta conexiones en las interfaces IPv4 disponibles del host\n\nDesde tu laptop, 127.0.0.1 es tu laptop; no es el servidor remoto. El acceso efectivo tambien depende de firewall, rutas y reglas de red.",
  },
  {
    id: "docker",
    label: "6) Docker",
    title: "Docker introduce otra frontera de red",
    subtitle: "Host y contenedor tienen puertos y contextos distintos; el mapeo conecta ambos.",
    chip: "Container",
    content:
      "docker run -p 127.0.0.1:5000:8080 my-api\n\nHOST                         CONTAINER\n127.0.0.1:5000  --------->  :8080\n\nEn docker ps:\n127.0.0.1:5000->8080/tcp\n\nNginx habla con el puerto del host. Docker dirige ese trafico al puerto donde escucha la aplicacion dentro del contenedor.",
  },
  {
    id: "surface",
    label: "7) Exposicion",
    title: "Un puerto usado no tiene que ser publico",
    subtitle: "Reducir puntos expuestos limita la superficie de ataque sin impedir que los componentes internos colaboren.",
    chip: "Seguridad",
    content:
      "Internet\n  -> :80 / :443\n  -> Nginx\n  -> Backend\n  -> PostgreSQL / Redis\n\nUn usuario normal no necesita conectarse directamente a :5432, ni al puerto interno de la API. Mantenerlos internos reduce accesos accidentales y superficie de ataque.",
  },
  {
    id: "502",
    label: "8) 502",
    title: "Un 502 es una pista de hasta donde llego la peticion",
    subtitle: "Si Nginx devuelve Bad Gateway, el proxy respondio pero no obtuvo una respuesta valida de su upstream.",
    chip: "Diagnostico",
    content:
      "curl https://api.example.com\nHTTP/1.1 502 Bad Gateway\nServer: nginx\n\nSabemos:\nCliente -> servidor -> Nginx  OK\nNginx -> backend              por investigar\n\nCausas posibles:\n- backend apagado\n- direccion o puerto incorrecto\n- proxy_pass mal configurado\n- problema de red\n- backend rechazando conexiones\n\nNo prueba, por si solo, que PostgreSQL este roto.",
  },
  {
    id: "layers",
    label: "9) Capas",
    title: "Diagnosticar de fuera hacia dentro",
    subtitle: "Cada comprobacion responde una pregunta diferente; no hay que cambiar componentes sin evidencia.",
    chip: "Metodo",
    content:
      "1. El dominio resuelve?\n2. La IP y :80/:443 son alcanzables?\n3. Nginx responde?\n4. El backend responde desde el host?\n5. El contenedor esta ejecutandose?\n6. La aplicacion atiende la ruta esperada?\n7. Las dependencias estan disponibles?\n\ncurl https://api.example.com\ncurl http://127.0.0.1:5000\ndocker ps\ndocker logs my-api\n\nBusca la primera capa que falla.",
  },
  {
    id: "health",
    label: "10) Salud",
    title: "Un contenedor Up no demuestra una aplicacion sana",
    subtitle: "El proceso principal puede seguir vivo aunque el endpoint, la autenticacion o una dependencia hayan fallado.",
    chip: "Operacion",
    content:
      "docker ps\nmy-api   Up 10 hours\n\nEsto demuestra:\n- el proceso principal del contenedor sigue ejecutandose\n\nNo demuestra:\n- GET /health responde\n- PostgreSQL esta disponible\n- el flujo de negocio funciona\n- Nginx alcanza la aplicacion\n\nProcess alive != Application healthy",
  },
  {
    id: "dotnet",
    label: "11) .NET",
    title: "Tres puertos pueden participar sin contradiccion",
    subtitle: "Cada puerto pertenece a una frontera concreta del recorrido, no a una unica aplicacion abstracta.",
    chip: ".NET",
    content:
      "app.MapGet(\"/health\", () => Results.Ok());\n\nInternet\n  HTTPS :443\n  -> Nginx\n  HTTP :5000\n  -> Docker host\n  -> Container :8080\n  -> ASP.NET Core\n\n:443 recibe trafico publico. :5000 es el extremo interno en el host. :8080 es el puerto del proceso dentro del contenedor.",
  },
  {
    id: "qa",
    label: "12) QA",
    title: "Una prueba por capa reduce el espacio de busqueda",
    subtitle: "Abrir la web no es la unica evidencia disponible cuando un sistema desplegado falla.",
    chip: "QA",
    content:
      "docker ps\n  -> el proceso del contenedor existe?\n\ncurl http://127.0.0.1:5000\n  -> el backend es accesible desde el host?\n\ncurl https://api.example.com\n  -> la ruta completa es accesible?\n\ndocker logs my-api\n  -> que reporta la aplicacion?\n\nCada resultado acota una capa; ninguno sustituye a los demas.",
  },
  {
    id: "challenge",
    label: "13) Reto",
    title: "Resolver el 502 sin tocar la base de datos",
    subtitle: "El mini reto aplica el modelo de capas a una evidencia concreta.",
    chip: "Practica",
    content:
      "Evidencia:\n127.0.0.1:5000->8080/tcp\ncurl http://127.0.0.1:5000  -> 200 OK\ncurl https://api.example.com -> 502 Bad Gateway (nginx)\n\nConclusiones iniciales:\n- aplicacion accesible desde el host\n- port mapping operativo\n- Nginx recibe la peticion\n\nSiguiente foco:\nNginx -> upstream / backend\n\nNo empieces cambiando PostgreSQL ni la logica de negocio: aun no hay evidencia de que sean la primera capa fallida.",
  },
  {
    id: "takeaway",
    label: "14) Cierre",
    title: "Diagnosticar por capas en lugar de probar al azar",
    subtitle: "Una arquitectura desplegada es una cadena de fronteras que debe poder observarse y comprobarse.",
    chip: "Takeaway",
    content:
      "Internet\n  -> DNS / IP\n  -> Puerto\n  -> Reverse Proxy\n  -> Host\n  -> Container\n  -> Backend\n  -> Dependencias\n\nUn error de infraestructura aporta informacion sobre hasta que capa avanzo la peticion. El siguiente paso sera profundizar en Nginx, upstreams, headers, TLS y routing.",
  },
];

export default function Daily176Client() {
  const [activeSection, setActiveSection] = useState("problem");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/175";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>Backend en produccion · diagnostico por capas</div>
            </div>
          </div>
          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">Archivo</Link>
            <Link className={styles.pill} href="/calendar">Calendario</Link>
          </nav>
          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/175"><span className={styles.kbd}>←</span> Dia 175</Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#problem">Empezar <span className={styles.kbd}>↓</span></Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>15/09/2026</div>
                <div className={styles.badge}>Daily #176 • Backend en produccion</div>
                <h2 className={styles.title}>Como llega una peticion desde Internet hasta tu aplicacion</h2>
                <div className={styles.meta} aria-label="Metadatos">
                  <span className={`${styles.chip} ${styles.chipOk}`}>10–15 min</span>
                  <span className={styles.chip}>Nivel: intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Nginx</span>
                  <span className={styles.chip}>Docker</span>
                  <span className={styles.chip}>Networking</span>
                </div>
                <p className={styles.lead}>Seguir una peticion HTTP desde el navegador hasta el backend permite localizar la primera capa que falla, en vez de modificar componentes al azar.</p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {sections.map((section) => <a key={section.id} href={`#${section.id}`} className={tocLinkClass(section.id)}>{section.label}</a>)}
              </nav>

              {sections.map((section) => (
                <section className={styles.section} id={section.id} key={section.id}>
                  <div className={styles.shd}>
                    <div>
                      <h3>{section.title}</h3>
                      <p className={styles.sub}>{section.subtitle}</p>
                    </div>
                    <span className={styles.chip}>{section.chip}</span>
                  </div>
                  <div className={styles.sbd}><pre>{section.content}</pre></div>
                </section>
              ))}

              <div className={styles.footerNav}>
                <Link className={styles.btn} href="/daily/175"><span className={styles.kbd}>←</span> Dia 175</Link>
                <Link className={styles.btn} href="/daily">Ver archivo</Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
