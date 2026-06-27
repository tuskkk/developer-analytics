import { defineStore } from "pinia";
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";
import { createFavoriteUsersQuery } from "@/graphql/queries/favoriteUsersQuery";

export const useFavoriteUsersStore = defineStore("favoriteUsers", () => {
  const favoriteUsersData = ref<GithubUserBasic[] | []>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

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

  const fetchFavoriteUsersData = async (logins: string[]) => {
    const { $apollo } = useNuxtApp();
    setLoading(true);
    setError(null);

    try {
      const { data } = await $apollo.defaultClient.query({
        query: createFavoriteUsersQuery(logins),
      });
      console.log(111, data);
      const users = Object.values(data).filter(
        (user): user is GithubUserBasic => user !== null,
      );
      setFavoriteUsersData(users);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    favoriteUsersData,
    loading,
    error,
    fetchFavoriteUsersData,
  };
});
