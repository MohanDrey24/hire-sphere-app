import { type User } from "../dashboard/types";

export const getInitials = (user: User | null): string => {
  if (!user) return "";

  if (user.name?.trim()) {
    return user.name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  }

  return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase();
};
