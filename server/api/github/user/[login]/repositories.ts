import { fetchMoreUserRepositories } from "~~/server/services/userRepositories";

export default defineEventHandler(async (event) => {
  const login = getRouterParam(event, "login");
  if (!login) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing Github user login",
    })
  };

  const { first, after } = getQuery(event);

  const config = useRuntimeConfig(event);

  return await fetchMoreUserRepositories(
    { 
      login,
      first: Number(first),
      after: typeof after === 'string' ? after : null,
    },
    config.githubToken);
});
