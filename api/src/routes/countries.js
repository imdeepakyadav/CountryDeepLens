const express = require('express');
const router = express.Router();
const {
  getCountries,
  getCountryByCode,
  getCountriesByRegion,
  getCountriesByLanguage,
  getCountriesByCurrency,
  getStatistics
} = require('../controllers/countriesController');

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries with optional filtering
 *     description: Retrieve a list of countries with support for various filters and pagination
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region (e.g., Asia, Europe, Africa, Americas, Oceania)
 *       - in: query
 *         name: subregion
 *         schema:
 *           type: string
 *         description: Filter by subregion
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: Filter by currency code
 *       - in: query
 *         name: population_gt
 *         schema:
 *           type: integer
 *         description: Filter countries with population greater than this value
 *       - in: query
 *         name: population_lt
 *         schema:
 *           type: integer
 *         description: Filter countries with population less than this value
 *       - in: query
 *         name: area_gt
 *         schema:
 *           type: integer
 *         description: Filter countries with area greater than this value (in km²)
 *       - in: query
 *         name: area_lt
 *         schema:
 *           type: integer
 *         description: Filter countries with area less than this value (in km²)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search countries by name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, population, area]
 *         description: Sort by field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Country'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 filters:
 *                   type: object
 */
router.get('/', getCountries);

/**
 * @swagger
 * /countries/{code}:
 *   get:
 *     summary: Get a country by ISO code
 *     description: Retrieve detailed information about a specific country
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: ISO 3166-1 alpha-2 country code
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Country'
 *       404:
 *         description: Country not found
 */
router.get('/:code', getCountryByCode);

/**
 * @swagger
 * /countries/region/{region}:
 *   get:
 *     summary: Get countries by region
 *     description: Retrieve all countries in a specific region
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *         description: Region name
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/region/:region', getCountriesByRegion);

/**
 * @swagger
 * /countries/language/{language}:
 *   get:
 *     summary: Get countries by language
 *     description: Retrieve all countries that speak a specific language
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *         description: Language name
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/language/:language', getCountriesByLanguage);

/**
 * @swagger
 * /countries/currency/{currency}:
 *   get:
 *     summary: Get countries by currency
 *     description: Retrieve all countries that use a specific currency
 *     parameters:
 *       - in: path
 *         name: currency
 *         required: true
 *         schema:
 *           type: string
 *         description: Currency code
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/currency/:currency', getCountriesByCurrency);

/**
 * @swagger
 * /countries/stats:
 *   get:
 *     summary: Get country statistics
 *     description: Retrieve statistical information about countries
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/stats', getStatistics);

module.exports = router;
