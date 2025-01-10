"use client";

import useUserStore from "../stores/useUserStore"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "../utils/getInitials";
// import { NavBar } from "../dashboard/NavBar";

export default function Profile () {
  const userState = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  setUser()
  
  return (
    <div>
      {/* <NavBar /> */}
      <Avatar className="w-24 h-24">
        <AvatarImage
          alt="Avatar"
          src={userState?.image}
        />
        <AvatarFallback>
          {getInitials(userState)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
};