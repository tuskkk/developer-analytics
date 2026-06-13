import { GITHUB_USER_REPOSITORIES_QUERY } from "~/graphql/queries/githubUserRepositoriesQuery";

export const useLoadMoreRepositories = async (
  login: string,
  first: number,
  after: string | null,
) => {
  if (!login.trim()) return;

  const { $apollo } = useNuxtApp();
  const store = useGithubUserDetailsStore();
  const { repositoriesCount } = storeToRefs(store);

  const { data, pending, error } = await useAsyncData(
    () => `github-user-${login.trim()}-repositories-${after}`,
    async () => {
      const { data } = await $apollo.defaultClient.query({
        query: GITHUB_USER_REPOSITORIES_QUERY,
        variables: {
          login: login.trim(),
          first,
          after,
        },
      });
      return data.user.repositories;
    },
  );
  store.setRepositories(data.value);
  store.setRepositoriesCount(repositoriesCount.value + first);
  store.setRepositoriesError(error.value);
  store.setRepositoriesLoading(pending.value);
};
