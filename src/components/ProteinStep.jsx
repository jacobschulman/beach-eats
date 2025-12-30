import { useApp } from '../context/AppContext';
import { useMenu } from '../hooks/useMenu';
import StepLayout from './StepLayout';
import SelectionCard from './SelectionCard';
import styles from './SelectionStep.module.css';

export default function ProteinStep() {
  const { t, language, currentItem, setProtein, goToStep, order } = useApp();
  const { availableProteins, formatPrice } = useMenu();

  const handleSelect = (proteinId) => {
    setProtein(proteinId);
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      goToStep('format');
    }, 300);
  };

  const handleBack = () => {
    if (order.items.length > 0) {
      goToStep('summary');
    } else {
      goToStep('menu');
    }
  };

  const handleContinue = () => {
    goToStep('format');
  };

  return (
    <StepLayout
      title={t('steps.protein.title')}
      subtitle={t('steps.protein.subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
      continueDisabled={!currentItem.protein}
      hideContinue
    >
      <div className={styles.grid}>
        {availableProteins.map((protein) => (
          <SelectionCard
            key={protein.id}
            name={protein.name[language]}
            description={protein.description[language]}
            selected={currentItem.protein === protein.id}
            onClick={() => handleSelect(protein.id)}
            variant="single"
            icon={protein.icon}
            dietary={protein.dietary}
            language={language}
            price={formatPrice(protein.price)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
