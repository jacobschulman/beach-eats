import { useApp } from '../context/AppContext';
import styles from './Welcome.module.css';

export default function Welcome() {
  const { t, goToStep } = useApp();

  const handleStart = () => {
    goToStep('menu');
  };

  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.brandingContainer}>
          <p className={styles.greeting}>{t('welcome.greeting')}</p>
          <h1 className={styles.resortName}>{t('resort.name')}</h1>
          <p className={styles.byline}>{t('resort.byline')}</p>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerIcon}>&#10022;</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.subtitle}>{t('welcome.subtitle')}</p>

        <button className={styles.ctaButton} onClick={handleStart}>
          {t('welcome.cta')}
        </button>

        <p className={styles.tagline}>{t('resort.tagline')}</p>
      </div>
    </div>
  );
}
