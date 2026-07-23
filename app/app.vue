<template>
  <NuxtLoadingIndicator color="#8B03F0" :height="4" />
  <div class="font-sans">
    <NuxtRouteAnnouncer />
    <NuxtPage page-key="search" />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} · DevAnalytics` : "DevAnalytics";
  },
});
useSeoMeta({
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
  twitterImage: "/og-image.png",
});
</script>
