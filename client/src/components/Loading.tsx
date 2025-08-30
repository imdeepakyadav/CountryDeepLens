export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="loading-spinner"></div>
      <p className="text-gray-600 mt-4">Loading countries...</p>
    </div>
  )
}

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-8 bg-gray-200 rounded-sm"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <div className="h-3 bg-gray-200 rounded flex-1"></div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-1">
                <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                <div className="h-6 bg-gray-200 rounded-md w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
