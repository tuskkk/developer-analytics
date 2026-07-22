<template>
  <AppPage>
    <div class="relative flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-semibold mb-4">
          {{ error.status }}
        </h1>
        <p class="mb-6">
          {{ error.statusText }}
        </p>
        <button
          class="bg-secondary text-white py-2 px-4 rounded hover:bg-primary"
          @click="handleError"
        >
          Go home
        </button>
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

useSeoMeta({
  title: "Error",
});

defineProps<{
  error: NuxtError;
}>();

const handleError = () =>
  clearError({
    redirect: "/",
  });
</script>
