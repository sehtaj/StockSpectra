# StockSpectra

> **Analyze & Compare Stocks with Real-Time Insights**

A premium, modern fintech web application for tracking stock prices, comparing companies, and visualizing financial data with a sleek dark-mode interface.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Features](#features)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Components](#components)
- [Recent Updates](#recent-updates)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**StockSpectra** is a fintech dashboard application designed to provide users with an intuitive, visually stunning interface for stock market analysis. The project emphasizes:

- **Premium aesthetics** with a dark, modern UI
- **Real-time data visualization** (sparklines, charts, tables)
- **Responsive design** that works seamlessly across all devices
- **Performance-focused** with clean, semantic HTML and optimized CSS

---

## 🎨 Design Philosophy

### Visual Identity

The StockSpectra brand is built around a **"Balanced Dual-Curve Split-S"** logo that represents the comparison of two datasets or stock lines. The design language follows these principles:

1. **Dark, Premium Aesthetic**
   - Deep black backgrounds (#0F1215)
   - Subtle surface layers (#121518)
   - Minimal borders with low opacity for depth

2. **Accent Colors**
   - Primary accent: Vibrant green (#23F39B) - represents growth and positive market movement
   - Text primary: Light gray (#E6EDF3) for excellent readability
   - Text secondary: Muted blue-gray (#9BA4B4) for hierarchy

3. **Typography**
   - Font family: **Inter** - a modern, highly legible sans-serif
   - Font weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)
   - Careful letter-spacing and line-height for optimal readability

4. **Spacing & Layout**
   - Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
   - Generous whitespace for breathing room
   - Grid-based layouts for alignment and structure

---

## ✨ Features

### 1. **Fixed Navigation Bar**
- Transparent glassmorphism pill design
- Centered navigation with brand logo on the left
- Navigation links: Home, Compare, Stocks, History, News, About
- Icon buttons for Search and Watchlist
- User avatar with hover effects
- Mobile-responsive with hamburger menu

### 2. **Hero Section**
- Full-width background image (`hero-bg.png`)
- Dark gradient overlay for text readability
- Centered content layout with:
  - Large, bold headline
  - Descriptive subtitle
  - Prominent CTA button: "Compare Stocks Now"
- Minimum height of 600px for impact

### 3. **Trending Stocks**
- Grid layout of stock cards (responsive: 4 columns → 2 → 1)
- Each card displays:
  - Stock symbol (e.g., AAPL, TSLA)
  - Company name
  - Current price
  - Percentage change (color-coded: green for positive, red for negative)
  - Arrow indicator (up/down)
- Hover effects with subtle lift animation

### 4. **Market Overview**
- Clean list of major market indices:
  - S&P 500
  - NASDAQ
  - DOW
  - Russell 2000
- Each item shows:
  - Index name
  - Sparkline chart (mini line graph)
  - Current value
  - Percentage change

### 5. **Top Gainers & Losers**
- Side-by-side tables (responsive: stacks on mobile)
- Data includes:
  - Stock symbol
  - Current price
  - Percentage change
  - Point change
- Color-coded values for quick scanning
- Hover effects on table rows

### 6. **Watchlist Preview**
- Grid of user's tracked stocks
- Simplified card design for quick overview
- Shows symbol, company name, price, and change

### 7. **Footer**
- Minimal, centered design
- Copyright and brand tagline

---

## 📁 Project Structure

```
/Users/sehtaj/Documents/LPU/Sem 3/Stocks/
│
├── index.html              # Main HTML structure
├── styles.css              # Complete stylesheet with CSS variables
├── script.js               # JavaScript for interactivity (sparklines, etc.)
│
├── hero-bg.png             # Hero section background image
│
├── logo-wordmark.svg       # Full StockSpectra logo with icon
├── logo-icon.svg           # Icon-only version (Split-S)
├── logo-text.svg           # Text-only version
├── logo-icon-favicon.svg   # Favicon-optimized icon
│
└── README.md               # This file
```

---

## 🎨 Design System

### Color Palette

```css
--bg: #0F1215;                    /* Main background */
--surface: #121518;               /* Card/surface background */
--surface-hover: #161A1E;         /* Hover state for surfaces */
--border: rgba(255, 255, 255, 0.06); /* Subtle borders */

--text-primary: #E6EDF3;          /* Primary text */
--text-secondary: #9BA4B4;        /* Secondary text */
--text-muted: #6C717A;            /* Muted/disabled text */

--green: #21C77A;                 /* Positive values */
--red: #D9534F;                   /* Negative values */

--glow-dark: #0B3A2E;             /* Dark glow accent */
--glow-bright: #23F39B;           /* Bright glow accent */
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

## 🧩 Components

### Navbar
- **Class**: `.navbar-wrapper`, `.navbar-container`, `.navbar-pill`
- **Features**: Fixed positioning, glassmorphism effect, scrolled state
- **Responsive**: Hides pill navigation on mobile, shows hamburger menu

### Hero Section
- **Class**: `.hero`, `.hero-container`, `.hero-content`
- **Features**: Background image with overlay, centered content, CTA button
- **Responsive**: Adjusts font sizes and padding on smaller screens

### Stock Cards
- **Class**: `.stock-card`
- **Features**: Hover lift effect, color-coded changes, arrow indicators
- **Layout**: CSS Grid with auto-fill for responsiveness

### Market Overview
- **Class**: `.market-item`, `.sparkline`
- **Features**: Sparkline charts (canvas-based), clean dividers
- **Responsive**: Stacks sparkline and data on mobile

### Tables
- **Class**: `.data-table`
- **Features**: Hover row highlighting, color-coded values
- **Responsive**: Reduces font size and padding on mobile

### Buttons
- **Primary CTA**: `.hero-cta-btn`
  - Green background with shadow
  - Lift animation on hover
  - Active state feedback

---

## 🔄 Recent Updates

### Session 1: Hero Background Implementation
**Date**: December 1, 2025

1. **Applied hero background image**
   - Added `hero-bg.png` as the background for the entire hero section
   - Implemented dark gradient overlay for text readability
   - Used `background-size: cover` for full coverage

2. **Centered hero content**
   - Removed the two-column layout (content + visual)
   - Centered all hero content (title, subtitle, CTA)
   - Increased max-width to 800px for better readability

3. **Replaced search bar with CTA button**
   - Removed the search input and button
   - Added "Compare Stocks Now" CTA button
   - Styled with premium hover effects and animations
   - Button ready to link to compare page

4. **Updated responsive styles**
   - Removed references to old `.hero-visual` and `.hero-search`
   - Ensured centered layout works on all screen sizes
   - Optimized font sizes for mobile (56px → 42px → 28px)

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Running Locally

1. **Clone or download** the project files

2. **Open in browser**:
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using Python's built-in server
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   
   # Option 3: Using Node.js http-server
   npx http-server
   ```

3. **View the site** at the provided URL

### File Organization
- Keep all SVG logos in the root directory
- Place images (like `hero-bg.png`) in the root or create an `/assets` folder
- CSS and JS files are linked in the `<head>` section

---

## 🔮 Future Enhancements

### Planned Features

1. **Compare Page**
   - Side-by-side stock comparison
   - Interactive charts
   - Historical data visualization

2. **Search Functionality**
   - Real-time stock symbol search
   - Autocomplete suggestions
   - Recent searches

3. **Interactive Charts**
   - Candlestick charts
   - Time range filters (1D, 1W, 1M, 3M, 6M, 1Y)
   - Buy/Sell markers

4. **User Authentication**
   - Login/signup functionality
   - Personalized watchlists
   - Portfolio tracking

5. **Real-Time Data Integration**
   - API integration (Alpha Vantage, Yahoo Finance, etc.)
   - WebSocket for live updates
   - Price alerts

6. **News Feed**
   - Stock-related news articles
   - Sentiment analysis
   - Filtering by company/sector

7. **Mobile App**
   - Progressive Web App (PWA) support
   - Native mobile apps (iOS/Android)

### Technical Improvements

- [ ] Add CSS animations library (GSAP or Framer Motion)
- [ ] Implement lazy loading for images
- [ ] Add service worker for offline support
- [ ] Optimize performance (Lighthouse score 90+)
- [ ] Add unit tests for JavaScript functions
- [ ] Implement dark/light mode toggle
- [ ] Add accessibility improvements (ARIA labels, keyboard navigation)

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
   - Proper use of `<header>`, `<section>`, `<footer>`
   - Accessibility considerations
   - SEO-friendly structure

2. **Advanced CSS**
   - CSS Variables for theming
   - Flexbox and Grid layouts
   - Responsive design with media queries
   - Transitions and animations
   - Glassmorphism effects

3. **JavaScript**
   - Canvas API for sparklines
   - DOM manipulation
   - Event handling

4. **Design Principles**
   - Color theory and contrast
   - Typography hierarchy
   - Spacing and rhythm
   - Visual feedback (hover states, animations)

5. **Responsive Web Design**
   - Mobile-first approach
   - Breakpoints at 1024px, 768px, 480px
   - Flexible layouts

---

## 📝 Notes

- **Font Loading**: The project uses Google Fonts (Inter). Ensure internet connection for proper font rendering.
- **Images**: The `hero-bg.png` should be optimized for web (recommended: WebP format, < 500KB).
- **JavaScript**: The `script.js` file handles sparkline rendering using the Canvas API.

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
- **Design Inspiration**: Modern fintech dashboards (Robinhood, Webull, TradingView)
- **Color Palette**: Inspired by GitHub's dark theme and modern fintech apps

---

**Last Updated**: December 1, 2025  
**Version**: 1.0.0
