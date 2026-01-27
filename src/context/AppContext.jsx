import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { getResortConfig, defaultResortId } from '../config/resorts/index';

// Detect current resort from URL or localStorage
function detectCurrentResort() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlResort = urlParams.get('resort');
  const storedResort = localStorage.getItem('beach-eats-resort');
  return urlResort || storedResort || defaultResortId;
}

// Save resort selection to localStorage
function saveResortSelection(resortId) {
  try {
    localStorage.setItem('beach-eats-resort', resortId);
  } catch (e) {
    console.warn('Could not save resort to localStorage', e);
  }
}

// Helper function to get translated text from resort config
function getTextFromConfig(resortConfig, path, language = 'en') {
  const keys = path.split('.');
  let value = resortConfig.content;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Missing translation in resort config: ${path}`);
      return path;
    }
  }

  if (typeof value === 'object' && language in value) {
    return value[language];
  }

  return value?.en || path;
}

// Function to create initial state with resort config
function createInitialState(resortId) {
  const resortConfig = getResortConfig(resortId);

  return {
    // Resort
    resortId,
    resortConfig,

    // Language
    language: 'en',

    // Theme
    theme: resortConfig.theme,
    themeName: resortConfig.id,

    // Navigation
    currentStep: 'welcome', // welcome, menu, category, protein, format, addons, summary, checkout, confirmation
    selectedCategory: null,

    // Current item being built (Build Your Own)
    currentItem: {
      protein: null,
      format: null,
      addons: [],
      exclusions: [],
    },

    // Pending menu item being modified before adding to order
    pendingItem: null,

    // Order (collection of items)
    order: {
      items: [],
      guestInfo: {
        roomNumber: '',
        lastName: '',
        allergies: '',
      },
      orderNumber: null,
    },
  };
}

// Action types
const ACTIONS = {
  SET_RESORT: 'SET_RESORT',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  GO_TO_STEP: 'GO_TO_STEP',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_PROTEIN: 'SET_PROTEIN',
  SET_FORMAT: 'SET_FORMAT',
  TOGGLE_ADDON: 'TOGGLE_ADDON',
  TOGGLE_EXCLUSION: 'TOGGLE_EXCLUSION',
  ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
  ADD_MENU_ITEM_TO_ORDER: 'ADD_MENU_ITEM_TO_ORDER',
  SET_PENDING_ITEM: 'SET_PENDING_ITEM',
  TOGGLE_PENDING_EXCLUSION: 'TOGGLE_PENDING_EXCLUSION',
  ADD_PENDING_ITEM_TO_ORDER: 'ADD_PENDING_ITEM_TO_ORDER',
  REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER',
  SET_GUEST_INFO: 'SET_GUEST_INFO',
  PLACE_ORDER: 'PLACE_ORDER',
  RESET_ORDER: 'RESET_ORDER',
  RESET_CURRENT_ITEM: 'RESET_CURRENT_ITEM',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_RESORT: {
      const newResortConfig = getResortConfig(action.payload);
      return {
        ...state,
        resortId: action.payload,
        resortConfig: newResortConfig,
        theme: newResortConfig.theme,
        themeName: newResortConfig.id,
      };
    }

    case ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        themeName: action.payload,
        theme: state.resortConfig.theme,
      };

    case ACTIONS.GO_TO_STEP:
      return { ...state, currentStep: action.payload };

    case ACTIONS.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case ACTIONS.SET_PROTEIN:
      return {
        ...state,
        currentItem: { ...state.currentItem, protein: action.payload },
      };

    case ACTIONS.SET_FORMAT:
      return {
        ...state,
        currentItem: { ...state.currentItem, format: action.payload },
      };

    case ACTIONS.TOGGLE_ADDON: {
      const addons = state.currentItem.addons.includes(action.payload)
        ? state.currentItem.addons.filter((id) => id !== action.payload)
        : [...state.currentItem.addons, action.payload];
      return {
        ...state,
        currentItem: { ...state.currentItem, addons },
      };
    }

    case ACTIONS.TOGGLE_EXCLUSION: {
      const exclusions = state.currentItem.exclusions.includes(action.payload)
        ? state.currentItem.exclusions.filter((id) => id !== action.payload)
        : [...state.currentItem.exclusions, action.payload];
      return {
        ...state,
        currentItem: { ...state.currentItem, exclusions },
      };
    }

    case ACTIONS.ADD_ITEM_TO_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          items: [
            ...state.order.items,
            { ...state.currentItem, id: Date.now(), type: 'build-your-own' },
          ],
        },
        currentItem: { protein: null, format: null, addons: [], exclusions: [] },
      };

    case ACTIONS.SET_PENDING_ITEM:
      return {
        ...state,
        pendingItem: { ...action.payload, exclusions: [] },
      };

    case ACTIONS.TOGGLE_PENDING_EXCLUSION: {
      if (!state.pendingItem) return state;
      const exclusions = state.pendingItem.exclusions.includes(action.payload)
        ? state.pendingItem.exclusions.filter((id) => id !== action.payload)
        : [...state.pendingItem.exclusions, action.payload];
      return {
        ...state,
        pendingItem: { ...state.pendingItem, exclusions },
      };
    }

    case ACTIONS.ADD_PENDING_ITEM_TO_ORDER:
      if (!state.pendingItem) return state;
      return {
        ...state,
        order: {
          ...state.order,
          items: [
            ...state.order.items,
            { ...state.pendingItem, id: Date.now(), type: 'menu-item' },
          ],
        },
        pendingItem: null,
      };

    case ACTIONS.ADD_MENU_ITEM_TO_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          items: [
            ...state.order.items,
            { ...action.payload, id: Date.now(), type: 'menu-item' },
          ],
        },
      };

    case ACTIONS.REMOVE_ITEM_FROM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          items: state.order.items.filter((item) => item.id !== action.payload),
        },
      };

    case ACTIONS.SET_GUEST_INFO:
      return {
        ...state,
        order: {
          ...state.order,
          guestInfo: { ...state.order.guestInfo, ...action.payload },
        },
      };

    case ACTIONS.PLACE_ORDER: {
      // Prevent duplicate orders if already placed
      if (state.order.orderNumber) {
        return state;
      }
      // Use timestamp + random to ensure unique order number
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      // Use resort-specific order prefix
      const orderPrefix = state.resortConfig.orderPrefix || 'OR';
      const orderNumber = `${orderPrefix}${timestamp.toString().slice(-6)}${random}`;
      const completedOrder = {
        ...state.order,
        orderNumber,
        placedAt: new Date().toISOString(),
      };
      // Save to resort-specific localStorage key for kitchen display
      try {
        const storageKey = `kitchen-orders-${state.resortId}`;
        const existingOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
        // Check if we recently placed an order (within 5 seconds) to prevent duplicates
        const recentOrder = existingOrders[0];
        if (recentOrder) {
          const recentTime = new Date(recentOrder.placedAt).getTime();
          const timeDiff = timestamp - recentTime;
          // If last order was less than 5 seconds ago and has same items count, skip
          if (timeDiff < 5000 && recentOrder.items?.length === state.order.items?.length) {
            return {
              ...state,
              order: {
                ...state.order,
                orderNumber: recentOrder.orderNumber,
              },
            };
          }
        }
        existingOrders.unshift(completedOrder);
        // Keep last 20 orders
        localStorage.setItem(storageKey, JSON.stringify(existingOrders.slice(0, 20)));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return {
        ...state,
        order: {
          ...state.order,
          orderNumber,
        },
      };
    }

    case ACTIONS.RESET_ORDER:
      return {
        ...state,
        currentStep: 'welcome',
        selectedCategory: null,
        currentItem: { protein: null, format: null, addons: [], exclusions: [] },
        pendingItem: null,
        order: {
          items: [],
          guestInfo: { roomNumber: '', lastName: '', allergies: '' },
          orderNumber: null,
        },
      };

    case ACTIONS.RESET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: { protein: null, format: null, addons: [], exclusions: [] },
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext(null);

// Provider component
export function AppProvider({ children }) {
  // Detect resort and create initial state
  const resortId = detectCurrentResort();
  const [state, dispatch] = useReducer(appReducer, createInitialState(resortId));

  // Save resort selection if it came from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlResort = urlParams.get('resort');
    if (urlResort) {
      saveResortSelection(urlResort);
    }
  }, []);

  // Apply theme CSS variables when resort changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = state.resortConfig.theme;

    // Inject color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Inject typography variables
    Object.entries(theme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Update document title with resort name
    const resortName = state.resortConfig.branding.name.en;
    document.title = `${resortName} - Beach Ordering`;
  }, [state.resortId, state.resortConfig]);

  // Language actions
  const toggleLanguage = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_LANGUAGE,
      payload: state.language === 'en' ? 'es' : 'en',
    });
  }, [state.language]);

  const t = useCallback(
    (path) => getTextFromConfig(state.resortConfig, path, state.language),
    [state.resortConfig, state.language]
  );

  // Navigation actions
  const goToStep = useCallback((step) => {
    dispatch({ type: ACTIONS.GO_TO_STEP, payload: step });
  }, []);

  const setSelectedCategory = useCallback((categoryId) => {
    dispatch({ type: ACTIONS.SET_SELECTED_CATEGORY, payload: categoryId });
  }, []);

  // Item building actions
  const setProtein = useCallback((proteinId) => {
    dispatch({ type: ACTIONS.SET_PROTEIN, payload: proteinId });
  }, []);

  const setFormat = useCallback((formatId) => {
    dispatch({ type: ACTIONS.SET_FORMAT, payload: formatId });
  }, []);

  const toggleAddon = useCallback((addonId) => {
    dispatch({ type: ACTIONS.TOGGLE_ADDON, payload: addonId });
  }, []);

  const toggleExclusion = useCallback((exclusionId) => {
    dispatch({ type: ACTIONS.TOGGLE_EXCLUSION, payload: exclusionId });
  }, []);

  // Pending item actions (for menu items before adding)
  const setPendingItem = useCallback((item) => {
    dispatch({ type: ACTIONS.SET_PENDING_ITEM, payload: item });
  }, []);

  const togglePendingExclusion = useCallback((exclusionId) => {
    dispatch({ type: ACTIONS.TOGGLE_PENDING_EXCLUSION, payload: exclusionId });
  }, []);

  const addPendingItemToOrder = useCallback(() => {
    dispatch({ type: ACTIONS.ADD_PENDING_ITEM_TO_ORDER });
  }, []);

  // Order actions
  const addItemToOrder = useCallback(() => {
    dispatch({ type: ACTIONS.ADD_ITEM_TO_ORDER });
  }, []);

  const addMenuItemToOrder = useCallback((item) => {
    dispatch({ type: ACTIONS.ADD_MENU_ITEM_TO_ORDER, payload: item });
  }, []);

  const removeItemFromOrder = useCallback((itemId) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM_FROM_ORDER, payload: itemId });
  }, []);

  const setGuestInfo = useCallback((info) => {
    dispatch({ type: ACTIONS.SET_GUEST_INFO, payload: info });
  }, []);

  const placeOrder = useCallback(() => {
    dispatch({ type: ACTIONS.PLACE_ORDER });
  }, []);

  const resetOrder = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_ORDER });
  }, []);

  const resetCurrentItem = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_CURRENT_ITEM });
  }, []);

  const value = {
    // State
    ...state,

    // Language
    toggleLanguage,
    t,

    // Navigation
    goToStep,
    setSelectedCategory,

    // Item building
    setProtein,
    setFormat,
    toggleAddon,
    toggleExclusion,

    // Pending item (for menu item modifications)
    setPendingItem,
    togglePendingExclusion,
    addPendingItemToOrder,

    // Order management
    addItemToOrder,
    addMenuItemToOrder,
    removeItemFromOrder,
    setGuestInfo,
    placeOrder,
    resetOrder,
    resetCurrentItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
