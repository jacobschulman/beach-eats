import { useState } from 'react';
import styles from './ChefDemo.module.css';

const demoOrders = [
  {
    id: 1,
    orderNumber: 'SC847294',
    location: 'Palapa 7',
    guest: 'MORRISON',
    allergy: 'SHELLFISH ALLERGY',
    items: [
      { qty: 1, name: 'Rib Eye Tacos', mods: ['+ Guacamole', '+ Salsa Verde'] },
      { qty: 1, name: 'Kale & Quinoa Salad', mods: [] },
    ],
    time: '12:34 PM',
    status: 'new',
    timer: '0:00',
  },
  {
    id: 2,
    orderNumber: 'SC847293',
    location: 'Room 312',
    guest: 'CHEN',
    allergy: null,
    items: [
      { qty: 2, name: 'Asada Tacos', mods: ['+ Pickled Onion'] },
      { qty: 1, name: 'Guacamole', mods: [] },
      { qty: 1, name: 'Coco Sorbet', mods: [] },
    ],
    time: '12:31 PM',
    status: 'preparing',
    timer: '3:22',
  },
  {
    id: 3,
    orderNumber: 'SC847291',
    location: 'Pool Bar',
    guest: 'WILLIAMS',
    allergy: 'GLUTEN FREE - CELIAC',
    items: [
      { qty: 1, name: 'Shrimp Salad', mods: ['+ Crema', '+ Queso'] },
    ],
    time: '12:28 PM',
    status: 'ready',
    timer: '6:45',
  },
];

const statusConfig = {
  new: { color: '#e53e3e', label: 'NEW', next: 'preparing', action: 'START' },
  preparing: { color: '#dd6b20', label: 'PREP', next: 'ready', action: 'READY' },
  ready: { color: '#38a169', label: 'READY', next: 'done', action: 'DONE' },
  done: { color: '#718096', label: 'DONE', next: null, action: null },
};

export default function ChefDemo() {
  const [orders, setOrders] = useState(demoOrders);

  const updateStatus = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const nextStatus = statusConfig[order.status].next;
        if (nextStatus) {
          return { ...order, status: nextStatus };
        }
      }
      return order;
    }));
  };

  const activeOrders = orders.filter(o => o.status !== 'done');

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

      <div className={styles.ordersGrid}>
        {orders.filter(o => o.status !== 'done').map(order => (
          <div key={order.id} className={styles.ticket}>
            <div
              className={styles.ticketStatus}
              style={{ backgroundColor: statusConfig[order.status].color }}
            >
              <span className={styles.statusLabel}>{statusConfig[order.status].label}</span>
              <span className={styles.timer}>{order.timer}</span>
            </div>

            <div className={styles.ticketHeader}>
              <span className={styles.orderNum}>{order.orderNumber}</span>
              <span className={styles.location}>{order.location}</span>
            </div>

            <div className={styles.guestName}>{order.guest}</div>

            {order.allergy && (
              <div className={styles.allergy}>
                <span className={styles.allergyIcon}>⚠</span>
                {order.allergy}
              </div>
            )}

            <div className={styles.items}>
              {order.items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <div className={styles.itemMain}>
                    <span className={styles.qty}>{item.qty}×</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                  {item.mods.length > 0 && (
                    <div className={styles.mods}>
                      {item.mods.map((mod, i) => (
                        <span key={i} className={styles.mod}>{mod}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.ticketFooter}>
              <span className={styles.orderTime}>{order.time}</span>
              {statusConfig[order.status].action && (
                <button
                  className={styles.actionBtn}
                  onClick={() => updateStatus(order.id)}
                  style={{ backgroundColor: statusConfig[order.status].color }}
                >
                  {statusConfig[order.status].action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>Orders appear instantly from guest phones • Tap status to update • Allergy alerts auto-highlighted</p>
      </div>
    </div>
  );
}
