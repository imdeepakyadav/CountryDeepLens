"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Globe,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
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
    <div className="min-h-screen gradient-bg">
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg floating-animation">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  CountryDeepLens
                </h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  Discover the world's beauty
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>{pagination.total} countries explored</span>
              </div>
              <a
                href="http://localhost:5000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                API Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <input
                type="text"
                placeholder="Search countries, capitals, regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field text-lg font-medium shadow-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Region
                </label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="select-field font-medium"
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

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Language
                </label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="select-field font-medium"
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

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Sort by
                </label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select-field font-medium"
                  >
                    <option value="">Default</option>
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                    <option value="area">Area</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground opacity-0">
                  Clear
                </label>
                <button
                  onClick={clearAllFilters}
                  className="btn-outline w-full inline-flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Explore Countries
            </h2>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              {loading
                ? "Loading amazing destinations..."
                : `Discover ${countries.length} of ${pagination.total} incredible places`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingGrid />}

        {/* Countries Grid */}
        {!loading && (
          <>
            {countries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {countries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            ) : (
              /* Enhanced empty state with better visual design */
              <div className="text-center py-20">
                <div className="relative inline-block mb-6">
                  <Globe className="h-24 w-24 text-muted-foreground/30 mx-auto floating-animation" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full pulse-glow"></div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  No countries found
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Try adjusting your search or filters to discover more places
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}

            {pagination.pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 glass-effect rounded-2xl">
                <div className="text-muted-foreground font-medium">
                  Page {pagination.page} of {pagination.pages}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:border-border disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex gap-1">
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
                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                              currentPage === pageNum
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "border-2 border-border hover:border-primary hover:bg-primary/10"
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
                    <span className="px-4 py-2 text-sm font-semibold text-foreground">
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
                    className="p-3 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:border-border disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="h-5 w-5" />
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
