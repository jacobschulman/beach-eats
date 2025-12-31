import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { menuCategories, icons, dietaryFlags } from '../config/menu';
import { useMenu } from '../hooks/useMenu';
import styles from './CategoryPage.module.css';

// Helper to get localized name safely
const getLocalizedName = (name, language) => {
  if (!name) return '';
  if (typeof name === 'string') return name;
  if (typeof name === 'object') return name[language] || name.en || '';
  return '';
};

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

function ItemCard({ item, language, t, onAddToOrder, availableExclusions }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleExclusion = (exclusionId) => {
    setSelectedExclusions(prev =>
      prev.includes(exclusionId)
        ? prev.filter(id => id !== exclusionId)
        : [...prev, exclusionId]
    );
  };

  const handleAddToOrder = (e) => {
    e.stopPropagation();
    onAddToOrder(item, selectedExclusions, quantity);
    // Reset state after adding
    setSelectedExclusions([]);
    setQuantity(1);
    setExpanded(false);
  };

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  const decreaseQty = (e) => {
    e.stopPropagation();
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const increaseQty = (e) => {
    e.stopPropagation();
    if (quantity < 10) setQuantity(q => q + 1);
  };

  return (
    <div className={`${styles.itemCard} ${expanded ? styles.expanded : ''}`}>
      <button
        className={styles.itemHeader}
        onClick={handleCardClick}
      >
        <MenuIcon iconName={item.icon} />
        <div className={styles.itemContent}>
          <div className={styles.itemTitleRow}>
            <h3 className={styles.itemName}>{item.name[language]}</h3>
            <DietaryBadges dietary={item.dietary} language={language} />
          </div>
          <p className={styles.itemDescription}>
            {item.description[language]}
          </p>
          {item.price > 0 && (
            <span className={styles.itemPrice}>${item.price}</span>
          )}
        </div>
        <span className={`${styles.expandIcon} ${expanded ? styles.expandedIcon : ''}`}>
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded && (
        <div className={styles.expandedContent}>
          {availableExclusions.length > 0 && (
            <div className={styles.modificationsSection}>
              <p className={styles.modLabel}>{t('steps.modifications.subtitle')}</p>
              <div className={styles.exclusionsRow}>
                {availableExclusions.map((exclusion) => {
                  const isSelected = selectedExclusions.includes(exclusion.id);
                  return (
                    <button
                      key={exclusion.id}
                      className={`${styles.exclusionChip} ${isSelected ? styles.selectedChip : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExclusion(exclusion.id);
                      }}
                    >
                      {getLocalizedName(exclusion.name, language)}
                      {isSelected && <span className={styles.chipCheck}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.orderRow}>
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={decreaseQty}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={increaseQty}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
            <button className={styles.addOrderBtn} onClick={handleAddToOrder}>
              {quantity > 1
                ? `${t('ui.addToOrder')} (${quantity})`
                : t('ui.addToOrder')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const { t, language, selectedCategory, goToStep, addMenuItemToOrder } = useApp();
  const { getAvailableMenuItems, availableExclusions } = useMenu();

  const category = menuCategories.find((c) => c.id === selectedCategory);
  const items = getAvailableMenuItems(selectedCategory);

  const handleBack = () => {
    goToStep('menu');
  };

  const handleAddToOrder = (item, exclusions, quantity) => {
    // Add item to order with exclusions, quantity times
    for (let i = 0; i < quantity; i++) {
      addMenuItemToOrder({
        ...item,
        exclusions,
      });
    }
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
            <ItemCard
              key={item.id}
              item={item}
              language={language}
              t={t}
              onAddToOrder={handleAddToOrder}
              availableExclusions={availableExclusions}
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
