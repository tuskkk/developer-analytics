import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoriteUsersStore = defineStore("favoriteUsers", () => {
  const favoriteUsers = ref<string[]>([]);

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
});
