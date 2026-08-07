<template>
  <AppPage>
    <div
      class="relative min-h-screen max-w-lg mx-auto py-16 text-center tracking-wide"
    >
      <SearchX
        class="mx-auto mb-6 h-20 w-20 text-secondary"
        :stroke-width="1.5"
      />
      <p
        class="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary"
      >
        Error {{ error.status }}
      </p>
      <h1 class="mb-6 text-4xl text-primaryText">
        {{ error.status === 404 ? "Page not found" : "Something went wrong" }}
      </h1>
      <p class="mb-12 text-secondaryText">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <button
        class="px-5 py-3.5 mb-4 bg-white text-secondary rounded shadow-lg border border-tertiary uppercase hover:bg-secondary hover:text-white transition-colors"
        @click="handleError"
      >
        Back to Home
      </button>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { SearchX } from "@lucide/vue";

useHead({
  title: "404 – Page not found | DevAnalytics",
});

defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>
