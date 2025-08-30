import { MapPin, Users, Globe, DollarSign } from 'lucide-react'

interface Country {
  name: string
  code: string
  capital: string
  population: number
  area: number
  region: string
  subregion: string
  languages: string[]
  currencies: string[]
  flag: string
  independent: boolean
  timezones: string[]
  borders: string[]
}

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  // Function to get flag image URL
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`
  }

  return (
    <div className="card group">
      <div className="p-6">
        {/* Flag and Name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 rounded-sm overflow-hidden shadow-sm border border-gray-200">
              <img
                src={getFlagUrl(country.code)}
                alt={`${country.name} flag`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="text-2xl">${country.flag}</span>`
                  }
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {country.name}
              </h3>
              <p className="text-sm text-gray-500">{country.code}</p>
            </div>
          </div>
        </div>

        {/* Country Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">{country.capital}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formatNumber(country.population)} people</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Globe className="h-4 w-4 mr-2 text-gray-400" />
            <span>{country.region}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span>{country.currencies.join(', ')}</span>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {country.languages.slice(0, 2).map((language) => (
              <span
                key={language}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
              >
                {language}
              </span>
            ))}
            {country.languages.length > 2 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                +{country.languages.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
