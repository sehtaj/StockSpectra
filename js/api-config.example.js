// ============================================
// API CONFIGURATION - FINNHUB ONLY
// ============================================
// Get your FREE API key from: https://finnhub.io/register
// 
// FREE TIER LIMITS:
// ✅ 60 API calls per MINUTE
// ✅ That's 3,600 calls per HOUR
// ✅ That's 86,400 calls per DAY
// ✅ 100% FREE FOREVER - No credit card needed!
//
// SETUP INSTRUCTIONS:
// 1. Copy this file and rename it to 'api-config.js' (remove .example)
// 2. Go to https://finnhub.io/register and get your API key
// 3. Replace 'YOUR_FINNHUB_API_KEY_HERE' below with your actual key
// 4. Save the file
// 5. The .gitignore will prevent it from being committed to GitHub

const API_CONFIG = {
    // Finnhub API (60 calls/min - FREE)
    finnhub: {
        key: 'YOUR_FINNHUB_API_KEY_HERE', // ⚠️ REPLACE THIS with your Finnhub API key
        baseUrl: 'https://finnhub.io/api/v1'
    },

    // Cache settings (reduces API calls and makes your site faster)
    cache: {
        stockQuote: 5 * 60 * 1000,           // 5 minutes
        dailyData: 24 * 60 * 60 * 1000,      // 24 hours
        companyInfo: 7 * 24 * 60 * 60 * 1000, // 7 days
        news: 6 * 60 * 60 * 1000             // 6 hours
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
