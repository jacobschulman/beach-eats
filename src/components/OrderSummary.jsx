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

  // Group items by title + exclusions + addons
  const groupedItems = [];
  const groupMap = {};
  order.items.forEach((item) => {
    const formatted = formatOrderItem(item, language);
    const key = `${formatted.title}|${(formatted.exclusions || []).join(',')}|${formatted.addons.join(',')}`;
    if (groupMap[key]) {
      groupMap[key].qty += 1;
      groupMap[key].ids.push(item.id);
    } else {
      groupMap[key] = {
        qty: 1,
        ids: [item.id],
        title: formatted.title,
        exclusions: formatted.exclusions || [],
        addons: formatted.addons,
      };
      groupedItems.push(groupMap[key]);
    }
  });

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
              {groupedItems.map((group) => (
                <li key={group.ids[0]} className={styles.item}>
                  <div className={styles.itemContent}>
                    <h3 className={styles.itemTitle}>
                      {group.qty > 1 && <span className={styles.qty}>{group.qty}× </span>}
                      {group.title}
                    </h3>
                    {group.exclusions.length > 0 && (
                      <p className={styles.itemExclusions}>
                        {group.exclusions.join(', ')}
                      </p>
                    )}
                    {group.addons.length > 0 && (
                      <p className={styles.itemAddons}>
                        {t('with')} {group.addons.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(group.ids[group.ids.length - 1])}
                    aria-label={t('ui.remove')}
                  >
                    −
                  </button>
                </li>
              ))}
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
