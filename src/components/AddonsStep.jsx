import { useApp } from '../context/AppContext';
import { addons } from '../config/menu';
import StepLayout from './StepLayout';
import SelectionCard from './SelectionCard';
import styles from './SelectionStep.module.css';

export default function AddonsStep() {
  const { t, language, currentItem, toggleAddon, goToStep, addItemToOrder } = useApp();

  const handleToggle = (addonId) => {
    toggleAddon(addonId);
  };

  const handleBack = () => {
    goToStep('format');
  };

  const handleAddToOrder = () => {
    addItemToOrder();
    goToStep('summary');
  };

  return (
    <StepLayout
      title={t('steps.addons.title')}
      subtitle={t('steps.addons.subtitle')}
      onBack={handleBack}
      onContinue={handleAddToOrder}
      continueLabel={t('ui.addToOrder')}
      continueDisabled={false}
    >
      <div className={styles.grid}>
        {addons.map((addon) => (
          <SelectionCard
            key={addon.id}
            name={addon.name[language]}
            description={addon.description[language]}
            selected={currentItem.addons.includes(addon.id)}
            onClick={() => handleToggle(addon.id)}
            variant="multi"
            icon={addon.icon}
            dietary={addon.dietary}
            language={language}
          />
        ))}
      </div>
    </StepLayout>
  );
}
