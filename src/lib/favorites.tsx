import {
  FavoritePayload,
  Favorites,
  FavoriteMutationContext,
} from "@/app/dashboard/types";
import {
  useQuery,
  queryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "./api-client";

export const getFavorites = async () => {
  return api.get<Favorites[]>("/favorites");
};

const favoritesQuerykey = ["favorites"];

export const getFavoritesQueryOptions = () => {
  return queryOptions({
    queryKey: favoritesQuerykey,
    queryFn: getFavorites,
  });
};

export const useGetFavorites = () => useQuery(getFavoritesQueryOptions());

export const toggleFavorite = async (data: FavoritePayload) => {
  return api.post("/favorites", data);
};

export const useToggleFavorite = (
  options?: UseMutationOptions<
    unknown,
    Error,
    FavoritePayload,
    FavoriteMutationContext
  >,
) => {
  return useMutation({
    mutationFn: toggleFavorite,
    ...options,
  });
};
