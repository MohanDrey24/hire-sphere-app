import { create } from 'zustand';
import { type User } from '../dashboard/types';
import useFetch from '@/hooks/useFetch';
import { useQuery } from '@tanstack/react-query';

type UserState = {
  user: User | null;
  isLoading: boolean;
}

type UserAction = {
  setUser: () => void
}

const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  isLoading: false,
  setUser: () => {
    const { data, isPending: isLoading } = useQuery<User>({
      queryKey: ['users'],
      queryFn: () => useFetch('/users/current'),
    })

    if (data) {
      set({ user: data })
    }

    if (isLoading) {
      set({ isLoading })
    }
  }
}))

export default useUserStore;