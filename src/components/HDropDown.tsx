import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { User } from "@/app/dashboard/types";

interface Props {
  userState: User | null;
  label: string;
  items: string[];
  onLogout?: () => void;
}

export default function HDropdown ({ userState, label, items, onLogout }: Props) {
  const getInitials = (user: User | null): string => {
    if (!user) return '';

    if (user.name?.trim()) {
      return user.name
        .trim()
        .split(' ')
        .filter(Boolean)
        .map(word => word[0]?.toUpperCase())
        .join('')
    }
    
    return (
      (user.firstName?.[0] || '') +
      (user.lastName?.[0] || '')
    ).toUpperCase();
  }


  const handleLogout = (item: string): void => {
    if (item.toLowerCase() === 'logout' && onLogout) {
      onLogout();
    };
  }

  return(
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback
              key={userState?.id}
              className="text-white"
            >
              {getInitials(userState)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="mr-8 flex flex-col">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          {items.map(item => (
            <DropdownMenuItem
              key={item}
              onClick={() => handleLogout(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
