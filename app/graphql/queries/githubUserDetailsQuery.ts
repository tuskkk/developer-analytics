import { REPOSITORY_FRAGMENT } from "../fragments/repositoryFragment";
import { USER_FRAGMENT } from "../fragments/userFragment";

export const GITHUB_USER_DETAILS_QUERY = `
  query GithubUserDetails($login: String!) {
    user(login: $login) {
      ...UserFragment
      bio
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

        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          ...RepositoryFragment
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${REPOSITORY_FRAGMENT}
`;
