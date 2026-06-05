import { GITHUB_USER_DETAILS_QUERY } from "~/graphql/queries/githubUserDetailsQuery";

export const useSearchGithubUser = async (login: string) => {
  if (!login.trim()) return;

  console.log("HANDLE SEARCH", login);
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

  watchEffect(() => {
    store.setUser(data.value);
    store.setLoading(pending.value);
    store.setError(error.value);

    navigateTo({
      path: `/githubUser/${login.trim()}/`,
    });
  });
};
