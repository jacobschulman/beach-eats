import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

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

function getDefaultMenu(resortConfig) {
  const menuConfig = resortConfig.menu;
  return {
    proteins: initializeWithPrices(menuConfig.proteins),
    formats: initializeWithPrices(menuConfig.formats),
    addons: initializeWithPrices(menuConfig.addons),
    exclusions: initializeWithPrices(menuConfig.exclusions),
    menuItems: initializeMenuItems(menuConfig.menuItems),
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
        // Also save to localStorage so it persists
        localStorage.setItem(storageKey, JSON.stringify(config));
        return config;
      }
    }
  } catch {
    // Fall through
  }
  return null;
}

function getStoredMenu(resortConfig, resortId) {
  const storageKey = `beach-eats-menu-${resortId}`;

  // First check URL for shared config
  const urlConfig = getURLConfig(resortConfig, storageKey);
  if (urlConfig) return urlConfig;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure new items are included
      const defaults = getDefaultMenu(resortConfig);
      return {
        proteins: mergeItems(defaults.proteins, parsed.proteins),
        formats: mergeItems(defaults.formats, parsed.formats),
        addons: mergeItems(defaults.addons, parsed.addons),
        exclusions: mergeItems(defaults.exclusions, parsed.exclusions),
        menuItems: mergeMenuItems(defaults.menuItems, parsed.menuItems),
      };
    }
  } catch {
    // Fall through to defaults
  }
  return getDefaultMenu(resortConfig);
}

function mergeItems(defaults, stored) {
  if (!stored) return defaults;
  return defaults.map(defaultItem => {
    const storedItem = stored.find(s => s.id === defaultItem.id);
    return storedItem ? { ...defaultItem, ...storedItem } : defaultItem;
  });
}

function mergeMenuItems(defaults, stored) {
  if (!stored) return defaults;
  const result = {};
  Object.keys(defaults).forEach(category => {
    result[category] = mergeItems(defaults[category], stored[category]);
  });
  return result;
}

// Generate shareable URL with current config
export function generateShareURL(menu, mode = '', resortConfig, resortId) {
  const encoded = encodeConfig(menu, resortConfig);
  const baseUrl = window.location.origin + window.location.pathname;

  // Build params array
  const params = [];
  if (resortId) params.push(`resort=${resortId}`);
  if (mode) params.push(mode);
  if (encoded) params.push(`${CONFIG_PARAM}=${encoded}`);

  const queryString = params.length > 0 ? '?' + params.join('&') : '';
  return `${baseUrl}${queryString}`;
}

export function useMenu() {
  const { resortConfig, resortId } = useApp();
  const [menu, setMenu] = useState(() => getStoredMenu(resortConfig, resortId));
  const storageKey = `beach-eats-menu-${resortId}`;

  // Listen for storage changes (when admin saves)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === storageKey) {
        setMenu(getStoredMenu(resortConfig, resortId));
      }
    };

    // Also poll for changes (same-tab updates)
    const interval = setInterval(() => {
      setMenu(getStoredMenu(resortConfig, resortId));
    }, 2000);

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [resortId, resortConfig, storageKey]);

  // Get available items only
  const getAvailable = useCallback((items) => {
    return items.filter(item => item.available !== false);
  }, []);

  // Format price for display
  const formatPrice = useCallback((price) => {
    if (price === 0 || price === undefined) return null;
    return `+$${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
  }, []);

  return {
    menu, // expose full menu for sharing
    proteins: menu.proteins,
    formats: menu.formats,
    addons: menu.addons,
    exclusions: menu.exclusions,
    menuItems: menu.menuItems,
    availableProteins: getAvailable(menu.proteins),
    availableFormats: getAvailable(menu.formats),
    availableAddons: getAvailable(menu.addons),
    availableExclusions: getAvailable(menu.exclusions),
    getAvailableMenuItems: (category) => getAvailable(menu.menuItems[category] || []),
    formatPrice,
  };
}

export default useMenu;
