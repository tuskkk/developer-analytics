<script setup lang="ts">
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";
</script>

<template>
  <AppContainer>
    <AppNavbar />
    <slot />
    <AppFooter />
    <!-- todo: Add section with container after configuration of grid in Tailwind config -->
  </AppContainer>
</template>
