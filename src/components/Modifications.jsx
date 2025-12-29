import { useApp } from '../context/AppContext';
import { exclusions } from '../config/menu';
import styles from './Modifications.module.css';

export default function Modifications() {
  const {
    t,
    language,
    pendingItem,
    togglePendingExclusion,
    addPendingItemToOrder,
    goToStep,
  } = useApp();

  const handleBack = () => {
    goToStep('category');
  };

  const handleAddToOrder = () => {
    addPendingItemToOrder();
    goToStep('summary');
  };

  if (!pendingItem) {
    return null;
  }

  return (
    <div className={styles.modificationsPage}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <span className={styles.backArrow}>&#8592;</span>
          {t('ui.back')}
        </button>
        <div className={styles.titles}>
          <h1 className={styles.title}>{t('steps.modifications.title')}</h1>
          <p className={styles.subtitle}>{pendingItem.name[language]}</p>
        </div>
      </header>

      <main className={styles.content}>
        <p className={styles.prompt}>{t('steps.modifications.subtitle')}</p>

        <div className={styles.exclusionsGrid}>
          {exclusions.map((exclusion) => {
            const isSelected = pendingItem.exclusions?.includes(exclusion.id);
            return (
              <button
                key={exclusion.id}
                className={`${styles.exclusionButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => togglePendingExclusion(exclusion.id)}
              >
                <span className={styles.exclusionName}>{exclusion.name[language]}</span>
                {isSelected && <span className={styles.checkmark}>&#10003;</span>}
              </button>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.addButton} onClick={handleAddToOrder}>
          {t('ui.addToOrder')}
        </button>
      </footer>
    </div>
  );
}
