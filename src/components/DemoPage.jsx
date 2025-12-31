import { useEffect, useState } from 'react';
import { useMenu, generateShareURL } from '../hooks/useMenu';
import styles from './DemoPage.module.css';

// Generate QR code URL using QR Server API
const getQRCodeUrl = (url, size = 200) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=2d2d2d`;
};

export default function DemoPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const { menu } = useMenu();

  useEffect(() => {
    document.title = 'Beach Eats Demo';
    // Get the current base URL
    const url = window.location.origin + window.location.pathname;
    setBaseUrl(url.replace(/\/$/, ''));
  }, []);

  // Generate URLs with current config baked in
  const guestUrl = menu ? generateShareURL(menu, '') : baseUrl;
  const kitchenUrl = menu ? generateShareURL(menu, 'chef') : `${baseUrl}?chef`;
  const adminUrl = `${baseUrl}?admin`;

  const sections = [
    {
      id: 'guest',
      title: 'Guest Ordering',
      titleEs: 'Pedidos de Huéspedes',
      description: 'Mobile-friendly ordering experience for beach guests. Supports English and Spanish.',
      descriptionEs: 'Experiencia de pedidos amigable para huéspedes. Soporta inglés y español.',
      icon: '📱',
      url: guestUrl,
      color: '#c45d3a',
    },
    {
      id: 'kitchen',
      title: 'Kitchen Display',
      titleEs: 'Pantalla de Cocina',
      description: 'Real-time order tracking for kitchen staff. Orders appear instantly.',
      descriptionEs: 'Seguimiento de pedidos en tiempo real. Los pedidos aparecen instantáneamente.',
      icon: '👨‍🍳',
      url: kitchenUrl,
      color: '#38a169',
    },
    {
      id: 'admin',
      title: 'Menu Manager',
      titleEs: 'Administrador de Menú',
      description: 'Content management system to update items, prices, and availability.',
      descriptionEs: 'Sistema de gestión para actualizar artículos, precios y disponibilidad.',
      icon: '⚙️',
      url: adminUrl,
      color: '#3182ce',
    },
  ];

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title}>Beach Eats</h1>
          <p className={styles.subtitle}>Digital Ordering System</p>
        </div>
        <div className={styles.resort}>
          <span className={styles.resortName}>Susurros del Corazón</span>
          <span className={styles.resortTag}>by Auberge Resorts</span>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.intro}>
          <h2>System Overview</h2>
          <p>
            A complete digital ordering solution for beach and pool service.
            Scan any QR code below to access that part of the system.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {sections.map((section) => (
            <div
              key={section.id}
              className={styles.card}
              style={{ '--accent-color': section.color }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{section.icon}</span>
                <div className={styles.cardTitles}>
                  <h3 className={styles.cardTitle}>{section.title}</h3>
                  <span className={styles.cardTitleEs}>{section.titleEs}</span>
                </div>
              </div>

              <p className={styles.cardDesc}>{section.description}</p>

              <div className={styles.qrSection}>
                {baseUrl && (
                  <img
                    src={getQRCodeUrl(section.url)}
                    alt={`QR Code for ${section.title}`}
                    className={styles.qrCode}
                    loading="lazy"
                  />
                )}
                <p className={styles.scanText}>Scan to open</p>
              </div>

              <button
                className={styles.openBtn}
                onClick={() => openInNewTab(section.url)}
                style={{ backgroundColor: section.color }}
              >
                Open {section.title}
              </button>

              <p className={styles.urlText}>{section.url}</p>
            </div>
          ))}
        </div>

        <div className={styles.features}>
          <h3>Key Features</h3>
          <div className={styles.featureGrid}>
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
              <span>Custom branding</span>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Beach Eats Demo • Built for Susurros del Corazón</p>
      </footer>
    </div>
  );
}
