# StockSpectra

> **Powering the Next Generation of Market Intelligence**

A premium, modern fintech web application for tracking stock prices, comparing companies, visualizing market data, and staying updated with financial news—all with a sleek dark-mode interface and editorial design.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Pages \& Features](#pages--features)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Recent Updates](#recent-updates)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**StockSpectra** is a comprehensive fintech dashboard platform designed to provide users with an intuitive, visually stunning interface for stock market analysis. The project emphasizes:

- **Premium aesthetics** with a dark, modern UI inspired by Bloomberg Terminal and TradingView
- **Editorial layouts** with asymmetric designs and no generic card grids
- **Real-time data visualization** (sparklines, charts, heatmaps, tables)
- **Responsive design** that works seamlessly across all devices
- **Performance-focused** with clean, semantic HTML and optimized CSS

---

## 🎨 Design Philosophy

### Visual Identity

The StockSpectra brand is built around a **minimalist wordmark logo** that represents clarity and precision. The design language follows these principles:

1. **Dark, Premium Aesthetic**
   - Deep black backgrounds (#0F1215)
   - Subtle surface layers (#121518)
   - Glassmorphism effects with backdrop blur
   - Minimal borders with low opacity for depth

2. **Accent Colors**
   - Primary accent: Vibrant emerald (#23F39B) - represents growth and positive market movement
   - Negative accent: Soft red (#D9534F) - represents decline
   - Text primary: Light gray (#E6EDF3) for excellent readability
   - Text secondary: Muted blue-gray (#9BA4B4) for hierarchy

3. **Typography**
   - Font family: **Inter** - a modern, highly legible sans-serif
   - Font weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)
   - Careful letter-spacing and line-height for optimal readability

4. **Layout Principles**
   - **No generic card grids** - Every page uses custom, editorial layouts
   - **Asymmetric designs** - Bloomberg-style mosaics and varying tile sizes
   - **Generous whitespace** for breathing room
   - **Consistent spacing scale** (4px, 8px, 16px, 24px, 32px, 48px, 64px)

---

## ✨ Pages & Features

### 1. **Homepage** (`index.html`)
**Premium dashboard overview**

- Full-width hero with background image and dark overlay
- Centered headline and CTA button
- Trending stocks grid (4 → 2 → 1 columns responsive)
- Market overview with sparklines
- Top gainers & losers tables
- Watchlist preview
- Fixed glassmorphism navbar

### 2. **Compare Stocks** (`compare.html`)
**Side-by-side stock comparison**

- Horizontal stock selector with dropdowns (15 stocks)
- Two preview cards side-by-side
- Premium Chart.js comparison chart (emerald/cyan colors)
- Smooth lines, glowing accents, subtle gridlines
- Comparison table with auto color-coding
- Time range selector (1D, 1W, 1M, 3M, 1Y)
- Swap functionality

### 3. **Stocks List** (`stocks.html`)
**Browse all available stocks**

- Premium search bar with emerald glow on focus
- Custom sector filter dropdown
- Full-width stock rows (NOT cards)
- Grid layout: Symbol | Name | Price | Change | Arrow
- Live search and filter functionality
- Pagination with keyboard navigation (12 per page)
- 24 mock stocks across 6 sectors

### 4. **Markets Dashboard** (`markets.html`)
**Heatmap-first Bloomberg-style interface**

- **Massive asymmetric heatmap**:
  - XL tiles (2×2): AAPL, MSFT
  - LG tiles (2×1): GOOGL, AMZN, NVDA
  - MD tiles (1×1): Others
  - Neon gradient backgrounds (green/red/neutral)
  - Hover scale + glow effects
  
- **Sentiment panels** (right side):
  - Fear & Greed Index
  - VIX (Volatility)
  - Market Breadth
  - Put/Call Ratio

- **Indices strips** (full-width rows):
  - S&P 500, NASDAQ, DOW, Russell 2000
  - Canvas sparklines with neon glow
  - Terminal-inspired design

- **Sector timeline** (horizontal progress bars):
  - 8 sectors with animated lines
  - Nodes showing historical data

- **Market movers** (tabbed tables):
  - Top Gainers, Losers, Most Active, 52W High/Low
  - Full-width tables with sparklines

### 5. **News** (`news.html`)
**Editorial news dashboard**

- **Scrolling ticker tape** at top (infinite animation)
- **Category tabs**: All, Markets, Stocks, Economy, Tech, Earnings, Crypto
- **Full-width hero article** (500px height):
  - Large cover with gradient overlay
  - Title layered inside bottom-left
  - Category badge

- **Top stories** (editorial rows):
  - 6 full-width story rows (NOT cards)
  - Left: Title, excerpt, metadata
  - Right: Small thumbnail
  - Hover: Opacity + slide right

- **Asymmetric article mosaic**:
  - Story 1: 2×2 (large feature)
  - Stories 2-3: 1×1 (small blocks)
  - Story 4: 2×1 (wide strip)
  - Story 5: 1×1 (small)
  - Image zoom on hover

- **Analyst insights sidebar** (sticky, 320px):
  - 8 analyst notes
  - Firm name + title + arrow
  - Minimal text rows

- **Sentiment metrics strip** (4 columns)

### 6. **Stock Details** (`stock-details.html`)
**Individual stock analysis**

- Large header with price, change, mini sparkline
- Performance chart with 6 time ranges
- Key metrics grid (8 metrics)
- Fundamentals table
- Company overview
- Latest news section (4 articles)
- All data from mock JSON

### 7. **About** (`about.html`)
**Premium brand storytelling page** (Most detailed page)

**9 Major Sections:**

1. **Brand Hero** (70vh):
   - "Powering the Next Generation of Market Intelligence"
   - Radial emerald glow spotlight
   - Dark gradient background

2. **Vision Split Panel**:
   - Two-column glassmorphism layout
   - Abstract SVG visualization

3. **Editorial Timeline** (2019-2025):
   - 4 milestones with glowing emerald line
   - Alternating left/right layout
   - Glassmorphism content boxes

4. **Values Carousel** (horizontal scroll):
   - 7 values: Transparency, Precision, Simplicity, Speed, Reliability, Craftsmanship, Innovation
   - Wide cards (400px) with emerald left border
   - Drag-to-scroll functionality

5. **How It Works** (4-layer explainer):
   - Data → Processing → Visualization → Insight
   - Numbered panels with connecting glow lines

6. **Team Section** (abstract design):
   - 4 team members with initials in circular avatars
   - No photos - premium abstract design
   - Philosophy quotes

7. **Technology Grid**:
   - 5 tech blocks with neon grid background
   - Real-Time Architecture, Comparison Engine, etc.

8. **Brand Pillars** (dramatic statements):
   - "Clarity First", "Intelligence, Not Noise", "Designed for the Future"
   - Radial emerald glow background

9. **CTA Panel**:
   - Frosted glass with gradient overlay
   - "Explore Platform" button

**Premium Features:**
- Scroll-triggered fade-in animations
- Parallax effects on hero and pillars
- Timeline glow on scroll
- Horizontal carousel with drag

---

## 📁 Project Structure

```
/Users/sehtaj/Documents/LPU/Sem 3/Stocks/
│
├── index.html              # Homepage dashboard
├── compare.html            # Stock comparison page
├── stocks.html             # Stocks list page
├── stock-details.html      # Individual stock details
├── markets.html            # Markets heatmap dashboard
├── news.html               # Editorial news page
├── about.html              # Brand storytelling page
├── test-api.html           # API testing dashboard
│
├── css/
│   ├── styles.css          # Global styles and design system
│   ├── hero-glass.css      # Hero section glassmorphism styles
│   ├── stocks.css          # Stocks page specific styles
│   ├── markets.css         # Markets page specific styles
│   ├── news.css            # News page specific styles
│   └── about.css           # About page specific styles
│
├── js/
│   ├── api-config.js       # API configuration (gitignored)
│   ├── api-config.example.js # API config template
│   ├── api-service.js      # API service layer with caching
│   ├── script.js           # Global JavaScript + live data loading
│   ├── compare.js          # Compare page functionality
│   ├── stocks.js           # Stocks page functionality
│   ├── stock-details.js    # Stock details functionality
│   ├── markets.js          # Markets page functionality
│   ├── news.js             # News page functionality
│   └── about.js            # About page animations
│
├── assets/
│   ├── hero-bg.png         # Hero section background
│   └── favicon.svg         # Site favicon
│
├── .gitignore              # Git ignore rules (protects API keys)
├── .env.local              # Environment configuration
└── README.md               # This file
```

---

## 🎨 Design System

### Color Palette

```css
--bg: #0F1215;                    /* Main background */
--surface: #121518;               /* Card/surface background */
--surface-hover: #161A1E;         /* Hover state */
--border: rgba(255, 255, 255, 0.06); /* Subtle borders */

--text-primary: #E6EDF3;          /* Primary text */
--text-secondary: #9BA4B4;        /* Secondary text */
--text-muted: #6C717A;            /* Muted text */

--green: #23F39B;                 /* Positive/accent */
--red: #D9534F;                   /* Negative values */
```

### Spacing Scale

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 18px;
--radius-xl: 22px;
```

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - No frameworks, pure DOM manipulation

### Visualization
- **Chart.js** - Interactive comparison charts
- **Canvas API** - Custom sparklines with neon glow effects

### Design Techniques
- **Glassmorphism** - Backdrop blur effects
- **Neon accents** - Glowing borders and shadows
- **Asymmetric layouts** - Bloomberg-style mosaics
- **Editorial design** - No generic card grids

### Typography
- **Google Fonts** - Inter (300, 400, 600, 700)

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for API features)
- **Finnhub API Key** (free) - [Get it here](https://finnhub.io/register)

### Quick Start

1. **Clone or download** the project files

2. **Set up API Key**:
   ```bash
   # Copy the example config file
   cp js/api-config.example.js js/api-config.js
   
   # Edit js/api-config.js and add your Finnhub API key
   # Replace 'YOUR_FINNHUB_API_KEY_HERE' with your actual key
   ```

3. **Run local server**:
   ```bash
   # Option 1: Using Python's built-in server (recommended)
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   
   # Option 2: Using Node.js http-server
   npx http-server
   ```

4. **Navigate** through the site:
   - Home → Compare → Stocks → Markets → News → About
   - Test API: http://localhost:8000/test-api.html

### API Setup (Detailed)

1. **Get Your Free API Key**:
   - Visit [Finnhub.io](https://finnhub.io/register)
   - Sign up for a free account (no credit card required)
   - Copy your API key from the dashboard

2. **Configure the Application**:
   - Open `js/api-config.example.js` to see the template
   - Create `js/api-config.js` (this file is gitignored)
   - Paste your API key in the configuration:
     ```javascript
     const API_CONFIG = {
         finnhub: {
             key: 'your_actual_api_key_here',
             baseUrl: 'https://finnhub.io/api/v1'
         },
         // ... rest of config
     };
     ```

3. **Test Your Setup**:
   - Open http://localhost:8000/test-api.html
   - Click "Test Stock Quote" button
   - If successful, you'll see real AAPL stock data
   - Check console for detailed logs

4. **Verify Homepage**:
   - Visit http://localhost:8000/index.html
   - Trending stocks should update with live prices within 1-2 seconds
   - Check browser console for "✅ Trending stocks loaded successfully"

### Running Without API (Demo Mode)

The site works perfectly without an API key! It will use fallback mock data:
- Just open `index.html` directly in your browser
- All features work, but with simulated data
- Perfect for testing the UI/UX

---

## 🔄 Recent Updates

### December 3, 2025 - Finnhub API Integration ✨

#### Real-Time Data Integration
- **Integrated Finnhub API** for live stock market data
- **API Configuration System**:
  - Created `api-config.js` for secure API key management
  - Added `api-config.example.js` template with setup instructions
  - Implemented `.gitignore` to protect API keys from version control
  - Created `.env.local` for environment-specific configuration

#### API Service Layer (`api-service.js`)
- **StockAPIService Class** with comprehensive features:
  - Real-time stock quotes (60 calls/min on free tier)
  - Multiple stock quotes (batch requests)
  - Company profiles (logos, names, industry, market cap)
  - Market news (company-specific and general)
  - Historical data support (requires paid tier)
  
- **Smart Caching System**:
  - LocalStorage-based caching to reduce API calls
  - Configurable cache durations:
    - Stock quotes: 5 minutes
    - Company info: 7 days
    - News: 6 hours
    - Daily data: 24 hours
  - Automatic cache invalidation
  
- **Error Handling**:
  - Graceful fallback to mock data if API fails
  - HTTP 403 detection for free tier limitations
  - Console warnings for debugging
  - Request counting and monitoring

#### Homepage Live Data
- **Trending Stocks Section**: Real-time prices for AAPL, TSLA, NVDA, MSFT, GOOGL, AMZN, META, NFLX
- **Hero AAPL Card**: Live price and change percentage updates
- **Watchlist Section**: Real-time data for 5 stocks
- **Auto-Refresh**: Data updates every 5 minutes automatically
- **Optimistic UI**: Hardcoded placeholders replaced smoothly by live data

#### API Testing Dashboard (`test-api.html`)
- **Comprehensive Test Page** with 5 test sections:
  1. API Configuration Check
  2. Single Stock Quote Test (AAPL)
  3. Multiple Stocks Test (4 stocks)
  4. Company Profile Test (with logo and details)
  5. Historical Data Test (with free tier limitation notice)
  
- **Visual Feedback**:
  - Success/error status indicators
  - Loading spinners
  - Console logging for debugging
  - Detailed data display with charts and grids
  - Free tier limitation warnings

#### Technical Implementation
- **Modular Architecture**:
  - Separated API config from service logic
  - Reusable `updateStockCard()` function
  - Clean async/await patterns
  - Type-safe data handling
  
- **Performance Optimizations**:
  - Batch API requests to minimize calls
  - Efficient DOM updates
  - Debounced refresh intervals
  - Smart cache hit/miss logging

#### API Usage & Limits
- **Finnhub Free Tier**:
  - ✅ 60 API calls per minute
  - ✅ Real-time stock quotes
  - ✅ Company profiles
  - ✅ Market news
  - ⚠️ Historical data requires paid plan ($59/month)
  
- **Current Usage**:
  - ~24 API calls on homepage load
  - Well within free tier limits
  - Caching reduces subsequent calls by 80%+

### December 2, 2025 - Major Platform Expansion

#### Markets Dashboard
- Created Bloomberg-style heatmap with asymmetric tiles
- Implemented neon gradient backgrounds (green/red/neutral)
- Added sentiment panels (Fear & Greed, VIX, Breadth, Put/Call)
- Built indices strips with Canvas sparklines
- Created sector timeline with progress bars
- Implemented tabbed market movers tables

#### News Page
- Built editorial layout with NO card grids
- Added infinite scrolling ticker tape
- Created full-width hero article with overlay
- Implemented editorial story rows
- Built asymmetric article mosaic (varying sizes)
- Added sticky analyst insights sidebar
- Created sentiment metrics strip

#### About Page
- Created 9-section brand storytelling page
- Built 70vh brand hero with radial glow
- Implemented vision split panel with SVG
- Created editorial timeline (2019-2025)
- Added horizontal values carousel (7 values)
- Built 4-layer how-it-works explainer
- Created abstract team section (no photos)
- Added technology grid with neon background
- Implemented dramatic brand pillars
- Added scroll animations and parallax effects

#### UI/UX Improvements
- Fixed blurry text on stocks page (removed backdrop blur)
- Updated all navigation links across pages
- Ensured consistent active states
- Added keyboard navigation for pagination

---

## 🔮 Future Enhancements

### Completed ✅
1. **API Integration** (December 3, 2025)
   - ✅ Connected to Finnhub API for real-time data
   - ✅ Real-time price updates on homepage
   - ✅ Smart caching system to reduce API calls
   - ✅ Comprehensive error handling and fallbacks

### In Progress 🚧
1. **Expand API Integration to All Pages**
   - [ ] Compare page with live stock data
   - [ ] Stock details page with company profiles
   - [ ] News page with real market news
   - [ ] Markets page with live indices data

### Planned Features 📋

2. **Historical Data & Advanced Charts**
   - Integrate alternative free API for historical data (Alpha Vantage)
   - Candlestick charts with Chart.js
   - Technical indicators (RSI, MACD, Bollinger Bands)
   - Drawing tools
   - Multi-timeframe analysis

3. **User Authentication**
   - Login/signup functionality
   - Personalized watchlists
   - Portfolio tracking
   - Price alerts
   - User preferences (saved stocks, custom layouts)

4. **Search Functionality**
   - Real-time stock symbol search
   - Autocomplete suggestions
   - Recent searches
   - Advanced filters (sector, market cap, etc.)

5. **Mobile App**
   - Progressive Web App (PWA) support
   - Native mobile apps (iOS/Android)
   - Push notifications for price alerts
   - Offline mode with cached data

### Technical Improvements

- [ ] Add service worker for offline support
- [ ] Implement lazy loading for images
- [ ] Optimize performance (Lighthouse score 95+)
- [ ] Add unit tests for JavaScript functions
- [ ] Implement dark/light mode toggle
- [ ] Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Add animations library (GSAP)
- [ ] WebSocket integration for real-time updates

---

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

1. **HTML5 Semantic Markup**
   - Proper use of semantic elements
   - Accessibility considerations
   - SEO-friendly structure

2. **Advanced CSS**
   - CSS Variables for theming
   - Flexbox and Grid layouts
   - Responsive design with media queries
   - Transitions and animations
   - Glassmorphism effects
   - Asymmetric layouts

3. **JavaScript**
   - Canvas API for sparklines
   - Chart.js integration
   - DOM manipulation
   - Event handling
   - Scroll animations
   - Parallax effects

4. **Design Principles**
   - Editorial layouts
   - Color theory and contrast
   - Typography hierarchy
   - Spacing and rhythm
   - Visual feedback
   - Premium fintech aesthetics

5. **Responsive Web Design**
   - Mobile-first approach
   - Breakpoints at 1024px, 768px, 480px
   - Flexible layouts
   - Touch-friendly interactions

---

## 📝 Notes

- **Font Loading**: The project uses Google Fonts (Inter). Ensure internet connection for proper font rendering.
- **Mock Data**: All pages currently use mock data. API integration planned for future releases.
- **Canvas Sparklines**: Custom sparklines use Canvas API with neon glow effects.
- **No Frameworks**: Built with vanilla JavaScript for maximum performance and learning.

---

## 👨‍💻 Author

**Sehtaj**  
Semester 3, LPU  
Course: Web Development / Frontend Design

---

## 📄 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- **Inter Font** by Rasmus Andersson
- **Chart.js** for interactive charts
- **Design Inspiration**: Bloomberg Terminal, TradingView, Robinhood, Koyfin, Finviz
- **Color Palette**: Inspired by GitHub's dark theme and modern fintech apps

---

**Last Updated**: December 3, 2025  
**Version**: 2.1.0 - Live Data Integration  
**Status**: ✅ Complete Platform with Real-Time API Integration

