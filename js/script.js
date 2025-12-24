// Import configuration
import { STOCK_SYMBOLS, APP_CONFIG } from './config/index.js';

// ===================================
// SPARKLINE CHART RENDERING
// ===================================
function drawSparkline(canvas) {
    const ctx = canvas.getContext('2d');
    const values = canvas.dataset.values.split(',').map(Number);

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 4;

    // Calculate min and max values
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    // Calculate points
    const points = values.map((value, index) => {
        const x = padding + (index / (values.length - 1)) * (width - padding * 2);
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return { x, y };
    });

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    // Determine if trend is positive or negative
    const isPositive = values[values.length - 1] > values[0];
    ctx.strokeStyle = isPositive ? '#21C77A' : '#D9534F';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw gradient fill
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, isPositive ? 'rgba(33, 199, 122, 0.2)' : 'rgba(217, 83, 79, 0.2)');
    gradient.addColorStop(1, 'rgba(33, 199, 122, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
}

// ===================================
// INITIALIZE SPARKLINES
// ===================================
function initSparklines() {
    const sparklines = document.querySelectorAll('.sparkline');
    sparklines.forEach(canvas => {
        drawSparkline(canvas);
    });
}

// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar-wrapper');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when user scrolls down
        if (currentScroll > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}


// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navPill = document.querySelector('.navbar-pill');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navPill.classList.toggle('active');
        });
    }
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input, .hero-search input');

    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    console.log('Searching for:', query);
                    // Placeholder for actual search functionality
                    // This would typically make an API call to search for stocks
                }
            }
        });
    });

    const searchBtn = document.querySelector('.hero-search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const input = document.querySelector('.hero-search input');
            const query = input.value.trim();
            if (query) {
                console.log('Searching for:', query);
                // Placeholder for actual search functionality
            }
        });
    }
}

// ===================================
// STOCK CARD INTERACTIONS
// ===================================
function initStockCards() {
    const stockCards = document.querySelectorAll('.stock-card, .watchlist-card');

    stockCards.forEach(card => {
        card.addEventListener('click', () => {
            const symbol = card.querySelector('.stock-symbol').textContent;
            console.log('Clicked on stock:', symbol);
            // Placeholder for navigation to stock detail page
            // window.location.href = `/stock/${symbol}`;
        });
    });
}

// ===================================
// TABLE ROW INTERACTIONS
// ===================================
function initTableRows() {
    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            const symbol = row.querySelector('.symbol-cell').textContent;
            console.log('Clicked on stock:', symbol);
            // Placeholder for navigation to stock detail page
        });
    });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if it's a hash link
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// RESIZE HANDLER FOR SPARKLINES
// ===================================
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initSparklines();
    }, 250);
}

// ===================================
// REAL-TIME DATA LOADING (FINNHUB API)
// ===================================
async function loadTrendingStocks() {
    // Check if API is available
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using static data');
        return;
    }

    const trendingSymbols = STOCK_SYMBOLS.trending;

    try {
        console.log('🔄 Loading trending stocks from Finnhub...');
        const quotes = await stockAPI.getMultipleQuotes(trendingSymbols);

        // Update each stock card with real data
        const stockCards = document.querySelectorAll('.trending-grid .stock-card');
        quotes.forEach((quote, index) => {
            if (index < stockCards.length) {
                try {
                    updateStockCard(stockCards[index], quote);
                } catch (err) {
                    console.error(`Error updating card for ${quote.symbol}:`, err);
                }
            }
        });

        console.log('✅ Trending stocks loaded successfully');
    } catch (error) {
        console.error('❌ Error loading trending stocks:', error);
    }
}

async function loadHeroStockData() {
    // Check if API is available
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using static data');
        return;
    }

    try {
        console.log('🔄 Loading AAPL data for hero card...');
        const quote = await stockAPI.getStockQuote('AAPL');

        // Update hero card AAPL data
        const heroPrice = document.querySelector('.arc-card-center .chart-price');
        const heroChange = document.querySelector('.arc-card-center .chart-change');

        if (heroPrice && quote) {
            heroPrice.textContent = `$${quote.price.toFixed(2)}`;
        }

        if (heroChange && quote) {
            const changeSymbol = quote.change >= 0 ? '▲' : '▼';
            heroChange.textContent = `${changeSymbol} ${Math.abs(quote.changePercent).toFixed(2)}%`;
            heroChange.className = `chart-change ${quote.change >= 0 ? 'positive' : 'negative'}`;
        }

        console.log('✅ Hero AAPL data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading hero stock data:', error);
    }
}

async function loadWatchlistData() {
    // Check if API is available
    if (typeof stockAPI === 'undefined') {
        return;
    }

    const watchlistSymbols = STOCK_SYMBOLS.watchlist;

    try {
        console.log('🔄 Loading watchlist data...');
        const quotes = await stockAPI.getMultipleQuotes(watchlistSymbols);

        // Update each watchlist card
        const watchlistCards = document.querySelectorAll('.watchlist-grid .watchlist-card');
        quotes.forEach((quote, index) => {
            if (index < watchlistCards.length) {
                updateStockCard(watchlistCards[index], quote);
            }
        });

        console.log('✅ Watchlist data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading watchlist:', error);
    }
}

function updateStockCard(card, quote) {
    const priceEl = card.querySelector('.stock-price');
    const changeEl = card.querySelector('.stock-change');

    if (priceEl && quote.price !== undefined && quote.price !== null) {
        priceEl.textContent = `$${quote.price.toFixed(2)}`;
    }

    if (changeEl && quote.changePercent !== undefined && quote.changePercent !== null) {
        const sign = quote.change >= 0 ? '+' : '';
        changeEl.textContent = `${sign}${quote.changePercent.toFixed(2)}%`;
        changeEl.className = `stock-change ${quote.change >= 0 ? 'positive' : 'negative'}`;
    }

    // Update arrow icon if it exists
    const arrowIcon = card.querySelector('.arrow-up, .arrow-down');
    if (arrowIcon) {
        const isPositive = quote.change >= 0;
        const newClass = isPositive ? 'arrow-up' : 'arrow-down';

        // Use setAttribute for SVG class to avoid read-only errors
        arrowIcon.setAttribute('class', newClass);

        // Update arrow path to ensure correct direction
        const path = arrowIcon.querySelector('path');
        if (path) {
            // Up arrow path vs Down arrow path
            const d = isPositive
                ? "M8 12V4M8 4L4 8M8 4L12 8"
                : "M8 4V12M8 12L12 8M8 12L4 8";
            path.setAttribute('d', d);
        }
    }
}

// ===================================
// TOP GAINERS & LOSERS DATA
// ===================================
async function loadTopGainersLosers() {
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using static data');
        return;
    }

    // Define stocks to check for gainers/losers
    const stockSymbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX', 'INTC', 'DIS', 'BA', 'AMD', 'PYPL', 'CRM'];

    try {
        console.log('🔄 Loading top gainers and losers...');
        const quotes = await stockAPI.getMultipleQuotes(stockSymbols);

        // Sort by change percent
        const sorted = quotes.sort((a, b) => b.changePercent - a.changePercent);

        // Get top 5 gainers and losers
        const gainers = sorted.slice(0, 5);
        const losers = sorted.slice(-5).reverse();

        // Update gainers table
        const gainersRows = document.querySelectorAll('.table-container:first-child .data-table tbody tr');
        gainers.forEach((quote, index) => {
            if (index < gainersRows.length) {
                updateTableRow(gainersRows[index], quote);
            }
        });

        // Update losers table
        const losersRows = document.querySelectorAll('.table-container:last-child .data-table tbody tr');
        losers.forEach((quote, index) => {
            if (index < losersRows.length) {
                updateTableRow(losersRows[index], quote);
            }
        });

        console.log('✅ Top gainers and losers loaded successfully');
    } catch (error) {
        console.error('❌ Error loading gainers/losers:', error);
    }
}

function updateTableRow(row, quote) {
    const symbolCell = row.querySelector('.symbol-cell');
    const priceCell = row.querySelectorAll('td')[1];
    const changePercentCell = row.querySelectorAll('td')[2];
    const changePointsCell = row.querySelectorAll('td')[3];

    if (symbolCell) {
        symbolCell.textContent = quote.symbol;
    }

    if (priceCell) {
        priceCell.textContent = `$${quote.price.toFixed(2)}`;
    }

    if (changePercentCell) {
        const sign = quote.change >= 0 ? '+' : '';
        changePercentCell.textContent = `${sign}${quote.changePercent.toFixed(2)}%`;
        changePercentCell.className = quote.change >= 0 ? 'positive' : 'negative';
    }

    if (changePointsCell) {
        const sign = quote.change >= 0 ? '+' : '';
        changePointsCell.textContent = `${sign}${quote.change.toFixed(2)}`;
        changePointsCell.className = quote.change >= 0 ? 'positive' : 'negative';
    }
}

// ===================================
// MARKET OVERVIEW DATA
// ===================================
async function loadMarketOverview() {
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using static data');
        return;
    }

    // Market indices - using ETFs as proxies since Finnhub free tier supports them
    const indices = [
        { symbol: 'SPY', name: 'S&P 500' },      // S&P 500 ETF
        { symbol: 'QQQ', name: 'NASDAQ' },       // NASDAQ ETF
        { symbol: 'DIA', name: 'DOW' },          // DOW ETF
        { symbol: 'IWM', name: 'Russell 2000' }  // Russell 2000 ETF
    ];

    try {
        console.log('🔄 Loading market overview...');

        for (let i = 0; i < indices.length; i++) {
            const quote = await stockAPI.getStockQuote(indices[i].symbol);
            const marketItems = document.querySelectorAll('.market-item');

            if (marketItems[i] && quote) {
                updateMarketItem(marketItems[i], quote, indices[i].name);
            }
        }

        console.log('✅ Market overview loaded successfully');
    } catch (error) {
        console.error('❌ Error loading market overview:', error);
    }
}

function updateMarketItem(item, quote, displayName) {
    const nameEl = item.querySelector('.market-name');
    const priceEl = item.querySelector('.market-price');
    const changeEl = item.querySelector('.market-change');

    if (nameEl) {
        nameEl.textContent = displayName;
    }

    if (priceEl) {
        priceEl.textContent = quote.price.toFixed(2);
    }

    if (changeEl) {
        const sign = quote.change >= 0 ? '+' : '';
        changeEl.textContent = `${sign}${quote.changePercent.toFixed(2)}%`;
        changeEl.className = `market-change ${quote.change >= 0 ? 'positive' : 'negative'}`;
    }

    // Update sparkline data attribute with simulated historical trend
    const canvas = item.querySelector('.sparkline');
    if (canvas) {
        // Generate trend data based on current price
        const basePrice = quote.price;
        const trendData = [];
        for (let i = 0; i < 8; i++) {
            const variation = (Math.random() - 0.5) * (basePrice * 0.02);
            trendData.push((basePrice + variation).toFixed(2));
        }
        canvas.dataset.values = trendData.join(',');
        drawSparkline(canvas);
    }
}

// ===================================
// FIX STATIC ARROWS ON PAGE LOAD
// ===================================
function fixStaticArrows() {
    // Fix arrows in trending stocks section
    const stockCards = document.querySelectorAll('.trending-grid .stock-card');
    stockCards.forEach(card => {
        const changeEl = card.querySelector('.stock-change');
        const arrowIcon = card.querySelector('.arrow-up, .arrow-down');

        if (changeEl && arrowIcon) {
            const changeText = changeEl.textContent.trim();
            // Check if the change starts with "+" or "-"
            const isPositive = changeText.startsWith('+');

            // Update the arrow class
            arrowIcon.className = isPositive ? 'arrow-up' : 'arrow-down';

            // Update the SVG path to match the direction
            const pathElement = arrowIcon.querySelector('path');
            if (pathElement) {
                const arrowPath = isPositive
                    ? 'M8 12V4M8 4L4 8M8 4L12 8'  // Up arrow
                    : 'M8 4V12M8 12L12 8M8 12L4 8'; // Down arrow
                pathElement.setAttribute('d', arrowPath);
            }
        }
    });

    console.log('✅ Static arrows fixed based on percentage change data');
}

// ===================================
// INITIALIZE ALL FUNCTIONALITY
// ===================================
function init() {
    initNavbar();
    initSparklines();
    initMobileMenu();
    initSearch();
    initStockCards();
    initTableRows();
    initSmoothScroll();

    // Fix static arrows based on existing data
    fixStaticArrows();

    // Load real-time data from Finnhub
    loadTrendingStocks();
    loadHeroStockData();
    loadWatchlistData();
    loadTopGainersLosers();
    loadMarketOverview();

    // Add resize listener for sparklines
    window.addEventListener('resize', handleResize);

    // Refresh data every 5 minutes
    setInterval(() => {
        loadTrendingStocks();
        loadHeroStockData();
        loadWatchlistData();
        loadTopGainersLosers();
        loadMarketOverview();
    }, 5 * 60 * 1000);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// UTILITY: Format Currency
// ===================================
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// ===================================
// UTILITY: Format Percentage
// ===================================
function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}

// Export utilities for potential use in other modules
window.StockSpectra = {
    formatCurrency,
    formatPercentage,
    drawSparkline,
    initSparklines
};
