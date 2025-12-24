/**
 * Application Configuration
 * Settings for refresh intervals, caching, and app behavior
 */

export const APP_CONFIG = {
    // Auto-refresh intervals (in milliseconds)
    refresh: {
        stocks: 300000,        // 5 minutes
        markets: 300000,       // 5 minutes
        news: 600000,          // 10 minutes
        stockDetails: 60000,   // 1 minute
        ticker: 30000          // 30 seconds
    },

    // Cache settings
    cache: {
        enabled: true,
        duration: 300000,      // 5 minutes
        maxSize: 100           // Maximum cached items
    },

    // Pagination settings
    pagination: {
        stocks: 12,            // Items per page on stocks page
        news: 10,              // Items per page on news page
        compare: 5             // Max stocks to compare
    },

    // Chart settings
    charts: {
        defaultTimeframe: '1D',
        candlestickCount: 50,
        sparklinePoints: 20,
        colors: {
            up: '#23F39B',
            down: '#D9534F',
            neutral: '#9BA4B4'
        }
    },

    // Loading states
    loading: {
        minDisplayTime: 500,   // Minimum time to show loading spinner (ms)
        timeout: 10000         // Request timeout (ms)
    },

    // Feature flags
    features: {
        realTimeData: true,
        autoRefresh: true,
        darkMode: true,
        notifications: false,
        advancedCharts: false
    },

    // Error handling
    errors: {
        maxRetries: 3,
        retryDelay: 1000,      // ms
        showUserErrors: true,
        logErrors: true
    },

    // App metadata
    app: {
        name: 'StockSpectra',
        version: '1.0.0',
        environment: 'production' // 'development' or 'production'
    }
};

// Helper function to get config value
export function getConfig(path) {
    const keys = path.split('.');
    let value = APP_CONFIG;

    for (const key of keys) {
        value = value[key];
        if (value === undefined) return null;
    }

    return value;
}

// Helper function to check if feature is enabled
export function isFeatureEnabled(featureName) {
    return APP_CONFIG.features[featureName] === true;
}
