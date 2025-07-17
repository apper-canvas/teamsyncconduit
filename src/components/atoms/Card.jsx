import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-6 pb-4", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold text-gray-900 gradient-text",
        className
      )}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

const CardContent = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
});

CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };