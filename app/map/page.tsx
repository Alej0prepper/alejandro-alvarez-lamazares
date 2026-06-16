import type { Metadata } from "next";
import HavanaMapClient from "./havana-map-client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Vista interactiva de microvertederos",
  description: "Vista interactiva de microvertederos en el municipio Playa.",
};

export default function HavanaMapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <h1>Vista interactiva de microvertederos en el municipio Playa</h1>
        </div>
      </section>

      <HavanaMapClient />

      <section className={styles.legend} aria-label="Resumen del mapa">
        <p>64 microvertederos detectados hasta el momento.</p>
        <p>Rojo: puntos críticos.</p>
        <p>Amarillo: negocios con microvertederos.</p>
        <p>Azul: microvertedero.</p>
      </section>
    </main>
  );
}
