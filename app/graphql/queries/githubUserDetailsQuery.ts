export const GITHUB_USER_DETAILS_QUERY = gql`
  query GithubUserDetails($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      bio
      company
      location
      websiteUrl

      followers {
        totalCount
      }

      following {
        totalCount
      }

      repositories(
        first: 10
        orderBy: { field: STARGAZERS, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        totalCount

        nodes {
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
        }
      }
    }
  }
`;
