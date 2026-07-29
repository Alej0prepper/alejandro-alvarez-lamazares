"use client";

import { useState, type CSSProperties } from "react";
import "./logistica.css";

type Tab = "resumen" | "vehiculos" | "cargas" | "fuente";

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const usd = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" });

function Icon({ name }: { name: "trend" | "truck" | "box" | "alert" | "file" | "pin" }) {
  const paths = {
    trend: <><path d="m4 16 5-5 4 4 7-8" /><path d="M15 7h5v5" /></>,
    truck: <><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" /></>,
    alert: <><path d="M12 3 2.8 20h18.4z" /><path d="M12 9v5" /><path d="M12 17.5h.01" /></>,
    file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "resumen", label: "Resumen" }, { id: "vehiculos", label: "Vehículos y depósitos" },
  { id: "cargas", label: "Cargas y embarques" }, { id: "fuente", label: "Datos del informe" },
];

function Panel({ title, eyebrow, children, className = "" }: { title: string; eyebrow: string; children: React.ReactNode; className?: string }) {
  return <article className={`panel ${className}`}><div className="panel-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>{children}</article>;
}

export default function LogisticaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("resumen");
  const depositados = 127, facturados = 36, pendientes = 91, porcentaje = 28;
  const go = (tab: Tab) => setActiveTab(tab);

  return <main className="logistics-shell">
    <header className="logistics-topbar">
      <button className="brand" onClick={() => go("resumen")}><span className="brand-mark">N</span><span><strong>Control logístico</strong><small>Dirección Comercial · NWI</small></span></button>
      <div className="top-actions"><span className="status"><i />Informe procesado</span><span className="report"><small>Último informe</small><strong>10 jul 2026</strong></span><span className="avatar">DA</span></div>
    </header>
    <nav className="tabs" aria-label="Secciones del dashboard"><div>{tabs.map(tab => <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => go(tab.id)}>{tab.label}</button>)}</div></nav>
    <section className="content">
      {activeTab === "resumen" && <>
        <div className="welcome"><div><p className="eyebrow">RESUMEN EJECUTIVO</p><h1>La operación, en un vistazo.</h1><p className="subtitle">Información extraída automáticamente del control de logística comercial interna.</p></div><div className="quality"><span>7</span><p><strong>7 datos cuantificables</strong><small>El resto se conserva como estado operativo</small></p></div></div>
        <section className="kpis">
          <article className="kpi primary"><div className="kpi-top"><span className="icon"><Icon name="truck" /></span><b>NWI · ZELCOMSA</b></div><p>Autos en depósito</p><strong>{depositados}</strong><footer><span>{facturados} facturados</span><b>{porcentaje}%</b></footer></article>
          <article className="kpi"><div className="kpi-top"><span className="icon blue"><Icon name="trend" /></span><small>CALCULADO</small></div><p>Pendientes de facturar</p><strong>{pendientes}</strong><footer><span>127 menos 36 facturados</span></footer></article>
          <article className="kpi"><div className="kpi-top"><span className="icon violet"><Icon name="truck" /></span><b className="violet-tag">HUMS · CIMEX</b></div><p>Autos en consignación</p><strong>56</strong><footer><span>Reportados en depósito</span></footer></article>
          <article className="kpi"><div className="kpi-top"><span className="icon amber"><Icon name="box" /></span><b className="amber-tag">CARILOG</b></div><p>Carga identificada</p><strong>5 <em>pallets</em></strong><footer><span>Pintura de marcación vial</span></footer></article>
        </section>
        <section className="two-col"><Panel eyebrow="AUTOS · DEPÓSITO IN BOND" title="Situación de facturación"><div className="vehicle-stat"><div className="donut" style={{ "--angle": `${porcentaje * 3.6}deg` } as CSSProperties}><div><strong>{porcentaje}%</strong><small>facturado</small></div></div><div className="legend"><p><i className="green-dot" /><strong>{facturados}</strong><small>Facturados</small></p><p><i className="gray-dot" /><strong>{pendientes}</strong><small>Pendientes de facturar</small></p><hr /><span>Total reportado <b>{depositados} autos</b></span></div></div></Panel><Panel eyebrow="VALORES REPORTADOS" title="Inventario y VA"><div className="money"><span>€</span><p><strong>Depósito NWI–ZELCOMSA</strong><small>Valores expresados en EUR</small></p><dl><dt>Inventario</dt><dd>{eur.format(1033809.91)}</dd><dt>VA</dt><dd>{eur.format(524363.91)}</dd></dl></div><div className="money"><span className="usd-sign">$</span><p><strong>Consignación HUMS–CIMEX</strong><small>Valores expresados en USD</small></p><dl><dt>Inventario</dt><dd>{usd.format(149427.54)}</dd><dt>VA</dt><dd>{usd.format(30614.3)}</dd></dl></div></Panel></section>
        <section className="two-col lower"><Panel eyebrow="ATENCIÓN DE DIRECCIÓN" title="Vacíos que impiden decidir"><div className="attention"><span><Icon name="alert" /></span><div><strong>Varias áreas no reportan cantidades</strong><p>PALCO, Aero Varadero, cargas operativas, producción y embarques aparecen como categorías, pero sin cifras asociadas.</p></div><button onClick={() => go("cargas")}>Ver áreas</button></div></Panel><Panel eyebrow="UBICACIONES MENCIONADAS" title="Mapa operacional del informe"><div className="chips">{["NWI–ZELCOMSA", "HUMS–CIMEX", "Sabory", "Industrial Guanabo", "Peñas Altas", "Carilog", "Aero Varadero"].map(name => <span key={name}><Icon name="pin" />{name}</span>)}</div></Panel></section>
      </>}
      {activeTab === "vehiculos" && <TabView eyebrow="VEHÍCULOS Y DEPÓSITOS" title="Dos operaciones, sin mezclar contextos." subtitle="Cada bloque conserva su ubicación, moneda y descripción original."><section className="depot-grid"><article className="depot featured"><span className="icon"><Icon name="truck" /></span><p>DEPÓSITO IN BOND</p><h2>NWI–ZELCOMSA</h2><div className="metrics"><div><small>En depósito</small><strong>127</strong></div><div><small>Facturados</small><strong>36</strong></div><div><small>Pendientes*</small><strong>91</strong></div></div><div className="bar"><i /></div><small>*Pendientes es un cálculo: 127 − 36.</small></article><article className="depot"><span className="icon violet"><Icon name="truck" /></span><p>EN CONSIGNACIÓN</p><h2>HUMS–CIMEX</h2><div className="big-number">56 <small>autos en depósito</small></div><hr /><div className="pair"><span>Inventario <b>{usd.format(149427.54)}</b></span><span>VA <b>{usd.format(30614.3)}</b></span></div></article></section><div className="notice"><Icon name="alert" /><div><strong>El informe no permite conocer antigüedad ni rotación</strong><p>No aparecen fechas de entrada, fecha de facturación ni tiempo en depósito.</p></div></div></TabView>}
      {activeTab === "cargas" && <TabView eyebrow="CARGAS Y EMBARQUES" title="Qué existe y qué falta cuantificar." subtitle="El dashboard no inventa cantidades ausentes en el Excel."><section className="two-col"><Panel eyebrow="CARGAS VARIADAS" title="Flujo operativo mencionado"><div className="flow">{[["5", "Carilog · Comerciales", "5 pallets de pintura para marcación de carretera", "Agrupadas"], ["—", "Aero Varadero", "Cargas agrupadas comerciales", "Sin cifra"], ["—", "Operativas · Clientes", "Se menciona producción y embarque", "Sin cifra"], ["—", "Menajes", "Se mencionan embarcadas y en proceso de embarque", "Sin cifra"]].map(row => <div key={row[1]}><b className={row[0] === "5" ? "known" : ""}>{row[0]}</b><p><strong>{row[1]}</strong><small>{row[2]}</small></p><span>{row[3]}</span></div>)}</div></Panel><Panel eyebrow="CONSIGNACIÓN PALCO" title="Ubicaciones listadas"><div className="places">{["Sabory", "Industrial Guanabo", "Peñas Altas"].map(place => <div key={place}><Icon name="pin" /><strong>{place}</strong><small>Sin cantidad reportada</small></div>)}</div></Panel></section><div className="gap"><h2>El informe identifica frentes de trabajo, pero no su volumen.</h2><p>Esta vista permite saber qué áreas deben reportar actualización.</p></div></TabView>}
      {activeTab === "fuente" && <TabView eyebrow="TRAZABILIDAD" title="Del Excel al indicador." subtitle="Cada cifra muestra cómo fue interpretada por el dashboard."><Panel eyebrow="CONTROL-2 LOGÍSTICA COMERCIAL.XLSX" title="Datos utilizados"><div className="table-wrap"><table><thead><tr><th>Sección</th><th>Texto interpretado</th><th>Resultado</th><th>Tipo</th></tr></thead><tbody>{[["Depósito In Bond", "127 carros · 36 facturados", "127 / 36 / 91 pendientes", "Directo + cálculo"], ["PPA · Insumos", "Inv. 1 033 809.91 EUR · VA 524 363.91", "€1,033,809.91 / €524,363.91", "Directo"], ["HUMS–CIMEX", "56 autos en depósito", "56 autos en consignación", "Directo"], ["Carilog", "5 pallets pintura vial", "5 pallets identificados", "Directo"], ["PALCO / Cargas", "Categorías sin cantidades", "Estado ‘Sin cifra’", "Ausente"]].map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i}><span className={i === 3 ? (cell === "Ausente" ? "missing" : "direct") : ""}>{cell}</span></td>)}</tr>)}</tbody></table></div></Panel><div className="principles"><div><strong>Sin sumar monedas</strong><small>EUR y USD se muestran por separado.</small></div><div><strong>Sin cifras inventadas</strong><small>Las celdas vacías son “Sin cifra”.</small></div><div><strong>Cálculos identificados</strong><small>El único cálculo nuevo es 127 − 36 = 91.</small></div></div></TabView>}
      <footer>Dashboard generado desde el documento original, sin modificarlo.<button onClick={() => go("fuente")}>Ver trazabilidad</button></footer>
    </section>
  </main>;
}

function TabView({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) { return <div className="tab-view"><div className="intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="subtitle">{subtitle}</p></div></div>{children}</div>; }
