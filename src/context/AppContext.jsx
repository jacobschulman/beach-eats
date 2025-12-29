import { createContext, useContext, useReducer, useCallback } from 'react';
import { theme as defaultTheme, getTheme } from '../config/theme';
import { getText } from '../config/content';

// Initial state
const initialState = {
  // Language
  language: 'en',

  // Theme
  theme: defaultTheme,
  themeName: 'susurros',

  // Navigation
  currentStep: 'welcome', // welcome, menu, category, protein, format, addons, summary, checkout, confirmation
  selectedCategory: null,

  // Current item being built
  currentItem: {
    protein: null,
    format: null,
    addons: [],
  },

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

// Action types
const ACTIONS = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  GO_TO_STEP: 'GO_TO_STEP',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_PROTEIN: 'SET_PROTEIN',
  SET_FORMAT: 'SET_FORMAT',
  TOGGLE_ADDON: 'TOGGLE_ADDON',
  ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
  ADD_MENU_ITEM_TO_ORDER: 'ADD_MENU_ITEM_TO_ORDER',
  REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER',
  SET_GUEST_INFO: 'SET_GUEST_INFO',
  PLACE_ORDER: 'PLACE_ORDER',
  RESET_ORDER: 'RESET_ORDER',
  RESET_CURRENT_ITEM: 'RESET_CURRENT_ITEM',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        themeName: action.payload,
        theme: getTheme(action.payload),
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
        currentItem: { protein: null, format: null, addons: [] },
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

    case ACTIONS.PLACE_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          orderNumber: `SC${Date.now().toString().slice(-6)}`,
        },
      };

    case ACTIONS.RESET_ORDER:
      return {
        ...state,
        currentStep: 'welcome',
        selectedCategory: null,
        currentItem: { protein: null, format: null, addons: [] },
        order: {
          items: [],
          guestInfo: { roomNumber: '', lastName: '', allergies: '' },
          orderNumber: null,
        },
      };

    case ACTIONS.RESET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: { protein: null, format: null, addons: [] },
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext(null);

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Language actions
  const toggleLanguage = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_LANGUAGE,
      payload: state.language === 'en' ? 'es' : 'en',
    });
  }, [state.language]);

  const t = useCallback(
    (path) => getText(path, state.language),
    [state.language]
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
