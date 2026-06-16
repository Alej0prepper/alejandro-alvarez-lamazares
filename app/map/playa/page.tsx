import type { Metadata } from "next";
import PlayaMapClient from "./playa-map-client";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Mapa del municipio Playa",
  description: "Mapa interactivo delimitado del municipio Playa en La Habana.",
};

export default function PlayaMapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.kicker}>Mapa municipal</p>
          <h1>Municipio Playa</h1>
          <p>Delimitado con el archivo `playa.geojson`.</p>
        </div>
      </section>

      <PlayaMapClient />

      <section className={styles.legend} aria-label="Resumen del mapa">
        <p>Se muestra solo el límite territorial del municipio Playa.</p>
      </section>
    </main>
  );
}
