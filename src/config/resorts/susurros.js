// Susurros del Corazón Resort Configuration
// Auberge Resorts - Acapulco, Mexico
// Complete configuration for branding, theme, content, and menu

const susurrosConfig = {
  // ============================================
  // RESORT IDENTITY
  // ============================================

  id: 'susurros',
  slug: 'susurros',
  orderPrefix: 'SC', // Used for order numbers: SC123456

  // ============================================
  // BRANDING
  // ============================================

  branding: {
    name: {
      en: 'Susurros del Corazón',
      es: 'Susurros del Corazón',
    },
    tagline: {
      en: 'Closer to Nature. Closer to the Heart.',
      es: 'Más cerca de la naturaleza. Más cerca del corazón.',
    },
    byline: {
      en: 'by Auberge Resorts',
      es: 'por Auberge Resorts',
    },
    logo: null, // Optional logo URL
  },

  // ============================================
  // THEME / STYLING
  // ============================================

  theme: {
    name: 'susurros',

    colors: {
      // Primary palette - warm earth tones
      primary: '#515052',      // Charcoal - main text
      secondary: '#949292',    // Warm gray - secondary text
      accent: '#8B7355',       // Warm brown - accent elements

      // Backgrounds
      background: '#FDFBF8',   // Warm off-white
      surface: '#FFFFFF',      // Pure white for cards
      surfaceAlt: '#F5F2ED',   // Slightly darker surface

      // UI elements
      border: '#E8E4DF',       // Subtle borders
      borderHover: '#D4CFC8',  // Hover state borders

      // Interactive
      buttonPrimary: '#515052',
      buttonPrimaryText: '#FFFFFF',
      buttonSecondary: 'transparent',
      buttonSecondaryText: '#515052',

      // States
      success: '#6B8E6B',      // Muted green
      error: '#B85C5C',        // Muted red

      // Overlay
      overlay: 'rgba(81, 80, 82, 0.6)',
    },

    typography: {
      // Elegant serif for headings - matches Auberge luxury aesthetic
      fontHeading: "'Playfair Display', Georgia, 'Times New Roman', serif",
      // Clean sans-serif for body - modern and readable
      fontBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      // Font sizes (mobile-first)
      sizeXs: '0.75rem',     // 12px
      sizeSm: '0.875rem',    // 14px
      sizeBase: '1rem',      // 16px
      sizeMd: '1.125rem',    // 18px
      sizeLg: '1.5rem',      // 24px
      sizeXl: '2rem',        // 32px
      size2xl: '2.5rem',     // 40px
      size3xl: '3rem',       // 48px

      // Font weights
      weightLight: 300,
      weightNormal: 400,
      weightMedium: 500,
      weightSemibold: 600,

      // Line heights
      lineHeightTight: 1.2,
      lineHeightNormal: 1.5,
      lineHeightRelaxed: 1.75,

      // Letter spacing
      trackingTight: '-0.02em',
      trackingNormal: '0',
      trackingWide: '0.05em',
      trackingWidest: '0.1em',
    },

    spacing: {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '3rem',   // 48px
      '3xl': '4rem',   // 64px
      '4xl': '6rem',   // 96px
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
      heroPattern: 'linear-gradient(180deg, rgba(253, 251, 248, 0) 0%, rgba(253, 251, 248, 1) 100%)',
    },
  },

  // ============================================
  // DEFAULTS & RESORT-SPECIFIC SETTINGS
  // ============================================

  defaults: {
    roomLabel: {
      en: 'Room / Palapa Number',
      es: 'Número de Habitación / Palapa',
    },
    deliveryLocation: 'Palapa 12',
  },

  // ============================================
  // CONTENT / i18n STRINGS
  // ============================================

  content: {
    // Resort branding (for UI display)
    resort: {
      name: {
        en: 'Susurros del Corazón',
        es: 'Susurros del Corazón',
      },
      tagline: {
        en: 'Closer to Nature. Closer to the Heart.',
        es: 'Más cerca de la naturaleza. Más cerca del corazón.',
      },
      byline: {
        en: 'by Auberge Resorts',
        es: 'por Auberge Resorts',
      },
    },

    // Navigation & UI
    ui: {
      languageToggle: {
        en: 'ES',
        es: 'EN',
      },
      back: {
        en: 'Back',
        es: 'Atrás',
      },
      continue: {
        en: 'Continue',
        es: 'Continuar',
      },
      addToOrder: {
        en: 'Add to Order',
        es: 'Agregar al Pedido',
      },
      checkout: {
        en: 'Checkout',
        es: 'Finalizar',
      },
      placeOrder: {
        en: 'Place Order',
        es: 'Realizar Pedido',
      },
      remove: {
        en: 'Remove',
        es: 'Eliminar',
      },
      addMore: {
        en: 'Add Another Item',
        es: 'Agregar Otro',
      },
      orderAnother: {
        en: 'Order More',
        es: 'Pedir Más',
      },
    },

    // Welcome screen
    welcome: {
      greeting: {
        en: 'Welcome to',
        es: 'Bienvenido a',
      },
      subtitle: {
        en: 'Beach Ordering',
        es: 'Pedidos en la Playa',
      },
      cta: {
        en: 'Place an Order',
        es: 'Realizar Pedido',
      },
    },

    // Menu page
    menu: {
      title: {
        en: 'Our Menu',
        es: 'Nuestro Menú',
      },
      subtitle: {
        en: 'Fresh flavors from the Pacific coast',
        es: 'Sabores frescos de la costa del Pacífico',
      },
    },

    // Step titles
    steps: {
      protein: {
        title: {
          en: 'Select Your Protein',
          es: 'Selecciona tu Proteína',
        },
        subtitle: {
          en: 'Choose one to begin',
          es: 'Elige una para comenzar',
        },
      },
      format: {
        title: {
          en: 'Choose Your Style',
          es: 'Elige tu Estilo',
        },
        subtitle: {
          en: 'How would you like it prepared?',
          es: '¿Cómo te gustaría prepararlo?',
        },
      },
      addons: {
        title: {
          en: 'Add Extras',
          es: 'Agregar Extras',
        },
        subtitle: {
          en: 'Optional accompaniments',
          es: 'Acompañamientos opcionales',
        },
      },
      modifications: {
        title: {
          en: 'Modifications',
          es: 'Modificaciones',
        },
        subtitle: {
          en: 'Any changes to your dish?',
          es: '¿Algún cambio a tu platillo?',
        },
        none: {
          en: 'No modifications',
          es: 'Sin modificaciones',
        },
      },
      summary: {
        title: {
          en: 'Your Order',
          es: 'Tu Pedido',
        },
        subtitle: {
          en: 'Review and confirm',
          es: 'Revisa y confirma',
        },
        empty: {
          en: 'Your order is empty',
          es: 'Tu pedido está vacío',
        },
        item: {
          en: 'item',
          es: 'artículo',
        },
        items: {
          en: 'items',
          es: 'artículos',
        },
      },
      checkout: {
        title: {
          en: 'Guest Information',
          es: 'Información del Huésped',
        },
        subtitle: {
          en: 'For delivery to your location',
          es: 'Para entrega a su ubicación',
        },
        roomNumber: {
          label: {
            en: 'Room Number',
            es: 'Número de Habitación',
          },
          placeholder: {
            en: 'Enter room number',
            es: 'Ingrese número de habitación',
          },
        },
        lastName: {
          label: {
            en: 'Last Name',
            es: 'Apellido',
          },
          placeholder: {
            en: 'Enter last name',
            es: 'Ingrese apellido',
          },
        },
        allergies: {
          title: {
            en: 'Allergies & Dietary Needs',
            es: 'Alergias y Necesidades Dietéticas',
          },
          placeholder: {
            en: 'Please list any food allergies or dietary restrictions...',
            es: 'Por favor indique alergias alimentarias o restricciones dietéticas...',
          },
          note: {
            en: 'Our kitchen takes allergies seriously. Please inform us of any concerns.',
            es: 'Nuestra cocina toma las alergias muy en serio. Por favor infórmenos de cualquier preocupación.',
          },
        },
      },
      confirmation: {
        title: {
          en: 'Order Placed',
          es: 'Pedido Realizado',
        },
        message: {
          en: 'Thank you for your order. Your meal will be delivered shortly.',
          es: 'Gracias por su pedido. Su comida será entregada pronto.',
        },
        orderNumber: {
          en: 'Order Number',
          es: 'Número de Pedido',
        },
        newOrder: {
          en: 'Start New Order',
          es: 'Nuevo Pedido',
        },
      },
    },

    // Formatting helpers
    with: {
      en: 'with',
      es: 'con',
    },
  },

  // ============================================
  // MENU CONFIGURATION
  // ============================================

  menu: {
    // Dietary restriction flags
    dietaryFlags: {
      gf: { label: 'GF', name: { en: 'Gluten Free', es: 'Sin Gluten' } },
      v: { label: 'V', name: { en: 'Vegetarian', es: 'Vegetariano' } },
      vg: { label: 'VG', name: { en: 'Vegan', es: 'Vegano' } },
      df: { label: 'DF', name: { en: 'Dairy Free', es: 'Sin Lácteos' } },
      spicy: { label: '🌶', name: { en: 'Spicy', es: 'Picante' } },
    },

    // Line art icons as simple SVG paths
    icons: {
      chicken: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M32 12c-8 0-14 6-14 14 0 4 2 8 5 10l-3 16h24l-3-16c3-2 5-6 5-10 0-8-6-14-14-14z"/><circle cx="26" cy="22" r="2"/><path d="M20 32c-4 2-6 6-6 10"/><path d="M44 32c4 2 6 6 6 10"/><path d="M28 52v4M36 52v4"/></svg>`,
      fish: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 32c0 0 8-16 28-16s20 16 20 16-8 16-28 16S8 32 8 32z"/><circle cx="44" cy="30" r="2"/><path d="M8 32l-4-6M8 32l-4 6"/><path d="M20 24c4 4 4 12 0 16"/><path d="M28 22c4 5 4 15 0 20"/></svg>`,
      shrimp: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M48 20c0 0-4-8-16-8s-20 12-20 20c0 6 4 12 12 12"/><path d="M48 20c4 4 4 12 0 20-4 8-12 12-24 4"/><circle cx="44" cy="18" r="2"/><path d="M24 44l-4 8M28 44l-2 8M32 42l0 8"/><path d="M50 16c2-2 6-2 8 0"/><path d="M52 14c2-4 6-4 8-2"/></svg>`,
      mushrooms: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 32c0-12 8-20 16-20s16 8 16 20H16z"/><path d="M24 32v16M40 32v16"/><path d="M20 48h24"/><circle cx="24" cy="22" r="2"/><circle cx="36" cy="26" r="3"/><circle cx="28" cy="28" r="2"/><path d="M10 36c-4 4-2 12 6 14"/><path d="M54 36c4 4 2 12-6 14"/></svg>`,
      beef: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="32" rx="24" ry="16"/><path d="M14 28c4-4 12-6 18-6s14 2 18 6"/><path d="M20 36c2 2 6 4 12 4s10-2 12-4"/><circle cx="24" cy="30" r="2"/><circle cx="40" cy="30" r="2"/></svg>`,
      pork: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="34" rx="20" ry="14"/><path d="M12 34c-4-2-6-6-4-10 1-2 4-4 8-2"/><path d="M52 34c4-2 6-6 4-10-1-2-4-4-8-2"/><circle cx="26" cy="32" r="2"/><circle cx="38" cy="32" r="2"/><ellipse cx="32" cy="38" rx="4" ry="3"/></svg>`,
      tacos: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40c0 8 8 12 24 12s24-4 24-12"/><path d="M8 40c0-16 8-28 24-28s24 12 24 28"/><path d="M16 36c2-4 6-6 10-6"/><path d="M32 30c4 0 8 2 10 6"/><circle cx="24" cy="38" r="2"/><circle cx="32" cy="40" r="2"/><circle cx="40" cy="38" r="2"/></svg>`,
      salad: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="44" rx="22" ry="10"/><path d="M10 44c0-8 10-20 22-20s22 12 22 20"/><path d="M22 32c-2-6 2-14 10-14"/><path d="M42 32c2-6-2-14-10-14"/><path d="M32 24v-8"/><circle cx="26" cy="40" r="3"/><circle cx="38" cy="42" r="2"/><path d="M30 46c2 2 6 2 8 0"/></svg>`,
      tlayuda: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="32" rx="26" ry="20"/><ellipse cx="32" cy="32" rx="20" ry="14"/><circle cx="24" cy="28" r="3"/><circle cx="38" cy="30" r="4"/><circle cx="30" cy="36" r="2"/><path d="M20 38c2 2 4 2 6 0"/><path d="M38 38c2 2 4 2 6 0"/></svg>`,
      burrito: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 28c0-4 4-8 12-8h16c8 0 12 4 12 8v8c0 4-4 8-12 8H24c-8 0-12-4-12-8v-8z"/><path d="M12 32h40"/><path d="M20 24v20M44 24v20"/><circle cx="28" cy="28" r="2"/><circle cx="36" cy="36" r="2"/><path d="M32 32l4 4"/></svg>`,
      avocado: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M32 8c-12 0-20 12-20 28s8 20 20 20 20-4 20-20S44 8 32 8z"/><ellipse cx="32" cy="40" rx="10" ry="12"/><ellipse cx="32" cy="42" rx="5" ry="6"/></svg>`,
      salsaVerde: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 48c0 4 8 8 16 8s16-4 16-8"/><path d="M16 48c0-12 6-24 16-24s16 12 16 24"/><path d="M28 28c-2-4-1-8 2-10"/><path d="M36 28c2-4 1-8-2-10"/><circle cx="26" cy="40" r="2"/><circle cx="38" cy="42" r="2"/><path d="M32 46c-2 0-4-2-4-4"/></svg>`,
      salsaRoja: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 48c0 4 8 8 16 8s16-4 16-8"/><path d="M16 48c0-12 6-24 16-24s16 12 16 24"/><path d="M32 24c0-6 4-12 4-16"/><path d="M28 10c2 4 1 8-2 12"/><circle cx="28" cy="42" r="3"/><circle cx="38" cy="40" r="2"/><path d="M32 48v-4"/></svg>`,
      crema: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="24" rx="18" ry="8"/><path d="M14 24v20c0 4 8 8 18 8s18-4 18-8V24"/><path d="M14 34c0 4 8 8 18 8s18-4 18-8"/><path d="M26 40c0 2 3 4 6 4s6-2 6-4"/></svg>`,
      cheese: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 44l24-32 24 32H8z"/><path d="M8 44v8h48v-8"/><circle cx="24" cy="40" r="3"/><circle cx="36" cy="36" r="4"/><circle cx="44" cy="44" r="2"/><circle cx="20" cy="48" r="2"/></svg>`,
      guacamole: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="40" rx="22" ry="12"/><path d="M10 40c0-6 10-12 22-12s22 6 22 12"/><circle cx="24" cy="38" r="4"/><circle cx="38" cy="40" r="3"/><path d="M28 44l4-2 4 2"/><path d="M32 28v-8l-4-6M32 28l6-10"/></svg>`,
      ceviche: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="40" rx="22" ry="12"/><path d="M10 40c0-6 10-12 22-12s22 6 22 12"/><path d="M20 38c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/><circle cx="26" cy="44" r="2"/><circle cx="38" cy="42" r="2"/><path d="M30 32c0-4 4-8 8-8"/></svg>`,
      cocktail: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16h32l-14 24v12h8v4H22v-4h8V40L16 16z"/><path d="M20 24h24"/><circle cx="28" cy="20" r="2"/><circle cx="36" cy="22" r="1"/></svg>`,
      dessert: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 52h24l-4-20H24l-4 20z"/><path d="M16 32h32"/><ellipse cx="32" cy="24" rx="12" ry="8"/><path d="M32 16v-4"/><circle cx="32" cy="8" r="2"/></svg>`,
      sandwich: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 28c0-8 8-12 20-12s20 4 20 12"/><path d="M8 28h48v8c0 4-8 8-24 8S8 40 8 36v-8z"/><path d="M12 36h40"/><path d="M16 32h32"/><circle cx="24" cy="34" r="2"/><circle cx="40" cy="34" r="2"/></svg>`,
      buildOwn: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="24"/><path d="M32 16v32M16 32h32"/><circle cx="32" cy="32" r="8"/><path d="M24 24l16 16M40 24l-16 16"/></svg>`,
    },

    // Build Your Own - Proteins
    proteins: [
      {
        id: 'chicken',
        name: { en: 'Chicken', es: 'Pollo' },
        description: { en: 'Free-range, herb-marinated', es: 'De libre pastoreo, marinado con hierbas' },
        icon: 'chicken',
        dietary: ['gf', 'df'],
      },
      {
        id: 'fish',
        name: { en: 'Catch of the Day', es: 'Pesca del Día' },
        description: { en: 'Fresh from Bahía de Banderas', es: 'Fresco de Bahía de Banderas' },
        icon: 'fish',
        dietary: ['gf', 'df'],
      },
      {
        id: 'shrimp',
        name: { en: 'Pacific Shrimp', es: 'Camarón del Pacífico' },
        description: { en: 'Wild-caught, sustainably sourced', es: 'Silvestre, de origen sostenible' },
        icon: 'shrimp',
        dietary: ['gf', 'df'],
      },
      {
        id: 'beef',
        name: { en: 'Rib Eye', es: 'Rib Eye' },
        description: { en: 'Prime cut, charred to perfection', es: 'Corte premium, asado a la perfección' },
        icon: 'beef',
        dietary: ['gf', 'df'],
      },
      {
        id: 'pork',
        name: { en: 'Pork Belly', es: 'Panceta de Cerdo' },
        description: { en: 'Slow-cooked confit', es: 'Confitada a fuego lento' },
        icon: 'pork',
        dietary: ['gf', 'df'],
      },
      {
        id: 'mushrooms',
        name: { en: 'Wild Mushrooms', es: 'Hongos Silvestres' },
        description: { en: 'Seasonal forest medley', es: 'Variedad de temporada del bosque' },
        icon: 'mushrooms',
        dietary: ['gf', 'df', 'v', 'vg'],
      },
    ],

    // Build Your Own - Formats
    formats: [
      {
        id: 'tacos',
        name: { en: 'Tacos', es: 'Tacos' },
        description: { en: 'Handmade corn tortillas (3)', es: 'Tortillas de maíz hechas a mano (3)' },
        icon: 'tacos',
        dietary: ['gf'],
      },
      {
        id: 'salad',
        name: { en: 'Salad', es: 'Ensalada' },
        description: { en: 'Fresh greens, citrus vinaigrette', es: 'Lechugas frescas, vinagreta de cítricos' },
        icon: 'salad',
        dietary: ['gf', 'df', 'v', 'vg'],
      },
      {
        id: 'tlayuda',
        name: { en: 'Tlayuda', es: 'Tlayuda' },
        description: { en: 'Large crispy Oaxacan tortilla', es: 'Tortilla oaxaqueña crujiente grande' },
        icon: 'tlayuda',
        dietary: ['gf'],
      },
      {
        id: 'burrito',
        name: { en: 'Burrito', es: 'Burrito' },
        description: { en: 'Flour tortilla, rice, black beans', es: 'Tortilla de harina, arroz, frijoles negros' },
        icon: 'burrito',
        dietary: ['v'],
      },
    ],

    // Build Your Own - Add-ons
    addons: [
      {
        id: 'guacamole',
        name: { en: 'Guacamole', es: 'Guacamole' },
        description: { en: 'Fresh avocado, cilantro, lime', es: 'Aguacate fresco, cilantro, limón' },
        icon: 'avocado',
        dietary: ['gf', 'df', 'v', 'vg'],
      },
      {
        id: 'salsa-verde',
        name: { en: 'Salsa Verde', es: 'Salsa Verde' },
        description: { en: 'Roasted tomatillo, serrano', es: 'Tomatillo asado, serrano' },
        icon: 'salsaVerde',
        dietary: ['gf', 'df', 'v', 'vg', 'spicy'],
      },
      {
        id: 'salsa-roja',
        name: { en: 'Salsa Roja', es: 'Salsa Roja' },
        description: { en: 'Dried chile, tomato', es: 'Chile seco, tomate' },
        icon: 'salsaRoja',
        dietary: ['gf', 'df', 'v', 'vg', 'spicy'],
      },
      {
        id: 'crema',
        name: { en: 'Crema', es: 'Crema' },
        description: { en: 'House-made Mexican crema', es: 'Crema mexicana hecha en casa' },
        icon: 'crema',
        dietary: ['gf', 'v'],
      },
      {
        id: 'cheese',
        name: { en: 'Queso', es: 'Queso' },
        description: { en: 'Queso fresco & cotija', es: 'Queso fresco y cotija' },
        icon: 'cheese',
        dietary: ['gf', 'v'],
      },
      {
        id: 'pickled-onion',
        name: { en: 'Pickled Onion', es: 'Cebolla Encurtida' },
        description: { en: 'Habanero-infused red onion', es: 'Cebolla morada con habanero' },
        icon: 'salsaRoja',
        dietary: ['gf', 'df', 'v', 'vg', 'spicy'],
      },
    ],

    // Common exclusions (things to remove from dishes)
    exclusions: [
      {
        id: 'no-crema',
        name: { en: 'No Crema', es: 'Sin Crema' },
      },
      {
        id: 'no-cheese',
        name: { en: 'No Cheese', es: 'Sin Queso' },
      },
      {
        id: 'no-onion',
        name: { en: 'No Onion', es: 'Sin Cebolla' },
      },
      {
        id: 'no-cilantro',
        name: { en: 'No Cilantro', es: 'Sin Cilantro' },
      },
      {
        id: 'no-spicy',
        name: { en: 'No Spicy', es: 'Sin Picante' },
      },
      {
        id: 'no-avocado',
        name: { en: 'No Avocado', es: 'Sin Aguacate' },
      },
    ],

    // Menu categories
    menuCategories: [
      {
        id: 'build-your-own',
        name: { en: 'Build Your Own', es: 'Crea Tu Platillo' },
        description: {
          en: 'Craft your perfect dish',
          es: 'Crea tu platillo perfecto'
        },
        icon: 'buildOwn',
        special: true,
      },
      {
        id: 'picaditos',
        name: { en: 'Picaditos', es: 'Picaditos' },
        description: { en: 'Small bites to share', es: 'Antojitos para compartir' },
        icon: 'guacamole',
      },
      {
        id: 'tacos',
        name: { en: 'Tacos', es: 'Tacos' },
        description: { en: 'Fresh handmade tortillas', es: 'Tortillas frescas hechas a mano' },
        icon: 'tacos',
      },
      {
        id: 'ensaladas',
        name: { en: 'Salads', es: 'Ensaladas' },
        description: { en: 'Fresh & vibrant', es: 'Frescas y vibrantes' },
        icon: 'salad',
      },
      {
        id: 'sandwiches',
        name: { en: 'Sandwiches', es: 'Sandwiches' },
        description: { en: 'Hearty favorites', es: 'Favoritos sustanciosos' },
        icon: 'sandwich',
      },
      {
        id: 'postres',
        name: { en: 'Desserts', es: 'Postres' },
        description: { en: 'Sweet endings', es: 'Dulces finales' },
        icon: 'dessert',
      },
    ],

    // Ready-made menu items by category
    menuItems: {
      picaditos: [
        {
          id: 'guacamole',
          name: { en: 'Guacamole', es: 'Guacamole' },
          description: {
            en: 'Chile serrano, onion, cilantro, queso añejo, pico de gallo',
            es: 'Chile serrano, cebolla, cilantro, queso añejo, pico de gallo'
          },
          icon: 'guacamole',
          dietary: ['gf', 'v'],
        },
        {
          id: 'birria-tacos',
          name: { en: 'Birria Tacos', es: 'Tacos de Birria' },
          description: {
            en: 'Adobo marinated beef stew, guacamole, cheese, pico de gallo',
            es: 'Estofado de res en adobo, guacamole, queso, pico de gallo'
          },
          icon: 'tacos',
          dietary: ['spicy'],
        },
        {
          id: 'susurros-tostada',
          name: { en: 'Susurros Tostada', es: 'Tostada Susurros' },
          description: {
            en: 'Habanero mayo, avocado, tuna, octopus zarandeado, peanut macha',
            es: 'Mayo de habanero, aguacate, atún, pulpo zarandeado, macha de cacahuate'
          },
          icon: 'ceviche',
          dietary: ['gf', 'df', 'spicy'],
        },
        {
          id: 'aguachile-tostada',
          name: { en: 'Aguachile Tostada', es: 'Tostada de Aguachile' },
          description: {
            en: 'Shrimp, octopus, scallop, red onion, cucumber, cilantro mayo',
            es: 'Camarón, pulpo, callo, cebolla morada, pepino, mayo de cilantro'
          },
          icon: 'ceviche',
          dietary: ['gf', 'spicy'],
        },
        {
          id: 'ceviche-alvarado',
          name: { en: 'Ceviche Alvarado', es: 'Ceviche Alvarado' },
          description: {
            en: 'Catch of the day, tomato, celery, cucumber, red onion, salsa bruja',
            es: 'Pesca del día, tomate, apio, pepino, cebolla morada, salsa bruja'
          },
          icon: 'ceviche',
          dietary: ['gf', 'df', 'spicy'],
        },
        {
          id: 'shrimp-cocktail',
          name: { en: 'Acapulco Shrimp Cocktail', es: 'Cóctel de Camarón Acapulco' },
          description: {
            en: 'Shrimp, red onion, avocado, citrus & ginger cocktail sauce',
            es: 'Camarón, cebolla morada, aguacate, salsa cóctel de cítricos y jengibre'
          },
          icon: 'cocktail',
          dietary: ['gf', 'df'],
        },
      ],
      tacos: [
        {
          id: 'pork-belly-tacos',
          name: { en: 'Pork Belly Tacos', es: 'Tacos de Panceta' },
          description: {
            en: 'Confit pork belly, black beans, pickled onions, cilantro',
            es: 'Panceta confitada, frijoles negros, cebolla encurtida, cilantro'
          },
          icon: 'tacos',
          dietary: ['gf', 'df'],
        },
        {
          id: 'zarandeado-tacos',
          name: { en: 'Zarandeado Tacos', es: 'Tacos Zarandeados' },
          description: {
            en: 'Marinated fish, black beans, avocado, pickled red onion',
            es: 'Pescado marinado, frijoles negros, aguacate, cebolla morada encurtida'
          },
          icon: 'tacos',
          dietary: ['gf', 'df'],
        },
        {
          id: 'asada-tacos',
          name: { en: 'Asada Tacos', es: 'Tacos de Asada' },
          description: {
            en: 'Rib eye steak, charred onion, avocado, grilled shishito',
            es: 'Rib eye, cebolla asada, aguacate, shishito a la parrilla'
          },
          icon: 'tacos',
          dietary: ['gf', 'df'],
        },
        {
          id: 'shrimp-tacos',
          name: { en: 'Shrimp Tacos', es: 'Tacos de Camarón' },
          description: {
            en: 'Crispy shrimp, creamy avocado, cabbage, pickled red onion',
            es: 'Camarón crujiente, aguacate cremoso, col, cebolla morada encurtida'
          },
          icon: 'tacos',
          dietary: ['gf'],
        },
      ],
      ensaladas: [
        {
          id: 'gema-salad',
          name: { en: 'Gema Salad', es: 'Ensalada Gema' },
          description: {
            en: 'Little gem, cucumber, radish, carrot, corn, tortilla strips, cilantro vinaigrette',
            es: 'Lechuga gema, pepino, rábano, zanahoria, elote, tiras de tortilla, vinagreta de cilantro'
          },
          icon: 'salad',
          dietary: ['gf', 'v', 'vg'],
        },
        {
          id: 'asian-chicken-salad',
          name: { en: 'Asian Chicken Salad', es: 'Ensalada Asiática de Pollo' },
          description: {
            en: 'Ramen noodle, cabbage, avocado, carrots, macadamia nuts, sesame-yuzu vinaigrette',
            es: 'Fideos ramen, col, aguacate, zanahorias, nueces de macadamia, vinagreta de sésamo y yuzu'
          },
          icon: 'salad',
          dietary: ['df'],
        },
        {
          id: 'kale-quinoa-salad',
          name: { en: 'Kale & Quinoa', es: 'Kale y Quinoa' },
          description: {
            en: 'Golden raisins, blistered tomato, cucumber, goat cheese, sherry vinaigrette',
            es: 'Pasas doradas, tomate ampollado, pepino, queso de cabra, vinagreta de jerez'
          },
          icon: 'salad',
          dietary: ['gf', 'v'],
        },
      ],
      sandwiches: [
        {
          id: 'cheese-burger',
          name: { en: 'Cheese Hamburger', es: 'Hamburguesa con Queso' },
          description: {
            en: 'Organic beef, lettuce, tomato, sautéed onions, applewood bacon, secret sauce',
            es: 'Carne orgánica, lechuga, tomate, cebollas salteadas, tocino ahumado, salsa secreta'
          },
          icon: 'sandwich',
          dietary: [],
        },
        {
          id: 'blt-chicken',
          name: { en: 'BLT Chicken Sandwich', es: 'Sandwich BLT de Pollo' },
          description: {
            en: 'Sourdough, herb aioli, bacon, lettuce, tomato, chicken breast',
            es: 'Pan de masa madre, alioli de hierbas, tocino, lechuga, tomate, pechuga de pollo'
          },
          icon: 'sandwich',
          dietary: [],
        },
        {
          id: 'pepito-wrap',
          name: { en: 'Pepito Wrap', es: 'Pepito Wrap' },
          description: {
            en: 'Avocado, refried beans, flank steak, cheese, caramelized onion',
            es: 'Aguacate, frijoles refritos, arrachera, queso, cebolla caramelizada'
          },
          icon: 'burrito',
          dietary: [],
        },
      ],
      postres: [
        {
          id: 'coco-sorbet',
          name: { en: 'Coco Sorbet', es: 'Sorbete de Coco' },
          description: {
            en: 'Ginger, lime, yuzu marshmallow',
            es: 'Jengibre, limón, malvavisco de yuzu'
          },
          icon: 'dessert',
          dietary: ['gf', 'df', 'vg'],
        },
        {
          id: 'pina-sorbet',
          name: { en: 'Piña Sorbet', es: 'Sorbete de Piña' },
          description: {
            en: 'Basil, citrus meringue, passion fruit',
            es: 'Albahaca, merengue de cítricos, maracuyá'
          },
          icon: 'dessert',
          dietary: ['gf', 'df'],
        },
        {
          id: 'fresambuesa',
          name: { en: 'Fresambuesa', es: 'Fresambuesa' },
          description: {
            en: 'Balsamic, raspberry pâté de fruit, mint',
            es: 'Balsámico, ate de frambuesa, menta'
          },
          icon: 'dessert',
          dietary: ['gf', 'v'],
        },
        {
          id: 'cookies-cream',
          name: { en: 'Cookies & Cream', es: 'Galletas y Crema' },
          description: {
            en: 'Oreo, chocolate sponge',
            es: 'Oreo, bizcocho de chocolate'
          },
          icon: 'dessert',
          dietary: ['v'],
        },
        {
          id: 'vanilla-papantla',
          name: { en: 'Vanilla Papantla', es: 'Vainilla Papantla' },
          description: {
            en: 'Salted caramel, lotus cookie crumble',
            es: 'Caramelo salado, migajas de galleta lotus'
          },
          icon: 'dessert',
          dietary: ['v'],
        },
      ],
    },
  },
};

export default susurrosConfig;
