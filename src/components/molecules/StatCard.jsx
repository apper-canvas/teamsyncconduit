import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ title, value, icon, trend, trendValue, className }) => {
  return (
    <Card className={cn("bg-gradient-to-br from-white to-gray-50", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <ApperIcon name={icon} size={20} className="text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold gradient-text">{value}</div>
          {trend && (
            <div className="flex items-center space-x-1">
              <ApperIcon
                name={trend === "up" ? "TrendingUp" : "TrendingDown"}
                size={16}
                className={trend === "up" ? "text-green-500" : "text-red-500"}
              />
              <span className={cn(
                "text-sm font-medium",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;