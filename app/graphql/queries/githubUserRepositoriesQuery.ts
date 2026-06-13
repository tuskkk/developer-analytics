import { REPOSITORY_FRAGMENT } from "../fragments/repositoryFragment";

export const GITHUB_USER_REPOSITORIES_QUERY = gql`
  query GithubUserRepositories(
    $login: String!
    $first: Int!
    $after: String
  ) {
    user(login: $login) {
      repositories(
        first: $first
        after: $after
        orderBy: {
          field: STARGAZERS
          direction: DESC
        }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          ...RepositoryFragment
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;