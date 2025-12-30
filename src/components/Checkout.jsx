import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import StepLayout from './StepLayout';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { t, order, setGuestInfo, goToStep, placeOrder } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const handleInputChange = (field, value) => {
    setGuestInfo({ [field]: value });
  };

  const handleBack = () => {
    goToStep('summary');
  };

  const handlePlaceOrder = () => {
    // Prevent double submission
    if (isSubmitting || submittedRef.current) return;
    setIsSubmitting(true);
    submittedRef.current = true;

    placeOrder();
    goToStep('confirmation');
  };

  const isValid =
    order.guestInfo.roomNumber.trim() !== '' &&
    order.guestInfo.lastName.trim() !== '' &&
    !isSubmitting;

  return (
    <StepLayout
      title={t('steps.checkout.title')}
      subtitle={t('steps.checkout.subtitle')}
      onBack={handleBack}
      onContinue={handlePlaceOrder}
      continueLabel={t('ui.placeOrder')}
      continueDisabled={!isValid}
      showOrderSummary={false}
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="roomNumber">
            {t('steps.checkout.roomNumber.label')}
          </label>
          <input
            id="roomNumber"
            type="text"
            className={styles.input}
            placeholder={t('steps.checkout.roomNumber.placeholder')}
            value={order.guestInfo.roomNumber}
            onChange={(e) => handleInputChange('roomNumber', e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="lastName">
            {t('steps.checkout.lastName.label')}
          </label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            placeholder={t('steps.checkout.lastName.placeholder')}
            value={order.guestInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            autoComplete="family-name"
          />
        </div>

        <div className={styles.allergySection}>
          <div className={styles.allergyHeader}>
            <span className={styles.allergyIcon}>&#9888;</span>
            <h3 className={styles.allergyTitle}>
              {t('steps.checkout.allergies.title')}
            </h3>
          </div>
          <p className={styles.allergyNote}>
            {t('steps.checkout.allergies.note')}
          </p>
          <textarea
            id="allergies"
            className={styles.textarea}
            placeholder={t('steps.checkout.allergies.placeholder')}
            value={order.guestInfo.allergies}
            onChange={(e) => handleInputChange('allergies', e.target.value)}
            rows={3}
          />
        </div>
      </form>
    </StepLayout>
  );
}
