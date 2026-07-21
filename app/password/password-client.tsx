"use client";

import { FormEvent, useState } from "react";
import styles from "./password.module.css";

type Props = { isAuthenticated: boolean };

export default function PasswordClient({ isAuthenticated }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(isAuthenticated);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/password-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Contrasena incorrecta");
      return;
    }

    setSuccess(true);
    setPassword("");
  }

  if (success) {
    return (
      <main className={styles.page}>
        <section className={styles.panel}>
          <div className={styles.successIcon} aria-hidden="true">✓</div>
          <h1>exito!!</h1>
          <p>La contrasena fue validada correctamente.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Ruta protegida</p>
        <h1>Acceso con contrasena</h1>
        <p>Introduce la contrasena para continuar.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="password">Contrasena</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit">Comprobar</button>
        </form>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
      </section>
    </main>
  );
}
