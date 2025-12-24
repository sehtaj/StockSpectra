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

    // Load real-time data from Finnhub
    loadTrendingStocks();
    loadHeroStockData();
    loadWatchlistData();

    // Add resize listener for sparklines
    window.addEventListener('resize', handleResize);

    // Refresh data every 5 minutes
    setInterval(() => {
        loadTrendingStocks();
        loadHeroStockData();
        loadWatchlistData();
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
