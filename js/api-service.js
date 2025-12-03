// ============================================
// STOCKSPECTRA API SERVICE
// ============================================
// Handles all API calls with caching and error handling
// Uses FREE Finnhub API (60 calls/min)

class StockAPIService {
    constructor() {
        this.config = API_CONFIG;
        this.requestCount = {
            finnhub: 0
        };
    }

    // ============================================
    // CACHING UTILITIES
    // ============================================

    getCachedData(key) {
        try {
            const cached = localStorage.getItem(`stock_cache_${key}`);
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            const cacheType = key.split('_')[0];
            const maxAge = this.config.cache[cacheType] || this.config.cache.stockQuote;

            if (Date.now() - timestamp > maxAge) {
                localStorage.removeItem(`stock_cache_${key}`);
                return null;
            }

            console.log(`✅ Cache HIT: ${key}`);
            return data;
        } catch (error) {
            console.error('Cache read error:', error);
            return null;
        }
    }

    setCachedData(key, data) {
        try {
            localStorage.setItem(`stock_cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            console.log(`💾 Cached: ${key}`);
        } catch (error) {
            console.error('Cache write error:', error);
        }
    }

    // ============================================
    // STOCK QUOTE (Current Price)
    // ============================================

    async getStockQuote(symbol) {
        const cacheKey = `stockQuote_${symbol}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Use Finnhub for real-time quotes (60/min limit)
            const url = `${this.config.finnhub.baseUrl}/quote?symbol=${symbol}&token=${this.config.finnhub.key}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.requestCount.finnhub++;

            const quote = {
                symbol: symbol,
                price: data.c,           // Current price
                change: data.d,          // Change
                changePercent: data.dp,  // Change percent
                high: data.h,            // High
                low: data.l,             // Low
                open: data.o,            // Open
                previousClose: data.pc,  // Previous close
                timestamp: Date.now()
            };

            this.setCachedData(cacheKey, quote);
            return quote;

        } catch (error) {
            console.error(`Error fetching quote for ${symbol}:`, error);
            return this.getFallbackQuote(symbol);
        }
    }

    // ============================================
    // MULTIPLE STOCK QUOTES
    // ============================================

    async getMultipleQuotes(symbols) {
        const promises = symbols.map(symbol => this.getStockQuote(symbol));
        const results = await Promise.allSettled(promises);

        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
    }

    // ============================================
    // COMPANY PROFILE
    // ============================================

    async getCompanyProfile(symbol) {
        const cacheKey = `companyInfo_${symbol}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Use Finnhub for company profile
            const url = `${this.config.finnhub.baseUrl}/stock/profile2?symbol=${symbol}&token=${this.config.finnhub.key}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.requestCount.finnhub++;

            const profile = {
                symbol: symbol,
                name: data.name,
                ticker: data.ticker,
                exchange: data.exchange,
                industry: data.finnhubIndustry,
                logo: data.logo,
                weburl: data.weburl,
                marketCap: data.marketCapitalization,
                shareOutstanding: data.shareOutstanding,
                country: data.country,
                currency: data.currency,
                ipo: data.ipo
            };

            this.setCachedData(cacheKey, profile);
            return profile;

        } catch (error) {
            console.error(`Error fetching profile for ${symbol}:`, error);
            return this.getFallbackProfile(symbol);
        }
    }

    // ============================================
    // HISTORICAL DATA (for charts)
    // ============================================

    async getHistoricalData(symbol, days = 30) {
        const cacheKey = `dailyData_${symbol}_${days}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Use Finnhub for candle data
            const to = Math.floor(Date.now() / 1000);
            const from = to - (days * 24 * 60 * 60);

            const url = `${this.config.finnhub.baseUrl}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${this.config.finnhub.key}`;
            const response = await fetch(url);

            // Check for 403 Forbidden - Free tier limitation
            if (response.status === 403) {
                console.warn('⚠️ Historical data requires Finnhub paid plan. Using fallback data.');
                console.warn('💡 Tip: Upgrade at https://finnhub.io/pricing or use alternative free APIs');
                return this.getFallbackHistorical(symbol, days);
            }

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.requestCount.finnhub++;

            if (data.s !== 'ok') {
                throw new Error('No data available');
            }

            const historical = {
                symbol: symbol,
                timestamps: data.t,
                open: data.o,
                high: data.h,
                low: data.l,
                close: data.c,
                volume: data.v
            };

            this.setCachedData(cacheKey, historical);
            return historical;

        } catch (error) {
            console.error(`Error fetching historical data for ${symbol}:`, error);
            return this.getFallbackHistorical(symbol, days);
        }
    }

    // ============================================
    // NEWS
    // ============================================

    async getStockNews(symbol, limit = 10) {
        const cacheKey = `news_${symbol}_${limit}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            // Use Finnhub for company news
            const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const to = new Date().toISOString().split('T')[0];

            const url = `${this.config.finnhub.baseUrl}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${this.config.finnhub.key}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.requestCount.finnhub++;

            const news = data.slice(0, limit).map(article => ({
                headline: article.headline,
                summary: article.summary,
                source: article.source,
                url: article.url,
                image: article.image,
                datetime: article.datetime,
                category: article.category,
                related: article.related
            }));

            this.setCachedData(cacheKey, news);
            return news;

        } catch (error) {
            console.error(`Error fetching news for ${symbol}:`, error);
            return [];
        }
    }

    // ============================================
    // MARKET NEWS (General)
    // ============================================

    async getMarketNews(category = 'general', limit = 20) {
        const cacheKey = `news_market_${category}_${limit}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.finnhub.baseUrl}/news?category=${category}&token=${this.config.finnhub.key}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.requestCount.finnhub++;

            const news = data.slice(0, limit).map(article => ({
                headline: article.headline,
                summary: article.summary,
                source: article.source,
                url: article.url,
                image: article.image,
                datetime: article.datetime,
                category: article.category
            }));

            this.setCachedData(cacheKey, news);
            return news;

        } catch (error) {
            console.error('Error fetching market news:', error);
            return [];
        }
    }

    // ============================================
    // FALLBACK DATA (when API fails)
    // ============================================

    getFallbackQuote(symbol) {
        const mockPrices = {
            'AAPL': { price: 178.42, change: 2.34, changePercent: 1.33 },
            'MSFT': { price: 374.58, change: -0.89, changePercent: -0.24 },
            'GOOGL': { price: 139.67, change: 1.45, changePercent: 1.05 },
            'AMZN': { price: 151.94, change: 2.78, changePercent: 1.86 },
            'TSLA': { price: 242.84, change: 5.67, changePercent: 2.39 },
            'META': { price: 338.12, change: -1.23, changePercent: -0.36 },
            'NVDA': { price: 495.22, change: 3.12, changePercent: 0.63 },
            'NFLX': { price: 487.33, change: 4.21, changePercent: 0.87 }
        };

        const mock = mockPrices[symbol] || { price: 100, change: 0, changePercent: 0 };
        return {
            symbol,
            ...mock,
            high: mock.price * 1.02,
            low: mock.price * 0.98,
            open: mock.price * 0.99,
            previousClose: mock.price - mock.change,
            timestamp: Date.now(),
            isFallback: true
        };
    }

    getFallbackProfile(symbol) {
        return {
            symbol,
            name: `${symbol} Inc.`,
            industry: 'Technology',
            marketCap: 1000000,
            isFallback: true
        };
    }

    getFallbackHistorical(symbol, days) {
        const data = {
            symbol,
            timestamps: [],
            open: [],
            high: [],
            low: [],
            close: [],
            volume: []
        };

        const basePrice = 100;
        const now = Date.now();

        for (let i = days; i >= 0; i--) {
            const timestamp = Math.floor((now - i * 24 * 60 * 60 * 1000) / 1000);
            const price = basePrice + Math.random() * 20 - 10;

            data.timestamps.push(timestamp);
            data.open.push(price);
            data.high.push(price * 1.02);
            data.low.push(price * 0.98);
            data.close.push(price * 1.01);
            data.volume.push(Math.floor(Math.random() * 1000000));
        }

        data.isFallback = true;
        return data;
    }

    // ============================================
    // UTILITY METHODS
    // ============================================

    clearCache() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('stock_cache_')) {
                localStorage.removeItem(key);
            }
        });
        console.log('🗑️ Cache cleared');
    }

    getRequestCount() {
        return this.requestCount;
    }

    resetRequestCount() {
        this.requestCount = {
            finnhub: 0
        };
    }
}

// Create global instance
const stockAPI = new StockAPIService();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.stockAPI = stockAPI;
}
