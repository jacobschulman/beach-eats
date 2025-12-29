import { useApp } from '../context/AppContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useApp();

  return (
    <button
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      {t('ui.languageToggle')}
    </button>
  );
}
