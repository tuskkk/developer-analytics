<template>
  <div class="flex-1 items-center pt-20 text-center lg:pt-28">
    <!-- Name -->
    <AppSkeleton class="mx-auto mb-4 h-10 w-72 rounded-lg" />
    <!-- Login -->
    <AppSkeleton class="mx-auto mb-4 h-4 w-32 rounded" />
    <!-- Company & Location -->
    <div class="mb-4 flex flex-wrap items-center justify-center gap-3">
      <AppSkeleton class="h-5 w-36 rounded" />
      <AppSkeleton class="h-5 w-28 rounded" />
    </div>
    <!-- GitHub URL -->
    <div class="mb-4 flex justify-center">
      <AppSkeleton class="h-5 w-64 rounded" />
    </div>
    <!-- Favorites button -->
    <div class="mb-4 flex justify-center md:mb-0">
      <AppSkeleton class="h-11 w-48 rounded-lg" />
    </div>
    <!-- Stats -->
    <GithubUserStatsSkeleton />
  </div>
</template>
