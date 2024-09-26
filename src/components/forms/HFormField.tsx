import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { MouseEventHandler } from "react";

interface HFormFieldProps {
  control: Control<any>;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export default function HFormField({ onClick, control, name, type = 'text', placeholder, label, disabled = false, className }: HFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              label={label}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onClick={onClick}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}