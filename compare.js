// Compare Page JavaScript - Modernized Version
// Reuses existing utilities from script.js

// Mock stock database with comprehensive data
const stockDatabase = {
    'AAPL': {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 178.42,
        change: 2.34,
        marketCap: 2800000000000,
        marketCapDisplay: '$2.8T',
        pe: 28.5,
        volume: 52300000,
        volumeDisplay: '52.3M',
        high52: 199.62,
        high52Display: '$199.62',
        low52: 124.17,
        low52Display: '$124.17'
    },
    'MSFT': {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 374.58,
        change: -0.89,
        marketCap: 2900000000000,
        marketCapDisplay: '$2.9T',
        pe: 35.2,
        volume: 28100000,
        volumeDisplay: '28.1M',
        high52: 384.30,
        high52Display: '$384.30',
        low52: 213.43,
        low52Display: '$213.43'
    },
    'GOOGL': {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 139.67,
        change: 1.45,
        marketCap: 1700000000000,
        marketCapDisplay: '$1.7T',
        pe: 26.8,
        volume: 31200000,
        volumeDisplay: '31.2M',
        high52: 151.55,
        high52Display: '$151.55',
        low52: 83.34,
        low52Display: '$83.34'
    },
    'TSLA': {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 242.84,
        change: 5.67,
        marketCap: 771000000000,
        marketCapDisplay: '$771B',
        pe: 73.4,
        volume: 125800000,
        volumeDisplay: '125.8M',
        high52: 299.29,
        high52Display: '$299.29',
        low52: 101.81,
        low52Display: '$101.81'
    },
    'AMZN': {
        symbol: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: 151.94,
        change: 2.78,
        marketCap: 1600000000000,
        marketCapDisplay: '$1.6T',
        pe: 52.1,
        volume: 48700000,
        volumeDisplay: '48.7M',
        high52: 161.72,
        high52Display: '$161.72',
        low52: 81.43,
        low52Display: '$81.43'
    },
    'NVDA': {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 495.22,
        change: 3.12,
        marketCap: 1200000000000,
        marketCapDisplay: '$1.2T',
        pe: 115.6,
        volume: 42500000,
        volumeDisplay: '42.5M',
        high52: 502.66,
        high52Display: '$502.66',
        low52: 108.13,
        low52Display: '$108.13'
    },
    'META': {
        symbol: 'META',
        name: 'Meta Platforms, Inc.',
        price: 338.12,
        change: -1.23,
        marketCap: 858000000000,
        marketCapDisplay: '$858B',
        pe: 28.9,
        volume: 18300000,
        volumeDisplay: '18.3M',
        high52: 353.96,
        high52Display: '$353.96',
        low52: 88.09,
        low52Display: '$88.09'
    },
    'NFLX': {
        symbol: 'NFLX',
        name: 'Netflix, Inc.',
        price: 487.33,
        change: 4.21,
        marketCap: 210000000000,
        marketCapDisplay: '$210B',
        pe: 44.2,
        volume: 3500000,
        volumeDisplay: '3.5M',
        high52: 502.45,
        high52Display: '$502.45',
        low52: 271.56,
        low52Display: '$271.56'
    },
    'DIS': {
        symbol: 'DIS',
        name: 'The Walt Disney Company',
        price: 91.23,
        change: -2.87,
        marketCap: 166000000000,
        marketCapDisplay: '$166B',
        pe: 52.8,
        volume: 8900000,
        volumeDisplay: '8.9M',
        high52: 118.18,
        high52Display: '$118.18',
        low52: 78.73,
        low52Display: '$78.73'
    },
    'INTC': {
        symbol: 'INTC',
        name: 'Intel Corporation',
        price: 42.15,
        change: -3.45,
        marketCap: 172000000000,
        marketCapDisplay: '$172B',
        pe: 18.3,
        volume: 45200000,
        volumeDisplay: '45.2M',
        high52: 51.28,
        high52Display: '$51.28',
        low52: 24.59,
        low52Display: '$24.59'
    },
    'AMD': {
        symbol: 'AMD',
        name: 'Advanced Micro Devices',
        price: 118.67,
        change: 2.94,
        marketCap: 192000000000,
        marketCapDisplay: '$192B',
        pe: 38.7,
        volume: 52800000,
        volumeDisplay: '52.8M',
        high52: 132.83,
        high52Display: '$132.83',
        low52: 54.57,
        low52Display: '$54.57'
    },
    'BABA': {
        symbol: 'BABA',
        name: 'Alibaba Group',
        price: 73.28,
        change: 1.67,
        marketCap: 188000000000,
        marketCapDisplay: '$188B',
        pe: 12.4,
        volume: 18700000,
        volumeDisplay: '18.7M',
        high52: 102.50,
        high52Display: '$102.50',
        low52: 58.01,
        low52Display: '$58.01'
    },
    'JPM': {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 158.42,
        change: 0.87,
        marketCap: 456000000000,
        marketCapDisplay: '$456B',
        pe: 11.2,
        volume: 9300000,
        volumeDisplay: '9.3M',
        high52: 169.81,
        high52Display: '$169.81',
        low52: 135.19,
        low52Display: '$135.19'
    },
    'V': {
        symbol: 'V',
        name: 'Visa Inc.',
        price: 258.94,
        change: 1.23,
        marketCap: 531000000000,
        marketCapDisplay: '$531B',
        pe: 32.6,
        volume: 5800000,
        volumeDisplay: '5.8M',
        high52: 273.57,
        high52Display: '$273.57',
        low52: 217.65,
        low52Display: '$217.65'
    },
    'WMT': {
        symbol: 'WMT',
        name: 'Walmart Inc.',
        price: 168.35,
        change: 0.54,
        marketCap: 442000000000,
        marketCapDisplay: '$442B',
        pe: 28.1,
        volume: 7200000,
        volumeDisplay: '7.2M',
        high52: 173.88,
        high52Display: '$173.88',
        low52: 142.42,
        low52Display: '$142.42'
    }
};

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

// Load stock data
function loadStock(stockLetter, symbol) {
    const stockData = stockDatabase[symbol];

    if (!stockData) {
        return;
    }

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
        updateChart();
    }
}

// Update preview card
function updatePreview(stockLetter, data) {
    const symbol = document.getElementById(`symbol${stockLetter}`);
    const name = document.getElementById(`name${stockLetter}`);
    const price = document.getElementById(`price${stockLetter}`);
    const change = document.getElementById(`change${stockLetter}`);

    symbol.textContent = data.symbol;
    name.textContent = data.name;
    price.textContent = `$${data.price.toFixed(2)}`;
    change.textContent = `${data.change > 0 ? '+' : ''}${data.change.toFixed(2)}%`;
    change.className = `stock-change ${data.change > 0 ? 'positive' : 'negative'}`;
}

// Update comparison table with color logic
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

    // P/E Ratio (lower is better for value investors, but we'll show higher as green for consistency)
    updateMetricCell('metricPEA', stockAData.pe.toFixed(1), stockAData.pe, stockBData.pe);
    updateMetricCell('metricPEB', stockBData.pe.toFixed(1), stockBData.pe, stockAData.pe);

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

// Update metric cell with color logic
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

// Generate mock price data with realistic variation
function generatePriceData(basePrice, days) {
    const data = [];
    let price = basePrice * 0.95; // Start slightly lower

    for (let i = 0; i < days; i++) {
        // Random walk with slight upward trend
        const volatility = basePrice * 0.015;
        const trend = (basePrice * 0.05) / days; // Gradual upward trend
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
        case '1Y': return 252; // Trading days
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

// Update chart with modern styling
function updateChart() {
    const points = getDataPoints(currentRange);
    const labels = getLabels(currentRange);

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
