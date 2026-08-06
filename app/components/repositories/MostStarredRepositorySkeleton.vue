<template>
  <article class="mb-16 rounded-xl border border-tertiary bg-white p-5">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <AppSkeleton class="h-8 w-64 rounded-lg" />
      <AppSkeleton class="h-8 w-8 rounded-full" />
    </div>
    <div class="space-y-6">
      <!-- Repository name & description -->
      <div>
        <AppSkeleton class="mb-3 h-7 w-72 rounded" />
        <AppSkeleton class="h-4 w-full rounded" />
        <AppSkeleton class="mt-2 h-4 w-5/6 rounded" />
      </div>
      <!-- Stats -->
      <div class="flex flex-wrap gap-5">
        <AppSkeleton class="h-5 w-20 rounded" />
        <AppSkeleton class="h-5 w-20 rounded" />
        <AppSkeleton class="h-5 w-28 rounded" />
      </div>
      <!-- Updated -->
      <div class="border-t border-tertiary pt-6">
        <AppSkeleton class="h-5 w-52 rounded" />
      </div>
      <!-- GitHub link -->
      <AppSkeleton class="h-6 w-40 rounded" />
    </div>
  </article>
</template>
