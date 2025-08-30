const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Mock the countries data
jest.mock('../src/data/countries.json', () => [
  {
    name: 'Test Country',
    code: 'TC',
    capital: 'Test City',
    population: 1000000,
    area: 100000,
    region: 'Test Region',
    languages: ['English'],
    currencies: ['TST'],
    flag: '🏁'
  }
]);

const countriesController = require('../src/controllers/countriesController');

describe('Countries Controller', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(cors());
    app.use(express.json());

    // Mock routes for testing
    app.get('/api/countries', countriesController.getAllCountries);
    app.get('/api/countries/:code', countriesController.getCountryByCode);
    app.get('/api/countries/stats', countriesController.getStats);
  });

  describe('GET /api/countries', () => {
    it('should return all countries', async () => {
      const response = await request(app)
        .get('/api/countries')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should support search parameter', async () => {
      const response = await request(app)
        .get('/api/countries?search=test')
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should support region filter', async () => {
      const response = await request(app)
        .get('/api/countries?region=Test Region')
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/countries?page=1&limit=10')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.pagination).toBeDefined();
    });
  });

  describe('GET /api/countries/:code', () => {
    it('should return a country by code', async () => {
      const response = await request(app)
        .get('/api/countries/TC')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.code).toBe('TC');
    });

    it('should return 404 for non-existent country', async () => {
      const response = await request(app)
        .get('/api/countries/XX')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/countries/stats', () => {
    it('should return statistics', async () => {
      const response = await request(app)
        .get('/api/countries/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });
});
