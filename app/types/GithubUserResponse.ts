import type { GithubUserBasic } from "./GithubUserSearchResponse.ts"

interface GithubLanguage {
  name: string;
  color: string | null;
}

interface GithubRepositoryLanguage {
  size: number;

  node: {
    name: string;
    color: string | null;
  };
}

interface GithubRepository {
  id: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  createdAt: string;
  updatedAt: string;
  diskUsage: number;
  url: string;
  primaryLanguage: GithubLanguage | null;
  languages: {
    edges: GithubRepositoryLanguage[];
  };
}

interface GithubOrganization {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  description: string | null;
}

interface GithubUser extends GithubUserBasic {
  bio: string | null;
  url: string | null;

  followers: {
    totalCount: number;
  };

  following: {
    totalCount: number;
  };

  organizations: {
    nodes: GithubOrganization[];
  };

  pinnedItems: {
    nodes: GithubRepository[];
  };

  repositories: {
    totalCount: number;
    nodes: GithubRepository[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    }
  };
}

interface GithubUserResponse {
  user: GithubUser | null;
}

export type { GithubUser, GithubRepository, GithubUserResponse };
