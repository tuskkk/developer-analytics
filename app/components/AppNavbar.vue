<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";
import SearchBar from "@/components/SearchBar.vue";

interface Props {
  isLandingPage?: boolean;
}

const { isLandingPage = false } = defineProps<Props>()

const searchQuery = defineModel<string>({
  default: "",
});
</script>

<template>
  <header
    class="sticky w-screen gap-2.5 top-0 z-50 bg-primary"
    :class="{ 'bg-transparent': isLandingPage }"
  >
    <section
      class="max-w-full px-2 mx-auto flex items-center justify-between gap-4 py-3 md:px-2.5 xl:max-w-layoutXl xl:px-0 2xl:max-w-layout2Xl"
    >
      <AppLogo class="max-w-40" />
      <div class="w-full max-w-[330px]">
        <SearchBar
          v-if="!isLandingPage"
          v-model="searchQuery"
          class="h-12 w-full"
          placeholder="Search developers..."
        />
      </div>
    </section>
  </header>
</template>

<style scoped></style>
