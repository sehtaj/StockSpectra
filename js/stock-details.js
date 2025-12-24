// Stock Details Page JavaScript
// Dynamically loads stock data based on URL parameter

// Get ticker from URL parameter
function getTickerFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ticker') || 'AAPL'; // Default to AAPL if no ticker specified
}

const currentTicker = getTickerFromURL();

// Stock data object (will be populated from API)
let stockData = {
    symbol: currentTicker,
    company: `${currentTicker} Inc.`,
    price: 0,
    change: 0,
    changeAmount: 0,
    metrics: {},
    fundamentals: {},
    overview: 'Loading company information...',
    news: []
};

let performanceChart = null;
let headerSparklineChart = null;
let currentRange = '1D';

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    // Update page title
    document.title = `${currentTicker} | StockSpectra`;

    // Show loading state
    showLoadingState();

    // Load real-time data
    await loadRealTimeData();

    // Initialize charts
    initializeCharts();
    setupTimeRangeTabs();
    styleTimeTabs();
});

// Show loading state
function showLoadingState() {
    document.getElementById('stockSymbol').textContent = currentTicker;
    document.getElementById('companyName').textContent = 'Loading...';
    document.getElementById('currentPrice').textContent = '$--';
    document.getElementById('priceChange').textContent = '--';
}

// Load real-time data from API
async function loadRealTimeData() {
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using fallback data');
        loadFallbackData();
        loadStockData();
        return;
    }

    try {
        console.log(`🔄 Loading real-time data for ${currentTicker}...`);

        // Fetch quote and profile in parallel
        const [quote, profile] = await Promise.all([
            stockAPI.getStockQuote(currentTicker),
            stockAPI.getCompanyProfile(currentTicker)
        ]);

        // Update stock data with real-time info
        stockData.symbol = currentTicker;
        stockData.company = profile.name || `${currentTicker} Inc.`;
        stockData.price = quote.price || 0;
        stockData.change = quote.changePercent || 0;
        stockData.changeAmount = quote.change || 0;

        // Populate metrics
        stockData.metrics = {
            'Market Cap': profile.marketCap ? `$${(profile.marketCap / 1000).toFixed(1)}B` : 'N/A',
            'High': quote.high ? `$${quote.high.toFixed(2)}` : 'N/A',
            'Low': quote.low ? `$${quote.low.toFixed(2)}` : 'N/A',
            'Open': quote.open ? `$${quote.open.toFixed(2)}` : 'N/A',
            'Prev Close': quote.previousClose ? `$${quote.previousClose.toFixed(2)}` : 'N/A',
            'Exchange': profile.exchange || 'N/A',
            'Industry': profile.industry || 'N/A',
            'Country': profile.country || 'N/A'
        };

        // Set overview
        stockData.overview = `${profile.name || currentTicker} is a company in the ${profile.industry || 'technology'} sector, listed on ${profile.exchange || 'stock exchange'}. ${profile.weburl ? `Visit their website at ${profile.weburl}` : ''}`;

        // Try to fetch news
        try {
            const news = await stockAPI.getStockNews(currentTicker, 4);
            if (news && news.length > 0) {
                stockData.news = news.map(article => ({
                    title: article.headline,
                    source: article.source,
                    time: formatNewsTime(article.datetime),
                    excerpt: article.summary || 'No summary available.'
                }));
            }
        } catch (error) {
            console.warn('Could not fetch news:', error);
            stockData.news = [];
        }

        // Load data into DOM
        loadStockData();

        console.log(`✅ Real-time data loaded for ${currentTicker}`);

    } catch (error) {
        console.error(`❌ Error loading data for ${currentTicker}:`, error);
        loadFallbackData();
        loadStockData();
    }
}

// Format news timestamp
function formatNewsTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}

// Load fallback data
function loadFallbackData() {
    const fallbackPrices = {
        'AAPL': { price: 178.42, change: 2.34, company: 'Apple Inc.' },
        'MSFT': { price: 374.58, change: -0.89, company: 'Microsoft Corporation' },
        'GOOGL': { price: 139.67, change: 1.45, company: 'Alphabet Inc.' },
        'AMZN': { price: 151.94, change: 2.78, company: 'Amazon.com, Inc.' },
        'TSLA': { price: 242.84, change: 5.67, company: 'Tesla, Inc.' },
        'META': { price: 338.12, change: -1.23, company: 'Meta Platforms, Inc.' },
        'NVDA': { price: 495.22, change: 3.12, company: 'NVIDIA Corporation' },
        'NFLX': { price: 487.33, change: 4.21, company: 'Netflix, Inc.' }
    };

    const fallback = fallbackPrices[currentTicker] || { price: 100, change: 0, company: `${currentTicker} Inc.` };

    stockData.price = fallback.price;
    stockData.change = fallback.change;
    stockData.changeAmount = fallback.price * (fallback.change / 100);
    stockData.company = fallback.company;
    stockData.metrics = {
        'Market Cap': 'N/A',
        'High': `$${(fallback.price * 1.02).toFixed(2)}`,
        'Low': `$${(fallback.price * 0.98).toFixed(2)}`,
        'Open': `$${(fallback.price * 0.99).toFixed(2)}`,
        'Prev Close': `$${(fallback.price - fallback.changeAmount).toFixed(2)}`,
        'Exchange': 'NASDAQ',
        'Industry': 'Technology',
        'Country': 'USA'
    };
    stockData.overview = `${fallback.company} - Company information not available in offline mode.`;
    stockData.news = [];
}

// Load stock data into DOM
function loadStockData() {
    // Header
    document.getElementById('stockSymbol').textContent = stockData.symbol;
    document.getElementById('companyName').textContent = stockData.company;
    document.getElementById('currentPrice').textContent = `$${stockData.price.toFixed(2)}`;

    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = `${stockData.change > 0 ? '+' : ''}${stockData.change.toFixed(2)}% ($${stockData.changeAmount.toFixed(2)})`;
    changeEl.className = `stock-change ${stockData.change > 0 ? 'positive' : 'negative'}`;

    // Metrics Grid
    const metricsGrid = document.getElementById('metricsGrid');
    metricsGrid.innerHTML = '';
    Object.entries(stockData.metrics).forEach(([key, value]) => {
        const card = document.createElement('div');
        card.className = 'stock-card';
        card.innerHTML = `
            <div class="stock-name" style="margin-bottom: 8px;">${key}</div>
            <div class="stock-price" style="font-size: 24px;">${value}</div>
        `;
        metricsGrid.appendChild(card);
    });

    // Fundamentals Table
    const fundamentalsTable = document.getElementById('fundamentalsTable');
    fundamentalsTable.innerHTML = '';
    if (Object.keys(stockData.fundamentals).length > 0) {
        Object.entries(stockData.fundamentals).forEach(([key, value]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="symbol-cell">${key}</td>
                <td>${value}</td>
            `;
            fundamentalsTable.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="2" style="text-align: center; color: var(--text-secondary); padding: 24px;">
                Fundamental data not available
            </td>
        `;
        fundamentalsTable.appendChild(row);
    }

    // Company Overview
    const overviewTitle = document.getElementById('companyOverviewTitle');
    if (overviewTitle) {
        overviewTitle.textContent = `About ${stockData.company}`;
    }
    document.getElementById('companyOverview').textContent = stockData.overview;

    // News
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    if (stockData.news.length > 0) {
        stockData.news.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'stock-card';
            newsCard.style.cursor = 'pointer';
            newsCard.innerHTML = `
                <div style="margin-bottom: 8px;">
                    <div class="stock-symbol" style="font-size: 16px; margin-bottom: 4px;">${article.title}</div>
                    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                        <span class="stock-name" style="font-size: 12px;">${article.source}</span>
                        <span class="stock-name" style="font-size: 12px;">•</span>
                        <span class="stock-name" style="font-size: 12px;">${article.time}</span>
                    </div>
                </div>
                <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin: 0;">${article.excerpt}</p>
            `;
            newsContainer.appendChild(newsCard);
        });
    } else {
        newsContainer.innerHTML = `
            <div style="text-align: center; padding: 48px; color: var(--text-secondary);">
                <p>No recent news available for ${stockData.symbol}</p>
            </div>
        `;
    }
}

// Initialize charts
function initializeCharts() {
    createHeaderSparkline();
    createPerformanceChart();
}

// Create header sparkline
function createHeaderSparkline() {
    const canvas = document.getElementById('headerSparkline');
    const ctx = canvas.getContext('2d');

    const sparklineData = generateSparklineData(20);

    headerSparklineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: sparklineData,
                borderColor: stockData.change > 0 ? '#23F39B' : '#D9534F',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

// Create performance chart
function createPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');

    const points = getDataPoints(currentRange);
    const labels = getLabels(currentRange);
    const data = generatePriceData(stockData.price, points);

    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: stockData.symbol,
                data: data,
                borderColor: '#23F39B',
                backgroundColor: 'rgba(35, 243, 155, 0.15)',
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 0,
                pointBackgroundColor: '#23F39B',
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#23F39B',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 21, 24, 0.95)',
                    titleColor: '#E6EDF3',
                    bodyColor: '#9BA4B4',
                    borderColor: 'rgba(35, 243, 155, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6C717A',
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        maxTicksLimit: 10
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6C717A',
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        callback: function (value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Setup time range tabs
function setupTimeRangeTabs() {
    document.querySelectorAll('.time-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.time-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            currentRange = tab.dataset.range;
            updatePerformanceChart();
        });
    });
}

// Update performance chart
function updatePerformanceChart() {
    const points = getDataPoints(currentRange);
    const labels = getLabels(currentRange);
    const data = generatePriceData(stockData.price, points);

    performanceChart.data.labels = labels;
    performanceChart.data.datasets[0].data = data;
    performanceChart.update();
}

// Generate sparkline data
function generateSparklineData(points) {
    const data = [];
    let value = stockData.price * 0.98;

    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.48) * 2;
        value += change;
        data.push(value);
    }

    return data;
}

// Generate price data
function generatePriceData(basePrice, days) {
    const data = [];
    let price = basePrice * 0.95;

    for (let i = 0; i < days; i++) {
        const volatility = basePrice * 0.015;
        const trend = (basePrice * 0.05) / days;
        const change = (Math.random() - 0.5) * volatility + trend;
        price += change;
        data.push(parseFloat(price.toFixed(2)));
    }

    return data;
}

// Get data points based on range
function getDataPoints(range) {
    switch (range) {
        case '1D': return 24;
        case '1W': return 7;
        case '1M': return 30;
        case '3M': return 90;
        case '6M': return 180;
        case '1Y': return 252;
        default: return 30;
    }
}

// Get labels based on range
function getLabels(range) {
    const points = getDataPoints(range);
    const labels = [];

    for (let i = 0; i < points; i++) {
        if (range === '1D') {
            labels.push(`${i}:00`);
        } else if (range === '1W') {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            labels.push(days[i % 7]);
        } else if (range === '1M') {
            if (i % 5 === 0) labels.push(`Day ${i + 1}`);
            else labels.push('');
        } else {
            if (i % 15 === 0) labels.push(`Day ${i + 1}`);
            else labels.push('');
        }
    }

    return labels;
}

// Style time tabs
function styleTimeTabs() {
    const style = document.createElement('style');
    style.textContent = `
        .time-tab {
            background: var(--surface-hover);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 8px 16px;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        .time-tab:hover {
            background: var(--surface);
            border-color: rgba(35, 243, 155, 0.3);
            color: var(--text-primary);
        }
        .time-tab.active {
            background: var(--green);
            border-color: var(--green);
            color: #000;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}
