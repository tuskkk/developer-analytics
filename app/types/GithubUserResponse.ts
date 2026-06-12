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

interface GithubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  url: string | null;

  followers: {
    totalCount: number;
  };

  following: {
    totalCount: number;
  };

  pinnedItems: {
    nodes: GithubRepository[];
  };

  repositories: {
    totalCount: number;
    nodes: GithubRepository[];
  };
}

interface GithubUserResponse {
  user: GithubUser | null;
}

export type { GithubUser, GithubRepository, GithubUserResponse };
