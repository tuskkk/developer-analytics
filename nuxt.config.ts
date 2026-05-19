// https://nuxt.com/docs/api/configuration/nuxt-config
console.log('TOKEN:', process.env.GITHUB_TOKEN)
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/apollo',
    '@nuxtjs/eslint-module',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.github.com/graphql',
        tokenName: 'github-token',
        httpLinkOptions: {
          headers: {
            authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      }
    },
  },
})