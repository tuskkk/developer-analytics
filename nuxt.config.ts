import { visualizer } from "rollup-plugin-visualizer";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
  },
  build: {
    analyze: true,
  },
  sourcemap: {
    server: true,
    client: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png?v=1.0',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg?v=1.0',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico?v=1.0',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png?v=1.0',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest?v=1.0',
        },
      ],
      meta: [
        {
          name: 'apple-mobile-web-app-title',
          content: 'devanalytics',
        },
      ],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/eslint-module",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  vite: {
    build: {
      rollupOptions: {
        plugins: [
          visualizer({
            filename: "./dist/stats.html",
            open: true,
            gzipSize: true,
          }),
        ],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@vue')) return "vue";
              if (id.includes('nuxt')) return "nuxt";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "@lucide/vue",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        '@vueuse/core',
        "vue-sonner",
        "vue3-apexcharts",
      ]
    },
  },
});