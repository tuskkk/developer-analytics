import { computed, ref } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { GITHUB_USER_QUERY } from "~/graphql/queries/githubUserQuery";
import type { GithubUserResponse } from "~/types/GithubUserResponse";

export const useGithubUser = () => {
  const {
    result: data,
    // loading,
    error,
    load,
  } = useLazyQuery<GithubUserResponse>(GITHUB_USER_QUERY);

  const searchUser = async (login: string) => {
    console.log("Searching for user:", login);
    await load(null, {
      login,
    });
  };

  // todo: handle errors!
  if (error.value) {
    console.error("Error fetching GitHub user:", error.value);
    return {
      user: null,
      repositories: [],
      stats: {
        followers: 0,
        following: 0,
        repositories: 0,
      },
    };
  }

  const user = computed(() => data.value?.user ?? null);

  const repositories = computed(
    () => data.value?.user?.repositories?.nodes ?? [],
  );

  const stats = computed(() => ({
    followers: data.value?.user?.followers?.totalCount ?? 0,
    following: data.value?.user?.following?.totalCount ?? 0,
    repositories: data.value?.user?.repositories?.totalCount ?? 0,
  }));

  return {
    user,
    repositories,
    stats,
    searchUser,
  };
};
