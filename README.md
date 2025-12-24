# StockSpectra 📈

> A premium fintech dashboard for real-time stock tracking, comparison, and market analysis with a sleek dark-mode interface.

![StockSpectra](https://img.shields.io/badge/version-2.1.0-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Real-Time Data** - Live stock prices via Finnhub API with smart caching
- **Stock Comparison** - Side-by-side analysis with interactive charts
- **Market Dashboard** - Bloomberg-style heatmap with sentiment indicators
- **News Feed** - Editorial layout with ticker tape and categorized articles
- **Premium UI** - Dark glassmorphism design with neon accents
- **Fully Responsive** - Optimized for desktop, tablet, and mobile

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sehtaj/StockSpectra.git
   cd StockSpectra
   ```

2. **Set up API key** (optional - works without it)
   ```bash
   cp js/api-config.example.js js/api-config.js
   # Edit js/api-config.js and add your Finnhub API key
   ```

3. **Run local server**
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

## 📱 Pages

| Page | Description |
|------|-------------|
| **Home** | Dashboard with trending stocks and market overview |
| **Compare** | Side-by-side stock comparison with charts |
| **Stocks** | Browse all stocks with search and filters |
| **Markets** | Heatmap dashboard with indices and sentiment |
| **News** | Editorial news feed with ticker tape |
| **About** | Brand story and platform features |

## 🎨 Design System

- **Colors**: Dark theme (#0F1215) with emerald accent (#23F39B)
- **Typography**: Inter font family (Google Fonts)
- **Effects**: Glassmorphism, neon glows, asymmetric layouts
- **Inspiration**: Bloomberg Terminal, TradingView, Robinhood

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js, Canvas API for sparklines
- **API**: Finnhub (real-time stock data)
- **Design**: Glassmorphism, CSS Grid, Flexbox

## 📂 Project Structure

```
StockSpectra/
├── index.html              # Homepage
├── compare.html            # Stock comparison
├── stocks.html             # Stocks list
├── markets.html            # Market dashboard
├── news.html               # News feed
├── about.html              # About page
├── css/                    # Stylesheets
├── js/                     # JavaScript modules
└── assets/                 # Images and icons
```

## 🔑 API Setup

Get a free API key from [Finnhub.io](https://finnhub.io/register):
- 60 calls/minute on free tier
- Real-time quotes, company profiles, and news
- App works with mock data if no API key provided

## 🌟 Key Highlights

- **No frameworks** - Pure vanilla JavaScript for maximum performance
- **Smart caching** - Reduces API calls by 80%+
- **Editorial design** - No generic card grids, Bloomberg-inspired layouts
- **Accessibility** - Semantic HTML, keyboard navigation
- **SEO optimized** - Proper meta tags and structure

## 📸 Screenshots

*Premium dark-mode interface with real-time data visualization*

## 🎓 Learning Outcomes

This project demonstrates:
- Advanced CSS (Grid, Flexbox, animations, glassmorphism)
- Canvas API for custom visualizations
- API integration with caching strategies
- Responsive design principles
- Modern fintech UI/UX patterns

## 👨‍💻 Author

**Sehtaj Singh**  
Lovely Professional University - Semester 3  
Web Development Project

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Design inspiration: Bloomberg Terminal, TradingView, Robinhood
- Font: Inter by Rasmus Andersson
- Charts: Chart.js library
- API: Finnhub.io

---

**Last Updated**: December 2025 | **Status**: ✅ Live with Real-Time API Integration
