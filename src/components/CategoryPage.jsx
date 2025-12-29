import { useApp } from '../context/AppContext';
import { menuCategories, menuItems, icons, dietaryFlags } from '../config/menu';
import styles from './CategoryPage.module.css';

function MenuIcon({ iconName }) {
  const svgString = icons[iconName];
  if (!svgString) return null;

  return (
    <div
      className={styles.itemIcon}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

function DietaryBadges({ dietary = [], language = 'en' }) {
  if (!dietary || dietary.length === 0) return null;

  return (
    <div className={styles.dietaryBadges}>
      {dietary.map((flag) => (
        <span
          key={flag}
          className={styles.badge}
          title={dietaryFlags[flag]?.name[language]}
        >
          {dietaryFlags[flag]?.label}
        </span>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const { t, language, selectedCategory, goToStep, addMenuItemToOrder } = useApp();

  const category = menuCategories.find((c) => c.id === selectedCategory);
  const items = menuItems[selectedCategory] || [];

  const handleBack = () => {
    goToStep('menu');
  };

  const handleItemSelect = (item) => {
    addMenuItemToOrder(item);
    goToStep('summary');
  };

  if (!category) {
    return null;
  }

  return (
    <div className={styles.categoryPage}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <span className={styles.backArrow}>&#8592;</span>
          {t('ui.back')}
        </button>
        <div className={styles.titles}>
          <h1 className={styles.title}>{category.name[language]}</h1>
          <p className={styles.subtitle}>{category.description[language]}</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <button
              key={item.id}
              className={styles.itemCard}
              onClick={() => handleItemSelect(item)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MenuIcon iconName={item.icon} />
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemName}>{item.name[language]}</h3>
                  <DietaryBadges dietary={item.dietary} language={language} />
                </div>
                <p className={styles.itemDescription}>
                  {item.description[language]}
                </p>
              </div>
              <span className={styles.addButton}>+</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
