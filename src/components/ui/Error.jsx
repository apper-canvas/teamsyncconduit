import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md mx-auto bg-gradient-to-br from-red-50 to-white border-red-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full w-fit">
            <ApperIcon name="AlertCircle" size={24} className="text-white" />
          </div>
          <CardTitle className="text-red-800">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{message}</p>
          <p className="text-sm text-gray-500">
            Please try again or contact support if the problem persists.
          </p>
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;