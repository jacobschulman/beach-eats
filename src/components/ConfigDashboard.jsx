import { useNavigate } from 'react-router-dom';
import { getAllResorts } from '../config/resorts/index';
import { serviceConfig } from '../config/service';
import styles from './DemoPage.module.css'; // Reuse DemoPage styles

export default function ConfigDashboard() {
  const navigate = useNavigate();
  const allResorts = getAllResorts();

  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title}>{serviceConfig.name} Configuration</h1>
          <p className={styles.subtitle}>Manage resorts and view system overview</p>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.intro}>
          <h2>Configured Resorts</h2>
          <p>
            {allResorts.length} {allResorts.length === 1 ? 'resort' : 'resorts'} configured.
            Click any resort to view its demo page with QR codes and access links.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {allResorts.map((resort) => (
            <div
              key={resort.id}
              className={styles.card}
              style={{ '--accent-color': resort.theme.colors.primary }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🏨</span>
                <h3 className={styles.cardTitle}>{resort.branding.name.en}</h3>
              </div>

              <p className={styles.cardDesc}>
                <strong>{resort.branding.byline.en}</strong>
                <br />
                {resort.branding.tagline.en}
              </p>

              <div style={{
                background: '#f8f6f3',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '13px',
                color: '#666'
              }}>
                <div><strong>Resort ID:</strong> {resort.id}</div>
                <div><strong>Order Prefix:</strong> {resort.orderPrefix}</div>
                <div>
                  <strong>Primary Color:</strong>{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      backgroundColor: resort.theme.colors.primary,
                      borderRadius: '3px',
                      verticalAlign: 'middle',
                      marginLeft: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                  {' '}{resort.theme.colors.primary}
                </div>
              </div>

              <button
                className={styles.openBtn}
                onClick={() => navigate(`/resorts/${resort.id}/demo`)}
                style={{ backgroundColor: resort.theme.colors.primary }}
              >
                View Resort Demo
              </button>

              <button
                className={styles.openBtn}
                onClick={() => navigate(`/resorts/${resort.id}`)}
                style={{
                  backgroundColor: '#fff',
                  color: resort.theme.colors.primary,
                  border: `2px solid ${resort.theme.colors.primary}`,
                  marginTop: '8px'
                }}
              >
                Open Guest Ordering
              </button>
            </div>
          ))}
        </div>

        {/* Placeholder for future feature */}
        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          padding: '24px',
          background: '#f8f6f3',
          borderRadius: '12px',
          border: '2px dashed #e0dbd4'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#2d2d2d' }}>Create New Resort</h3>
          <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
            Copy resort template, configure branding and menu, add to registry
          </p>
          <button
            className={styles.openBtn}
            style={{
              backgroundColor: '#999',
              cursor: 'not-allowed',
              opacity: 0.6
            }}
            disabled
          >
            Coming Soon
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b7355',
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>{serviceConfig.name} Configuration • {allResorts.length} Resorts</p>
      </footer>
    </div>
  );
}
