interface GithubUserBasic {
  login: string;
  name?: string | null;
  avatarUrl: string;
  company: string | null;
  location: string | null;
};

export type { GithubUserBasic };