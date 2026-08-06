<template>
  <div
    class="mb-4 flex flex-wrap items-center justify-center gap-8 text-sm lg:absolute lg:top-3.5 lg:left-36 lg:mb-0"
  >
    <div v-for="i in 3" :key="i" class="flex flex-col items-center">
      <AppSkeleton class="mb-2 h-8 w-10 rounded" />
      <AppSkeleton class="h-4 w-20 rounded" />
    </div>
  </div>
  <div
    class="mb-4 flex flex-wrap items-center justify-center gap-8 text-sm lg:absolute lg:top-3.5 lg:right-36 lg:mb-0"
  >
    <div v-for="i in 2" :key="i" class="flex flex-col items-center">
      <AppSkeleton class="mb-2 h-8 w-10 rounded" />
      <AppSkeleton class="h-4 w-20 rounded" />
    </div>
  </div>
</template>
