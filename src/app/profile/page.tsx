"use client";

import useUserStore from "../stores/useUserStore"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "../utils/getInitials";
import { formatDate } from "../utils/formatDate";

export default function Profile () {
  const userState = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  setUser()
  
  const renderName = () => {
    if (userState?.name) {
      return userState?.name;
    } else {
      return `${userState?.firstName} ${userState?.lastName}`
    }
  }

  return (
    <div>
      <div className="flex items-center gap-20">
        <Avatar className="w-40 h-40">
          <AvatarImage
            alt="Avatar"
            src={userState?.image}
          />
          <AvatarFallback className="text-white font-bold text-5xl">
            {getInitials(userState)}
          </AvatarFallback>
        </Avatar>

        <p className="text-2xl">{renderName()}</p>
      </div>


        <div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-gray-700">Email:</span>
              <p className="font-bold">{userState?.email}</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-700">Joined at:</span>
              <p className="font-bold">{formatDate(userState?.createdAt, "MM/DD/YYYY")}</p>
            </li>
          </ul>
        </div>
    </div>
  )
};