import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface HFormFieldProps {
  control: Control<any>;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  disabled: boolean;
}

export default function HFormField({ control, name, type = 'text', placeholder, label, disabled = false }: HFormFieldProps) {
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
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}