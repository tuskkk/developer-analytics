import { fetchFavoriteUsersData } from "~~/server/services/favorites";

export default defineEventHandler(async (event) => {
  const { logins } = await readBody<{ logins: string[] }>(event);
  if (!Array.isArray(logins) || logins.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No favorite users provided",
    })
  };

  const config = useRuntimeConfig(event);

  return await fetchFavoriteUsersData(logins, config.githubToken);
});
