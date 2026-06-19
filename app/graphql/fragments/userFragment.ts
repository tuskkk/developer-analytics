export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    login
    name
    avatarUrl
    company
    location
  }
`;
