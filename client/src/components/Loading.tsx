import { Globe, Sparkles } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <div className="loading-spinner floating-animation"></div>
        <div className="absolute inset-0 loading-spinner opacity-30 scale-110"></div>
        <Globe className="absolute inset-0 m-auto h-4 w-4 text-primary animate-pulse" />
      </div>
      <div className="text-center">
        <p className="text-foreground font-semibold text-lg mb-2 flex items-center gap-2 justify-center">
          <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
          Discovering amazing places...
        </p>
        <p className="text-muted-foreground">
          Please wait while we explore the world
        </p>
      </div>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="relative h-24 bg-gradient-to-r from-muted via-muted/80 to-muted overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center space-x-3">
              <div className="w-12 h-8 bg-white/30 rounded-lg"></div>
              <div className="space-y-1">
                <div className="h-3 bg-white/30 rounded w-12"></div>
                <div className="h-2 bg-white/20 rounded w-16"></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="h-5 bg-muted rounded-lg w-3/4 mb-2"></div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary/30 rounded mr-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary/30 rounded mr-3"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-3 bg-muted rounded w-20"></div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-primary/30 rounded-full w-16"></div>
                <div className="h-6 bg-secondary/30 rounded-full w-20"></div>
                <div className="h-6 bg-muted/50 rounded-full w-12"></div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div className="h-2 bg-muted rounded w-20"></div>
                <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
