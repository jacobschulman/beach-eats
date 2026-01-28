import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResortConfig } from '../config/resorts/index';
import styles from './DemoPage.module.css';

// Generate QR code URL using QR Server API
const getQRCodeUrl = (url, size = 200) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=2d2d2d`;
};

export default function ResortLanding() {
  const { resortKey } = useParams();
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState('');

  // Get resort config
  const resort = getResortConfig(resortKey);

  useEffect(() => {
    // Validate resort exists
    if (!resort) {
      navigate('/', { replace: true });
      return;
    }

    document.title = `${resort.branding.name.en} - Demo`;
    const url = window.location.origin;
    setBaseUrl(url);
  }, [resort, navigate]);

  if (!resort) {
    return null;
  }

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
          <h1 className={styles.title}>{resort.branding.name.en}</h1>
          <p className={styles.subtitle}>{resort.branding.byline.en}</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.intro}>
          <h2>{resort.branding.tagline.en}</h2>
          <p>
            Access all system components for {resort.branding.name.en}. Scan QR codes from mobile
            devices or use the links below for desktop access.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {/* Guest Ordering */}
          <div className={styles.card} style={{ '--accent-color': '#c45d3a' }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📱</span>
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
              <span className={styles.cardIcon}>👨‍🍳</span>
              <h3 className={styles.cardTitle}>Kitchen Display</h3>
            </div>
            <p className={styles.cardDesc}>
              Real-time order tracking for kitchen staff. Isolated per resort.
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
              <span className={styles.cardIcon}>⚙️</span>
              <h3 className={styles.cardTitle}>Menu Manager</h3>
            </div>
            <p className={styles.cardDesc}>
              CMS to update items, prices, and availability.
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

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => navigate('/config')}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b7355',
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            ← Back to Config Dashboard
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>{resort.branding.name.en} - {resort.branding.byline.en}</p>
      </footer>
    </div>
  );
}
