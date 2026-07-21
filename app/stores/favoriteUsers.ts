import { defineStore } from "pinia";
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";

export const useFavoriteUsersStore = defineStore("favoriteUsers", () => {
  const favoriteUsersData = ref<GithubUserBasic[] | []>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const initialized = ref<boolean>(false);

  const setFavoriteUsersData = (usersData: GithubUserBasic[] | []) => {
    if (usersData) {
      favoriteUsersData.value = usersData;
    }
  };
  const setLoading = (loadingState: boolean) => {
    loading.value = loadingState;
  };
  const setError = (errorState: string | null) => {
    error.value = errorState;
  };
  const setInitialized = (initializedState: boolean) => {
    initialized.value = initializedState;
  };

  const fetchFavoriteUsersData = async (logins: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const users = await $fetch<GithubUserBasic[]>("/api/github/favorites", {
        method: "POST",
        body: {
          logins,
        },
      });
      setFavoriteUsersData(users);
    } catch (err: unknown) {
      setError(mapGithubErrorMessage(err));
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  return {
    favoriteUsersData,
    loading,
    error,
    initialized,
    fetchFavoriteUsersData,
    setFavoriteUsersData,
  };
});
