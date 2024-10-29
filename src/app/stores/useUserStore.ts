import { create } from 'zustand';
import { type User } from '../dashboard/types';

type UserState = {
  user: User | null
}

type UserAction = {
  setUser: (user: User) => void
}

const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  setUser: (user: User) => set({ user })
}))

export default useUserStore;