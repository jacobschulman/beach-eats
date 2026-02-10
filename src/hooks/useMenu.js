import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { serviceConfig } from '../config/service';
import { subscribeToMenuConfig } from '../services/menuService';

const CONFIG_PARAM = 'config';

function initializeWithPrices(items, defaultPrice = 0) {
  return items.map(item => ({
    ...item,
    price: item.price ?? defaultPrice,
    available: item.available ?? true,
  }));
}

function initializeMenuItems(menuItems) {
  const result = {};
  Object.keys(menuItems).forEach(category => {
    result[category] = menuItems[category].map(item => ({
      ...item,
      price: item.price ?? 0,
      available: item.available ?? true,
    }));
  });
  return result;
}

function getDefaultSectionActive(resortConfig) {
  const active = {};
  resortConfig.menu.menuCategories.forEach(cat => {
    active[cat.id] = cat.id !== 'build-your-own';
  });
  return active;
}

export function getDefaultMenu(resortConfig) {
  const menuConfig = resortConfig.menu;
  return {
    proteins: initializeWithPrices(menuConfig.proteins),
    formats: initializeWithPrices(menuConfig.formats),
    addons: initializeWithPrices(menuConfig.addons),
    exclusions: initializeWithPrices(menuConfig.exclusions),
    menuItems: initializeMenuItems(menuConfig.menuItems),
    sectionActive: getDefaultSectionActive(resortConfig),
  };
}

// Compress config for URL (only store changed values)
function compressConfig(menu, resortConfig) {
  const defaults = getDefaultMenu(resortConfig);
  const changes = {};

  // Track availability and price changes for each section
  ['proteins', 'formats', 'addons', 'exclusions'].forEach(section => {
    const sectionChanges = {};
    menu[section].forEach((item, idx) => {
      const def = defaults[section][idx];
      if (def && (item.available !== def.available || item.price !== def.price)) {
        sectionChanges[item.id] = { a: item.available ? 1 : 0, p: item.price };
      }
    });
    if (Object.keys(sectionChanges).length > 0) {
      changes[section] = sectionChanges;
    }
  });

  // Track menu item changes
  const menuChanges = {};
  Object.keys(menu.menuItems).forEach(category => {
    const catChanges = {};
    menu.menuItems[category].forEach((item, idx) => {
      const def = defaults.menuItems[category]?.[idx];
      if (def && (item.available !== def.available || item.price !== def.price)) {
        catChanges[item.id] = { a: item.available ? 1 : 0, p: item.price };
      }
    });
    if (Object.keys(catChanges).length > 0) {
      menuChanges[category] = catChanges;
    }
  });
  if (Object.keys(menuChanges).length > 0) {
    changes.m = menuChanges;
  }

  // Track section active changes
  if (menu.sectionActive) {
    const saChanges = {};
    Object.entries(menu.sectionActive).forEach(([id, active]) => {
      if (defaults.sectionActive[id] !== undefined && active !== defaults.sectionActive[id]) {
        saChanges[id] = active ? 1 : 0;
      }
    });
    if (Object.keys(saChanges).length > 0) {
      changes.sa = saChanges;
    }
  }

  return changes;
}

// Apply compressed config changes to defaults
function applyCompressedConfig(compressed, resortConfig) {
  const menu = getDefaultMenu(resortConfig);

  ['proteins', 'formats', 'addons', 'exclusions'].forEach(section => {
    if (compressed[section]) {
      menu[section] = menu[section].map(item => {
        const change = compressed[section][item.id];
        if (change) {
          return { ...item, available: change.a === 1, price: change.p };
        }
        return item;
      });
    }
  });

  if (compressed.m) {
    Object.keys(compressed.m).forEach(category => {
      if (menu.menuItems[category]) {
        menu.menuItems[category] = menu.menuItems[category].map(item => {
          const change = compressed.m[category][item.id];
          if (change) {
            return { ...item, available: change.a === 1, price: change.p };
          }
          return item;
        });
      }
    });
  }

  if (compressed.sa) {
    Object.entries(compressed.sa).forEach(([id, active]) => {
      if (menu.sectionActive[id] !== undefined) {
        menu.sectionActive[id] = active === 1;
      }
    });
  }

  return menu;
}

// Encode config to URL-safe string
export function encodeConfig(menu, resortConfig) {
  try {
    const compressed = compressConfig(menu, resortConfig);
    if (Object.keys(compressed).length === 0) return '';
    const json = JSON.stringify(compressed);
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

// Decode config from URL-safe string
export function decodeConfig(encoded, resortConfig) {
  try {
    if (!encoded) return null;
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded);
    const compressed = JSON.parse(json);
    return applyCompressedConfig(compressed, resortConfig);
  } catch {
    return null;
  }
}

// Get config from URL if present
function getURLConfig(resortConfig, storageKey) {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(CONFIG_PARAM);
    if (encoded) {
      const config = decodeConfig(encoded, resortConfig);
      if (config) {
        localStorage.setItem(storageKey, JSON.stringify(config));
        return config;
      }
    }
  } catch {
    // Fall through
  }
  return null;
}

function mergeItems(defaults, stored) {
  if (!stored) return defaults;
  // Start with stored items matched by id, then add any new defaults
  const result = defaults.map(defaultItem => {
    const storedItem = stored.find(s => s.id === defaultItem.id);
    return storedItem ? { ...defaultItem, ...storedItem } : defaultItem;
  });
  // Also include custom items from stored that aren't in defaults
  stored.forEach(storedItem => {
    if (!defaults.find(d => d.id === storedItem.id)) {
      result.push(storedItem);
    }
  });
  return result;
}

function mergeMenuItems(defaults, stored) {
  if (!stored) return defaults;
  const result = {};
  // Merge default categories
  Object.keys(defaults).forEach(category => {
    result[category] = mergeItems(defaults[category], stored[category]);
  });
  // Include custom categories from stored
  Object.keys(stored).forEach(category => {
    if (!defaults[category]) {
      result[category] = stored[category];
    }
  });
  return result;
}

function mergeStoredMenu(resortConfig, stored) {
  const defaults = getDefaultMenu(resortConfig);
  return {
    proteins: mergeItems(defaults.proteins, stored.proteins),
    formats: mergeItems(defaults.formats, stored.formats),
    addons: mergeItems(defaults.addons, stored.addons),
    exclusions: mergeItems(defaults.exclusions, stored.exclusions),
    menuItems: mergeMenuItems(defaults.menuItems, stored.menuItems),
    sectionActive: { ...defaults.sectionActive, ...(stored.sectionActive || {}) },
  };
}

function getStoredMenu(resortConfig, resortId) {
  const storageKey = `beach-eats-menu-${resortId}`;

  // First check URL for shared config
  const urlConfig = getURLConfig(resortConfig, storageKey);
  if (urlConfig) return urlConfig;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return mergeStoredMenu(resortConfig, JSON.parse(stored));
    }
  } catch {
    // Fall through to defaults
  }
  return getDefaultMenu(resortConfig);
}

// Generate shareable URL with current config
export function generateShareURL(menu, mode = '', resortConfig, resortId) {
  const encoded = encodeConfig(menu, resortConfig);
  const baseUrl = serviceConfig.getBaseUrl();

  let url = `${baseUrl}/resorts/${resortId}`;

  if (mode === 'admin' || mode === 'menu') {
    url += '/menu';
  } else if (mode === 'chef' || mode === 'kitchen') {
    url += '/kitchen';
  }

  if (encoded) {
    url += `?${CONFIG_PARAM}=${encoded}`;
  }

  return url;
}

export function useMenu() {
  const { resortConfig, resortId } = useApp();
  const [menu, setMenu] = useState(() => getStoredMenu(resortConfig, resortId));

  // Subscribe to Firestore real-time updates (falls back to localStorage polling)
  useEffect(() => {
    const unsubscribe = subscribeToMenuConfig(resortId, (firestoreMenu) => {
      if (firestoreMenu) {
        const merged = mergeStoredMenu(resortConfig, firestoreMenu);
        setMenu(merged);
      }
    });

    return unsubscribe;
  }, [resortId, resortConfig]);

  // Get available items only
  const getAvailable = useCallback((items) => {
    return items.filter(item => item.available !== false);
  }, []);

  // Format price for display
  const formatPrice = useCallback((price) => {
    if (price === 0 || price === undefined) return null;
    return `+$${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
  }, []);

  // Check if a section is active
  const isSectionActive = useCallback((sectionId) => {
    if (!menu.sectionActive) return true;
    return menu.sectionActive[sectionId] !== false;
  }, [menu.sectionActive]);

  return {
    menu,
    proteins: menu.proteins,
    formats: menu.formats,
    addons: menu.addons,
    exclusions: menu.exclusions,
    menuItems: menu.menuItems,
    sectionActive: menu.sectionActive || {},
    availableProteins: getAvailable(menu.proteins),
    availableFormats: getAvailable(menu.formats),
    availableAddons: getAvailable(menu.addons),
    availableExclusions: getAvailable(menu.exclusions),
    getAvailableMenuItems: (category) => getAvailable(menu.menuItems[category] || []),
    isSectionActive,
    formatPrice,
  };
}

export default useMenu;
