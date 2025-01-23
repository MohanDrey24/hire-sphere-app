import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProfileFieldProps {
  value?: string;
  label: string;
  isEditing: boolean;
  name: string;
  className?: string;
}

export default function ProfileField({
  value,
  label,
  isEditing,
  name,
  className,
}: ProfileFieldProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <span className="text-md text-gray-700">{label}</span>
      <Input
        className="w-full focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1"
        name={name}
        disabled={!isEditing}
        value={value}
      />
    </div>
  );
}
