import { AppProvider, useApp } from './context/AppContext';
import LanguageToggle from './components/LanguageToggle';
import Welcome from './components/Welcome';
import MenuPage from './components/MenuPage';
import CategoryPage from './components/CategoryPage';
import Modifications from './components/Modifications';
import ProteinStep from './components/ProteinStep';
import FormatStep from './components/FormatStep';
import AddonsStep from './components/AddonsStep';
import OrderSummary from './components/OrderSummary';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import KitchenDisplay from './components/KitchenDisplay';
import ChefDemo from './components/ChefDemo';
import MenuAdmin from './components/MenuAdmin';
import DemoPage from './components/DemoPage';
import './App.css';

// Check for special modes via URL params
const urlParams = new URLSearchParams(window.location.search);
const isChefDemo = urlParams.has('chef');
const isAdmin = urlParams.has('admin');
const isDemo = urlParams.has('demo');

function AppContent() {
  const { currentStep } = useApp();

  // Demo mode - presentation page with QR codes
  if (isDemo) {
    return <DemoPage />;
  }

  // Admin mode - menu management
  if (isAdmin) {
    return <MenuAdmin />;
  }

  // Chef demo mode - direct kitchen view
  if (isChefDemo) {
    return <ChefDemo />;
  }

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

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
