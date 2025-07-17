import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
});

Select.displayName = "Select";

export default Select;