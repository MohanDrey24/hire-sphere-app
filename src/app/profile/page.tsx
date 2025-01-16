"use client";

import { useState } from "react";
import useUserStore from "../stores/useUserStore"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "../utils/getInitials";
import { formatDate } from "../utils/formatDate";
import { UserPenIcon, SquareXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile () {
  const [isEditing, setEditingMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  const userState = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  setUser()

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

        <div>
          <div className="flex items-center *:text-2xl gap-2">
            <span className="text-gray-700">Display Name:</span>
            <p className="font-bold">{userState?.name}</p>
          </div>

          <div className="flex items-center *:text-2xl gap-2">
            <span className="text-gray-700">First Name:</span>
            <p className="font-bold">{userState?.firstName}</p>
          </div>

          <div className="flex items-center *:text-2xl gap-2">
            <span className="text-gray-700">Last Name:</span>
            <p className="font-bold">{userState?.lastName}</p>
          </div>
        </div>
      </div>

      { !isEditing && 
        <Button
          variant="ghost"
          size="icon"
          aria-label="Edit Profile"
          onClick={() => setEditingMode(!isEditing)}
        >
          <UserPenIcon />
        </Button>
      }

      <div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-gray-700">Email:</span>
            { !isEditing 
              ? <p className="font-bold">{userState?.email}</p> 
              : <p>Placeholder</p>
            }
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-700">Joined at:</span>
            <p className="font-bold">{formatDate(userState?.createdAt, "MM/DD/YYYY")}</p>
          </li>
        </ul>
      </div>

      { isEditing && (
        <div className="flex gap-4">
          <Button type="submit">Save Changes</Button>
          <Button
            variant="ghost"
            size="icon"
            type="button" 
            onClick={() => setEditingMode(false)}
          >
            <SquareXIcon />
          </Button>
        </div>
      )}
    </div>
  )
};