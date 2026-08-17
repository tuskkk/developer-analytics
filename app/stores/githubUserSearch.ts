import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUserBasic } from "~/types/GithubUserSearchResponse";

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

    try {
      setLoading(true);
      resetError();

      const suggestions = await $fetch<GithubUserBasic[]>(
        `/api/github/search/${encodeURIComponent(query.trim())}`,
        { query: { type: "USER", first: 5 } },
      );
      setSuggestions(suggestions);
    } catch (error: unknown) {
      setError(mapGithubErrorMessage(error));
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
    error,
    searchGithubUsers,
    setSuggestions,
  };
});
