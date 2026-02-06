// Service-level configuration
// This file contains branding and settings that apply across all resorts
// Making it easy to white-label or rebrand the entire platform

export const serviceConfig = {
  // Service branding (change here to rebrand entire platform)
  name: 'Beach Eats',
  tagline: 'Digital Ordering for Resort Hospitality',
  description: 'Built from both sides of service — by people who\'ve been the guest waiting, and who understand what your team needs to deliver.',

  // Password for accessing config dashboard
  configPassword: 'beacheats',

  // Route paths (for consistency)
  routes: {
    home: '/',
    config: '/config',
    demo: '/demo',
    resorts: '/resorts',
  },

  // Base URL for GitHub Pages (matches vite.config.js base)
  getBaseUrl: () => {
    // For GitHub Pages deployment, include the repository name
    return window.location.origin + '/beach-eats';
  },
};

export default serviceConfig;
