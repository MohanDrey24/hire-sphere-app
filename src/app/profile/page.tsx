"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/lib/auth";
import {
  userFormSchema,
  useUpdateUserProfile,
  type UserFormData,
} from "@/lib/user";
import { getInitials } from "../utils/getInitials";

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: userState } = useCurrentUser();
  const { mutate } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (userState) {
      reset({
        name: userState.name || "",
        firstName: userState.firstName || "",
        lastName: userState.lastName || "",
      });
    }
  }, [userState, reset]);

  const onSubmit = (data: UserFormData) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => {
        console.error("Failed to update profile", error);
      },
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 p-5 sm:p-20">
      <p className="items-center text-4xl">PROFILE</p>

      <div>
        <Avatar className="h-40 w-40 bg-amber-600 flex items-center justify-center">
          <AvatarImage alt="Avatar" src={userState?.image} />
          <AvatarFallback className="text-6xl font-bold text-black">
            {getInitials(userState ?? null)}
          </AvatarFallback>
        </Avatar>
      </div>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Email:</label>
          <Input
            id="email"
            name="email"
            disabled
            value={userState?.email || ""}
          />
        </div>

        <div>
          <label>Name:</label>
          <Input
            {...register("name")}
            id="name"
            name="name"
            placeholder="Display Name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>First Name:</label>
          <Input
            {...register("firstName")}
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label>Last Name:</label>
          <Input
            {...register("lastName")}
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
