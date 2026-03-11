import styles from "./DocumentModal.module.css";

export default function DocumentModal({ title, children, onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.stamp}>BEWEIS</span>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
