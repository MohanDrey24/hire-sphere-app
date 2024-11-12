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
  
  const getInitials = (name?: string): string => {
    return name 
      ? name.trim()
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase())
        .join('')
      : '';
  };

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
            {userState?.accounts.map(user => (
              <AvatarFallback 
                key={user.userId}
                className="text-white"
              >
                {getInitials(user.name)}
              </AvatarFallback>
            ))}
          </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="mr-8 hidden md:flex md:flex-col">
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
