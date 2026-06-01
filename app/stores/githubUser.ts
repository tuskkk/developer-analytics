import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { GITHUB_USER_QUERY } from "~/graphql/queries/githubUserQuery";
import type { GithubUserResponse } from "~/types/GithubUserResponse";

export const useGithubUserStore = defineStore("githubUser", () => {
  const {
    result,
    load,
    refetch,
    error: queryError,
  } = useLazyQuery<GithubUserResponse>(GITHUB_USER_QUERY);

  const loading = ref(false);
  const error = ref<Error | null>(null);

  const user = computed(() => result.value?.user ?? null);

  const repositories = computed(
    () => result.value?.user?.repositories?.nodes ?? [],
  );

  const stats = computed(() => ({
    followers: user.value?.followers?.totalCount ?? 0,
    following: user.value?.following?.totalCount ?? 0,
    repositories: user.value?.repositories?.totalCount ?? 0,
  }));

  const searchUser = async (login: string) => {
    if (!result.value) {
      await load(null, { login });
    } else {
      await refetch({ login });
    }
  };

  return {
    user,
    repositories,
    stats,
    loading,
    error: computed(() => error.value ?? queryError.value),
    searchUser,
  };
});
