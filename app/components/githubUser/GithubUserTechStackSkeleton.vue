<template>
  <section class="w-full mb-16">
    <!-- Section title -->
    <AppSkeleton class="mb-4 h-9 w-72 rounded-lg" />
    <!-- Chart -->
    <article class="mx-auto max-w-2xl rounded-lg bg-white py-3.5 px-4">
      <div class="flex justify-center">
        <AppSkeleton class="aspect-square w-full max-w-md rounded-full" />
      </div>
      <!-- Legend -->
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <AppSkeleton v-for="i in 6" :key="i" class="h-5 w-24 rounded" />
      </div>
    </article>
  </section>
</template>
