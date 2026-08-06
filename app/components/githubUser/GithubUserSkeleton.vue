<template>
  <article
    class="relative flex flex-col gap-6 py-3.5 px-4 bg-white border rounded-lg shadow-lg lg:py-5 lg:px-28"
  >
    <AppSkeleton
      class="absolute left-1/2 -translate-x-1/2 -top-10 w-28 h-28 rounded-full shadow-xl lg:w-36 lg:h-36 lg:-top-16"
    />
    <GithubUserCardSkeleton />
    <div class="flex-1 pt-4 border-t border-tertiary">
      <AppSkeleton class="h-4 w-full mb-3" />
      <AppSkeleton class="h-4 w-5/6 mx-auto" />
    </div>
    <GithubUserOrganizationsSkeleton />
    <GithubUserProjectsSkeleton />
  </article>
</template>
