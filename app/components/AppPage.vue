<script setup lang="ts">
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";

interface Props {
  isLandingPage?: boolean;
}

const { isLandingPage = false } = defineProps<Props>();

const searchQuery = ref("");
</script>

<template>
  <div v-if="isLandingPage" class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/100 to-black/0 z-0"
    />
    <div class="bg-hero-mobile bg-cover bg-center z-10 md:bg-hero-desktop">
      <AppNavbar
        v-model="searchQuery"
        is-landing-page
        class="absolute top-0 left-0 z-20 w-full bg-transparent"
      />
      <slot name="hero" />
    </div>
  </div>
  <template v-else>
    <AppNavbar v-model="searchQuery" :is-landing-page="isLandingPage" />
  </template>
  <AppContainer>
    <main>
      <slot />
      Search query: {{ searchQuery }}
    </main>
    <AppFooter />
    <!-- todo: Add section with container after configuration of grid in Tailwind config -->
  </AppContainer>
</template>
