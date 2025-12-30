import { useState, useEffect } from 'react';
import { formatOrderItem } from '../config/menu';
import styles from './ChefDemo.module.css';

const statusConfig = {
  new: { color: '#e53e3e', label: 'NEW', next: 'preparing', action: 'START' },
  preparing: { color: '#dd6b20', label: 'PREP', next: 'ready', action: 'READY' },
  ready: { color: '#38a169', label: 'READY', next: 'done', action: 'DONE' },
  done: { color: '#718096', label: 'DONE', next: null, action: null },
};

export default function ChefDemo() {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});

  // Load orders from localStorage and poll for updates
  useEffect(() => {
    const loadOrders = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');
        // Filter out any malformed orders
        const validOrders = stored.filter(order =>
          order && order.orderNumber && order.items && Array.isArray(order.items)
        );
        setOrders(validOrders);
        // Initialize status for new orders
        setOrderStatuses(prev => {
          const updated = { ...prev };
          let hasChanges = false;
          validOrders.forEach(order => {
            if (order.orderNumber && !updated[order.orderNumber]) {
              updated[order.orderNumber] = 'new';
              hasChanges = true;
            }
          });
          return hasChanges ? updated : prev;
        });
      } catch (e) {
        console.warn('Could not load orders', e);
      }
    };

    loadOrders();
    // Poll every 2 seconds for new orders
    const interval = setInterval(loadOrders, 2000);
    return () => clearInterval(interval);
  }, []);

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
    const currentStatus = orderStatuses[orderNum] || 'new';
    const nextStatus = statusConfig[currentStatus].next;
    if (nextStatus) {
      setOrderStatuses(prev => ({ ...prev, [orderNum]: nextStatus }));
    }
  };

  // Transform orders for display
  const displayOrders = orders.map(order => ({
    orderNumber: order.orderNumber,
    location: order.guestInfo?.roomNumber || 'Beach',
    guest: order.guestInfo?.lastName?.toUpperCase() || 'GUEST',
    allergy: order.guestInfo?.allergies || null,
    items: (order.items || []).map(item => {
      const formatted = formatOrderItem(item, 'en');
      const addons = formatted.addons.map(a => `+ ${a}`);
      const exclusions = (formatted.exclusions || []).map(e => `NO ${e.replace('No ', '')}`);
      return {
        qty: 1,
        name: formatted.title,
        mods: [...exclusions, ...addons],
      };
    }),
    time: order.placedAt
      ? new Date(order.placedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : '--:--',
    placedAt: order.placedAt,
    status: orderStatuses[order.orderNumber] || 'new',
  }));

  const activeOrders = displayOrders.filter(o => o.status !== 'done');
  const noOrders = activeOrders.length === 0;

  const clearOrders = () => {
    localStorage.removeItem('kitchenOrders');
    setOrders([]);
    setOrderStatuses({});
  };

  return (
    <div className={styles.kitchen}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>KITCHEN DISPLAY</h1>
          <span className={styles.subtitle}>Susurros del Corazón • Beach Service</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{activeOrders.length}</span>
            <span className={styles.statLabel}>Active</span>
          </div>
          <div className={styles.clock}>
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </header>

      {noOrders ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h2 className={styles.emptyTitle}>Waiting for Orders</h2>
          <p className={styles.emptyText}>
            Orders will appear here instantly when guests place them.
          </p>
          <p className={styles.emptyHint}>
            Open the guest app in another window to place a test order
          </p>
        </div>
      ) : (
        <div className={styles.ordersGrid}>
          {activeOrders.map(orderItem => (
            <div key={orderItem.orderNumber} className={styles.ticket}>
              <div
                className={styles.ticketStatus}
                style={{ backgroundColor: statusConfig[orderItem.status].color }}
              >
                <span className={styles.statusLabel}>{statusConfig[orderItem.status].label}</span>
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
                {statusConfig[orderItem.status].action && (
                  <button
                    className={styles.actionBtn}
                    onClick={() => updateStatus(orderItem.orderNumber)}
                    style={{ backgroundColor: statusConfig[orderItem.status].color }}
                  >
                    {statusConfig[orderItem.status].action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <p>
          Orders sync in real-time • Tap status to update •
          <button onClick={clearOrders} className={styles.clearBtn}>Clear All</button>
        </p>
      </div>
    </div>
  );
}
