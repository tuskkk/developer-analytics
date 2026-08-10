<template>
  <NuxtLoadingIndicator color="#8B03F0" :height="4" />
  <Toaster
    position="bottom-right"
    :toast-options="{
      style: {
        fontFamily: 'Roboto',
        letterSpacing: '0.05em',
        fontSize: '16px',
      },
    }"
  />
  <div class="font-sans">
    <NuxtRouteAnnouncer />
    <NuxtPage page-key="search" />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";

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
