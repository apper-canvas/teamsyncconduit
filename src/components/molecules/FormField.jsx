import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ label, type = "text", error, className, children, ...props }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
{type === "select" ? (
        <Select {...props}>
          {children}
        </Select>
      ) : type === "textarea" ? (
        <textarea
          className="flex min-h-[80px] w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-y"
          {...props}
        />
      ) : type === "range" ? (
        <div className="space-y-2">
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            {...props}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{props.min || 0}</span>
            <span className="font-medium text-primary">{props.value || 0}</span>
            <span>{props.max || 100}</span>
          </div>
        </div>
) : type === "checkbox" ? (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-primary bg-white border-2 border-gray-300 rounded focus:ring-primary focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
            {...props}
          />
        </div>
      ) : (
        <Input type={type} {...props} />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;