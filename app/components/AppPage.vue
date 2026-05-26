<script setup lang="ts">
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";

interface Props {
  isLandingPage?: boolean;
}

const { isLandingPage = false } = defineProps<Props>()

const searchQuery = ref("");
</script>

<template>
  <AppNavbar v-model="searchQuery" :is-landing-page="isLandingPage" />
  <AppContainer>
    <main>
      <slot />
      Search query: {{ searchQuery }}
    </main>
    <AppFooter />
    <!-- todo: Add section with container after configuration of grid in Tailwind config -->
  </AppContainer>
</template>
