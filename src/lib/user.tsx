import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "./api-client";

export const userFormSchema = z
  .object({
    name: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .partial();

export type UserFormData = z.infer<typeof userFormSchema>;

export const updateUserProfile = async (data: UserFormData) => {
  return await api.put("/users", data);
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};
