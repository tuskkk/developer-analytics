<template>
  <div class="flex flex-col items-center justify-center mb-12 text-center">
    <AppSkeleton class="h-6 w-36 rounded" />
    <ul class="flex flex-wrap items-center justify-center gap-5 pt-4">
      <li v-for="i in 6" :key="i" class="flex items-center gap-2">
        <AppSkeleton class="w-12 h-12 rounded-full" />
        <AppSkeleton class="hidden h-4 w-24 rounded lg:block" />
      </li>
    </ul>
  </div>
</template>
