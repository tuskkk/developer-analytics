export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    name
    description
    stargazerCount
    forkCount
    createdAt
    updatedAt
    diskUsage
    url

    primaryLanguage {
      name
      color
    }

    languages(first: 10) {
      edges {
        size
        node {
          name
          color
        }
      }
    }
  }
`;
