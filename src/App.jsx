import { AppProvider, useApp } from './context/AppContext';
import LanguageToggle from './components/LanguageToggle';
import Welcome from './components/Welcome';
import MenuPage from './components/MenuPage';
import CategoryPage from './components/CategoryPage';
import ProteinStep from './components/ProteinStep';
import FormatStep from './components/FormatStep';
import AddonsStep from './components/AddonsStep';
import OrderSummary from './components/OrderSummary';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import './App.css';

function AppContent() {
  const { currentStep } = useApp();

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome />;
      case 'menu':
        return <MenuPage />;
      case 'category':
        return <CategoryPage />;
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

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
