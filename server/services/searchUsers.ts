import { SEARCH_GITHUB_USERS_QUERY } from "@/graphql/queries/searchGithubUsersQuery";
import type { SearchUserResponse, SearchUsersQueryVariables } from "@/types/GithubUserSearchResponse";
import { executeGithubQuery } from "./github";

export const searchMatchingGithubUsers = async (variables: SearchUsersQueryVariables, token: string) => {
  const response = await executeGithubQuery<SearchUserResponse>(SEARCH_GITHUB_USERS_QUERY, variables, token);

  return response.data.search.nodes;
}
