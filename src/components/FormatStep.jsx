import { useApp } from '../context/AppContext';
import { useMenu } from '../hooks/useMenu';
import StepLayout from './StepLayout';
import SelectionCard from './SelectionCard';
import styles from './SelectionStep.module.css';

export default function FormatStep() {
  const { t, language, currentItem, setFormat, goToStep } = useApp();
  const { availableFormats, formatPrice } = useMenu();

  const handleSelect = (formatId) => {
    setFormat(formatId);
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      goToStep('addons');
    }, 300);
  };

  const handleBack = () => {
    goToStep('protein');
  };

  const handleContinue = () => {
    goToStep('addons');
  };

  return (
    <StepLayout
      title={t('steps.format.title')}
      subtitle={t('steps.format.subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
      continueDisabled={!currentItem.format}
      hideContinue
    >
      <div className={styles.grid}>
        {availableFormats.map((format) => (
          <SelectionCard
            key={format.id}
            name={format.name[language]}
            description={format.description[language]}
            selected={currentItem.format === format.id}
            onClick={() => handleSelect(format.id)}
            variant="single"
            icon={format.icon}
            dietary={format.dietary}
            language={language}
            price={formatPrice(format.price)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
