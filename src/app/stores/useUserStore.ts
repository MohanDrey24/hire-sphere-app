import { create } from "zustand";

import { type User } from "../dashboard/types";

type UserState = {
  user: User | null;
  isLoading: boolean;
};

const useUserStore = create<UserState>(() => ({
  user: null,
  isLoading: false,
}));

export default useUserStore;
