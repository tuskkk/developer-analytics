import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";

interface FavoriteUsersResponse {
  data: {
    [key: string]: GithubUserBasic | null;
  };
}

export type { FavoriteUsersResponse };
