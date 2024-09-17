import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface HFormFieldProps {
  control: Control<any>;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export default function HFormField({ control, name, type = 'text', placeholder, label }: HFormFieldProps) {
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
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}