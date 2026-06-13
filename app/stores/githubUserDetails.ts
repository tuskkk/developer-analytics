import type { NuxtError } from "#app";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { GithubUser } from "~/types/GithubUserResponse";

export const useGithubUserDetailsStore = defineStore(
  "githubUserDetails",
  () => {
    const user = ref<GithubUser | null>(null);
    const loading = ref<boolean>(false);
    const repositoriesLoading = ref<boolean>(false);
    const error = ref<NuxtError<unknown> | undefined>(undefined);
    const repositoriesError = ref<NuxtError<unknown> | undefined>(undefined);
    const repositoriesCount = ref(20);

    const setUser = (userData: GithubUser | null) => {
      user.value = userData;
    };
    const setRepositories = (repositoriesData: GithubUser["repositories"] | null) => {
      if (user.value && repositoriesData) {
        console.log(111, user.value.repositories);
        const repos = user.value.repositories;
        user.value.repositories.nodes = repos.nodes.concat(repositoriesData.nodes);
        user.value.repositories.totalCount = repositoriesData.totalCount;
        user.value.repositories.pageInfo = repositoriesData.pageInfo;
        console.log(222, user.value.repositories);
      }
    };
    const setLoading = (loadingState: boolean) => {
      loading.value = loadingState;
    };
    const setRepositoriesLoading = (loadingState: boolean) => {
      repositoriesLoading.value = loadingState;
    };
    const setError = (errorState: NuxtError<unknown> | undefined) => {
      error.value = errorState;
    };
    const setRepositoriesError = (errorState: NuxtError<unknown> | undefined) => {
      repositoriesError.value = errorState;
    };
    const setRepositoriesCount = (newRepositoriesCount: number) => {
      repositoriesCount.value = newRepositoriesCount;
    };

    const showLoadMoreButton = computed(() => user.value?.repositories.pageInfo.hasNextPage && !repositoriesLoading.value && !repositoriesError.value);


    return {
      user,
      setUser,
      setRepositories,
      setLoading,
      setRepositoriesLoading,
      setError,
      setRepositoriesError,
      loading,
      repositoriesLoading,
      error,
      repositoriesError,
      repositoriesCount,
      setRepositoriesCount,
      showLoadMoreButton,
    };
  },
);
