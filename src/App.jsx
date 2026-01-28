import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { serviceConfig } from './config/service';

// New components
import MarketingHome from './components/MarketingHome';
import ConfigDashboard from './components/ConfigDashboard';
import ResortLanding from './components/ResortLanding';
import PasswordGate from './components/PasswordGate';
import OrderingFlow from './components/OrderingFlow';
import KitchenWrapper from './components/KitchenWrapper';
import MenuAdminWrapper from './components/MenuAdminWrapper';
import DemoPage from './components/DemoPage';

import './App.css';

// Legacy URL redirect component (for backward compatibility)
function LegacyRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resort = params.get('resort');
    const isChef = params.has('chef');
    const isAdmin = params.has('admin');
    const isDemo = params.has('demo');

    if (isDemo) {
      navigate('/demo', { replace: true });
    } else if (resort) {
      if (isChef) {
        navigate(`/resorts/${resort}/kitchen`, { replace: true });
      } else if (isAdmin) {
        navigate(`/resorts/${resort}/menu`, { replace: true });
      } else {
        // Default to ordering flow (root resort path)
        navigate(`/resorts/${resort}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return null; // Redirects only, no rendering
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <LegacyRedirect />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MarketingHome />} />
          <Route path="/demo" element={<DemoPage />} />

          {/* Protected config dashboard */}
          <Route
            path="/config"
            element={
              <PasswordGate password={serviceConfig.configPassword}>
                <ConfigDashboard />
              </PasswordGate>
            }
          />

          {/* Resort routes */}
          <Route path="/resorts/:resortKey" element={<OrderingFlow />} />
          <Route path="/resorts/:resortKey/demo" element={<ResortLanding />} />
          <Route path="/resorts/:resortKey/kitchen" element={<KitchenWrapper />} />
          <Route path="/resorts/:resortKey/menu" element={<MenuAdminWrapper />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
