<template>
  <section class="mb-16 tracking-wide">
    <!-- Section title -->
    <AppSkeleton class="mb-4 h-9 w-56 rounded-lg" />
    <!-- Repository cards -->
    <div
      class="grid gap-4"
      :class="[
        dataType === 'repositories'
          ? 'md:grid-cols-2'
          : 'md:gap-3 md:grid-cols-3',
      ]"
    >
      <article
        v-for="i in repositoriesCount"
        :key="i"
        class="rounded-xl border border-tertiary bg-white p-5"
      >
        <!-- Repository name -->
        <AppSkeleton class="mb-4 h-6 w-40 rounded" />
        <!-- Description -->
        <AppSkeleton class="h-4 w-full rounded" />
        <AppSkeleton class="mt-2 h-4 w-5/6 rounded" />
        <!-- Stats -->
        <div class="mt-5 flex flex-wrap gap-4">
          <AppSkeleton class="h-5 w-16 rounded" />
          <AppSkeleton class="h-5 w-16 rounded" />
          <AppSkeleton class="h-5 w-24 rounded" />
        </div>
        <!-- Updated -->
        <div
          v-if="dataType === 'repositories'"
          class="mt-4 border-t border-tertiary pt-4"
        >
          <AppSkeleton class="h-5 w-40 rounded" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  dataType: "repositories" | "pinnedItems";
}

const props = defineProps<Props>();

const repositoriesCount = props.dataType === "repositories" ? 10 : 3;
</script>
