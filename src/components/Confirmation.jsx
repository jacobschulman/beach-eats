import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getDebugLog } from '../services/orderService';
import { isFirebaseAvailable } from '../config/firebase';
import styles from './Confirmation.module.css';

export default function Confirmation() {
  const { t, order, resetOrder } = useApp();
  const [debugLog, setDebugLog] = useState([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Grab log after order save has had time to complete
    const timer = setTimeout(() => setDebugLog(getDebugLog()), 2000);
    return () => clearTimeout(timer);
  }, []);

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

        {/* Debug — remove after fixing */}
        <div
          onClick={() => setShowDebug(!showDebug)}
          style={{
            marginTop: '24px', padding: '8px 12px', background: '#f5f2ed',
            borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace',
            color: '#666', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div>Firebase: {isFirebaseAvailable() ? '✓ connected' : '✗ NOT available'} | {showDebug ? 'hide' : 'show log'}</div>
          {showDebug && debugLog.map((entry, i) => (
            <div key={i} style={{ marginTop: '4px', color: entry.includes('FAILED') || entry.includes('NOT') ? '#b85c5c' : '#38a169' }}>
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
