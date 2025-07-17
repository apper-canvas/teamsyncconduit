import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  message = "Get started by adding your first item.",
  actionLabel = "Add Item",
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary to-secondary rounded-full w-fit">
            <ApperIcon name={icon} size={24} className="text-white" />
          </div>
          <CardTitle className="text-blue-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{message}</p>
          {onAction && (
            <Button onClick={onAction} className="w-full">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              {actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Empty;