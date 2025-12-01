// Stock Details Page JavaScript
// Mock data for AAPL (Apple Inc.)

const stockData = {
    symbol: 'AAPL',
    company: 'Apple Inc.',
    price: 178.42,
    change: 2.34,
    changeAmount: 4.08,
    metrics: {
        'Market Cap': '$2.8T',
        'P/E Ratio': '28.5',
        'EPS': '$6.26',
        'Volume': '52.3M',
        '52W High': '$199.62',
        '52W Low': '$124.17',
        'Dividend Yield': '0.52%',
        'Beta': '1.24'
    },
    fundamentals: {
        'Revenue': '$394.3B',
        'Net Income': '$97.0B',
        'Profit Margin': '24.6%',
        'Free Cash Flow': '$99.6B',
        'ROE': '147.4%',
        'ROA': '22.1%',
        'Debt to Equity': '1.73',
        'Current Ratio': '0.93'
    },
    overview: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and Wearables, Home and Accessories. It also provides AppleCare support services; cloud services; and operates various platforms, including the App Store, Apple Arcade, Apple Music, Apple TV+, and Apple Fitness+. Apple is one of the world\'s most valuable companies and a leader in consumer technology innovation.',
    news: [
        {
            title: 'Apple Announces Record Q4 Earnings',
            source: 'Financial Times',
            time: '2 hours ago',
            excerpt: 'Apple Inc. reported better-than-expected quarterly earnings, driven by strong iPhone sales and growing services revenue.'
        },
        {
            title: 'New iPhone 16 Pre-Orders Exceed Expectations',
            source: 'Bloomberg',
            time: '5 hours ago',
            excerpt: 'Pre-orders for the latest iPhone 16 lineup have surpassed analyst predictions, signaling continued strong demand.'
        },
        {
            title: 'Apple Expands AI Features Across Product Line',
            source: 'TechCrunch',
            time: '1 day ago',
            excerpt: 'The tech giant announced new AI-powered features coming to iOS, macOS, and other platforms in upcoming updates.'
        },
        {
            title: 'Analysts Raise Price Target Following Strong Quarter',
            source: 'CNBC',
            time: '1 day ago',
            excerpt: 'Several Wall Street analysts have increased their price targets for Apple stock following the company\'s impressive earnings report.'
        }
    ]
};

let performanceChart = null;
let headerSparklineChart = null;
let currentRange = '1D';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadStockData();
    initializeCharts();
    setupTimeRangeTabs();
    styleTimeTabs();
});

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
    Object.entries(stockData.fundamentals).forEach(([key, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="symbol-cell">${key}</td>
            <td>${value}</td>
        `;
        fundamentalsTable.appendChild(row);
    });

    // Company Overview
    document.getElementById('companyOverview').textContent = stockData.overview;

    // News
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
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
