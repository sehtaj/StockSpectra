// ===================================
// COMPARE PAGE - REAL-TIME DATA
// ===================================
// Uses the same API service as the Home page

// State
let stockAData = null;
let stockBData = null;
let comparisonChart = null;
let currentRange = '1D';
let updateInterval = null;

// DOM Elements
const stockASelect = document.getElementById('stockA');
const stockBSelect = document.getElementById('stockB');
const previewSection = document.getElementById('previewSection');
const chartCanvas = document.getElementById('comparisonChart');

// ===================================
// HELPER FUNCTIONS (from Home page)
// ===================================

/**
 * Update a compare card with real-time data
 * @param {string} stockLetter - 'A' or 'B'
 * @param {object} quote - Stock quote data from API
 */
function updateCompareCard(stockLetter, quote) {
    const symbolEl = document.getElementById(`symbol${stockLetter}`);
    const nameEl = document.getElementById(`name${stockLetter}`);
    const priceEl = document.getElementById(`price${stockLetter}`);
    const changeEl = document.getElementById(`change${stockLetter}`);
    const arrowEl = document.getElementById(`arrow${stockLetter}`);

    if (symbolEl) {
        symbolEl.textContent = quote.symbol;
    }

    if (priceEl) {
        priceEl.textContent = `$${quote.price.toFixed(2)}`;
    }

    if (changeEl) {
        const sign = quote.change >= 0 ? '+' : '';
        changeEl.textContent = `${sign}${quote.changePercent.toFixed(2)}%`;
        changeEl.className = `stock-change ${quote.change >= 0 ? 'positive' : 'negative'}`;
    }

    // Update arrow icon (same logic as Home page)
    if (arrowEl) {
        const isPositive = quote.change >= 0;

        // Update the class for styling (color)
        arrowEl.className = isPositive ? 'arrow-up' : 'arrow-down';

        // Update the SVG path to change arrow direction
        const pathElement = arrowEl.querySelector('path');
        if (pathElement) {
            const arrowPath = isPositive
                ? 'M8 12V4M8 4L4 8M8 4L12 8'  // Up arrow
                : 'M8 4V12M8 12L12 8M8 12L4 8'; // Down arrow
            pathElement.setAttribute('d', arrowPath);
        }
    }
}

/**
 * Update comparison chart with real-time data
 * @param {string} symbolA - Stock A symbol
 * @param {array} dataA - Historical data for stock A
 * @param {string} symbolB - Stock B symbol
 * @param {array} dataB - Historical data for stock B
 */
function updateCompareChart(symbolA, dataA, symbolB, dataB) {
    const points = getDataPoints(currentRange);
    const labels = getLabels(currentRange);

    if (comparisonChart) {
        comparisonChart.destroy();
    }

    const ctx = chartCanvas.getContext('2d');
    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: symbolA,
                    data: dataA,
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
                },
                {
                    label: symbolB,
                    data: dataB,
                    borderColor: '#3BC8F6',
                    backgroundColor: 'rgba(59, 200, 246, 0.15)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    pointRadius: 0,
                    pointBackgroundColor: '#3BC8F6',
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#3BC8F6',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: '#E6EDF3',
                        font: {
                            family: 'Inter',
                            size: 13,
                            weight: '500'
                        },
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 21, 24, 0.95)',
                    titleColor: '#E6EDF3',
                    bodyColor: '#9BA4B4',
                    borderColor: 'rgba(35, 243, 155, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
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

// ===================================
// DATA LOADING FUNCTIONS
// ===================================

/**
 * Load stock data from API
 * @param {string} stockLetter - 'A' or 'B'
 * @param {string} symbol - Stock symbol
 */
async function loadStock(stockLetter, symbol) {
    // Check if API is available
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using fallback data');
        loadStockFallback(stockLetter, symbol);
        return;
    }

    try {
        console.log(`🔄 Loading ${symbol} data for Stock ${stockLetter}...`);

        // Fetch real-time quote
        const quote = await stockAPI.getStockQuote(symbol);

        // Fetch company profile for name
        const profile = await stockAPI.getCompanyProfile(symbol);

        // Combine data
        const stockData = {
            symbol: symbol,
            name: profile.name || `${symbol} Inc.`,
            price: quote.price,
            change: quote.change,
            changePercent: quote.changePercent,
            high: quote.high,
            low: quote.low,
            open: quote.open,
            previousClose: quote.previousClose,
            marketCap: profile.marketCap || 0,
            marketCapDisplay: formatMarketCap(profile.marketCap || 0),
            // Note: Finnhub free tier doesn't provide volume in quote endpoint
            // Using simulated data for now
            volume: Math.floor(Math.random() * 100000000),
            volumeDisplay: formatVolume(Math.floor(Math.random() * 100000000)),
            // 52-week high/low - using current high/low * factor as approximation
            high52: quote.high * 1.15,
            high52Display: `$${(quote.high * 1.15).toFixed(2)}`,
            low52: quote.low * 0.85,
            low52Display: `$${(quote.low * 0.85).toFixed(2)}`,
            // P/E ratio - simulated (not available in free tier)
            pe: (Math.random() * 50 + 10).toFixed(1)
        };

        // Store data
        if (stockLetter === 'A') {
            stockAData = stockData;
        } else {
            stockBData = stockData;
        }

        // Update preview card
        updateCompareCard(stockLetter, quote);

        // Update company name
        const nameEl = document.getElementById(`name${stockLetter}`);
        if (nameEl) {
            nameEl.textContent = stockData.name;
        }

        // Show preview section if both stocks loaded
        if (stockAData && stockBData) {
            previewSection.style.display = 'grid';
            updateComparisonTable();
            await updateChart();
        }

        console.log(`✅ Stock ${stockLetter} (${symbol}) loaded successfully`);

    } catch (error) {
        console.error(`❌ Error loading ${symbol}:`, error);
        loadStockFallback(stockLetter, symbol);
    }
}

/**
 * Fallback data when API fails
 */
function loadStockFallback(stockLetter, symbol) {
    const mockData = {
        'AAPL': { name: 'Apple Inc.', price: 178.42, change: 2.34, changePercent: 1.33, marketCap: 2800000000000, volume: 52300000, pe: 28.5, high52: 199.62, low52: 124.17 },
        'MSFT': { name: 'Microsoft Corporation', price: 374.58, change: -0.89, changePercent: -0.24, marketCap: 2900000000000, volume: 28100000, pe: 35.2, high52: 384.30, low52: 213.43 },
        'GOOGL': { name: 'Alphabet Inc.', price: 139.67, change: 1.45, changePercent: 1.05, marketCap: 1700000000000, volume: 31200000, pe: 26.8, high52: 151.55, low52: 83.34 },
        'AMZN': { name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, changePercent: 1.86, marketCap: 1600000000000, volume: 48700000, pe: 52.1, high52: 161.72, low52: 81.43 },
        'TSLA': { name: 'Tesla, Inc.', price: 242.84, change: 5.67, changePercent: 2.39, marketCap: 771000000000, volume: 125800000, pe: 73.4, high52: 299.29, low52: 101.81 },
        'META': { name: 'Meta Platforms, Inc.', price: 338.12, change: -1.23, changePercent: -0.36, marketCap: 858000000000, volume: 18300000, pe: 28.9, high52: 353.96, low52: 88.09 },
        'NVDA': { name: 'NVIDIA Corporation', price: 495.22, change: 3.12, changePercent: 0.63, marketCap: 1200000000000, volume: 42500000, pe: 115.6, high52: 502.66, low52: 108.13 },
        'NFLX': { name: 'Netflix, Inc.', price: 487.33, change: 4.21, changePercent: 0.87, marketCap: 210000000000, volume: 3500000, pe: 44.2, high52: 502.45, low52: 271.56 }
    };

    const data = mockData[symbol] || { name: `${symbol} Inc.`, price: 100, change: 0, changePercent: 0, marketCap: 1000000000, volume: 10000000, pe: 20.0, high52: 120, low52: 80 };

    const stockData = {
        symbol: symbol,
        name: data.name,
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        marketCap: data.marketCap,
        marketCapDisplay: formatMarketCap(data.marketCap),
        volume: data.volume,
        volumeDisplay: formatVolume(data.volume),
        pe: data.pe,
        high52: data.high52,
        high52Display: `$${data.high52.toFixed(2)}`,
        low52: data.low52,
        low52Display: `$${data.low52.toFixed(2)}`
    };

    if (stockLetter === 'A') {
        stockAData = stockData;
    } else {
        stockBData = stockData;
    }

    updateCompareCard(stockLetter, stockData);

    const nameEl = document.getElementById(`name${stockLetter}`);
    if (nameEl) {
        nameEl.textContent = stockData.name;
    }

    if (stockAData && stockBData) {
        previewSection.style.display = 'grid';
        updateComparisonTable();
        updateChart();
    }
}

/**
 * Update comparison table with real-time data
 */
function updateComparisonTable() {
    // Update headers
    document.getElementById('tableSymbolA').textContent = stockAData.symbol;
    document.getElementById('tableSymbolB').textContent = stockBData.symbol;

    // Price
    updateMetricCell('metricPriceA', `$${stockAData.price.toFixed(2)}`, stockAData.price, stockBData.price);
    updateMetricCell('metricPriceB', `$${stockBData.price.toFixed(2)}`, stockBData.price, stockAData.price);

    // Change
    const changeA = document.getElementById('metricChangeA');
    const changeB = document.getElementById('metricChangeB');
    changeA.textContent = `${stockAData.change >= 0 ? '+' : ''}${stockAData.changePercent.toFixed(2)}%`;
    changeB.textContent = `${stockBData.change >= 0 ? '+' : ''}${stockBData.changePercent.toFixed(2)}%`;
    changeA.className = stockAData.change >= 0 ? 'positive' : 'negative';
    changeB.className = stockBData.change >= 0 ? 'positive' : 'negative';

    // Market Cap
    updateMetricCell('metricMarketCapA', stockAData.marketCapDisplay, stockAData.marketCap, stockBData.marketCap);
    updateMetricCell('metricMarketCapB', stockBData.marketCapDisplay, stockBData.marketCap, stockAData.marketCap);

    // P/E Ratio
    updateMetricCell('metricPEA', stockAData.pe, parseFloat(stockAData.pe), parseFloat(stockBData.pe));
    updateMetricCell('metricPEB', stockBData.pe, parseFloat(stockBData.pe), parseFloat(stockAData.pe));

    // Volume
    updateMetricCell('metricVolumeA', stockAData.volumeDisplay, stockAData.volume, stockBData.volume);
    updateMetricCell('metricVolumeB', stockBData.volumeDisplay, stockBData.volume, stockAData.volume);

    // 52W High
    updateMetricCell('metric52HighA', stockAData.high52Display, stockAData.high52, stockBData.high52);
    updateMetricCell('metric52HighB', stockBData.high52Display, stockBData.high52, stockAData.high52);

    // 52W Low (smallest = red, highest = green)
    const low52A = document.getElementById('metric52LowA');
    const low52B = document.getElementById('metric52LowB');
    low52A.textContent = stockAData.low52Display;
    low52B.textContent = stockBData.low52Display;
    // Remove existing classes
    low52A.classList.remove('positive', 'negative');
    low52B.classList.remove('positive', 'negative');
    low52A.style.color = '';
    low52B.style.color = '';
    // Apply color logic: highest = green, smallest = red
    if (stockAData.low52 > stockBData.low52) {
        low52A.classList.add('positive');
        low52B.classList.add('negative');
    } else if (stockAData.low52 < stockBData.low52) {
        low52A.classList.add('negative');
        low52B.classList.add('positive');
    } else {
        low52A.style.color = 'var(--text-muted)';
        low52B.style.color = 'var(--text-muted)';
    }
}

/**
 * Update metric cell with color logic
 */
function updateMetricCell(cellId, displayValue, thisValue, otherValue) {
    const cell = document.getElementById(cellId);
    cell.textContent = displayValue;

    // Remove existing classes
    cell.classList.remove('positive', 'negative');
    cell.style.color = '';

    // Apply color logic
    if (thisValue > otherValue) {
        cell.classList.add('positive');
    } else if (thisValue < otherValue) {
        cell.classList.add('negative');
    } else {
        cell.style.color = 'var(--text-muted)';
    }
}

/**
 * Update chart with historical data
 */
async function updateChart() {
    if (!stockAData || !stockBData) return;

    try {
        // For now, use simulated data
        // In production, you would fetch historical data from API
        const points = getDataPoints(currentRange);
        const labels = getLabels(currentRange);

        const dataA = generatePriceData(stockAData.price, points);
        const dataB = generatePriceData(stockBData.price, points);

        updateCompareChart(stockAData.symbol, dataA, stockBData.symbol, dataB);

    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatMarketCap(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(0)}`;
}

function formatVolume(value) {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
}

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

function getDataPoints(range) {
    switch (range) {
        case '1D': return 24;
        case '1W': return 7;
        case '1M': return 30;
        case '3M': return 90;
        case '1Y': return 252;
        default: return 30;
    }
}

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

// ===================================
// STYLING
// ===================================

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

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Dropdown change handlers
    stockASelect.addEventListener('change', () => {
        const symbol = stockASelect.value;
        if (symbol) {
            loadStock('A', symbol);
        }
    });

    stockBSelect.addEventListener('change', () => {
        const symbol = stockBSelect.value;
        if (symbol) {
            loadStock('B', symbol);
        }
    });

    // Time range tabs
    document.querySelectorAll('.time-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.time-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            currentRange = tab.dataset.range;
            if (stockAData && stockBData) {
                updateChart();
            }
        });
    });

    // Style time tabs
    styleTimeTabs();

    // Auto-load demo stocks
    setTimeout(() => {
        stockASelect.value = 'AAPL';
        stockBSelect.value = 'MSFT';
        loadStock('A', 'AAPL');
        loadStock('B', 'MSFT');
    }, 300);

    // Refresh data every 5 minutes (same as Home page)
    updateInterval = setInterval(() => {
        if (stockASelect.value && stockBSelect.value) {
            console.log('🔄 Refreshing compare data...');
            loadStock('A', stockASelect.value);
            loadStock('B', stockBSelect.value);
        }
    }, 5 * 60 * 1000);
});
