<template>
  <AppPage
    class="relative h-screen flex flex-col"
    :is-navbar-minimal="true"
    banner-image="landing"
    :is-landing-page="true"
  >
    <template #content>
      <div
        class="mb-6 min-h-[calc(100vh-260px)] flex flex-col items-center justify-start text-center text-white px-2 pt-32 md:px-[30px] md:pt-56 md:min-h-[calc(100vh-164px)]"
      >
        <h1 class="text-2xl mb-4 md:text-5xl md:mb-6">
          Track developer trends <br class="md:hidden" />in one place.
        </h1>
        <p class="text-sm mb-8 md:text-lg md:mb-10">
          Search repositories, technologies, and developer activity
          <br class="hidden md:block" />to discover what’s growing, trending,
          and worth building with.
        </p>
        <SearchGithubUser
          v-model="searchQuery"
          class="relative h-10 w-full max-w-sm mx-auto mb-6"
          :is-big="true"
        />
        <ErrorBanner
          v-if="error"
          class="relative w-full h-14 max-w-sm mx-auto flex z-10"
          :message="error"
        />
      </div>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "GitHub Developer Analytics",
  description:
    "Search GitHub developers, analyze repositories, stars, languages and activity.",
  ogTitle: "Developer Analytics – Analyze GitHub Profiles & Repositories",
  ogDescription:
    "Explore GitHub users, repositories and insights with a modern analytics dashboard.",
  ogImage: "https://devanalytics.app/og-image.png", // todo: after deployment check the real url

  twitterCard: "summary_large_image",
  twitterTitle: "Developer Analytics",
  twitterDescription: "Analyze GitHub profiles and repositories.",
  twitterImage: "https://devanalytics.app/og-image.png", // todo: after deployment check the real url
});

// todo: replace with a value from the store
const searchQuery = defineModel<string>({
  default: "",
});

const githubUserSearchStore = useGithubUserSearchStore();
const { error } = storeToRefs(githubUserSearchStore);
</script>
