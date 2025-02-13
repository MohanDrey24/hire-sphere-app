import { MouseEventHandler } from "react";
import { Control, FieldValues } from "react-hook-form";

import { FloatingLabelInput } from "../ui/floating-label-input";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface HFormFieldProps {
  control: Control<FieldValues, any>;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export default function HFormField({
  control,
  name,
  type = "text",
  placeholder,
  label,
  disabled = false,
  className,
  onClick,
}: HFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FloatingLabelInput
              {...field}
              label={label}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onClick={onClick}
              className={className}
              required
              formNoValidate
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
