import { Card, CardHeader, CardContent } from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
        <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-lg shimmer"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer mb-2"></div>
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table skeleton */}
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                  <div className="h-3 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                </div>
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;