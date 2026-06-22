<template>
  <header
    class="w-screen gap-2.5 top-0 z-50 bg-primary"
    :class="[isNavbarMinimal ? 'bg-transparent' : 'bg-primary']"
  >
    <section
      class="max-w-full px-2 mx-auto flex items-center justify-between gap-4 py-3 md:px-2.5 xl:max-w-layoutXl xl:px-0 2xl:max-w-layout2Xl"
    >
      <AppLogo class="max-w-28 md:max-w-40" />
      <SearchGithubUser
        v-if="!isNavbarMinimal"
        class="h-8 w-full max-w-40 md:max-w-56"
      />
    </section>
  </header>
</template>

<script setup lang="ts">
interface Props {
  isNavbarMinimal?: boolean;
}

const { isNavbarMinimal = false } = defineProps<Props>();
</script>
