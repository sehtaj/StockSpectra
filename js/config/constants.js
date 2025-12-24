/**
 * Application Constants
 * Centralized storage for stock symbols, categories, and other constant values
 */

// Stock Symbol Lists
export const STOCK_SYMBOLS = {
    // Trending stocks for homepage
    trending: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'],

    // Watchlist stocks
    watchlist: ['AAPL', 'GOOGL', 'NVDA', 'TSLA', 'MSFT'],

    // Heatmap stocks for markets page
    heatmap: [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
        'AMD', 'INTC', 'PYPL', 'DIS', 'BABA', 'V', 'MA', 'JPM',
        'BAC', 'WMT', 'PG', 'KO', 'PEP', 'NKE', 'ADBE', 'CRM'
    ],

    // Market movers tracking
    movers: [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
        'AMD', 'INTC', 'PYPL', 'DIS', 'BABA', 'V', 'MA', 'JPM',
        'BAC', 'WMT', 'PG', 'KO', 'PEP', 'NKE', 'ADBE', 'CRM',
        'ORCL', 'CSCO', 'IBM', 'QCOM', 'TXN', 'AVGO'
    ],

    // Ticker tape symbols
    ticker: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC']
};

// Chart Timeframes
export const TIMEFRAMES = {
    available: ['1D', '1W', '1M', '3M', '6M', '1Y'],
    default: '1D',
    labels: {
        '1D': '1 Day',
        '1W': '1 Week',
        '1M': '1 Month',
        '3M': '3 Months',
        '6M': '6 Months',
        '1Y': '1 Year'
    }
};

// Market Categories
export const CATEGORIES = {
    stocks: ['All', 'Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer'],
    news: ['All', 'Markets', 'Tech', 'Economy', 'Earnings', 'Crypto', 'Stocks']
};

// Sector Information
export const SECTORS = {
    technology: { name: 'Technology', color: '#23F39B' },
    finance: { name: 'Finance', color: '#4A9EFF' },
    healthcare: { name: 'Healthcare', color: '#FF6B9D' },
    energy: { name: 'Energy', color: '#FFB84D' },
    consumer: { name: 'Consumer', color: '#9B59B6' },
    industrial: { name: 'Industrial', color: '#1ABC9C' }
};

// Major Market Indices
export const INDICES = {
    sp500: { name: 'S&P 500', symbol: '^GSPC' },
    nasdaq: { name: 'NASDAQ', symbol: '^IXIC' },
    dow: { name: 'DOW', symbol: '^DJI' },
    russell: { name: 'Russell 2000', symbol: '^RUT' }
};

// Color Scheme
export const COLORS = {
    positive: '#23F39B',
    negative: '#D9534F',
    neutral: '#9BA4B4',
    primary: '#E6EDF3',
    secondary: '#6C717A'
};

// UI Constants
export const UI = {
    pagination: {
        itemsPerPage: 12,
        maxButtons: 5
    },
    animation: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1440
    }
};

// API Endpoints (if you add more APIs later)
export const ENDPOINTS = {
    finnhub: 'https://finnhub.io/api/v1',
    // Add more endpoints as needed
};
