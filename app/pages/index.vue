<script setup lang="ts">
import AppPage from "@/components/AppPage.vue";

// todo: replace with a value from the store
const searchQuery = defineModel<string>({
  default: "",
});
</script>
<template>
  <AppPage is-landing-page>
    <template #hero>
      <div
        class="relative w-full h-[400px] mb-6 flex flex-col items-center justify-center z-10 text-center text-white px-2 md:px-[30px] md:bg-hero-desktop"
      >
        <h1 class="text-2xl mb-4 md:text-3xl">
          Track developer trends <br class="md:hidden" />in one place.
        </h1>
        <p class="text-sm mb-4 md:text-base">
          Search repositories, technologies, and developer activity to discover what’s growing, trending, and worth building with.
        </p>
        <SearchBar
          v-model="searchQuery"
          class="h-8 w-full max-w-56"
          placeholder="Search developers..."
        />
      </div>
    </template>
    <div
      class="w-full grid grid-cols-6 gap-2.5 xl:grid-cols-12 xl:gap-gutterXl"
    >
      Page: index
    </div>
  </AppPage>
</template>

<style scoped></style>
