// Markets Dashboard JavaScript
// Heatmap-first design with Canvas sparklines

// Stock symbols for different sections
const heatmapSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'NFLX', 'AMD', 'INTC', 'DIS', 'JPM'];
const moverSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'NFLX', 'AMD', 'INTC', 'DIS', 'JPM', 'BAC', 'V', 'WMT', 'JNJ', 'PG', 'KO', 'PEP', 'COST'];

// Data storage (will be populated from API)
let heatmapData = [];
let indicesData = [];
let sectorsData = [];
let moversData = {
    gainers: [],
    losers: [],
    active: [],
    high52: [],
    low52: []
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadMarketData();
    setupMoversTabs();

    // Auto-refresh every 5 minutes
    setInterval(async () => {
        console.log('🔄 Auto-refreshing market data...');
        await loadMarketData();
    }, 5 * 60 * 1000);
});

// Load all market data
async function loadMarketData() {
    if (typeof stockAPI === 'undefined') {
        console.warn('⚠️ API not loaded, using fallback data');
        loadFallbackData();
        renderAll();
        return;
    }

    try {
        console.log('🔄 Loading real-time market data...');

        // Load heatmap and movers data in parallel
        await Promise.all([
            loadHeatmapData(),
            loadMoversData()
        ]);

        // Load indices and sectors (using fallback for now as free API doesn't provide this)
        loadIndicesData();
        loadSectorsData();

        // Render all sections
        renderAll();

        console.log('✅ Market data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading market data:', error);
        loadFallbackData();
        renderAll();
    }
}

// Load heatmap data
async function loadHeatmapData() {
    const quotes = await stockAPI.getMultipleQuotes(heatmapSymbols);

    // Assign sizes based on market position (simplified)
    const sizes = ['xl', 'xl', 'lg', 'lg', 'lg', 'md', 'md', 'md', 'md', 'md', 'md', 'md'];

    heatmapData = quotes.map((quote, index) => ({
        symbol: quote.symbol,
        price: quote.price,
        change: quote.changePercent,
        marketCap: 0, // Not available in free API
        size: sizes[index] || 'md'
    }));
}

// Load movers data
async function loadMoversData() {
    const quotes = await stockAPI.getMultipleQuotes(moverSymbols);

    // Sort by change percentage
    const sortedByChange = [...quotes].sort((a, b) => b.changePercent - a.changePercent);

    // Get gainers (top 5 positive)
    moversData.gainers = sortedByChange
        .filter(q => q.changePercent > 0)
        .slice(0, 5)
        .map(q => createMoverEntry(q));

    // Get losers (top 5 negative)
    moversData.losers = sortedByChange
        .filter(q => q.changePercent < 0)
        .slice(-5)
        .reverse()
        .map(q => createMoverEntry(q));

    // Active (use all stocks, sorted by absolute change)
    moversData.active = [...quotes]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 5)
        .map(q => createMoverEntry(q));

    // 52W High and Low (using current high/low as proxy)
    moversData.high52 = [...quotes]
        .sort((a, b) => b.high - a.high)
        .slice(0, 5)
        .map(q => createMoverEntry(q));

    moversData.low52 = [...quotes]
        .sort((a, b) => a.low - b.low)
        .slice(0, 5)
        .map(q => createMoverEntry(q));
}

// Create mover entry
function createMoverEntry(quote) {
    return {
        symbol: quote.symbol,
        name: quote.symbol, // Will be updated with company name if available
        price: quote.price,
        change: quote.changePercent,
        volume: 'N/A', // Not available in free API
        spark: generateSparkData(quote.price, quote.changePercent)
    };
}

// Generate spark data based on price and change
function generateSparkData(price, changePercent) {
    const points = 6;
    const data = [];
    const startPrice = price / (1 + changePercent / 100);

    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);
        const value = startPrice + (price - startPrice) * progress + (Math.random() - 0.5) * price * 0.01;
        data.push(parseFloat(value.toFixed(2)));
    }

    return data;
}

// Load indices data (fallback as not available in free API)
function loadIndicesData() {
    indicesData = [
        { name: 'S&P 500', value: 4615.32, change: 0.68, spark: [4580, 4590, 4585, 4600, 4610, 4615] },
        { name: 'NASDAQ', value: 14350.65, change: 1.05, spark: [14200, 14250, 14280, 14300, 14330, 14350] },
        { name: 'DOW', value: 35870.95, change: 0.42, spark: [35800, 35820, 35810, 35850, 35860, 35870] },
        { name: 'Russell 2000', value: 1975.28, change: 1.29, spark: [1950, 1955, 1960, 1965, 1970, 1975] }
    ];
}

// Load sectors data (fallback as not available in free API)
function loadSectorsData() {
    sectorsData = [
        { name: 'Technology', change: 2.3, progress: 85 },
        { name: 'Finance', change: -0.8, progress: 40 },
        { name: 'Healthcare', change: 1.4, progress: 70 },
        { name: 'Energy', change: -1.1, progress: 35 },
        { name: 'Consumer', change: 0.5, progress: 55 },
        { name: 'Industrials', change: 1.8, progress: 75 },
        { name: 'Materials', change: -0.3, progress: 48 },
        { name: 'Utilities', change: 0.2, progress: 52 }
    ];
}

// Render all sections
function renderAll() {
    renderHeatmap();
    renderIndices();
    renderSectorTimeline();
    renderMoversTable('gainers');
}

// Load fallback data when API is unavailable
function loadFallbackData() {
    heatmapData = [
        { symbol: 'AAPL', price: 178.42, change: 2.34, size: 'xl' },
        { symbol: 'MSFT', price: 374.58, change: -0.89, size: 'xl' },
        { symbol: 'GOOGL', price: 139.67, change: 1.45, size: 'lg' },
        { symbol: 'AMZN', price: 151.94, change: 2.78, size: 'lg' },
        { symbol: 'NVDA', price: 495.22, change: 3.12, size: 'lg' },
        { symbol: 'TSLA', price: 242.84, change: 5.67, size: 'md' },
        { symbol: 'META', price: 338.12, change: -1.23, size: 'md' },
        { symbol: 'NFLX', price: 487.33, change: 4.21, size: 'md' },
        { symbol: 'AMD', price: 118.67, change: 2.94, size: 'md' },
        { symbol: 'INTC', price: 42.15, change: -3.45, size: 'md' },
        { symbol: 'DIS', price: 91.23, change: -2.87, size: 'md' },
        { symbol: 'JPM', price: 158.42, change: 0.87, size: 'md' }
    ];

    loadIndicesData();
    loadSectorsData();

    moversData = {
        gainers: [
            { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 8.45, volume: '42.5M', spark: [460, 470, 475, 480, 490, 495] },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.84, change: 5.67, volume: '125.8M', spark: [230, 232, 235, 238, 240, 243] },
            { symbol: 'NFLX', name: 'Netflix, Inc.', price: 487.33, change: 4.21, volume: '3.5M', spark: [468, 472, 475, 480, 485, 487] },
            { symbol: 'AMD', name: 'Advanced Micro Devices', price: 118.67, change: 2.94, volume: '52.8M', spark: [115, 116, 115, 117, 118, 119] },
            { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, volume: '48.7M', spark: [148, 147, 149, 150, 151, 152] }
        ],
        losers: [
            { symbol: 'INTC', name: 'Intel Corporation', price: 42.15, change: -3.45, volume: '45.2M', spark: [44, 43, 43, 42, 42, 42] },
            { symbol: 'DIS', name: 'The Walt Disney Company', price: 91.23, change: -2.87, volume: '8.9M', spark: [94, 93, 92, 92, 91, 91] },
            { symbol: 'META', name: 'Meta Platforms, Inc.', price: 338.12, change: -1.23, volume: '18.3M', spark: [343, 342, 340, 339, 340, 338] },
            { symbol: 'MSFT', name: 'Microsoft Corporation', price: 374.58, change: -0.89, volume: '28.1M', spark: [378, 376, 377, 375, 376, 374] },
            { symbol: 'BAC', name: 'Bank of America Corp.', price: 34.56, change: -0.45, volume: '42.1M', spark: [35, 34, 34, 35, 34, 34] }
        ],
        active: [
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.84, change: 5.67, volume: '125.8M', spark: [230, 232, 235, 238, 240, 243] },
            { symbol: 'AMD', name: 'Advanced Micro Devices', price: 118.67, change: 2.94, volume: '52.8M', spark: [115, 116, 115, 117, 118, 119] },
            { symbol: 'AAPL', name: 'Apple Inc.', price: 178.42, change: 2.34, volume: '52.3M', spark: [174, 171, 175, 173, 176, 178] },
            { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, volume: '48.7M', spark: [148, 147, 149, 150, 151, 152] },
            { symbol: 'INTC', name: 'Intel Corporation', price: 42.15, change: -3.45, volume: '45.2M', spark: [44, 43, 43, 42, 42, 42] }
        ],
        high52: [
            { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 3.12, volume: '42.5M', spark: [480, 482, 485, 488, 492, 495] },
            { symbol: 'NFLX', name: 'Netflix, Inc.', price: 487.33, change: 4.21, volume: '3.5M', spark: [468, 472, 475, 480, 485, 487] },
            { symbol: 'MSFT', name: 'Microsoft Corporation', price: 374.58, change: -0.89, volume: '28.1M', spark: [378, 376, 377, 375, 376, 374] },
            { symbol: 'META', name: 'Meta Platforms, Inc.', price: 338.12, change: -1.23, volume: '18.3M', spark: [343, 342, 340, 339, 340, 338] },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.84, change: 5.67, volume: '125.8M', spark: [230, 232, 235, 238, 240, 243] }
        ],
        low52: [
            { symbol: 'INTC', name: 'Intel Corporation', price: 42.15, change: -3.45, volume: '45.2M', spark: [44, 43, 43, 42, 42, 42] },
            { symbol: 'DIS', name: 'The Walt Disney Company', price: 91.23, change: -2.87, volume: '8.9M', spark: [94, 93, 92, 92, 91, 91] },
            { symbol: 'AMD', name: 'Advanced Micro Devices', price: 118.67, change: 2.94, volume: '52.8M', spark: [115, 116, 115, 117, 118, 119] },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.67, change: 1.45, volume: '31.2M', spark: [137, 138, 137, 139, 138, 140] },
            { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, volume: '48.7M', spark: [148, 147, 149, 150, 151, 152] }
        ]
    };
}

// Render Heatmap
function renderHeatmap() {
    const grid = document.getElementById('heatmapGrid');
    grid.innerHTML = '';

    heatmapData.forEach(stock => {
        const cell = document.createElement('a');
        cell.href = `stock-details.html?ticker=${stock.symbol}`;
        cell.className = `heatmap-cell size-${stock.size}`;

        // Add gradient class based on change
        if (stock.change > 0) {
            cell.classList.add('positive');
        } else if (stock.change < 0) {
            cell.classList.add('negative');
        } else {
            cell.classList.add('neutral');
        }

        cell.innerHTML = `
            <div class="cell-symbol">${stock.symbol}</div>
            <div class="cell-change">${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%</div>
            <div class="cell-price">$${stock.price.toFixed(2)}</div>
        `;

        grid.appendChild(cell);
    });
}

// Render Indices
function renderIndices() {
    const container = document.getElementById('indicesStrips');
    container.innerHTML = '';

    indicesData.forEach(index => {
        const strip = document.createElement('a');
        strip.href = '#';
        strip.className = 'index-strip';

        const changeClass = index.change >= 0 ? 'positive' : 'negative';
        const changeSign = index.change >= 0 ? '+' : '';

        strip.innerHTML = `
            <div class="index-name">${index.name}</div>
            <div class="index-value">${index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div class="index-change ${changeClass}">${changeSign}${index.change.toFixed(2)}%</div>
            <canvas class="index-sparkline" width="120" height="40"></canvas>
            <svg class="index-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        container.appendChild(strip);
    });

    // Render sparklines
    setTimeout(() => {
        const canvases = document.querySelectorAll('.index-sparkline');
        canvases.forEach((canvas, index) => {
            renderSparkline(canvas, indicesData[index].spark, indicesData[index].change >= 0);
        });
    }, 10);
}

// Render Sector Timeline
function renderSectorTimeline() {
    const container = document.getElementById('sectorTimeline');
    container.innerHTML = '';

    sectorsData.forEach(sector => {
        const row = document.createElement('div');
        row.className = 'sector-row';

        const changeClass = sector.change >= 0 ? 'positive' : 'negative';
        const changeSign = sector.change >= 0 ? '+' : '';

        row.innerHTML = `
            <div class="sector-label">${sector.name}</div>
            <div class="sector-line">
                <div class="sector-progress ${changeClass}" style="width: ${sector.progress}%;">
                    <div class="sector-node" style="left: 30%; color: currentColor;"></div>
                    <div class="sector-node" style="left: 60%; color: currentColor;"></div>
                    <div class="sector-node" style="left: 90%; color: currentColor;"></div>
                </div>
            </div>
            <div class="sector-change ${changeClass}">${changeSign}${sector.change.toFixed(1)}%</div>
        `;

        container.appendChild(row);
    });
}

// Render Movers Table
function renderMoversTable(tab) {
    const container = document.getElementById('moversTable');
    const data = moversData[tab];

    const table = document.createElement('table');
    table.className = 'movers-table';

    table.innerHTML = `
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
                <th>Volume</th>
                <th>Trend</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(stock => {
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSign = stock.change >= 0 ? '+' : '';
        return `
                    <tr onclick="window.location.href='stock-details.html?ticker=${stock.symbol}'">
                        <td>
                            <div class="mover-symbol">${stock.symbol}</div>
                            <div class="mover-name">${stock.name}</div>
                        </td>
                        <td class="mover-price">$${stock.price.toFixed(2)}</td>
                        <td class="mover-change ${changeClass}">${changeSign}${stock.change.toFixed(2)}%</td>
                        <td>${stock.volume}</td>
                        <td><canvas class="mover-sparkline" width="80" height="32" data-spark='${JSON.stringify(stock.spark)}' data-positive="${stock.change >= 0}"></canvas></td>
                    </tr>
                `;
    }).join('')}
        </tbody>
    `;

    container.innerHTML = '';
    container.appendChild(table);

    // Render sparklines
    setTimeout(() => {
        const canvases = document.querySelectorAll('.mover-sparkline');
        canvases.forEach(canvas => {
            const sparkData = JSON.parse(canvas.dataset.spark);
            const isPositive = canvas.dataset.positive === 'true';
            renderSparkline(canvas, sparkData, isPositive);
        });
    }, 10);
}

// Setup Movers Tabs
function setupMoversTabs() {
    const tabs = document.querySelectorAll('.mover-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMoversTable(tab.dataset.tab);
        });
    });
}

// Render Sparkline (Canvas API)
function renderSparkline(canvas, data, isPositive) {
    if (!canvas || !data || data.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 4;

    ctx.clearRect(0, 0, width, height);

    const lineColor = isPositive ? '#23F39B' : '#D9534F';
    const glowColor = isPositive ? 'rgba(35, 243, 155, 0.35)' : 'rgba(217, 83, 79, 0.35)';

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;

    const points = data.map((value, index) => ({
        x: padding + (index / (data.length - 1)) * (width - padding * 2),
        y: height - padding - ((value - minValue) / range) * (height - padding * 2)
    }));

    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const controlX = (current.x + next.x) / 2;
        const controlY = (current.y + next.y) / 2;
        ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
    }

    const lastPoint = points[points.length - 1];
    ctx.lineTo(lastPoint.x, lastPoint.y);
    ctx.stroke();
    ctx.restore();
}
