import { useState, useEffect, useCallback } from 'react';
import {
  proteins as defaultProteins,
  formats as defaultFormats,
  addons as defaultAddons,
  exclusions as defaultExclusions,
  menuItems as defaultMenuItems,
} from '../config/menu';

const STORAGE_KEY = 'beachEatsMenuConfig';

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

function getDefaultMenu() {
  return {
    proteins: initializeWithPrices(defaultProteins),
    formats: initializeWithPrices(defaultFormats),
    addons: initializeWithPrices(defaultAddons),
    exclusions: initializeWithPrices(defaultExclusions),
    menuItems: initializeMenuItems(defaultMenuItems),
  };
}

function getStoredMenu() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure new items are included
      const defaults = getDefaultMenu();
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
  return getDefaultMenu();
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

export function useMenu() {
  const [menu, setMenu] = useState(getStoredMenu);

  // Listen for storage changes (when admin saves)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setMenu(getStoredMenu());
      }
    };

    // Also poll for changes (same-tab updates)
    const interval = setInterval(() => {
      setMenu(getStoredMenu());
    }, 2000);

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

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
