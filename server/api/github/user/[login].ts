import { fetchUserDetails } from "~~/server/services/userDetails";

export default defineEventHandler(async (event) => {
  const login = getRouterParam(event, "login");
  if (!login) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing Github user login",
    })
  };

  const config = useRuntimeConfig(event);

  return await fetchUserDetails(login, config.githubToken);
});
