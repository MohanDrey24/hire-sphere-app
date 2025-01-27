import { Favorites } from "@/app/dashboard/types";
import { useQuery, queryOptions } from "@tanstack/react-query";
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
