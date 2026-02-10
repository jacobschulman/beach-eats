import { useApp } from '../context/AppContext';
import { useMenu } from '../hooks/useMenu';
import styles from './MenuPage.module.css';

function CategoryIcon({ iconName, icons }) {
  const svgString = icons?.[iconName];
  if (!svgString) return null;

  return (
    <div
      className={styles.categoryIcon}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

export default function MenuPage() {
  const { t, language, goToStep, setSelectedCategory, resortConfig } = useApp();
  const { isSectionActive } = useMenu();
  const menuCategories = resortConfig.menu.menuCategories.filter(cat => isSectionActive(cat.id));
  const icons = resortConfig.menu.icons;

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'build-your-own') {
      goToStep('protein');
    } else {
      setSelectedCategory(categoryId);
      goToStep('category');
    }
  };

  const handleBack = () => {
    goToStep('welcome');
  };

  return (
    <div className={styles.menuPage}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <span className={styles.backArrow}>&#8592;</span>
          {t('ui.back')}
        </button>
        <div className={styles.titles}>
          <h1 className={styles.title}>{t('menu.title')}</h1>
          <p className={styles.subtitle}>{t('menu.subtitle')}</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.categoriesGrid}>
          {menuCategories.map((category, index) => (
            <button
              key={category.id}
              className={`${styles.categoryCard} ${category.special ? styles.special : ''}`}
              onClick={() => handleCategorySelect(category.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryIcon iconName={category.icon} icons={icons} />
              <div className={styles.categoryContent}>
                <h2 className={styles.categoryName}>
                  {category.name[language]}
                </h2>
                <p className={styles.categoryDescription}>
                  {category.description[language]}
                </p>
              </div>
              {category.special && (
                <span className={styles.specialBadge}>
                  {language === 'en' ? 'Featured' : 'Destacado'}
                </span>
              )}
              <span className={styles.arrow}>&#8594;</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
