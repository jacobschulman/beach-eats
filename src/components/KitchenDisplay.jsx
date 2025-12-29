import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatOrderItem } from '../config/menu';
import styles from './KitchenDisplay.module.css';

export default function KitchenDisplay() {
  const { order, language, goToStep } = useApp();
  const [orderStatus, setOrderStatus] = useState('new');
  const [showRawData, setShowRawData] = useState(false);

  const handleBack = () => {
    goToStep('confirmation');
  };

  // Generate MICROS-style payload
  const microsPayload = {
    header: {
      messageType: 'ORDER_CREATE',
      timestamp: new Date().toISOString(),
      source: 'BEACH_ORDERING_APP',
      version: '1.0',
    },
    order: {
      orderNumber: order.orderNumber,
      orderType: 'ROOM_SERVICE',
      location: {
        type: 'ROOM',
        identifier: order.guestInfo.roomNumber,
      },
      guest: {
        lastName: order.guestInfo.lastName,
        allergyNotes: order.guestInfo.allergies || null,
      },
      items: order.items.map((item, idx) => {
        if (item.type === 'menu-item') {
          return {
            lineNumber: idx + 1,
            plu: item.id.toUpperCase().replace(/-/g, '_'),
            name: item.name.en,
            quantity: 1,
            modifiers: [],
            specialInstructions: null,
          };
        }
        const formatted = formatOrderItem(item, 'en');
        return {
          lineNumber: idx + 1,
          plu: `BYO_${item.protein}_${item.format}`.toUpperCase(),
          name: formatted.title,
          quantity: 1,
          modifiers: item.addons.map(addon => ({
            plu: `MOD_${addon}`.toUpperCase().replace(/-/g, '_'),
            name: addon.replace(/-/g, ' '),
          })),
          specialInstructions: null,
        };
      }),
      totals: {
        itemCount: order.items.length,
        subtotal: null,
        tax: null,
        total: null,
      },
      timing: {
        orderPlaced: new Date().toISOString(),
        estimatedReady: new Date(Date.now() + 25 * 60000).toISOString(),
        estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString(),
      },
    },
  };

  const statusColors = {
    new: '#e74c3c',
    preparing: '#f39c12',
    ready: '#27ae60',
    delivered: '#95a5a6',
  };

  const statusLabels = {
    new: 'NEW ORDER',
    preparing: 'PREPARING',
    ready: 'READY',
    delivered: 'DELIVERED',
  };

  const timeSinceOrder = () => {
    return '0:42'; // Mock time
  };

  return (
    <div className={styles.kitchenDisplay}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back to App
        </button>
        <h1 className={styles.title}>Kitchen Display System</h1>
        <button
          className={styles.toggleButton}
          onClick={() => setShowRawData(!showRawData)}
        >
          {showRawData ? 'Show Display' : 'Show Raw Data'}
        </button>
      </header>

      {showRawData ? (
        <div className={styles.rawDataContainer}>
          <h2 className={styles.rawDataTitle}>MICROS API Payload</h2>
          <p className={styles.rawDataSubtitle}>
            This JSON would be sent to Oracle MICROS Simphony or middleware like Omnivore
          </p>
          <pre className={styles.rawData}>
            {JSON.stringify(microsPayload, null, 2)}
          </pre>
        </div>
      ) : (
        <div className={styles.displayGrid}>
          <div className={styles.orderTicket}>
            <div
              className={styles.statusBar}
              style={{ backgroundColor: statusColors[orderStatus] }}
            >
              <span className={styles.statusLabel}>{statusLabels[orderStatus]}</span>
              <span className={styles.timer}>{timeSinceOrder()}</span>
            </div>

            <div className={styles.ticketHeader}>
              <div className={styles.orderNumber}>#{order.orderNumber}</div>
              <div className={styles.location}>
                <span className={styles.locationIcon}>🏖️</span>
                <span className={styles.locationText}>
                  {order.guestInfo.roomNumber || 'Palapa 12'}
                </span>
              </div>
              <div className={styles.guestName}>
                {order.guestInfo.lastName || 'SCHULMAN'}
              </div>
            </div>

            {order.guestInfo.allergies && (
              <div className={styles.allergyAlert}>
                <span className={styles.allergyIcon}>⚠️</span>
                <span className={styles.allergyText}>
                  ALLERGY: {order.guestInfo.allergies}
                </span>
              </div>
            )}

            <div className={styles.itemsContainer}>
              {order.items.map((item, idx) => {
                const formatted = formatOrderItem(item, language);
                return (
                  <div key={item.id} className={styles.ticketItem}>
                    <div className={styles.itemQuantity}>1x</div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{formatted.title}</div>
                      {formatted.addons.length > 0 && (
                        <div className={styles.itemMods}>
                          {formatted.addons.map((addon, i) => (
                            <span key={i} className={styles.mod}>+ {addon}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.ticketFooter}>
              <div className={styles.itemCount}>
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </div>
              <div className={styles.orderTime}>
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className={styles.actionButtons}>
              {orderStatus === 'new' && (
                <button
                  className={styles.actionButton}
                  onClick={() => setOrderStatus('preparing')}
                >
                  START PREPARING
                </button>
              )}
              {orderStatus === 'preparing' && (
                <button
                  className={styles.actionButton}
                  onClick={() => setOrderStatus('ready')}
                >
                  MARK READY
                </button>
              )}
              {orderStatus === 'ready' && (
                <button
                  className={styles.actionButton}
                  onClick={() => setOrderStatus('delivered')}
                >
                  DELIVERED
                </button>
              )}
              {orderStatus === 'delivered' && (
                <button
                  className={styles.actionButton}
                  style={{ opacity: 0.5 }}
                  disabled
                >
                  COMPLETED
                </button>
              )}
            </div>
          </div>

          <div className={styles.otherOrders}>
            <h3 className={styles.otherOrdersTitle}>Other Active Orders</h3>
            <div className={styles.miniTicket} style={{ borderLeftColor: '#f39c12' }}>
              <div className={styles.miniHeader}>
                <span>#SC847291</span>
                <span>Room 204</span>
              </div>
              <div className={styles.miniItems}>2x Asada Tacos, 1x Guacamole</div>
              <div className={styles.miniStatus}>PREPARING • 3:15</div>
            </div>
            <div className={styles.miniTicket} style={{ borderLeftColor: '#27ae60' }}>
              <div className={styles.miniHeader}>
                <span>#SC847290</span>
                <span>Palapa 8</span>
              </div>
              <div className={styles.miniItems}>1x Shrimp Cocktail, 1x Ceviche</div>
              <div className={styles.miniStatus}>READY • 5:42</div>
            </div>
            <div className={styles.miniTicket} style={{ borderLeftColor: '#e74c3c' }}>
              <div className={styles.miniHeader}>
                <span>#SC847293</span>
                <span>Pool Bar</span>
              </div>
              <div className={styles.miniItems}>1x Cheese Burger, 1x Piña Sorbet</div>
              <div className={styles.miniStatus}>NEW • 0:18</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
