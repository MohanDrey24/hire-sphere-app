import { create } from 'zustand';

type UserState = {
  userId: string;
  name: string;
}

type UserAction = {
  setUser: (payload: UserState) => void
}

const useUserStore = create<UserState & UserAction>((set) => ({
  userId: '',
  name: '',
  setUser: (payload: UserState) => set({ userId: payload.userId, name: payload.name })
}))

export default useUserStore;