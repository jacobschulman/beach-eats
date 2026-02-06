import { useState, useEffect } from 'react';
import { formatOrderItem } from '../config/menu';
import { useApp } from '../context/AppContext';
import { subscribeToOrders, updateOrderStatus, getDebugLog } from '../services/orderService';
import { isFirebaseAvailable } from '../config/firebase';
import styles from './ChefDemo.module.css';

// Kitchen display translations
const kitchenText = {
  en: {
    title: 'KITCHEN DISPLAY',
    subtitle: 'Susurros del Corazón • Beach Service',
    active: 'Active',
    waiting: 'Waiting for Orders',
    waitingDesc: 'Orders will appear here instantly when guests place them.',
    waitingHint: 'Open the guest app in another window to place a test order',
    syncNote: 'Orders sync in real-time • Tap status to update',
    clearAll: 'Clear All',
    status: {
      new: 'NEW',
      preparing: 'PREP',
      ready: 'READY',
      done: 'DONE',
    },
    action: {
      start: 'START',
      ready: 'READY',
      done: 'DONE',
    },
  },
  es: {
    title: 'PANTALLA DE COCINA',
    subtitle: 'Susurros del Corazón • Servicio de Playa',
    active: 'Activos',
    waiting: 'Esperando Pedidos',
    waitingDesc: 'Los pedidos aparecerán aquí al instante.',
    waitingHint: 'Abra la app de huéspedes en otra ventana para hacer un pedido de prueba',
    syncNote: 'Pedidos sincronizados • Toque el estado para actualizar',
    clearAll: 'Borrar Todo',
    status: {
      new: 'NUEVO',
      preparing: 'PREP',
      ready: 'LISTO',
      done: 'HECHO',
    },
    action: {
      start: 'INICIAR',
      ready: 'LISTO',
      done: 'HECHO',
    },
  },
};

const statusConfig = {
  new: { color: '#e53e3e', next: 'preparing', actionKey: 'start' },
  preparing: { color: '#dd6b20', next: 'ready', actionKey: 'ready' },
  ready: { color: '#38a169', next: 'done', actionKey: 'done' },
  done: { color: '#718096', next: null, actionKey: null },
};

export default function ChefDemo() {
  const { resortId } = useApp();
  const [orders, setOrders] = useState([]);
  const [language, setLanguage] = useState('en');
  const t = kitchenText[language];

  // Subscribe to real-time order updates
  useEffect(() => {
    if (!resortId) return;
    const unsubscribe = subscribeToOrders(resortId, (ordersFromService) => {
      setOrders(ordersFromService);
    });
    return () => unsubscribe();
  }, [resortId]);

  // Set page title for kitchen view
  useEffect(() => {
    document.title = 'Beach Eats POS';
  }, []);

  // Update timer every second
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format timer display
  const getTimerDisplay = (placedAt) => {
    if (!placedAt) return '0:00';
    const elapsed = Math.floor((currentTime - new Date(placedAt).getTime()) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateStatus = (orderNum) => {
    const order = orders.find(o => o.orderNumber === orderNum);
    const currentStatus = order?.status || 'new';
    const nextStatus = statusConfig[currentStatus].next;
    if (nextStatus) {
      updateOrderStatus(resortId, orderNum, nextStatus);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  // Transform orders for display
  const displayOrders = orders.map(order => ({
    orderNumber: order.orderNumber,
    location: order.guestInfo?.roomNumber || 'Beach',
    guest: order.guestInfo?.lastName?.toUpperCase() || 'GUEST',
    allergy: order.guestInfo?.allergies || null,
    items: (() => {
      // Group items by name + mods combination
      const grouped = {};
      (order.items || []).forEach(item => {
        const formatted = formatOrderItem(item, language);
        const addons = formatted.addons.map(a => `+ ${a}`);
        const exclusions = (formatted.exclusions || []).map(e => `NO ${e.replace('No ', '')}`);
        const mods = [...exclusions, ...addons];
        const key = `${formatted.title}|${mods.join(',')}`;
        if (grouped[key]) {
          grouped[key].qty += 1;
        } else {
          grouped[key] = {
            qty: 1,
            name: formatted.title,
            mods,
          };
        }
      });
      return Object.values(grouped);
    })(),
    time: order.placedAt
      ? new Date(order.placedAt).toLocaleTimeString(language === 'es' ? 'es-MX' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      : '--:--',
    placedAt: order.placedAt,
    status: order.status || 'new',
  }));

  const activeOrders = displayOrders.filter(o => o.status !== 'done');
  const noOrders = activeOrders.length === 0;

  const clearOrders = () => {
    localStorage.removeItem(`kitchen-orders-${resortId}`);
    localStorage.removeItem('kitchenOrderStatuses');
    setOrders([]);
  };

  return (
    <div className={styles.kitchen}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{t.title}</h1>
          <span className={styles.subtitle}>{t.subtitle}</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.langToggle} onClick={toggleLanguage}>
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <div className={styles.stat}>
            <span className={styles.statValue}>{activeOrders.length}</span>
            <span className={styles.statLabel}>{t.active}</span>
          </div>
          <div className={styles.clock}>
            {new Date().toLocaleTimeString(language === 'es' ? 'es-MX' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </header>

      {noOrders ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h2 className={styles.emptyTitle}>{t.waiting}</h2>
          <p className={styles.emptyText}>{t.waitingDesc}</p>
          <p className={styles.emptyHint}>{t.waitingHint}</p>
        </div>
      ) : (
        <div className={styles.ordersGrid}>
          {activeOrders.map(orderItem => (
            <div key={orderItem.orderNumber} className={styles.ticket}>
              <div
                className={styles.ticketStatus}
                style={{ backgroundColor: statusConfig[orderItem.status].color }}
              >
                <span className={styles.statusLabel}>{t.status[orderItem.status]}</span>
                <span className={styles.timer}>{getTimerDisplay(orderItem.placedAt)}</span>
              </div>

              <div className={styles.ticketHeader}>
                <span className={styles.orderNum}>{orderItem.orderNumber}</span>
                <span className={styles.location}>{orderItem.location}</span>
              </div>

              <div className={styles.guestName}>{orderItem.guest}</div>

              {orderItem.allergy && (
                <div className={styles.allergy}>
                  <span className={styles.allergyIcon}>⚠</span>
                  {orderItem.allergy.toUpperCase()}
                </div>
              )}

              <div className={styles.items}>
                {orderItem.items.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <div className={styles.itemMain}>
                      <span className={styles.qty}>{item.qty}×</span>
                      <span className={styles.itemName}>{item.name}</span>
                    </div>
                    {item.mods.length > 0 && (
                      <div className={styles.mods}>
                        {item.mods.map((mod, i) => (
                          <span
                            key={i}
                            className={mod.startsWith('NO ') ? styles.modExclusion : styles.mod}
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.ticketFooter}>
                <span className={styles.orderTime}>{orderItem.time}</span>
                {statusConfig[orderItem.status].actionKey && (
                  <button
                    className={styles.actionBtn}
                    onClick={() => updateStatus(orderItem.orderNumber)}
                    style={{ backgroundColor: statusConfig[orderItem.status].color }}
                  >
                    {t.action[statusConfig[orderItem.status].actionKey]}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <p>
          {t.syncNote} •
          <button onClick={clearOrders} className={styles.clearBtn}>{t.clearAll}</button>
        </p>
      </div>

      {/* Debug panel — remove after fixing */}
      <DebugPanel resortId={resortId} orderCount={orders.length} />
    </div>
  );
}

function DebugPanel({ resortId, orderCount }) {
  const [log, setLog] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLog(getDebugLog()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#1a1a1a', color: '#0f0', fontFamily: 'monospace',
        fontSize: '11px', zIndex: 9999, borderTop: '2px solid #333',
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '6px 12px', cursor: 'pointer', display: 'flex', gap: '16px' }}
      >
        <span>Firebase: {isFirebaseAvailable() ? '✓ connected' : '✗ NOT available'}</span>
        <span>Resort: {resortId || 'none'}</span>
        <span>Orders: {orderCount}</span>
        <span style={{ marginLeft: 'auto' }}>{expanded ? '▼ hide' : '▲ debug log'}</span>
      </div>
      {expanded && (
        <div style={{ padding: '8px 12px', maxHeight: '200px', overflow: 'auto', borderTop: '1px solid #333' }}>
          {log.length === 0 ? (
            <div style={{ color: '#666' }}>No log entries yet</div>
          ) : (
            log.map((entry, i) => <div key={i}>{entry}</div>)
          )}
        </div>
      )}
    </div>
  );
}
