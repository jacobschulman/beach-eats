import { db, isFirebaseAvailable } from '../config/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

function getMenuDocRef(resortId) {
  return doc(db, 'resorts', resortId, 'config', 'menu');
}

/**
 * Save menu config to Firestore.
 * Also saves to localStorage as cache/fallback.
 */
export async function saveMenuConfig(resortId, menuData) {
  const storageKey = `beach-eats-menu-${resortId}`;
  localStorage.setItem(storageKey, JSON.stringify(menuData));

  if (!isFirebaseAvailable()) return;

  try {
    await setDoc(getMenuDocRef(resortId), {
      ...menuData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Firestore saveMenuConfig failed, localStorage fallback active:', error);
  }
}

/**
 * Subscribe to real-time menu config updates from Firestore.
 * Falls back to localStorage polling if Firebase unavailable.
 * Returns an unsubscribe function.
 */
export function subscribeToMenuConfig(resortId, callback) {
  if (!isFirebaseAvailable()) {
    return subscribeToMenuLocalStorage(resortId, callback);
  }

  return onSnapshot(getMenuDocRef(resortId), (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      // Remove Firestore metadata fields before passing to consumer
      const { updatedAt, ...menuData } = data;
      callback(menuData);
    } else {
      callback(null);
    }
  }, (error) => {
    console.warn('Firestore menu subscription error, falling back to localStorage:', error);
    subscribeToMenuLocalStorage(resortId, callback);
  });
}

function subscribeToMenuLocalStorage(resortId, callback) {
  const storageKey = `beach-eats-menu-${resortId}`;

  const load = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      callback(stored ? JSON.parse(stored) : null);
    } catch {
      callback(null);
    }
  };

  load();
  const interval = setInterval(load, 2000);

  const handleStorage = (e) => {
    if (e.key === storageKey) load();
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    clearInterval(interval);
    window.removeEventListener('storage', handleStorage);
  };
}
