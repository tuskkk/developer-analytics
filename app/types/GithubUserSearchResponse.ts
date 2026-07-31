interface GithubUserBasic {
  login: string;
  name?: string | null;
  avatarUrl: string;
  company: string | null;
  location: string | null;
}

interface SearchUsersQueryVariables {
  query: string;
  type: string | null;
  first: number;
}

interface SearchUserResponse {
  data: {
    search: {
      nodes: (GithubUserBasic | null)[];
    };
  };
}

export type { GithubUserBasic, SearchUsersQueryVariables, SearchUserResponse };
