import { createFavoriteUsersQuery } from "@/graphql/queries/favoriteUsersQuery";
import type { FavoriteUsersResponse } from "@/types/FavoriteUsers";
import { GithubUserBasic } from "@/types/GithubUserSearchResponse";
import { executeGithubQuery } from "./github";

export const fetchFavoriteUsersData = async (logins: string[], token: string) => {
  const response = await executeGithubQuery<FavoriteUsersResponse>(createFavoriteUsersQuery(logins), {}, token);

  return Object.values(response.data).filter(
    (user): user is GithubUserBasic => user !== null,
  );
}
