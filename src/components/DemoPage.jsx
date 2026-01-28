import { useEffect, useState } from 'react';
import { getAllResorts } from '../config/resorts/index';
import { serviceConfig } from '../config/service';
import styles from './DemoPage.module.css';

// Generate QR code URL using QR Server API
const getQRCodeUrl = (url, size = 200) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=2d2d2d`;
};

export default function DemoPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const allResorts = getAllResorts();

  useEffect(() => {
    document.title = 'Beach Eats - Multi-Resort Demo';
    // Get the base URL including GitHub Pages path
    const url = serviceConfig.getBaseUrl();
    setBaseUrl(url);
  }, []);

  const openLink = (url) => {
    window.location.href = url;
  };

  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title}>Beach Eats</h1>
          <p className={styles.subtitle}>Multi-Resort Digital Ordering Platform</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.intro}>
          <h2>System Overview</h2>
          <p>
            A complete digital ordering solution for beach and pool service.
            Each resort has its own branding, menu, and isolated order management.
          </p>
        </div>

        {allResorts.map((resort) => {
          const guestUrl = `${baseUrl}/resorts/${resort.id}`;
          const kitchenUrl = `${baseUrl}/resorts/${resort.id}/kitchen`;
          const adminUrl = `${baseUrl}/resorts/${resort.id}/menu`;

          return (
            <div key={resort.id} className={styles.resortSection}>
              <div className={styles.resortHeader}>
                <h2 className={styles.resortName}>{resort.branding.name.en}</h2>
                <p className={styles.resortByline}>{resort.branding.byline.en}</p>
                <p className={styles.resortTagline}>{resort.branding.tagline.en}</p>
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
                    CMS to update items, prices, and availability per resort.
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
          );
        })}

        <div className={styles.features}>
          <h3>Platform Features</h3>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏨</span>
              <span>Multi-resort support</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🌐</span>
              <span>Bilingual (EN/ES)</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <span>Real-time sync</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📱</span>
              <span>Mobile-first</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔧</span>
              <span>Easy CMS</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚠️</span>
              <span>Allergy alerts</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎨</span>
              <span>Custom branding per resort</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔒</span>
              <span>Isolated data per resort</span>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Beach Eats - Multi-Resort Platform • {allResorts.length} Resorts</p>
      </footer>
    </div>
  );
}
