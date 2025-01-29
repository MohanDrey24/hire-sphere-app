import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, type = "text", label, error, required, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "peer w-full rounded-md border-2 px-4 py-3 text-gray-900",
          "border-gray-200 bg-transparent transition-colors",
          "placeholder-transparent focus:border-blue-500 focus:outline-hidden",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id}-error` : undefined}
        ref={ref}
        autoComplete="off"
        {...props}
      />

      <label
        className={cn(
          "absolute left-3 -translate-y-1/2 bg-white px-1 text-sm transition-all duration-200",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500",
          "peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500",
          (isFocused || hasValue) && "top-0 text-sm",
          !isFocused && !hasValue && "top-1/2",
          error && "text-red-500 peer-focus:text-red-500",
        )}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
