const fs = require('fs');
const path = require('path');

// Load countries data
const countriesDataPath = path.join(__dirname, '../data/countries.json');
let countries = [];

try {
  const data = fs.readFileSync(countriesDataPath, 'utf8');
  countries = JSON.parse(data);
} catch (error) {
  console.error('Error loading countries data:', error);
}

// Get all countries with optional filtering
const getCountries = (req, res) => {
  try {
    let filteredCountries = [...countries];

    // Extract query parameters
    const {
      region,
      subregion,
      language,
      currency,
      population_gt,
      population_lt,
      area_gt,
      area_lt,
      search,
      limit = 10,
      page = 1,
      sort,
      order = 'asc'
    } = req.query;

    // Filter by region
    if (region) {
      filteredCountries = filteredCountries.filter(country =>
        country.region.toLowerCase() === region.toLowerCase()
      );
    }

    // Filter by subregion
    if (subregion) {
      filteredCountries = filteredCountries.filter(country =>
        country.subregion.toLowerCase() === subregion.toLowerCase()
      );
    }

    // Filter by language
    if (language) {
      filteredCountries = filteredCountries.filter(country =>
        country.languages.some(lang =>
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    }

    // Filter by currency
    if (currency) {
      filteredCountries = filteredCountries.filter(country =>
        country.currencies.some(curr =>
          curr.toLowerCase() === currency.toLowerCase()
        )
      );
    }

    // Filter by population greater than
    if (population_gt) {
      const minPop = parseInt(population_gt);
      if (!isNaN(minPop)) {
        filteredCountries = filteredCountries.filter(country =>
          country.population > minPop
        );
      }
    }

    // Filter by population less than
    if (population_lt) {
      const maxPop = parseInt(population_lt);
      if (!isNaN(maxPop)) {
        filteredCountries = filteredCountries.filter(country =>
          country.population < maxPop
        );
      }
    }

    // Filter by area greater than
    if (area_gt) {
      const minArea = parseInt(area_gt);
      if (!isNaN(minArea)) {
        filteredCountries = filteredCountries.filter(country =>
          country.area > minArea
        );
      }
    }

    // Filter by area less than
    if (area_lt) {
      const maxArea = parseInt(area_lt);
      if (!isNaN(maxArea)) {
        filteredCountries = filteredCountries.filter(country =>
          country.area < maxArea
        );
      }
    }

    // Search by country name
    if (search) {
      filteredCountries = filteredCountries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sort) {
      filteredCountries.sort((a, b) => {
        let aValue = a[sort];
        let bValue = b[sort];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (order === 'desc') {
          return aValue < bValue ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });
    }

    // Pagination
    const total = filteredCountries.length;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedCountries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      },
      filters: {
        region,
        subregion,
        language,
        currency,
        population_gt,
        population_lt,
        area_gt,
        area_lt,
        search
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get single country by code
const getCountryByCode = (req, res) => {
  try {
    const { code } = req.params;
    const country = countries.find(c =>
      c.code.toLowerCase() === code.toLowerCase()
    );

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    res.json({
      success: true,
      data: country
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get countries by region
const getCountriesByRegion = (req, res) => {
  try {
    const { region } = req.params;
    const filteredCountries = countries.filter(country =>
      country.region.toLowerCase() === region.toLowerCase()
    );

    res.json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get countries by language
const getCountriesByLanguage = (req, res) => {
  try {
    const { language } = req.params;
    const filteredCountries = countries.filter(country =>
      country.languages.some(lang =>
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );

    res.json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get countries by currency
const getCountriesByCurrency = (req, res) => {
  try {
    const { currency } = req.params;
    const filteredCountries = countries.filter(country =>
      country.currencies.some(curr =>
        curr.toLowerCase() === currency.toLowerCase()
      )
    );

    res.json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get statistics
const getStatistics = (req, res) => {
  try {
    const totalCountries = countries.length;
    const regions = [...new Set(countries.map(c => c.region))];
    const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
    const totalArea = countries.reduce((sum, c) => sum + c.area, 0);
    const averagePopulation = Math.round(totalPopulation / totalCountries);
    const averageArea = Math.round(totalArea / totalCountries);

    const regionStats = regions.map(region => {
      const regionCountries = countries.filter(c => c.region === region);
      return {
        region,
        count: regionCountries.length,
        totalPopulation: regionCountries.reduce((sum, c) => sum + c.population, 0),
        totalArea: regionCountries.reduce((sum, c) => sum + c.area, 0)
      };
    });

    res.json({
      success: true,
      data: {
        totalCountries,
        regions: regions.length,
        totalPopulation,
        totalArea,
        averagePopulation,
        averageArea,
        regionStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getCountries,
  getCountryByCode,
  getCountriesByRegion,
  getCountriesByLanguage,
  getCountriesByCurrency,
  getStatistics
};
