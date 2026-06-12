import type { Metadata } from "next";
import Link from "next/link";
import HavanaMapClient from "./havana-map-client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mapa de La Habana",
  description: "Mapa interactivo de La Habana con puntos de interes.",
};

export default function HavanaMapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.kicker}>La Habana</p>
          <h1>Mapa de La Habana</h1>
          <p>
            Vista interactiva con OpenStreetMap y marcadores para el Capitolio
            y el Malecon.
          </p>
        </div>
        <Link href="/" className={styles.backLink}>
          Volver
        </Link>
      </section>

      <HavanaMapClient />
    </main>
  );
}
