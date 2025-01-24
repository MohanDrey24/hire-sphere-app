import type { User } from "@/app/dashboard/types";
import { useMutation, useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "./api-client";
import * as zod from "zod";

// for getting the current user
export const getCurrentUser = async (): Promise<User> => {
  return await api.get<User>("/users/current");
};

const currentUserQueryKey = ["users"];

export const currentUserOptions = () => {
  return queryOptions({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
  });
};

export const useCurrentUser = () => useQuery(currentUserOptions());

// for logging in
export const loginSchema = zod.object({
  email: zod.string().email({ message: "Email should have valid format" }),
  password: zod
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type LoginFormData = zod.infer<typeof loginSchema>;

const loginUserAPI = (data: LoginFormData) => {
  return api.post("/auth/signin", data);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUserAPI,
  });
};

// for signing up

export const signupSchema = zod
  .object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should match",
    path: ["confirmPassword"],
  });

export type SignupData = zod.infer<typeof signupSchema>;

export const registerUserAPI = async (data: SignupData) => {
  return await api.post("/auth");
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserAPI,
  });
};
