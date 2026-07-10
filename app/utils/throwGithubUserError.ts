export const throwGithubUserError = () => {
  throw createError({
    statusCode: 404,
    statusMessage: "GitHub user not found",
    fatal: true,
  });
};
