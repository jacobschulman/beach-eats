// Content configuration with i18n support
// All user-facing strings are defined here for easy updates

const content = {
  // Resort branding
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
          en: 'Room / Palapa Number',
          es: 'Número de Habitación / Palapa',
        },
        placeholder: {
          en: 'Enter location',
          es: 'Ingrese ubicación',
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
};

// Helper function to get text in current language
export const getText = (path, language = 'en') => {
  const keys = path.split('.');
  let value = content;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Missing translation: ${path}`);
      return path;
    }
  }

  if (typeof value === 'object' && language in value) {
    return value[language];
  }

  return value?.en || path;
};

export default content;
