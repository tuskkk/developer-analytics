import { ofetch } from 'ofetch'

export async function executeGithubQuery<TResponse>(
  query: string,
  variables: object,
  token: string,
): Promise<TResponse> {
  return ofetch<TResponse>('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { query, variables },
  })
}