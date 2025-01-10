import { create } from 'zustand';
import { type User } from '../dashboard/types';
import useFetch from '@/hooks/useFetch';
import { useQuery } from '@tanstack/react-query';

type UserState = {
  user: User | null
}

type UserAction = {
  setUser: () => void
}

const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  setUser: () => {
    const { data } = useQuery<User>({
      queryKey: ['users'],
      queryFn: () => useFetch('/users/current')
    })

    if (data) {
      set({ user: data })
    }
  }
}))

export default useUserStore;