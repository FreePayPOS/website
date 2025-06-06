# FreePay Website

The world's only fee-free, open-source point of sale device. View wallet compatibility and get started with digital payments.

## 🚀 Quick Start

```bash
npm start
```

Installs live-server, starts development server on port 3200, and opens in your browser with live reload.

## 📁 Structure

```
├── index.html          # Main page
├── css/styles.css      # Responsive styles
├── js/main.js         # Interactive features
├── data/wallets.json  # Wallet compatibility data
├── package.json       # Dev dependencies
└── site.webmanifest   # PWA config
```

## 🎯 Features

- **Responsive Design**: Mobile-first, works everywhere
- **Dynamic Wallet Table**: Search, filter, sort, CSV export
- **Performance Optimized**: Core Web Vitals monitoring, preloading
- **SEO Ready**: Open Graph, Twitter Cards, structured data
- **Accessible**: WCAG 2.1 AA compliant, screen reader friendly
- **PWA Ready**: Web manifest for app-like experience

## 📊 Wallet Status System

- 🟢 **Light Green**: Compatible with FreePay
- 🟢 **Dark Green**: Works natively (future)
- 🟡 **Yellow**: Has known issues  
- 🔴 **Red**: Currently incompatible

## 🛠️ Development

### Add New Wallet
Edit `data/wallets.json`:
```json
{
  "name": "Wallet Name",
  "status": "compatible|issues|incompatible|native",
  "description": "Status description",
  "lastTested": "2024-01",
  "issues": ["Issue 1", "Issue 2"]
}
```

### Deploy
Any static hosting works - GitHub Pages, Netlify, Vercel, etc.

## 📱 Recent Updates

- Enhanced search with 300ms debouncing
- CSV export functionality
- Performance monitoring
- Card fees impact section for small businesses
- SEO and accessibility improvements
- PWA capabilities

---

**FreePay** - Making digital payments accessible and fee-free for everyone. 