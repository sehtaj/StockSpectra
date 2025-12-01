// News Page JavaScript
// Editorial layout with mock data

// Mock Data
const tickerTape = [
    { symbol: 'AAPL', change: 2.34 },
    { symbol: 'TSLA', change: 5.67 },
    { symbol: 'MSFT', change: -0.89 },
    { symbol: 'GOOGL', change: 1.45 },
    { symbol: 'NVDA', change: 3.12 },
    { symbol: 'META', change: -1.23 },
    { symbol: 'AMZN', change: 2.78 },
    { symbol: 'NFLX', change: 4.21 }
];

const featuredArticle = {
    title: 'Tech Stocks Rally as AI Investments Surge Across Major Companies',
    excerpt: 'Major technology companies announced record investments in artificial intelligence infrastructure, driving a broad market rally in the tech sector.',
    category: 'Markets',
    source: 'Bloomberg',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop'
};

const topStories = [
    {
        title: 'Federal Reserve Signals Potential Rate Cuts in Q2 2025',
        excerpt: 'Fed Chair Jerome Powell indicated that the central bank may consider rate cuts if inflation continues its downward trend.',
        source: 'Reuters',
        time: '1 hour ago',
        category: 'Economy',
        thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&h=150&fit=crop'
    },
    {
        title: 'NVIDIA Announces Next-Generation AI Chips',
        excerpt: 'The semiconductor giant unveiled its latest GPU architecture, promising 10x performance improvements for AI workloads.',
        source: 'TechCrunch',
        time: '3 hours ago',
        category: 'Tech',
        thumbnail: 'https://images.unsplash.com/photo-1591238371159-c0c05e2e8a9f?w=200&h=150&fit=crop'
    },
    {
        title: 'Oil Prices Surge on Middle East Supply Concerns',
        excerpt: 'Crude oil futures jumped 4% as geopolitical tensions raised concerns about potential supply disruptions.',
        source: 'WSJ',
        time: '4 hours ago',
        category: 'Markets',
        thumbnail: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=200&h=150&fit=crop'
    },
    {
        title: 'Tesla Reports Record Q4 Deliveries',
        excerpt: 'Electric vehicle maker Tesla exceeded analyst expectations with strong delivery numbers across all markets.',
        source: 'CNBC',
        time: '5 hours ago',
        category: 'Earnings',
        thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=150&fit=crop'
    },
    {
        title: 'Bitcoin Breaks $50K as Institutional Adoption Grows',
        excerpt: 'Cryptocurrency markets rallied as major financial institutions announced expanded crypto trading services.',
        source: 'CoinDesk',
        time: '6 hours ago',
        category: 'Crypto',
        thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=150&fit=crop'
    },
    {
        title: 'Amazon Expands Same-Day Delivery to 50 New Cities',
        excerpt: 'The e-commerce giant continues its logistics expansion with significant investments in fulfillment infrastructure.',
        source: 'Financial Times',
        time: '7 hours ago',
        category: 'Stocks',
        thumbnail: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=150&fit=crop'
    }
];

const mosaicStories = [
    {
        title: 'Global Markets React to Inflation Data',
        category: 'Economy',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop'
    },
    {
        title: 'Apple Vision Pro Sales Exceed Expectations',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=400&h=300&fit=crop'
    },
    {
        title: 'Renewable Energy Stocks Surge',
        category: 'Markets',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop'
    },
    {
        title: 'Banking Sector Shows Strong Q4 Performance',
        category: 'Earnings',
        image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=400&fit=crop'
    },
    {
        title: 'Semiconductor Shortage Easing',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
    }
];

const analystInsights = [
    {
        firm: 'Goldman Sachs',
        title: 'Upgrades AAPL to Buy with $200 target',
        link: '#'
    },
    {
        firm: 'Morgan Stanley',
        title: 'Initiates coverage on NVDA at Overweight',
        link: '#'
    },
    {
        firm: 'JPMorgan',
        title: 'Raises S&P 500 year-end target to 4800',
        link: '#'
    },
    {
        firm: 'Bank of America',
        title: 'Downgrades META on valuation concerns',
        link: '#'
    },
    {
        firm: 'Citi',
        title: 'Q1 earnings preview: Tech sector outlook',
        link: '#'
    },
    {
        firm: 'Wells Fargo',
        title: 'Energy sector poised for breakout',
        link: '#'
    },
    {
        firm: 'Barclays',
        title: 'Healthcare stocks remain defensive play',
        link: '#'
    },
    {
        firm: 'Deutsche Bank',
        title: 'European markets set to outperform',
        link: '#'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTickerTape();
    renderFeaturedArticle();
    renderTopStories();
    renderArticleMosaic();
    renderAnalystInsights();
    setupCategoryTabs();
});

// Render Ticker Tape
function renderTickerTape() {
    const container = document.getElementById('tickerContent');

    // Duplicate items for seamless loop
    const items = [...tickerTape, ...tickerTape];

    container.innerHTML = items.map(item => {
        const changeClass = item.change >= 0 ? 'positive' : 'negative';
        const changeSign = item.change >= 0 ? '+' : '';
        return `
            <div class="ticker-item">
                <span class="ticker-symbol">${item.symbol}</span>
                <span class="ticker-change ${changeClass}">${changeSign}${item.change.toFixed(2)}%</span>
            </div>
        `;
    }).join('');
}

// Render Featured Article
function renderFeaturedArticle() {
    const container = document.getElementById('featuredArticle');

    container.innerHTML = `
        <div class="hero-image" style="background: linear-gradient(135deg, #1a1d23 0%, #2d3139 100%);"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <span class="hero-category">${featuredArticle.category}</span>
            <h2 class="hero-title">${featuredArticle.title}</h2>
            <p class="hero-excerpt">${featuredArticle.excerpt}</p>
            <div class="hero-meta">
                <span>${featuredArticle.source}</span>
                <span>•</span>
                <span>${featuredArticle.time}</span>
            </div>
        </div>
    `;
}

// Render Top Stories
function renderTopStories() {
    const container = document.getElementById('topStories');

    container.innerHTML = topStories.map(story => `
        <a href="#" class="story-row">
            <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-excerpt">${story.excerpt}</p>
                <div class="story-meta">
                    <span>${story.source}</span>
                    <span>•</span>
                    <span>${story.time}</span>
                    <span>•</span>
                    <span>${story.category}</span>
                </div>
            </div>
            <div class="story-thumbnail" style="background: linear-gradient(135deg, #1a1d23 0%, #2d3139 100%);"></div>
        </a>
    `).join('');
}

// Render Article Mosaic
function renderArticleMosaic() {
    const container = document.getElementById('articleMosaic');

    container.innerHTML = mosaicStories.map(story => `
        <a href="#" class="mosaic-article">
            <div class="mosaic-image" style="background: linear-gradient(135deg, #1a1d23 0%, #2d3139 100%);"></div>
            <div class="mosaic-overlay"></div>
            <div class="mosaic-content">
                <span class="mosaic-category">${story.category}</span>
                <h4 class="mosaic-title">${story.title}</h4>
            </div>
        </a>
    `).join('');
}

// Render Analyst Insights
function renderAnalystInsights() {
    const container = document.getElementById('analystInsights');

    container.innerHTML = analystInsights.map(insight => `
        <a href="${insight.link}" class="insight-item">
            <div class="insight-firm">${insight.firm}</div>
            <div class="insight-title">${insight.title}</div>
            <svg class="insight-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    `).join('');
}

// Setup Category Tabs
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter logic would go here
            const category = tab.dataset.category;
            console.log('Filter by category:', category);
        });
    });
}
