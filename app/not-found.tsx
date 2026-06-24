import Link from "next/link";
import NotFoundClient from "./not-found-client";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <NotFoundClient />
      <p className={styles.backLink}>
        <Link href="/profile">Volver al perfil</Link>
      </p>
    </main>
  );
}
