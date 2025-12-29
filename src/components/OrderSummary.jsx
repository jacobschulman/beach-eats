import { useApp } from '../context/AppContext';
import { formatOrderItem } from '../config/menu';
import StepLayout from './StepLayout';
import styles from './OrderSummary.module.css';

export default function OrderSummary() {
  const { t, language, order, goToStep, removeItemFromOrder, resetCurrentItem } = useApp();

  const handleAddMore = () => {
    resetCurrentItem();
    goToStep('menu');
  };

  const handleCheckout = () => {
    goToStep('checkout');
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromOrder(itemId);
  };

  const isEmpty = order.items.length === 0;

  return (
    <StepLayout
      title={t('steps.summary.title')}
      subtitle={isEmpty ? t('steps.summary.empty') : t('steps.summary.subtitle')}
      onBack={null}
      onContinue={isEmpty ? null : handleCheckout}
      continueLabel={t('ui.checkout')}
      showOrderSummary={false}
    >
      <div className={styles.container}>
        {isEmpty ? (
          <div className={styles.emptyState}>
            <button className={styles.addButton} onClick={handleAddMore}>
              {t('ui.addMore')}
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.itemList}>
              {order.items.map((item) => {
                const formatted = formatOrderItem(item, language);
                return (
                  <li key={item.id} className={styles.item}>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{formatted.title}</h3>
                      {formatted.addons.length > 0 && (
                        <p className={styles.itemAddons}>
                          {t('with')} {formatted.addons.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={t('ui.remove')}
                    >
                      &times;
                    </button>
                  </li>
                );
              })}
            </ul>

            <button className={styles.addMoreButton} onClick={handleAddMore}>
              + {t('ui.addMore')}
            </button>
          </>
        )}
      </div>
    </StepLayout>
  );
}
