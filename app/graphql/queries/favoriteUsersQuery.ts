import { USER_FRAGMENT } from "@/graphql/fragments/userFragment";

export const createFavoriteUsersQuery = (logins: string[]) => {
  const usersQuery = logins
    .map(
      (login, index) => `
        user${index}: user(login: "${login}") {
          ...UserFragment
        }
      `,
    )
    .join("\n");
  return `
    query FavoriteUsers {
      ${usersQuery}
    }

    ${USER_FRAGMENT}
  `;
};
