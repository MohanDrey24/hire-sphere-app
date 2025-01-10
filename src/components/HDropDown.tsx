import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { User } from "@/app/dashboard/types";
import { useRouter } from "next/navigation";
import { getInitials } from "@/app/utils/getInitials";

interface Props {
  userState: User | null;
  label: string;
  items: string[];
  onLogout?: () => void;
}

export default function HDropdown ({ userState, label, items, onLogout }: Props) {
  const router = useRouter();

  const handleDropDown = (item: string): void => {
    if (item.toLowerCase() === 'logout' && onLogout) {
      onLogout();
    } else if (item.toLowerCase() === 'profile') {
      router.push('/profile')
    }
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
              onClick={() => handleDropDown(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
