import ConstructionScene from "@/components/ConstructionScene";
import styles from "./page.module.css";

export default function MaintenancePage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <span className={styles.tag}>
            <span aria-hidden="true">⚠️</span>
            Em manutenção
          </span>
          <h1 className={styles.title}>Nossa página está em manutenção!</h1>
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
