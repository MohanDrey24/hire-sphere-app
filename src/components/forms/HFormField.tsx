import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
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

export default function HFormField({ 
  control, 
  name, 
  type = 'text', 
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
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onClick={onClick}
              autoComplete="off"
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}