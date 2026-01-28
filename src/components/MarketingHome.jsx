import { useNavigate } from 'react-router-dom';
import { serviceConfig } from '../config/service';
import styles from './DemoPage.module.css'; // Reuse DemoPage styles

export default function MarketingHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title}>{serviceConfig.name}</h1>
          <p className={styles.subtitle}>{serviceConfig.tagline}</p>
        </div>
      </header>

      <main className={styles.content}>
        {/* Hero Section */}
        <div className={styles.intro}>
          <h2>Complete Digital Ordering Solution</h2>
          <p>{serviceConfig.description}</p>
        </div>

        {/* Features Grid */}
        <div className={styles.cardsGrid}>
          {/* Guest Ordering */}
          <div className={styles.card} style={{ '--accent-color': '#c45d3a' }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📱</span>
              <h3 className={styles.cardTitle}>Guest Ordering</h3>
            </div>
            <p className={styles.cardDesc}>
              Mobile-friendly ordering experience for your guests. Bilingual support (EN/ES),
              custom branding, and seamless integration with your beach or pool service.
            </p>
            <ul style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>QR code ordering from any location</li>
              <li>Build-your-own and pre-designed items</li>
              <li>Allergy alerts and dietary restrictions</li>
              <li>Real-time order confirmation</li>
            </ul>
          </div>

          {/* Kitchen POS */}
          <div className={styles.card} style={{ '--accent-color': '#38a169' }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>👨‍🍳</span>
              <h3 className={styles.cardTitle}>Kitchen Display</h3>
            </div>
            <p className={styles.cardDesc}>
              Real-time order tracking for kitchen staff. Simple interface optimized for
              speed and efficiency during high-volume service periods.
            </p>
            <ul style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>Live order queue with timestamps</li>
              <li>Order status management (pending/preparing/ready/delivered)</li>
              <li>Delivery location tracking</li>
              <li>Isolated per resort for data privacy</li>
            </ul>
          </div>

          {/* Menu CMS */}
          <div className={styles.card} style={{ '--accent-color': '#3182ce' }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚙️</span>
              <h3 className={styles.cardTitle}>Menu Manager</h3>
            </div>
            <p className={styles.cardDesc}>
              Easy-to-use CMS for updating menu items, prices, and availability in real-time.
              No technical knowledge required.
            </p>
            <ul style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>Update prices and availability instantly</li>
              <li>Toggle items on/off as needed</li>
              <li>Generate shareable QR codes</li>
              <li>Cross-device sync for multiple managers</li>
            </ul>
          </div>
        </div>

        {/* Platform Features */}
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
              <span>Mobile-first design</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔧</span>
              <span>Easy CMS management</span>
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

        {/* CTA Section */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => navigate('/config')}
            className={styles.openBtn}
            style={{
              backgroundColor: '#c45d3a',
              fontSize: '16px',
              padding: '16px 32px',
              maxWidth: '300px'
            }}
          >
            Access Configuration
          </button>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#999' }}>
            Manage resorts and view system demo
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>{serviceConfig.name} - {serviceConfig.tagline}</p>
      </footer>
    </div>
  );
}
