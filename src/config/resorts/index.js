// Resort Registry
// Central hub for all resort configurations

import susurros from './susurros.js';
import rwkona from './rwkona.js';

// Registry mapping resort IDs to their configs
export const resorts = {
  susurros,
  rwkona,
};

// Default resort (used when no resort parameter is specified)
export const defaultResortId = 'susurros';

/**
 * Get resort configuration by ID
 * @param {string} resortId - The resort identifier ('susurros', 'rwkona', etc.)
 * @returns {object} Resort configuration object
 */
export function getResortConfig(resortId) {
  return resorts[resortId] || resorts[defaultResortId];
}

/**
 * Get all available resorts as an array
 * @returns {array} Array of all resort config objects
 */
export function getAllResorts() {
  return Object.values(resorts);
}

/**
 * Get array of resort IDs
 * @returns {array} Array of resort ID strings
 */
export function getResortIds() {
  return Object.keys(resorts);
}

/**
 * Check if a resort ID is valid
 * @param {string} resortId - The resort identifier to validate
 * @returns {boolean} True if resort exists
 */
export function isValidResortId(resortId) {
  return resortId in resorts;
}

export default {
  resorts,
  defaultResortId,
  getResortConfig,
  getAllResorts,
  getResortIds,
  isValidResortId,
};
