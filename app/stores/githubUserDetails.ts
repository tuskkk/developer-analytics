import type { NuxtError } from "#app";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUser } from "~/types/GithubUserResponse";

export const useGithubUserDetailsStore = defineStore(
  "githubUserDetails",
  () => {
    const user = ref<GithubUser | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<NuxtError<unknown> | undefined>(undefined);

    const setUser = (userData: GithubUser | null) => {
      user.value = userData;
    };
    const setLoading = (loadingState: boolean) => {
      loading.value = loadingState;
    };
    const setError = (errorState: NuxtError<unknown> | undefined) => {
      error.value = errorState;
    };

    return {
      user,
      setUser,
      setLoading,
      setError,
      loading,
      error,
    };
  },
);
