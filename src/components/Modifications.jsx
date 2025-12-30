import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useMenu } from '../hooks/useMenu';
import styles from './Modifications.module.css';

// Helper to get localized name safely
const getLocalizedName = (name, language) => {
  if (!name) return '';
  if (typeof name === 'string') return name;
  if (typeof name === 'object') return name[language] || name.en || '';
  return '';
};

export default function Modifications() {
  const {
    t,
    language,
    pendingItem,
    togglePendingExclusion,
    addPendingItemToOrder,
    goToStep,
  } = useApp();
  const { availableExclusions } = useMenu();
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => {
    goToStep('category');
  };

  const handleAddToOrder = () => {
    // Add the item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addPendingItemToOrder();
    }
    setQuantity(1);
    goToStep('summary');
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const increaseQty = () => {
    if (quantity < 10) setQuantity(q => q + 1);
  };

  if (!pendingItem) {
    return null;
  }

  const itemName = getLocalizedName(pendingItem.name, language);

  return (
    <div className={styles.modificationsPage}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <span className={styles.backArrow}>&#8592;</span>
          {t('ui.back')}
        </button>
        <div className={styles.titles}>
          <h1 className={styles.title}>{t('steps.modifications.title')}</h1>
          <p className={styles.subtitle}>{itemName}</p>
        </div>
      </header>

      <main className={styles.content}>
        <p className={styles.prompt}>{t('steps.modifications.subtitle')}</p>

        <div className={styles.exclusionsGrid}>
          {availableExclusions.map((exclusion) => {
            const isSelected = pendingItem.exclusions?.includes(exclusion.id);
            return (
              <button
                key={exclusion.id}
                className={`${styles.exclusionButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => togglePendingExclusion(exclusion.id)}
              >
                <span className={styles.exclusionName}>{getLocalizedName(exclusion.name, language)}</span>
                {isSelected && <span className={styles.checkmark}>&#10003;</span>}
              </button>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.quantityRow}>
          <span className={styles.quantityLabel}>Quantity</span>
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
        </div>
        <button className={styles.addButton} onClick={handleAddToOrder}>
          {quantity > 1 ? `Add ${quantity} to Order` : t('ui.addToOrder')}
        </button>
      </footer>
    </div>
  );
}
