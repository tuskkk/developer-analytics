<script setup lang="ts">
// todo: replace with a value from the store
const searchQuery = defineModel<string>({
  default: "",
});
</script>
<template>
  <AppPage is-navbar-minimal banner-image="landing" show-dark-banner-mask>
    <template #content>
      <div
        class="relative w-full min-h-screen mb-6 flex flex-col items-center justify-start z-10 text-center text-white px-2 pt-32 md:px-[30px] md:pt-56"
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
          class="relative h-10 w-full max-w-80 mx-auto mb-6"
          is-big
        />
      </div>
    </template>
  </AppPage>
</template>
