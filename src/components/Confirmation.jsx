import { useApp } from '../context/AppContext';
import styles from './Confirmation.module.css';

export default function Confirmation() {
  const { t, order, resetOrder } = useApp();

  const handleNewOrder = () => {
    resetOrder();
  };

  return (
    <div className={styles.confirmation}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>&#10003;</span>
        </div>

        <h1 className={styles.title}>{t('steps.confirmation.title')}</h1>

        <div className={styles.orderNumber}>
          <span className={styles.orderLabel}>{t('steps.confirmation.orderNumber')}</span>
          <span className={styles.orderValue}>{order.orderNumber}</span>
        </div>

        <p className={styles.message}>{t('steps.confirmation.message')}</p>

        <div className={styles.guestInfo}>
          <p className={styles.infoLine}>
            <span className={styles.infoLabel}>{t('steps.checkout.roomNumber.label')}:</span>
            <span className={styles.infoValue}>{order.guestInfo.roomNumber}</span>
          </p>
          <p className={styles.infoLine}>
            <span className={styles.infoLabel}>{t('steps.checkout.lastName.label')}:</span>
            <span className={styles.infoValue}>{order.guestInfo.lastName}</span>
          </p>
        </div>

        <button className={styles.newOrderButton} onClick={handleNewOrder}>
          {t('steps.confirmation.newOrder')}
        </button>
      </div>
    </div>
  );
}
