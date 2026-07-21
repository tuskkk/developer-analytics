import { GITHUB_USER_REPOSITORIES_QUERY } from "@/graphql/queries/githubUserRepositoriesQuery";
import type { GithubUserResponse, RepositoriesQueryVariables } from "@/types/GithubUserResponse";
import { executeGithubQuery } from "./github";

export const fetchMoreUserRepositories = async (variables: RepositoriesQueryVariables, token: string) => {
  const response = await executeGithubQuery<GithubUserResponse>(GITHUB_USER_REPOSITORIES_QUERY, variables, token);

  return response.data.user?.repositories
}
