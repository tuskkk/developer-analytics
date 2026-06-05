<script setup lang="ts">
import AppPage from "@/components/AppPage.vue";

const route = useRoute();
const login = route.params.login as string;
</script>

<template>
  <AppPage>
    <p>Page: Github User Details: {{ login }}</p>
  </AppPage>
</template>

<style scoped></style>
