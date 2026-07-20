import { GITHUB_USER_DETAILS_QUERY } from "@/graphql/queries/githubUserDetailsQuery";
import type { GithubUserResponse } from "@/types/GithubUserResponse";
import { executeGithubQuery } from "./github";

export const fetchUserDetails = async (login: string, token: string) => {
  const response = await executeGithubQuery<GithubUserResponse>(GITHUB_USER_DETAILS_QUERY, { login: login.trim() }, token);

  return response.data.user
}
