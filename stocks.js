// Stocks List Page JavaScript
// Premium fintech stock browsing with search & filter

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
    { symbol: 'NKE', name: 'Nike, Inc.', price: 98.76, change: -1.34, sector: 'consumer' }
];

// Pagination settings
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredStocks = [...allStocks];

// DOM elements
const searchInput = document.getElementById('searchInput');
const sectorFilter = document.getElementById('sectorFilter');
const stocksList = document.getElementById('stocksList');
const noResults = document.getElementById('noResults');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStocks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    sectorFilter.addEventListener('change', handleFilter);
    prevBtn.addEventListener('click', () => changePage(-1));
    nextBtn.addEventListener('click', () => changePage(1));
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

    currentPage = 1;
    renderStocks();
}

// Handle filter
function handleFilter() {
    handleSearch(); // Reuse search logic
}

// Render stocks
function renderStocks() {
    const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const stocksToShow = filteredStocks.slice(startIndex, endIndex);

    // Update pagination info
    currentPageSpan.textContent = totalPages === 0 ? 0 : currentPage;
    totalPagesSpan.textContent = totalPages;

    // Update pagination buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Show/hide no results
    if (filteredStocks.length === 0) {
        stocksList.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    } else {
        stocksList.style.display = 'grid';
        noResults.style.display = 'none';
    }

    // Render stock cards
    stocksList.innerHTML = '';
    stocksToShow.forEach(stock => {
        const card = createStockCard(stock);
        stocksList.appendChild(card);
    });
}

// Create stock card
function createStockCard(stock) {
    const card = document.createElement('a');
    card.href = `stock-details.html?ticker=${stock.symbol}`;
    card.className = 'stock-list-card';

    const changeClass = stock.change >= 0 ? 'positive' : 'negative';
    const changeSign = stock.change >= 0 ? '+' : '';

    card.innerHTML = `
        <div class="stock-info">
            <div class="stock-symbol-main">${stock.symbol}</div>
            <div class="stock-company-name">${stock.name}</div>
        </div>
        
        <div class="stock-price-main">$${stock.price.toFixed(2)}</div>
        
        <div class="stock-change-main ${changeClass}">
            ${changeSign}${stock.change.toFixed(2)}%
        </div>
        
        <div class="sparkline-placeholder"></div>
        
        <svg class="view-arrow" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" 
                  stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    return card;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderStocks();

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        changePage(-1);
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        changePage(1);
    }
});
