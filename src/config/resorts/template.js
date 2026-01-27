// ============================================
// RESORT CONFIGURATION TEMPLATE
// ============================================
// Follow these 5 steps to add a new resort in under 5 minutes:
//
// 1. Copy this file → newresort.js
// 2. Update the 5 KEY FIELDS marked with ⭐
// 3. Import in resorts/index.js
// 4. Test with ?resort=newresort
// 5. Customize menu via admin interface
// ============================================

const templateConfig = {
  // ⭐ 1. RESORT IDENTITY
  id: 'newresort',              // REQUIRED: Unique ID (lowercase, no spaces) - used in URLs
  slug: 'newresort',            // REQUIRED: URL-friendly slug (usually same as id)
  orderPrefix: 'NR',            // REQUIRED: 2-3 letter prefix for order numbers (e.g., NR123456)

  // ⭐ 2. BRANDING
  branding: {
    name: {
      en: 'New Resort Name',    // REQUIRED: Resort name in English
      es: 'Nombre del Resort',  // Spanish translation
    },
    tagline: {
      en: 'Your Tagline Here',  // Resort tagline/slogan
      es: 'Su Lema Aquí',
    },
    byline: {
      en: 'by Hotel Group',     // Management company name
      es: 'por Grupo Hotelero',
    },
    logo: null,                 // OPTIONAL: Logo URL
  },

  // ⭐ 3. THEME / COLORS
  theme: {
    name: 'newresort',

    colors: {
      // PRIMARY COLORS - Change these to match resort branding
      primary: '#2C5F4F',       // ⭐ Main brand color
      secondary: '#8B6F47',     // Secondary text color
      accent: '#D4A574',        // ⭐ Accent color for highlights

      // BACKGROUNDS (usually light colors)
      background: '#FBF9F4',
      surface: '#FFFFFF',
      surfaceAlt: '#F3EFE6',

      // UI ELEMENTS (borders, buttons)
      border: '#E5DFD0',
      borderHover: '#D4C9B3',
      buttonPrimary: '#2C5F4F',
      buttonPrimaryText: '#FFFFFF',
      buttonSecondary: 'transparent',
      buttonSecondaryText: '#2C5F4F',

      // STATE COLORS
      success: '#5A8F7B',
      error: '#C17B6C',
      overlay: 'rgba(44, 95, 79, 0.6)',
    },

    // Rest of theme config (usually keep defaults)
    typography: {
      fontHeading: "'Playfair Display', Georgia, 'Times New Roman', serif",
      fontBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      sizeXs: '0.75rem',
      sizeSm: '0.875rem',
      sizeBase: '1rem',
      sizeMd: '1.125rem',
      sizeLg: '1.5rem',
      sizeXl: '2rem',
      size2xl: '2.5rem',
      size3xl: '3rem',
      weightLight: 300,
      weightNormal: 400,
      weightMedium: 500,
      weightSemibold: 600,
      lineHeightTight: 1.2,
      lineHeightNormal: 1.5,
      lineHeightRelaxed: 1.75,
      trackingTight: '-0.02em',
      trackingNormal: '0',
      trackingWide: '0.05em',
      trackingWidest: '0.1em',
    },

    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
    },

    borderRadius: {
      none: '0',
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '9999px',
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.07)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },

    transitions: {
      fast: '150ms ease',
      normal: '300ms ease',
      slow: '500ms ease',
      slower: '700ms ease',
    },

    assets: {
      heroPattern: 'linear-gradient(180deg, rgba(251, 249, 244, 0) 0%, rgba(251, 249, 244, 1) 100%)',
    },
  },

  // ⭐ 4. RESORT-SPECIFIC LABELS
  defaults: {
    roomLabel: {
      en: 'Room Number',        // ⭐ Change if resort uses different terminology (e.g., "Hale", "Villa", "Suite")
      es: 'Número de Habitación',
    },
    deliveryLocation: 'Room 101', // Default delivery location for fallback
  },

  // ⭐ 5. CONTENT / LANGUAGE STRINGS
  // TIP: Start with these defaults, customize later as needed
  content: {
    ui: {
      languageToggle: { en: 'ES', es: 'EN' },
      back: { en: 'Back', es: 'Atrás' },
      continue: { en: 'Continue', es: 'Continuar' },
      addToOrder: { en: 'Add to Order', es: 'Agregar al Pedido' },
      checkout: { en: 'Checkout', es: 'Finalizar' },
      placeOrder: { en: 'Place Order', es: 'Realizar Pedido' },
      remove: { en: 'Remove', es: 'Eliminar' },
      addMore: { en: 'Add Another Item', es: 'Agregar Otro' },
      orderAnother: { en: 'Order More', es: 'Pedir Más' },
    },
    welcome: {
      greeting: { en: 'Welcome to', es: 'Bienvenido a' },
      subtitle: { en: 'Beach Ordering', es: 'Pedidos en la Playa' },
      cta: { en: 'Place an Order', es: 'Realizar Pedido' },
    },
    menu: {
      title: { en: 'Our Menu', es: 'Nuestro Menú' },
      subtitle: { en: 'Fresh flavors delivered', es: 'Sabores frescos entregados' },
    },
    steps: {
      protein: {
        title: { en: 'Select Your Protein', es: 'Selecciona tu Proteína' },
        subtitle: { en: 'Choose one to begin', es: 'Elige una para comenzar' },
      },
      format: {
        title: { en: 'Choose Your Style', es: 'Elige tu Estilo' },
        subtitle: { en: 'How would you like it prepared?', es: '¿Cómo te gustaría prepararlo?' },
      },
      addons: {
        title: { en: 'Add Extras', es: 'Agregar Extras' },
        subtitle: { en: 'Optional accompaniments', es: 'Acompañamientos opcionales' },
      },
      modifications: {
        title: { en: 'Modifications', es: 'Modificaciones' },
        subtitle: { en: 'Any changes to your dish?', es: '¿Algún cambio a tu platillo?' },
        none: { en: 'No modifications', es: 'Sin modificaciones' },
      },
      summary: {
        title: { en: 'Your Order', es: 'Tu Pedido' },
        subtitle: { en: 'Review and confirm', es: 'Revisa y confirma' },
        empty: { en: 'Your order is empty', es: 'Tu pedido está vacío' },
        item: { en: 'item', es: 'artículo' },
        items: { en: 'items', es: 'artículos' },
      },
      checkout: {
        title: { en: 'Guest Information', es: 'Información del Huésped' },
        subtitle: { en: 'For delivery to your location', es: 'Para entrega a su ubicación' },
        lastName: {
          label: { en: 'Last Name', es: 'Apellido' },
          placeholder: { en: 'Enter last name', es: 'Ingrese apellido' },
        },
        allergies: {
          title: { en: 'Allergies & Dietary Needs', es: 'Alergias y Necesidades Dietéticas' },
          placeholder: { en: 'Please list any food allergies or dietary restrictions...', es: 'Por favor indique alergias alimentarias o restricciones dietéticas...' },
          note: { en: 'Our kitchen takes allergies seriously. Please inform us of any concerns.', es: 'Nuestra cocina toma las alergias muy en serio. Por favor infórmenos de cualquier preocupación.' },
        },
      },
      confirmation: {
        title: { en: 'Order Placed', es: 'Pedido Realizado' },
        message: { en: 'Thank you for your order. Your meal will be delivered shortly.', es: 'Gracias por su pedido. Su comida será entregada pronto.' },
        orderNumber: { en: 'Order Number', es: 'Número de Pedido' },
        newOrder: { en: 'Start New Order', es: 'Nuevo Pedido' },
      },
    },
    with: { en: 'with', es: 'con' },
  },

  // MENU CONFIGURATION
  // TIP: Start with empty arrays, customize via admin interface after setup
  // Or copy menu sections from susurros.js/rwkona.js as a starting point
  menu: {
    dietaryFlags: {
      gf: { label: 'GF', name: { en: 'Gluten Free', es: 'Sin Gluten' } },
      v: { label: 'V', name: { en: 'Vegetarian', es: 'Vegetariano' } },
      vg: { label: 'VG', name: { en: 'Vegan', es: 'Vegano' } },
      df: { label: 'DF', name: { en: 'Dairy Free', es: 'Sin Lácteos' } },
      spicy: { label: '🌶', name: { en: 'Spicy', es: 'Picante' } },
    },

    // Icons: Copy from susurros.js or rwkona.js (same SVG icons work for all)
    icons: {
      // ... copy icon definitions here
    },

    proteins: [
      // Add your proteins here, or use admin to configure
    ],

    formats: [
      // Add your formats here
    ],

    addons: [
      // Add your add-ons here
    ],

    exclusions: [
      { id: 'no-crema', name: { en: 'No Cream', es: 'Sin Crema' } },
      { id: 'no-cheese', name: { en: 'No Cheese', es: 'Sin Queso' } },
      { id: 'no-onion', name: { en: 'No Onion', es: 'Sin Cebolla' } },
      { id: 'no-cilantro', name: { en: 'No Cilantro', es: 'Sin Cilantro' } },
      { id: 'no-spicy', name: { en: 'No Spicy', es: 'Sin Picante' } },
      { id: 'no-avocado', name: { en: 'No Avocado', es: 'Sin Aguacate' } },
    ],

    menuCategories: [
      {
        id: 'build-your-own',
        name: { en: 'Build Your Own', es: 'Crea Tu Platillo' },
        description: { en: 'Craft your perfect dish', es: 'Crea tu platillo perfecto' },
        icon: 'buildOwn',
        special: true,
      },
      // Add more categories
    ],

    menuItems: {
      // Add menu items by category
    },
  },
};

export default templateConfig;
