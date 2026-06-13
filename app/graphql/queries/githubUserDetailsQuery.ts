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
      url

      followers {
        totalCount
      }

      following {
        totalCount
      }

      organizations(first: 20) {
        nodes {
          login
          name
          avatarUrl
          url
          description
        }
      }

      pinnedItems(first: 6) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            forkCount

            primaryLanguage {
              name
              color
            }
          }
        }
      }

      repositories(
        first: 20
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
      }
    }
  }
`;
