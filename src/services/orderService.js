import { db, isFirebaseAvailable } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';

// ---- DEBUG LOG (visible in UI via getDebugLog) ----
const _debugLog = [];
function debugLog(msg) {
  const entry = `[${new Date().toLocaleTimeString()}] ${msg}`;
  _debugLog.push(entry);
  if (_debugLog.length > 20) _debugLog.shift();
  console.log('[orderService]', msg);
}
export function getDebugLog() { return [..._debugLog]; }

// ---- FIRESTORE OPERATIONS ----

// Strip undefined values recursively — Firestore rejects undefined
function stripUndefined(obj) {
  if (Array.isArray(obj)) return obj.map(stripUndefined);
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, stripUndefined(v)])
    );
  }
  return obj;
}

function getOrdersCollection(resortId) {
  return collection(db, 'resorts', resortId, 'orders');
}

/**
 * Save a new order to Firestore + localStorage.
 */
export async function saveOrder(resortId, order) {
  debugLog(`saveOrder called: resort=${resortId}, order=${order.orderNumber}`);
  // Always save to localStorage as fallback/cache
  saveOrderToLocalStorage(resortId, order);

  if (!isFirebaseAvailable()) {
    debugLog('Firebase NOT available — localStorage only');
    return;
  }

  debugLog('Firebase available, writing to Firestore...');
  try {
    const cleanOrder = stripUndefined(order);
    const orderRef = doc(db, 'resorts', resortId, 'orders', order.orderNumber);
    await setDoc(orderRef, {
      ...cleanOrder,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    debugLog(`Firestore write SUCCESS: ${order.orderNumber}`);
  } catch (error) {
    debugLog(`Firestore write FAILED: ${error.code || error.message}`);
    console.warn('Firestore saveOrder failed, localStorage fallback active:', error);
  }
}

/**
 * Subscribe to real-time order updates for a resort.
 * Returns an unsubscribe function.
 */
export function subscribeToOrders(resortId, callback) {
  debugLog(`subscribeToOrders called: resort=${resortId}, firebase=${isFirebaseAvailable()}`);

  if (!isFirebaseAvailable()) {
    debugLog('Firebase NOT available — using localStorage subscription');
    return subscribeToOrdersLocalStorage(resortId, callback);
  }

  debugLog('Setting up Firestore onSnapshot listener...');
  const q = query(
    getOrdersCollection(resortId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    debugLog(`onSnapshot received: ${snapshot.docs.length} docs`);
    const orders = snapshot.docs.map((d) => ({
      ...d.data(),
      // Ensure status has a default
      status: d.data().status || 'new',
    }));
    callback(orders);
  }, (error) => {
    debugLog(`onSnapshot ERROR: ${error.code || error.message}`);
    console.warn('Firestore subscription error, falling back to localStorage:', error);
    subscribeToOrdersLocalStorage(resortId, callback);
  });
}

/**
 * Update the status of an order.
 */
export async function updateOrderStatus(resortId, orderNumber, newStatus) {
  // Always update localStorage
  updateStatusLocalStorage(orderNumber, newStatus);

  if (!isFirebaseAvailable()) return;

  try {
    const orderRef = doc(db, 'resorts', resortId, 'orders', orderNumber);
    await updateDoc(orderRef, { status: newStatus });
  } catch (error) {
    console.warn('Firestore updateOrderStatus failed:', error);
  }
}

// ---- LOCALSTORAGE FALLBACK ----

function saveOrderToLocalStorage(resortId, order) {
  try {
    const storageKey = `kitchen-orders-${resortId}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Duplicate check: skip if recent order with same item count within 5s
    const recent = existing[0];
    if (recent) {
      const timeDiff = Date.now() - new Date(recent.placedAt).getTime();
      if (timeDiff < 5000 && recent.items?.length === order.items?.length) {
        return;
      }
    }

    existing.unshift(order);
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
  } catch (e) {
    console.warn('localStorage saveOrder failed:', e);
  }
}

function subscribeToOrdersLocalStorage(resortId, callback) {
  const loadOrders = () => {
    try {
      const storageKey = `kitchen-orders-${resortId}`;
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const statuses = JSON.parse(localStorage.getItem('kitchenOrderStatuses') || '{}');

      const seen = new Set();
      const orders = stored
        .filter((o) => {
          if (!o || !o.orderNumber || !o.items || !Array.isArray(o.items)) return false;
          if (seen.has(o.orderNumber)) return false;
          seen.add(o.orderNumber);
          return true;
        })
        .map((o) => ({ ...o, status: statuses[o.orderNumber] || 'new' }));

      callback(orders);
    } catch (e) {
      console.warn('localStorage loadOrders failed:', e);
    }
  };

  loadOrders();
  const interval = setInterval(loadOrders, 2000);

  const handleStorage = (e) => {
    if (e.key === `kitchen-orders-${resortId}` || e.key === 'kitchenOrderStatuses') {
      loadOrders();
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    clearInterval(interval);
    window.removeEventListener('storage', handleStorage);
  };
}

function updateStatusLocalStorage(orderNumber, newStatus) {
  try {
    const statuses = JSON.parse(localStorage.getItem('kitchenOrderStatuses') || '{}');
    statuses[orderNumber] = newStatus;
    localStorage.setItem('kitchenOrderStatuses', JSON.stringify(statuses));
  } catch (e) {
    console.warn('localStorage updateStatus failed:', e);
  }
}
