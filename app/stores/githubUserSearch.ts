import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUserBasic } from "~/types/GithubUserSearchResponse";
import { SEARCH_GITHUB_USERS_QUERY } from "~/graphql/queries/searchGithubUsers";

export const useGithubUserSearchStore = defineStore("githubUserSearch", () => {
  const suggestions = ref<GithubUserBasic[] | []>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const setSuggestions = (usersArray: GithubUserBasic[] | []) => {
    suggestions.value = usersArray;
  };
  const setLoading = (loadingState: boolean) => {
    loading.value = loadingState;
  };
  const setError = (errorState: string | null) => {
    error.value = errorState;
  };

  const searchGithubUsers = async (query: string) => {
    if (!query.trim()) return;

    const { $apollo } = useNuxtApp();

    try {
      setLoading(true);
      resetError();

      const { data } = await $apollo.defaultClient.query({
        query: SEARCH_GITHUB_USERS_QUERY,
        variables: {
          query: query.trim(),
          type: "USER",
          first: 5,
        },
        fetchPolicy: "network-only",
      });
      setSuggestions(data.search.nodes);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    suggestions,
    loading,
    searchGithubUsers,
  };
});
