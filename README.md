# 🌍 CountryDeepLens

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

A comprehensive REST API for country data with advanced filtering, search, and pagination capabilities, bundled with a beautiful Next.js GUI for easy exploration.

## ✨ Features

- 🌍 **Complete Country Dataset**: 20+ countries with detailed information
- 🔍 **Advanced Filtering**: Filter by region, language, currency, population, area
- 📊 **Statistical Endpoints**: Analytics and insights
- 📄 **Pagination Support**: Customizable limits and navigation
- 🔎 **Full-Text Search**: Search by country name
- 📚 **Interactive API Docs**: Swagger UI documentation
- 🎨 **Modern GUI**: Responsive Next.js frontend with Tailwind CSS
- 🚀 **Production Ready**: Error handling and CORS support
- 📱 **Mobile Friendly**: Optimized for all devices
- ⚡ **Fast Performance**: Optimized loading and caching

## 📁 Project Structure

```
CountryDeepLens/
├── src/                          # API Backend
│   ├── controllers/
│   │   └── countriesController.js
│   ├── routes/
│   │   └── countries.js
│   ├── data/
│   │   └── countries.json
│   └── server.js
├── client/                       # Next.js Frontend
│   ├── src/
│   │   └── app/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── globals.css
│   │   └── components/
│   │       ├── CountryCard.tsx
│   │       └── Loading.tsx
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docs/                         # Documentation
├── .env                          # Environment variables
├── package.json                  # API dependencies
├── start.bat/.sh                 # Quick start scripts
└── README.md
```

## � Quick Start

### Prerequisites

- **Node.js** (>= 14.0.0)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/imdeepakyadav/countrydeeplens.git
   cd countrydeeplens
   ```

2. **Install API dependencies**

   ```bash
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start the development servers**

   **Option A: Manual Start**

   ```bash
   # Terminal 1: Start API server
   npm run dev

   # Terminal 2: Start client
   cd client && npm run dev
   ```

   **Option B: Quick Start (Windows)**

   ```bash
   # Run the batch file to start everything
   start.bat
   ```

   **Option C: Quick Start (Linux/Mac)**

   ```bash
   # Make script executable and run
   chmod +x start.sh
   ./start.sh
   ```

5. **Open your browser**
   - **GUI**: http://localhost:3001
   - **API**: http://localhost:3000
   - **API Documentation**: http://localhost:3000/api-docs

## 🌐 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Core Endpoints

#### Get All Countries

```http
GET /api/countries
```

**Query Parameters:**

- `region` - Filter by region (Asia, Europe, Africa, Americas, Oceania)
- `subregion` - Filter by subregion
- `language` - Filter by language
- `currency` - Filter by currency code
- `population_gt` - Population greater than
- `population_lt` - Population less than
- `area_gt` - Area greater than (km²)
- `area_lt` - Area less than (km²)
- `search` - Search by country name
- `limit` - Results per page (default: 10)
- `page` - Page number (default: 1)
- `sort` - Sort by field (name, population, area)
- `order` - Sort order (asc, desc)

**Example Requests:**

```bash
# Get all countries
GET /api/countries

# Filter by region
GET /api/countries?region=Asia

# Search by name
GET /api/countries?search=india

# Filter by population
GET /api/countries?population_gt=100000000

# Paginated results
GET /api/countries?page=2&limit=5

# Sort by population
GET /api/countries?sort=population&order=desc

# Combined filters
GET /api/countries?region=Europe&language=English&sort=name
```

#### Get Country by Code

```http
GET /api/countries/{code}
```

**Example:**

```bash
GET /api/countries/IN
GET /api/countries/us
```

#### Get Countries by Region

```http
GET /api/countries/region/{region}
```

**Example:**

```bash
GET /api/countries/region/Asia
```

#### Get Countries by Language

```http
GET /api/countries/language/{language}
```

**Example:**

```bash
GET /api/countries/language/English
```

#### Get Countries by Currency

```http
GET /api/countries/currency/{currency}
```

**Example:**

```bash
GET /api/countries/currency/USD
```

#### Get Statistics

```http
GET /api/countries/stats
```

Returns comprehensive statistics about the country dataset.

### Response Format

#### Success Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "pages": 2
  },
  "filters": {
    "region": "Asia",
    "search": null
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Country not found"
}
```

## 🎨 GUI Features

The Next.js client provides:

- **🔍 Interactive Search**: Real-time search as you type
- **🎯 Advanced Filters**: Filter by region, language, and more
- **📊 Sorting Options**: Sort by name, population, or area
- **📄 Pagination**: Navigate through results efficiently
- **📱 Responsive Design**: Works perfectly on all devices
- **🏳️ Flag Display**: High-quality country flag images
- **💳 Country Cards**: Beautiful cards displaying key information
- **🔗 Direct API Access**: Link to Swagger documentation

## 📊 Country Data Structure

Each country object contains:

```json
{
  "name": "India",
  "code": "IN",
  "capital": "New Delhi",
  "population": 1380004385,
  "area": 3287590,
  "region": "Asia",
  "subregion": "Southern Asia",
  "languages": ["Hindi", "English"],
  "currencies": ["INR"],
  "flag": "🇮🇳",
  "independent": true,
  "timezones": ["UTC+05:30"],
  "borders": ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"]
}
```

## �️ Development

### Available Scripts

#### API Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (not implemented yet)
```

#### Client Scripts

```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## 📚 API Documentation

Interactive API documentation is available at `/api-docs` when the API server is running. It includes:

- 📖 **Detailed endpoint descriptions**
- 🔄 **Request/response examples**
- 🎯 **Try-it-out functionality**
- 📋 **Schema definitions**
- 📊 **Response models**

## 🎯 Available Filters

### Regions

- 🌏 Asia, Europe, Africa, Americas, Oceania

### Languages

- 🗣️ English, Spanish, French, Arabic, Chinese, Hindi, Portuguese, Russian, German, Japanese, and many more

### Currencies

- 💰 USD, EUR, GBP, INR, JPY, CNY, and many more

## 🚀 Deployment

### API Deployment

```bash
npm run build
npm start
```

### Client Deployment

```bash
cd client
npm run build
npm start
```

### Docker Deployment (Future)

```bash
# Docker support coming soon
docker build -t countrydeeplens .
docker run -p 3000:3000 countrydeeplens
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow semantic commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🌍 **Country data** sourced from various reliable sources
- 🎨 **Built with** Express.js, Next.js, and Tailwind CSS
- 🎯 **Icons provided by** Lucide React
- 🏳️ **Flag images by** FlagCDN

## 📞 Support

- 📧 **Email**: support@countrydeeplens.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/imdeepakyadav/countrydeeplens/issues)
- 📖 **Documentation**: [API Docs](http://localhost:3000/api-docs)

## 🔄 Version History

### v1.0.0 (Current)

- ✅ Initial release
- ✅ REST API with comprehensive endpoints
- ✅ Next.js frontend with modern UI
- ✅ Advanced filtering and search
- ✅ Responsive design
- ✅ Swagger documentation

### Future Releases

- 🔄 Docker support
- 🔄 GraphQL API
- 🔄 Real-time updates
- 🔄 Country comparison feature
- 🔄 Export functionality

---

**🌍 Happy exploring with CountryDeepLens!** ✨

_Made with ❤️ for developers and data enthusiasts_
