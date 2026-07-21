import { searchMatchingGithubUsers } from "~~/server/services/searchUsers";

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, "query");
  if (!query) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing query",
    })
  };

  const { type, first } = getQuery(event);

  const config = useRuntimeConfig(event);

  return await searchMatchingGithubUsers(
    { 
      query,
      type: typeof type === 'string' ? type : null,
      first: Number(first),
    }, config.githubToken);
});
