// Compare Page JavaScript - Hybrid Version
// Uses api-service.js for real-time quotes, but mock data for smooth charts

// State
let stockAData = null;
let stockBData = null;
let comparisonChart = null;
let currentRange = '1D';

// DOM Elements
const stockASelect = document.getElementById('stockA');
const stockBSelect = document.getElementById('stockB');
const previewSection = document.getElementById('previewSection');
const chartCanvas = document.getElementById('comparisonChart');

// Initialize
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
});

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

// Load stock data (Real-time Quotes)
async function loadStock(stockLetter, symbol) {
    try {
        if (!window.stockAPI) {
            console.error('Stock API not loaded');
            // Fallback if API missing?
            return;
        }

        // Fetch data
        const [quote, profile] = await Promise.all([
            window.stockAPI.getStockQuote(symbol),
            window.stockAPI.getCompanyProfile(symbol)
        ]);

        // Construct the stock data object
        const stockData = {
            symbol: symbol,
            name: profile.name || symbol,
            price: quote.price,
            change: quote.changePercent,
            marketCap: (profile.marketCap || 0) * 1000000,
            marketCapDisplay: formatMarketCap((profile.marketCap || 0) * 1000000),
            // Mock PE
            pe: (Math.random() * 30 + 10).toFixed(1),
            // Mock Volume
            volume: Math.floor(Math.random() * 100000000) + 1000000,
            volumeDisplay: 'Loading...',
            high52: quote.high,
            high52Display: `$${quote.high.toFixed(2)}`,
            low52: quote.low,
            low52Display: `$${quote.low.toFixed(2)}`
        };

        stockData.volumeDisplay = formatVolume(stockData.volume);

        if (stockLetter === 'A') {
            stockAData = stockData;
            updatePreview('A', stockData);
        } else {
            stockBData = stockData;
            updatePreview('B', stockData);
        }

        // Show preview section if both stocks loaded
        if (stockAData && stockBData) {
            previewSection.style.display = 'grid';
            updateComparisonTable();
            updateChart(); // Uses Mock generator with Real Price
        }

    } catch (error) {
        console.error(`Error loading stock ${symbol}:`, error);
    }
}

// Format Market Cap
function formatMarketCap(value) {
    if (value >= 1.0e+12) return '$' + (value / 1.0e+12).toFixed(1) + 'T';
    if (value >= 1.0e+9) return '$' + (value / 1.0e+9).toFixed(1) + 'B';
    if (value >= 1.0e+6) return '$' + (value / 1.0e+6).toFixed(1) + 'M';
    return '$' + value;
}

// Format Volume
function formatVolume(value) {
    if (value >= 1.0e+6) return (value / 1.0e+6).toFixed(1) + 'M';
    if (value >= 1.0e+3) return (value / 1.0e+3).toFixed(1) + 'K';
    return value;
}

// Update preview card
function updatePreview(stockLetter, data) {
    const symbol = document.getElementById(`symbol${stockLetter}`);
    const name = document.getElementById(`name${stockLetter}`);
    const price = document.getElementById(`price${stockLetter}`);
    const change = document.getElementById(`change${stockLetter}`);

    if (symbol) symbol.textContent = data.symbol;
    if (name) name.textContent = data.name;
    if (price) price.textContent = `$${data.price.toFixed(2)}`;
    if (change) {
        change.textContent = `${data.change > 0 ? '+' : ''}${data.change.toFixed(2)}%`;
        change.className = `stock-change ${data.change > 0 ? 'positive' : 'negative'}`;
    }
}

// Update comparison table
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
    changeA.textContent = `${stockAData.change > 0 ? '+' : ''}${stockAData.change.toFixed(2)}%`;
    changeB.textContent = `${stockBData.change > 0 ? '+' : ''}${stockBData.change.toFixed(2)}%`;
    changeA.className = stockAData.change > 0 ? 'positive' : 'negative';
    changeB.className = stockBData.change > 0 ? 'positive' : 'negative';

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

    // 52W Low
    updateMetricCell('metric52LowA', stockAData.low52Display, stockAData.low52, stockBData.low52);
    updateMetricCell('metric52LowB', stockBData.low52Display, stockBData.low52, stockAData.low52);
}

// Update metric cell
function updateMetricCell(cellId, displayValue, thisValue, otherValue) {
    const cell = document.getElementById(cellId);
    if (!cell) return;

    cell.textContent = displayValue;
    cell.classList.remove('positive', 'negative');
    cell.style.color = '';

    if (thisValue > otherValue) {
        cell.classList.add('positive');
    } else if (thisValue < otherValue) {
        cell.classList.add('negative');
    } else {
        cell.style.color = 'var(--text-muted)';
    }
}

// Generate mock price data (Reverted Function)
function generatePriceData(basePrice, days) {
    const data = [];
    let price = basePrice * 0.95; // Start slightly lower

    for (let i = 0; i < days; i++) {
        // Random walk with slight upward trend
        const volatility = basePrice * 0.015;
        const trend = (basePrice * 0.05) / days;
        const change = (Math.random() - 0.5) * volatility + trend;
        price += change;
        data.push(parseFloat(price.toFixed(2)));
    }
    // Ensure the last point matches current price? 
    // The previous logic didn't STRICTLY match, but let's just use it as is for "realistic" curves.
    return data;
}

// Get data points based on range (Reverted Function)
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

// Get labels based on range (Reverted Function)
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

// Update chart (Reverted Logic)
function updateChart() {
    const points = getDataPoints(currentRange);
    const labels = getLabels(currentRange);

    // Use CURRENT real price as the baseline for the mock chart
    const dataA = generatePriceData(stockAData.price, points);
    const dataB = generatePriceData(stockBData.price, points);

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
                    label: stockAData.symbol,
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
                    label: stockBData.symbol,
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
