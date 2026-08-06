<template>
  <section class="mb-16 flex flex-col items-center">
    <MostStarredRepositorySkeleton />
    <GithubUserRepositoriesSkeleton data-type="pinnedItems" />
    <GithubUserTechStackSkeleton />
    <GithubUserRepositoriesSkeleton data-type="repositories" />
    <AppSkeleton class="h-12 w-40 rounded-lg" />
  </section>
</template>

<script setup lang="ts">
import MostStarredRepositorySkeleton from "@/components/repositories/MostStarredRepositorySkeleton.vue";
</script>
