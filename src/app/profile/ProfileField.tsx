import { Input } from "@/components/ui/input";

interface ProfileFieldProps {
  value?: string;
  label: string;
  isEditing: boolean;
  name: string;
}

export default function ProfileField ({ value, label, isEditing, name }: ProfileFieldProps) {
  return (
    <div className="*:text-2xl gap-2">
      <span className="text-gray-700">{label}:</span>
      <Input
        className="max-w-xs"
        name={name}
        disabled={!isEditing}
        value={value}
      />
    </div>
  );
}