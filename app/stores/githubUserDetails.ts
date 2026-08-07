import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUser } from "@/types/GithubUserResponse";

export const useGithubUserDetailsStore = defineStore(
  "githubUserDetails",
  () => {
    const user = ref<GithubUser | null>(null);
    const loading = ref<boolean>(false);
    const repositoriesLoading = ref<boolean>(false);
    const userError = ref<string | null>(null);
    const repositoriesError = ref<string | null>(null);
    const initialized = ref<boolean>(false);

    const setUser = (userData: GithubUser | null) => {
      user.value = userData ? structuredClone(userData) : null;
    };
    const setRepositories = (
      repositoriesData: GithubUser["repositories"] | null,
    ) => {
      if (user.value && repositoriesData) {
        user.value = {
          ...user.value,
          repositories: {
            ...user.value.repositories,
            nodes: [
              ...user.value.repositories.nodes,
              ...repositoriesData.nodes,
            ],
            totalCount: repositoriesData.totalCount,
            pageInfo: repositoriesData.pageInfo,
          },
        };
      }
    };
    const setLoading = (loadingState: boolean) => {
      loading.value = loadingState;
    };
    const setRepositoriesLoading = (loadingState: boolean) => {
      repositoriesLoading.value = loadingState;
    };
    const setUserError = (errorState: string | null) => {
      userError.value = errorState;
    };
    const setRepositoriesError = (errorState: string | null) => {
      repositoriesError.value = errorState;
    };

    const fetchGithubUser = async (login: string) => {
      const trimmedLogin = login.trim();

      if (!trimmedLogin) return;
      resetUserErrors();

      try {
        const user = await $fetch<GithubUser>(
          `/api/github/user/${encodeURIComponent(trimmedLogin)}`,
        );

        setUser(user);
        return user;
      } /*catch (err: unknown) {
        if (isNuxtError(err) && err.status === 404) {
          throw err;
        }
        setUserError(mapGithubErrorMessage(err));
        return null;
      } */
        catch (err: unknown) {
          console.error("fetchGithubUser", err)

          if (isNuxtError(err)) {
            console.error("status:", err.status)
            console.error("statusCode:", err.statusCode)
            console.error("message:", err.message)
            console.error("data:", err.data)
          }

          throw err
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    const fetchMoreRepositories = async (
      login: string,
      first: number,
      after: string | null,
    ) => {
      if (!login.trim()) return;

      try {
        setRepositoriesLoading(true);
        setRepositoriesError(null);
        const repos = await $fetch<GithubUser["repositories"]>(
          `/api/github/user/${encodeURIComponent(login.trim())}/repositories`,
          { query: { first, after } },
        );
        setRepositories(repos);
      } catch (error: unknown) {
        setRepositoriesError(mapGithubErrorMessage(error));
      } finally {
        setRepositoriesLoading(false);
      }
    };

    const resetUserErrors = () => {
      setUserError(null);
      setRepositoriesError(null);
    };

    const setInitialized = (initializedState: boolean) => {
      initialized.value = initializedState;
    };

    const showLoadMoreButton = computed(
      () =>
        user.value?.repositories.pageInfo.hasNextPage &&
        !repositoriesLoading.value,
    );

    return {
      user,
      setUser,
      setRepositories,
      setLoading,
      setRepositoriesLoading,
      setUserError,
      setRepositoriesError,
      loading,
      repositoriesLoading,
      userError,
      repositoriesError,
      showLoadMoreButton,
      initialized,
      fetchGithubUser,
      fetchMoreRepositories,
    };
  },
);
