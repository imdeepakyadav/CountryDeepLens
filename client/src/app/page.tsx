"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Globe,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CountryCard } from "../components/CountryCard";
import { LoadingGrid } from "../components/Loading";

interface Country {
  name: string;
  code: string;
  capital: string;
  population: number;
  area: number;
  region: string;
  subregion: string;
  languages: string[];
  currencies: string[];
  flag: string;
  independent: boolean;
  timezones: string[];
  borders: string[];
}

interface ApiResponse {
  success: boolean;
  data: Country[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  filters: any;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const regions = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "Arabic",
    "Chinese",
    "Hindi",
    "Portuguese",
    "Russian",
    "German",
    "Japanese",
  ];

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, selectedRegion, selectedLanguage, sortBy, currentPage]);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedRegion) params.append("region", selectedRegion);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (sortBy) params.append("sort", sortBy);
      params.append("page", currentPage.toString());
      params.append("limit", "12");

      const response = await fetch(`/api/countries?${params}`);
      const data: ApiResponse = await response.json();

      if (data.success) {
        setCountries(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedRegion("");
    setSelectedLanguage("");
    setSortBy("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  CountryDeepLens
                </h1>
                <p className="text-sm text-gray-500">Explore the world</p>
              </div>
            </div>
            <a
              href="http://localhost:3000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              API Docs
            </a>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="select-field"
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="select-field"
                  >
                    <option value="">All Languages</option>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Default</option>
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                    <option value="area">Area</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <button
                  onClick={clearAllFilters}
                  className="btn-secondary w-full inline-flex items-center justify-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Countries</h2>
            <p className="text-gray-600 mt-1">
              {loading
                ? "Loading..."
                : `Showing ${countries.length} of ${pagination.total} countries`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingGrid />}

        {/* Countries Grid */}
        {!loading && (
          <>
            {countries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
                {countries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No countries found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex">
                    {Array.from(
                      { length: Math.min(5, pagination.pages) },
                      (_, i) => {
                        const pageNum =
                          Math.max(
                            1,
                            Math.min(pagination.pages - 4, currentPage - 2)
                          ) + i;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "border border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Mobile pagination */}
                  <div className="sm:hidden">
                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                      {currentPage} / {pagination.pages}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.min(pagination.pages, currentPage + 1)
                      )
                    }
                    disabled={currentPage === pagination.pages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
