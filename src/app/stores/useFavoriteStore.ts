import { create } from "zustand";
import { Favorites } from "../dashboard/types";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

type State = {
  favorites: Favorites[];
  isLoading: boolean;
}

type Action = {
  setFavorites: () => void;
}

const useFavoriteStore = create<State & Action>((set) => ({
  favorites: [],
  isLoading: false,
  setFavorites: () => {
    const {data, isPending} = useQuery<Favorites[]>({
      queryKey: ["favorites"],
      queryFn: () =>  useFetch("/favorites"),
      staleTime: 1000 * 60 * 5
    })

    if (data) {
      set({ favorites: data })
    }

    if (isPending) {
      set({ isLoading: isPending })
    }
  },
}))

export default useFavoriteStore;