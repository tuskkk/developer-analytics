import { GITHUB_USER_DETAILS_QUERY } from "~/graphql/queries/githubUserDetailsQuery";

export const useSearchGithubUser = async (login: string) => {
  if (!login.trim()) return;

  const { $apollo } = useNuxtApp();
  const store = useGithubUserDetailsStore();

  const { data, pending, error } = await useAsyncData(
    () => `github-user-${login.trim()}`,
    async () => {
      const { data } = await $apollo.defaultClient.query({
        query: GITHUB_USER_DETAILS_QUERY,
        variables: {
          login: login.trim(),
        },
      });
      return data.user;
    },
  );
  store.setUser(data.value);
  store.setError(error.value);
  store.setLoading(pending.value);
};
