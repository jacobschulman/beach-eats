import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getAllResorts } from '../config/resorts/index';
import LanguageToggle from './LanguageToggle';
import Welcome from './Welcome';
import MenuPage from './MenuPage';
import CategoryPage from './CategoryPage';
import Modifications from './Modifications';
import ProteinStep from './ProteinStep';
import FormatStep from './FormatStep';
import AddonsStep from './AddonsStep';
import OrderSummary from './OrderSummary';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import KitchenDisplay from './KitchenDisplay';

export default function OrderingFlow() {
  const { resortKey } = useParams();
  const navigate = useNavigate();
  const { currentStep, setResort } = useApp();

  useEffect(() => {
    // Validate resort exists
    const validResorts = getAllResorts().map(r => r.id);
    if (!validResorts.includes(resortKey)) {
      navigate('/', { replace: true });
      return;
    }

    // Set the resort in context
    setResort(resortKey);
  }, [resortKey, setResort, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome />;
      case 'menu':
        return <MenuPage />;
      case 'category':
        return <CategoryPage />;
      case 'modifications':
        return <Modifications />;
      case 'protein':
        return <ProteinStep />;
      case 'format':
        return <FormatStep />;
      case 'addons':
        return <AddonsStep />;
      case 'summary':
        return <OrderSummary />;
      case 'checkout':
        return <Checkout />;
      case 'confirmation':
        return <Confirmation />;
      case 'kitchen':
        return <KitchenDisplay />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="app">
      <LanguageToggle />
      <div className="pageContainer" key={currentStep}>
        {renderStep()}
      </div>
    </div>
  );
}
