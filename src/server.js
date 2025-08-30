const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CountryDeepLens API',
      version: '1.0.0',
      description: 'A comprehensive REST API for country data with advanced filtering and search capabilities',
      contact: {
        name: 'CountryDeepLens API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Country: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Country name',
            },
            code: {
              type: 'string',
              description: 'ISO 3166-1 alpha-2 country code',
            },
            capital: {
              type: 'string',
              description: 'Capital city',
            },
            population: {
              type: 'integer',
              description: 'Population count',
            },
            area: {
              type: 'integer',
              description: 'Area in square kilometers',
            },
            region: {
              type: 'string',
              description: 'Continental region',
            },
            subregion: {
              type: 'string',
              description: 'Subregion',
            },
            languages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Official languages',
            },
            currencies: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Currency codes',
            },
            flag: {
              type: 'string',
              description: 'Country flag emoji',
            },
            independent: {
              type: 'boolean',
              description: 'Whether the country is independent',
            },
            timezones: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Time zones',
            },
            borders: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Bordering countries (ISO codes)',
            },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: 'Total number of results',
            },
            page: {
              type: 'integer',
              description: 'Current page number',
            },
            limit: {
              type: 'integer',
              description: 'Results per page',
            },
            pages: {
              type: 'integer',
              description: 'Total number of pages',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api/countries', require('./routes/countries'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CountryDeepLens API is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CountryDeepLens API',
    version: '1.0.0',
    documentation: `/api-docs`,
    endpoints: {
      countries: '/api/countries',
      countryByCode: '/api/countries/{code}',
      countriesByRegion: '/api/countries/region/{region}',
      countriesByLanguage: '/api/countries/language/{language}',
      countriesByCurrency: '/api/countries/currency/{currency}',
      statistics: '/api/countries/stats',
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/countries',
      'GET /api/countries/{code}',
      'GET /api/countries/region/{region}',
      'GET /api/countries/language/{language}',
      'GET /api/countries/currency/{currency}',
      'GET /api/countries/stats',
      'GET /api-docs',
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CountryDeepLens API is running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
