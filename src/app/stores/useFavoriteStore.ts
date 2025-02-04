import { create } from "zustand";

import { Favorites } from "../dashboard/types";

type State = {
  favorites: Favorites[];
  isLoading: boolean;
};

type Action = {
  fetchFavorites: () => void;
};

const useFavoriteStore = create<State & Action>(() => ({
  favorites: [],
  isLoading: false,
  fetchFavorites: () => {},
}));

export default useFavoriteStore;
