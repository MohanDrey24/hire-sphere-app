import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useFormField,
} from "../ui/form";
import { MouseEventHandler } from "react";
import { FloatingLabelInput } from "../ui/floating-label-input";

interface HFormFieldProps {
  control: Control<any>;
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
  const { invalid } = useFormField();

  console.log(invalid);

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
