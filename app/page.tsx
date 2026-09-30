import type { CSSProperties } from "react";
import ConstructionScene from "@/components/ConstructionScene";
import styles from "./page.module.css";

const TITLE = "Nossa página está em manutenção!";

export default function MaintenancePage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <span className={styles.tag}>
            <span aria-hidden="true">⚠️</span>
            Em manutenção
          </span>
          {/* Cada palavra sobe de trás de uma máscara, como os títulos da DICE */}
          <h1 className={styles.title} aria-label={TITLE}>
            {TITLE.split(" ").map((word, i) => (
              <span key={i} className={styles.mask} aria-hidden="true">
                <span className={styles.word} style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className={styles.lead}>
            Estamos construindo algo novo por aqui e fazendo alguns ajustes na infraestrutura.
            Volte em alguns instantes para acessar tudo normalmente.
          </p>
        </header>

        <div className={styles.sceneFrame}>
          <ConstructionScene />
        </div>

        <div className={styles.status}>
          <span className={styles.statusLabel}>
            <span className={styles.statusDot} aria-hidden="true" />
            Obras em andamento
          </span>
          <div className={styles.progress} aria-hidden="true">
            <div className={styles.progressBar} />
          </div>
        </div>

        <p className={styles.thanks}>Obrigado pela compreensão.</p>
      </section>
    </main>
  );
}
