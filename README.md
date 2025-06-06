# FreePay POS Website

The world's only fee-free, open-source POS terminal website. Built to showcase wallet compatibility and encourage adoption of FreePay POS.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm 6+ (for development server)
- Modern web browser

### Development Setup

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd freepay-pos-website
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   This will:
   - Install live-server if needed
   - Start a local server on port 3000
   - Automatically open the website in your browser
   - Enable live reload for development

### Alternative Serving Methods

```bash
# Using http-server (simpler, no live reload)
npm run serve

# Using live-server with manual browser opening
npm run dev
```

## 📁 Project Structure

```
freepay-pos-website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Complete stylesheet with responsive design
├── js/
│   └── main.js            # JavaScript for interactivity and data loading
├── data/
│   └── wallets.json       # Wallet compatibility data
├── package.json           # Node.js dependencies and scripts
├── README.md             # This file
└── plan.md               # Detailed project plan and specifications
```

## 🎨 Features

### ✅ Currently Implemented
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dynamic Wallet Compatibility**: JSON-based data with color-coded status
- **Interactive Search & Filter**: Real-time wallet table filtering
- **Smooth Navigation**: Fixed navbar with smooth scrolling
- **Contact Form**: Validation and user feedback
- **Professional Design**: Modern UI with consistent branding

### 🎯 Key Sections
1. **Hero Section**: Clear value proposition and call-to-action
2. **Wallet Compatibility**: Dynamic table with search/filter capabilities
3. **Features**: Showcase of FreePay POS benefits
4. **Getting Started**: Step-by-step setup guide
5. **Developers**: Contribution and API information
6. **Contact**: Form for wallet developers and partnerships

## 📊 Wallet Compatibility Status

The website displays real-time compatibility information for digital wallets:

- 🟢 **Light Green**: Works with FreePay app
- 🟢 **Dark Green**: Works natively (future state)
- 🟡 **Yellow**: Has known issues
- 🔴 **Red**: Doesn't work currently

Current wallet statuses are maintained in `data/wallets.json`.

## 🛠️ Development

### Adding New Wallets
1. Edit `data/wallets.json`
2. Add wallet object with required fields:
   ```json
   {
     "name": "Wallet Name",
     "status": "compatible|issues|incompatible|native",
     "description": "Current status description",
     "lastTested": "YYYY-MM",
     "issues": ["Array of specific issues"]
   }
   ```

### Updating Styles
- All styles are in `css/styles.css`
- Mobile-first responsive design
- CSS custom properties for consistent theming
- BEM-like naming conventions

### JavaScript Features
- Vanilla JavaScript (no framework dependencies)
- Modular function organization
- Error handling and fallbacks
- Performance optimizations

## 🚀 Deployment

This is a static website that can be deployed to any web server:

```bash
# Build/prepare for deployment (currently just copies files)
npm run build

# Deploy to your hosting service
npm run deploy
```

### Recommended Hosting
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## 🎯 Design System

### Color Palette
- **Primary**: #2563eb (Professional blue)
- **Compatible**: #22c55e (Light green)
- **Native**: #166534 (Dark green)
- **Issues**: #eab308 (Yellow)
- **Incompatible**: #dc2626 (Red)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 600 weight
- **Body**: 400 weight
- **Mobile-optimized**: Responsive font sizes

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across devices
5. Submit a pull request

### Code Standards
- Semantic HTML5
- Mobile-first CSS
- Vanilla JavaScript
- Progressive enhancement
- Accessibility considerations

## 📄 License

MIT License - Feel free to use and modify for your projects.

## 🔗 Links

- **GitHub Repository**: (Add when available)
- **Live Site**: (Add when deployed)
- **Issue Tracker**: (Add when available)
- **Documentation**: See `plan.md` for detailed specifications

---

**FreePay POS** - Making digital payments accessible and fee-free for everyone. 