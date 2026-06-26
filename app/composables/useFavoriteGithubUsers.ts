import { useStorage } from "@vueuse/core";

export const useFavoriteGithubUsers = () => {
  const favoriteUsers = useStorage<string[]>("favorite-users", []);

  const addToFavorites = (login: string) => {
    favoriteUsers.value = [...favoriteUsers.value, login];
  };
  const removeFromFavorites = (login: string) => {
    favoriteUsers.value = favoriteUsers.value.filter(
      (userLogin: string) => userLogin !== login,
    );
  };
  const toggleFavorites = (login: string) => {
    return !isUserFavorite(login)
      ? addToFavorites(login)
      : removeFromFavorites(login);
  };
  const isUserFavorite = (login: string) => favoriteUsers.value.includes(login);

  return {
    favoriteUsers,
    toggleFavorites,
    isUserFavorite,
  };
};
