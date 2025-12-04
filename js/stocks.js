// Stocks Wheel Picker Page JavaScript
// Subtle wheel with 5ms smoothing and snap-to-center

// Mock stock data
const allStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.42, change: 2.34, sector: 'technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 374.58, change: -0.89, sector: 'technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.67, change: 1.45, sector: 'technology' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 151.94, change: 2.78, sector: 'retail' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.84, change: 5.67, sector: 'automotive' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', price: 338.12, change: -1.23, sector: 'technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 3.12, sector: 'technology' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: 487.33, change: 4.21, sector: 'entertainment' },
    { symbol: 'DIS', name: 'The Walt Disney Company', price: 91.23, change: -2.87, sector: 'entertainment' },
    { symbol: 'INTC', name: 'Intel Corporation', price: 42.15, change: -3.45, sector: 'technology' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 118.67, change: 2.94, sector: 'technology' },
    { symbol: 'BABA', name: 'Alibaba Group', price: 73.28, change: 1.67, sector: 'retail' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 158.42, change: 0.87, sector: 'finance' },
    { symbol: 'V', name: 'Visa Inc.', price: 258.94, change: 1.23, sector: 'finance' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: 168.35, change: 0.54, sector: 'retail' },
    { symbol: 'BAC', name: 'Bank of America Corp.', price: 34.56, change: -0.45, sector: 'finance' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: 0.32, sector: 'consumer' },
    { symbol: 'PG', name: 'Procter & Gamble Co.', price: 152.34, change: -0.12, sector: 'consumer' },
    { symbol: 'XOM', name: 'Exxon Mobil Corporation', price: 102.45, change: 1.89, sector: 'consumer' },
    { symbol: 'CVX', name: 'Chevron Corporation', price: 148.67, change: 2.15, sector: 'consumer' },
    { symbol: 'KO', name: 'The Coca-Cola Company', price: 58.92, change: 0.67, sector: 'consumer' },
    { symbol: 'PEP', name: 'PepsiCo, Inc.', price: 172.45, change: -0.23, sector: 'consumer' },
    { symbol: 'COST', name: 'Costco Wholesale Corp.', price: 612.34, change: 1.45, sector: 'retail' },
    { symbol: 'NKE', name: 'Nike, Inc.', price: 98.76, change: -1.34, sector: 'consumer' },
    { symbol: 'ADBE', name: 'Adobe Inc.', price: 567.89, change: 1.87, sector: 'technology' },
    { symbol: 'CRM', name: 'Salesforce Inc.', price: 234.56, change: -0.76, sector: 'technology' },
    { symbol: 'ORCL', name: 'Oracle Corporation', price: 98.34, change: 0.92, sector: 'technology' },
    { symbol: 'CSCO', name: 'Cisco Systems Inc.', price: 51.23, change: -1.12, sector: 'technology' },
    { symbol: 'IBM', name: 'IBM Corporation', price: 145.67, change: 0.45, sector: 'technology' },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', price: 123.45, change: 2.34, sector: 'technology' }
];

let filteredStocks = [...allStocks];

// DOM elements
const searchInput = document.getElementById('searchInput');
const sectorFilter = document.getElementById('sectorFilter');
const wheelContainer = document.getElementById('wheelContainer');
const stocksWheel = document.getElementById('stocksWheel');
const noResults = document.getElementById('noResults');

// Wheel state
let isScrolling = false;
let scrollTimeout;
let smoothingInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderWheel();
    setupEventListeners();
    startSmoothingLoop();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    sectorFilter.addEventListener('change', handleFilter);

    // Detect scroll start/stop for snap behavior
    wheelContainer.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);

        // Detect scroll stop
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            snapToCenter();
        }, 150);
    });
}

// 5ms smoothing loop for fluid active detection
function startSmoothingLoop() {
    smoothingInterval = setInterval(() => {
        updateActiveItem();
    }, 5);
}

// Handle search
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const sector = sectorFilter.value;

    filteredStocks = allStocks.filter(stock => {
        const matchesSearch = stock.symbol.toLowerCase().includes(query) ||
            stock.name.toLowerCase().includes(query);
        const matchesSector = sector === 'all' || stock.sector === sector;
        return matchesSearch && matchesSector;
    });

    renderWheel();
}

// Handle filter
function handleFilter() {
    handleSearch();
}

// Render wheel
function renderWheel() {
    // Show/hide no results
    if (filteredStocks.length === 0) {
        stocksWheel.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    } else {
        stocksWheel.style.display = 'flex';
        noResults.style.display = 'none';
    }

    // Render stock items
    stocksWheel.innerHTML = '';
    filteredStocks.forEach(stock => {
        const item = createWheelItem(stock);
        stocksWheel.appendChild(item);
    });
}

// Create wheel item
function createWheelItem(stock) {
    const item = document.createElement('a');
    item.href = `stock-details.html?ticker=${stock.symbol}`;
    item.className = 'wheel-item';
    item.dataset.symbol = stock.symbol;

    const changeClass = stock.change >= 0 ? 'positive' : 'negative';
    const changeSign = stock.change >= 0 ? '+' : '';

    item.innerHTML = `
        <div class="wheel-item-left">
            <div class="wheel-symbol">${stock.symbol}</div>
            <div class="wheel-company">${stock.name}</div>
        </div>
        
        <div class="wheel-item-right">
            <div class="wheel-price">$${stock.price.toFixed(2)}</div>
            <div class="wheel-change ${changeClass}">
                ${changeSign}${stock.change.toFixed(2)}%
            </div>
            <div class="wheel-sparkline"></div>
        </div>
    `;

    // Only allow click on active items
    item.addEventListener('click', (e) => {
        if (!item.classList.contains('active')) {
            e.preventDefault();
            scrollToItem(item);
        }
    });

    return item;
}

// Update active item (called every 5ms)
function updateActiveItem() {
    const items = stocksWheel.querySelectorAll('.wheel-item');
    if (items.length === 0) return;

    const wheelRect = wheelContainer.getBoundingClientRect();
    const centerY = wheelRect.top + wheelRect.height / 2;

    let closestItem = null;
    let closestDistance = Infinity;

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }
    });

    // Remove active class from all items
    items.forEach(item => item.classList.remove('active'));

    // Add active class to closest item
    if (closestItem) {
        closestItem.classList.add('active');
    }
}

// Snap to center when scrolling stops
function snapToCenter() {
    const activeItem = stocksWheel.querySelector('.wheel-item.active');
    if (!activeItem) return;

    const wheelRect = wheelContainer.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    const wheelCenter = wheelRect.height / 2;
    const itemCenter = itemRect.height / 2;
    const scrollOffset = itemRect.top - wheelRect.top - wheelCenter + itemCenter;

    // Smooth snap with spring-like easing
    wheelContainer.scrollBy({
        top: scrollOffset,
        behavior: 'smooth'
    });
}

// Scroll specific item to center
function scrollToItem(item) {
    const wheelRect = wheelContainer.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const wheelCenter = wheelRect.height / 2;
    const itemCenter = itemRect.height / 2;
    const scrollOffset = itemRect.top - wheelRect.top - wheelCenter + itemCenter;

    wheelContainer.scrollBy({
        top: scrollOffset,
        behavior: 'smooth'
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeItem = stocksWheel.querySelector('.wheel-item.active');
    if (!activeItem) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = activeItem.nextElementSibling;
        if (nextItem && nextItem.classList.contains('wheel-item')) {
            scrollToItem(nextItem);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = activeItem.previousElementSibling;
        if (prevItem && prevItem.classList.contains('wheel-item')) {
            scrollToItem(prevItem);
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeItem.href) {
            window.location.href = activeItem.href;
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (smoothingInterval) {
        clearInterval(smoothingInterval);
    }
});
