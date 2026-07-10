export const mapGithubErrorMessage = (error: unknown) => {
  const message = getErrorMessage(error);

  if (message.includes("Bad credentials")) {
    return "GitHub token is invalid.";
  }

  if (message.includes("rate limit")) {
    return "GitHub API rate limit exceeded.";
  }

  if (message.includes("Could not resolve to a User")) {
    return "GitHub user not found.";
  }

  return "Unexpected GitHub error.";
};
