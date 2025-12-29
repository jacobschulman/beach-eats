import { useApp } from '../context/AppContext';
import styles from './StepLayout.module.css';

export default function StepLayout({
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  continueLabel,
  continueDisabled = false,
  showOrderSummary = true,
  hideContinue = false,
}) {
  const { t, order } = useApp();
  const itemCount = order.items.length;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            <span className={styles.backArrow}>&#8592;</span>
            {t('ui.back')}
          </button>
        )}
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        {showOrderSummary && itemCount > 0 && (
          <div className={styles.orderBadge}>
            {itemCount} {itemCount === 1 ? t('steps.summary.item') : t('steps.summary.items')}
          </div>
        )}
        {onContinue && !hideContinue && (
          <button
            className={styles.continueButton}
            onClick={onContinue}
            disabled={continueDisabled}
          >
            {continueLabel || t('ui.continue')}
          </button>
        )}
      </footer>
    </div>
  );
}
