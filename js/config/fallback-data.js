/**
 * Fallback Data
 * Mock data used when API is unavailable or for offline mode
 */

export const FALLBACK_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.42, change: 2.34, volume: '52.3M' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.84, change: 5.67, volume: '98.7M' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 3.12, volume: '45.2M' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 374.58, change: -0.89, volume: '28.4M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.67, change: 1.45, volume: '22.1M' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, volume: '41.5M' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', price: 338.12, change: -1.23, volume: '18.9M' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: 487.33, change: 4.21, volume: '6.2M' }
];

export const FALLBACK_INDICES = [
    { name: 'S&P 500', value: 4615.32, change: 0.68, sparkData: [4580, 4590, 4585, 4595, 4600, 4610, 4605, 4615] },
    { name: 'NASDAQ', value: 14350.65, change: 1.05, sparkData: [14200, 14250, 14220, 14280, 14300, 14320, 14310, 14350] },
    { name: 'DOW', value: 35870.95, change: 0.42, sparkData: [35800, 35750, 35780, 35820, 35800, 35850, 35830, 35870] },
    { name: 'Russell 2000', value: 1975.28, change: 1.29, sparkData: [1950, 1945, 1955, 1960, 1950, 1965, 1970, 1975] }
];

export const FALLBACK_SECTORS = [
    { name: 'Technology', change: 2.45, trend: 'up' },
    { name: 'Finance', change: 0.87, trend: 'up' },
    { name: 'Healthcare', change: -0.34, trend: 'down' },
    { name: 'Energy', change: 1.92, trend: 'up' },
    { name: 'Consumer', change: 0.56, trend: 'up' },
    { name: 'Industrial', change: -0.12, trend: 'down' }
];

export const FALLBACK_NEWS = [
    {
        title: 'Tech Stocks Rally as AI Investments Surge',
        excerpt: 'Major technology companies announced record investments in AI infrastructure.',
        source: 'Bloomberg',
        time: '2 hours ago',
        category: 'Markets',
        image: 'assets/news/featured_ai_tech.png'
    },
    {
        title: 'Federal Reserve Signals Potential Rate Cuts',
        excerpt: 'Fed Chair indicated the central bank may consider rate cuts if inflation continues downward trend.',
        source: 'Reuters',
        time: '1 hour ago',
        category: 'Economy',
        thumbnail: 'assets/news/federal_reserve_economy.png'
    },
    {
        title: 'NVIDIA Announces Next-Generation AI Chips',
        excerpt: 'The semiconductor giant unveiled its latest GPU architecture with 10x performance improvements.',
        source: 'TechCrunch',
        time: '3 hours ago',
        category: 'Tech',
        thumbnail: 'assets/news/nvidia_ai_chips.png'
    }
];

export const FALLBACK_COMPANY_PROFILE = {
    name: 'Company Name',
    ticker: 'SYMBOL',
    exchange: 'NASDAQ',
    industry: 'Technology',
    sector: 'Software',
    country: 'US',
    marketCap: 'N/A',
    description: 'Company information is currently unavailable. Please try again later.'
};

export const FALLBACK_FUNDAMENTALS = {
    marketCap: 'N/A',
    peRatio: 'N/A',
    dividendYield: 'N/A',
    week52High: 'N/A',
    week52Low: 'N/A',
    avgVolume: 'N/A',
    beta: 'N/A',
    eps: 'N/A'
};

// Helper function to generate spark data
export function generateSparkData(currentPrice, change) {
    const points = 8;
    const data = [];
    const changePercent = change / 100;
    const startPrice = currentPrice / (1 + changePercent);

    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);
        const price = startPrice + (currentPrice - startPrice) * progress;
        const randomVariation = (Math.random() - 0.5) * (currentPrice * 0.02);
        data.push(Math.round((price + randomVariation) * 100) / 100);
    }

    return data;
}

// Helper function to get random fallback stock
export function getRandomStock() {
    return FALLBACK_STOCKS[Math.floor(Math.random() * FALLBACK_STOCKS.length)];
}

// Helper function to get fallback data by symbol
export function getFallbackStock(symbol) {
    return FALLBACK_STOCKS.find(stock => stock.symbol === symbol) || FALLBACK_STOCKS[0];
}
