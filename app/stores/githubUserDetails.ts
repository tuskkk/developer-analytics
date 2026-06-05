import { defineStore } from "pinia";
import { computed } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { GITHUB_USER_DETAILS_QUERY } from "~/graphql/queries/githubUserDetailsQuery";
import type { GithubUserResponse } from "~/types/GithubUserResponse";

export const useGithubUserDetailsStore = defineStore(
  "githubUserDetails",
  () => {
    const {
      result,
      load,
      refetch,
      loading,
      error: queryError,
    } = useLazyQuery<GithubUserResponse>(GITHUB_USER_DETAILS_QUERY);

    const user = computed(() => result.value?.user ?? null);

    const repositories = computed(
      () => result.value?.user?.repositories?.nodes ?? [],
    );

    const stats = computed(() => ({
      followers: user.value?.followers?.totalCount ?? 0,
      following: user.value?.following?.totalCount ?? 0,
      repositories: user.value?.repositories?.totalCount ?? 0,
    }));

    const loadUserDetails = async (login: string) => {
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
      error: queryError,
      loadUserDetails,
    };
  },
);
