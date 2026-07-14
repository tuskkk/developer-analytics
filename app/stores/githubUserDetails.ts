import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUser } from "~/types/GithubUserResponse";
import { GITHUB_USER_DETAILS_QUERY } from "~/graphql/queries/githubUserDetailsQuery";
import { GITHUB_USER_REPOSITORIES_QUERY } from "~/graphql/queries/githubUserRepositoriesQuery";

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
      if (!login.trim()) return;

      const { $apollo } = useNuxtApp();
      resetUserErrors();

      try {
        const { data } = await $apollo.defaultClient.query({
          query: GITHUB_USER_DETAILS_QUERY,
          variables: {
            login: login.trim(),
          },
        });

        if (!data.user) {
          throwGithubUserError();
          return;
        }
        setUser(data.user);
      } catch (err: unknown) {
        setUserError(mapGithubErrorMessage(err));
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

      const { $apollo } = useNuxtApp();

      try {
        setRepositoriesLoading(true);
        setRepositoriesError(null);
        const { data } = await $apollo.defaultClient.query({
          query: GITHUB_USER_REPOSITORIES_QUERY,
          variables: {
            login: login.trim(),
            first,
            after,
          },
          fetchPolicy: "network-only",
        });
        setRepositories(data.user.repositories);
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
