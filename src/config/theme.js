// Theme configuration for Susurros del Corazón
// Reference: https://auberge.com/susurros/

const susurrosTheme = {
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

  // Background image/pattern for welcome screen
  assets: {
    heroPattern: 'linear-gradient(180deg, rgba(253, 251, 248, 0) 0%, rgba(253, 251, 248, 1) 100%)',
  },
};

// Export the active theme (can be swapped for different resorts)
export const theme = susurrosTheme;

// Export theme getter for dynamic theme switching
export const getTheme = (themeName) => {
  const themes = {
    susurros: susurrosTheme,
    // Add more themes here for other resorts
  };
  return themes[themeName] || susurrosTheme;
};

export default theme;
