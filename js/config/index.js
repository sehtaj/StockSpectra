/**
 * Configuration Module Index
 * Central export point for all configuration files
 */

// Export all constants
export * from './constants.js';

// Export app configuration
export * from './app-config.js';

// Export fallback data
export * from './fallback-data.js';

// Re-export commonly used items for convenience
export { STOCK_SYMBOLS, TIMEFRAMES, CATEGORIES, COLORS } from './constants.js';
export { APP_CONFIG, getConfig, isFeatureEnabled } from './app-config.js';
export { FALLBACK_STOCKS, FALLBACK_INDICES, generateSparkData } from './fallback-data.js';
