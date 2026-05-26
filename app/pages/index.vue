<script setup lang="ts">
import AppPage from "@/components/AppPage.vue";
</script>

<template>
  <AppPage :is-landing-page="true">
    <div
      class="w-full grid grid-cols-6 gap-2.5 xl:grid-cols-12 xl:gap-gutterXl"
    >
      Page: index
    </div>
  </AppPage>
</template>

<style scoped></style>
