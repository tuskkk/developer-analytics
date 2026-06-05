export const useSearchGithubUser = (login: string) => {
  if (!login.trim()) return;

  console.log("HANDLE SEARCH", login);
  return navigateTo({
    path: `/githubUser/${login.trim()}/`,
  });
};
