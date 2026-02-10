import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidResortId } from '../config/resorts/index';
import { getResortConfig } from '../config/resorts/index';
import { serviceConfig } from '../config/service';
import styles from './DemoPage.module.css';

const SESSION_KEY = 'beach-eats-demo-resort';

const getQRCodeUrl = (url, size = 200) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=2d2d2d`;
};

export default function DemoPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [resortKey, setResortKey] = useState(null);
  const [error, setError] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [livePanels, setLivePanels] = useState({ ordering: false, kitchen: false, menu: false });

  useEffect(() => {
    document.title = 'Beach Eats - Demo';
    setBaseUrl(serviceConfig.getBaseUrl());

    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored && isValidResortId(stored)) {
      setResortKey(stored);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = code.trim().toLowerCase();

    if (isValidResortId(trimmed)) {
      sessionStorage.setItem(SESSION_KEY, trimmed);
      setResortKey(trimmed);
      setError('');
    } else {
      setError('Invalid demo code. Please try again.');
      setCode('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setResortKey(null);
    setCode('');
  };

  // ——— Code Entry ———
  if (!resortKey) {
    return (
      <div className={styles.demoPage}>
        <header className={styles.header}>
          <div className={styles.logoArea}>
            <h1 className={styles.title} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Beach Eats</h1>
          </div>
        </header>
        <main className={styles.content} style={{ maxWidth: '440px', paddingTop: '120px' }}>
          <div className={styles.intro}>
            <h2>Please enter your demo code</h2>
            <p>Your demo code was provided by the Beach Eats team.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Demo code"
              autoFocus
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '1px solid #e8e4de',
                background: '#fff',
                fontFamily: 'var(--font-body)',
                color: '#2d2d2d',
                outline: 'none',
                marginBottom: '12px',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            />
            {error && (
              <p style={{ color: '#b85c5c', fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className={styles.openBtn}
              style={{
                backgroundColor: '#2d2d2d',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '18px 24px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Access Demo
            </button>
          </form>
        </main>
      </div>
    );
  }

  // ——— Resort Demo ———
  const resort = getResortConfig(resortKey);
  const guestUrl = `${baseUrl}/resorts/${resortKey}`;
  const kitchenUrl = `${baseUrl}/resorts/${resortKey}/kitchen`;
  const adminUrl = `${baseUrl}/resorts/${resortKey}/menu`;

  const openLink = (url) => {
    window.location.href = url;
  };

  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Beach Eats</h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#8b7355',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          Exit Demo
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.resortSection}>
          <div className={styles.resortHeader}>
            <h2 className={styles.resortName}>{resort.branding.name.en}</h2>
            <p className={styles.resortByline}>{resort.branding.byline.en}</p>
            <p className={styles.resortTagline}>{resort.branding.tagline.en}</p>
          </div>

          {/* Live Demo Toggles */}
          <div className={styles.liveDemo}>
            <div className={styles.liveDemoToggles}>
              <button
                className={`${styles.panelToggle} ${livePanels.ordering ? styles.panelToggleActive : ''}`}
                onClick={() => setLivePanels(p => ({ ...p, ordering: !p.ordering }))}
              >
                Guest Ordering
              </button>
              <button
                className={`${styles.panelToggle} ${livePanels.kitchen ? styles.panelToggleActive : ''}`}
                onClick={() => setLivePanels(p => ({ ...p, kitchen: !p.kitchen }))}
              >
                Kitchen Display
              </button>
              <button
                className={`${styles.panelToggle} ${livePanels.menu ? styles.panelToggleActive : ''}`}
                onClick={() => setLivePanels(p => ({ ...p, menu: !p.menu }))}
              >
                Menu Manager
              </button>
            </div>

            {(livePanels.ordering || livePanels.kitchen || livePanels.menu) && baseUrl && (
              <>
                <p className={styles.liveDemoHint}>
                  {livePanels.ordering && livePanels.kitchen
                    ? 'Place an order — watch it appear in the kitchen in real time.'
                    : livePanels.ordering && livePanels.menu
                    ? 'Edit the menu — see changes reflected in the guest ordering view.'
                    : 'Toggle panels above to see how they work together.'}
                </p>
                <div
                  className={styles.liveDemoFrames}
                  data-panel-count={[livePanels.ordering, livePanels.kitchen, livePanels.menu].filter(Boolean).length}
                >
                  {livePanels.ordering && (
                    <div className={styles.frameWrapper}>
                      <p className={styles.frameLabel}>Guest Ordering</p>
                      <iframe
                        src={`${baseUrl}/resorts/${resortKey}`}
                        className={styles.phoneFrame}
                        title="Guest Ordering"
                      />
                    </div>
                  )}
                  {livePanels.kitchen && (
                    <div className={styles.frameWrapper}>
                      <p className={styles.frameLabel}>Kitchen Display</p>
                      <iframe
                        src={`${baseUrl}/resorts/${resortKey}/kitchen`}
                        className={styles.phoneFrame}
                        title="Kitchen Display"
                      />
                    </div>
                  )}
                  {livePanels.menu && (
                    <div className={styles.frameWrapper}>
                      <p className={styles.frameLabel}>Menu Manager</p>
                      <iframe
                        src={`${baseUrl}/resorts/${resortKey}/menu`}
                        className={styles.phoneFrame}
                        title="Menu Manager"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.cardsGrid}>
            {/* Guest Ordering */}
            <div className={styles.card} style={{ '--accent-color': '#c45d3a' }}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Guest Ordering</h3>
              </div>
              <p className={styles.cardDesc}>
                Mobile-friendly ordering experience. Bilingual support (EN/ES).
              </p>
              <div className={styles.qrSection}>
                {baseUrl && (
                  <img
                    src={getQRCodeUrl(guestUrl)}
                    alt="Guest Ordering QR Code"
                    className={styles.qrCode}
                    loading="lazy"
                  />
                )}
                <p className={styles.scanText}>Scan to order</p>
              </div>
              <button
                className={styles.openBtn}
                onClick={() => openLink(guestUrl)}
                style={{ backgroundColor: '#c45d3a' }}
              >
                Open Guest App
              </button>
              <a href={guestUrl} className={styles.urlLink}>{guestUrl}</a>
            </div>

            {/* Kitchen Display */}
            <div className={styles.card} style={{ '--accent-color': '#38a169' }}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Kitchen Display</h3>
              </div>
              <p className={styles.cardDesc}>
                Real-time order tracking for kitchen staff.
              </p>
              <div className={styles.qrSection}>
                {baseUrl && (
                  <img
                    src={getQRCodeUrl(kitchenUrl)}
                    alt="Kitchen Display QR Code"
                    className={styles.qrCode}
                    loading="lazy"
                  />
                )}
                <p className={styles.scanText}>Scan for kitchen</p>
              </div>
              <button
                className={styles.openBtn}
                onClick={() => openLink(kitchenUrl)}
                style={{ backgroundColor: '#38a169' }}
              >
                Open Kitchen
              </button>
              <a href={kitchenUrl} className={styles.urlLink}>{kitchenUrl}</a>
            </div>

            {/* Menu Admin */}
            <div className={styles.card} style={{ '--accent-color': '#3182ce' }}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Menu Manager</h3>
              </div>
              <p className={styles.cardDesc}>
                Update items, prices, and availability in real-time.
              </p>
              <div className={styles.qrSection}>
                {baseUrl && (
                  <img
                    src={getQRCodeUrl(adminUrl)}
                    alt="Menu Manager QR Code"
                    className={styles.qrCode}
                    loading="lazy"
                  />
                )}
                <p className={styles.scanText}>Scan for admin</p>
              </div>
              <button
                className={styles.openBtn}
                onClick={() => openLink(adminUrl)}
                style={{ backgroundColor: '#3182ce' }}
              >
                Open Admin
              </button>
              <a href={adminUrl} className={styles.urlLink}>{adminUrl}</a>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Beach Eats - Demo</p>
      </footer>
    </div>
  );
}
