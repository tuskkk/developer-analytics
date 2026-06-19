import { USER_FRAGMENT } from "../fragments/userFragment";

export const SEARCH_GITHUB_USERS_QUERY = gql`
  query SearchGithubUsers($query: String!) {
    search(query: $query, type: USER, first: 5) {
      nodes {
        ... on User {
          ...UserFragment
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;
