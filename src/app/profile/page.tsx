"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "../utils/getInitials";
import { formatDate } from "../utils/formatDate";
import { UserPenIcon, SquareXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileField from "./ProfileField";
import { useCurrentUser } from "@/lib/auth";

export default function Profile() {
  const [isEditing, setEditingMode] = useState(false);
  const { data: userState } = useCurrentUser();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 p-5 sm:p-20">
      <p className="items-center text-4xl">PROFILE</p>
      <div className="flex w-3/4 flex-col items-center gap-10 sm:w-3/4 md:flex-row">
        <Avatar className="h-40 w-40">
          <AvatarImage alt="Avatar" src={userState?.image} />
          <AvatarFallback className="text-5xl font-bold text-white">
            {getInitials(userState ?? null)}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col gap-2">
          {!isEditing && (
            <div className="self-end">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit Profile"
                onClick={() => setEditingMode(!isEditing)}
              >
                <UserPenIcon />
              </Button>
            </div>
          )}

          <ProfileField
            className="pb-4"
            label="Display Name"
            name="Display Name"
            isEditing={isEditing}
            value={userState?.name}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <ProfileField
              className="w-full sm:w-1/2"
              label="First Name"
              name="First Name"
              isEditing={isEditing}
              value={userState?.firstName}
            />

            <ProfileField
              className="w-full sm:w-1/2"
              label="Last Name"
              name="Last Name"
              isEditing={isEditing}
              value={userState?.lastName}
            />
          </div>
        </div>
      </div>

      <div>
        <ul className="flex flex-col space-y-2 sm:space-y-0 md:flex-row">
          <li className="flex items-center gap-2">
            <span className="text-gray-700">Email:</span>
            <p className="font-bold">{userState?.email}</p>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-700">Joined at:</span>
            <p className="font-bold">
              {formatDate(userState?.createdAt, "MM/DD/YYYY")}
            </p>
          </li>
        </ul>
      </div>

      {isEditing && (
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
  );
}
