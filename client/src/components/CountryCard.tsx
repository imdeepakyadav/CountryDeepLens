import { Clock, Crown, DollarSign, Globe, MapPin, Users } from "lucide-react";

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

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Function to get flag image URL
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
  };

  const getRegionColor = (region: string) => {
    const colors = {
      Asia: "from-red-500 to-orange-500",
      Europe: "from-blue-500 to-purple-500",
      Africa: "from-green-500 to-teal-500",
      Americas: "from-yellow-500 to-red-500",
      Oceania: "from-cyan-500 to-blue-500",
    };
    return colors[region as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="card-interactive group">
      <div
        className={`relative h-24 bg-gradient-to-r ${getRegionColor(
          country.region
        )} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 left-4 flex items-center space-x-3">
          <div className="w-12 h-8 rounded-lg overflow-hidden shadow-lg border-2 border-white/50 backdrop-blur-sm">
            <img
              src={getFlagUrl(country.code) || "/placeholder.svg"}
              alt={`${country.name} flag`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-xl flex items-center justify-center h-full">${country.flag}</span>`;
                }
              }}
            />
          </div>
          <div className="text-white">
            <p className="text-xs font-medium opacity-90">{country.code}</p>
            <p className="text-sm font-semibold">{country.region}</p>
          </div>
        </div>
        {country.independent && (
          <div className="absolute top-4 right-4">
            <Crown className="h-5 w-5 text-yellow-300" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 text-balance">
            {country.name}
          </h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">{country.capital}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Population
              </span>
            </div>
            <span className="font-bold text-foreground">
              {formatNumber(country.population)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-3 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">
                Area
              </span>
            </div>
            <span className="font-bold text-foreground">
              {formatNumber(country.area)} km²
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-3 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Currency
              </span>
            </div>
            <span className="font-bold text-foreground text-right text-sm">
              {country.currencies.slice(0, 2).join(", ")}
              {country.currencies.length > 2 &&
                ` +${country.currencies.length - 2}`}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">
              Languages
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {country.languages.slice(0, 3).map((language, index) => (
              <span
                key={language}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  index === 0
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/20 text-secondary hover:bg-secondary/30"
                }`}
              >
                {language}
              </span>
            ))}
            {country.languages.length > 3 && (
              <span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                +{country.languages.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Click to explore</span>
            <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
