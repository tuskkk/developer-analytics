<template>
  <footer
    :class="
      isTransparent ? 'bg-transparent' : 'bg-white border-t border-stroke'
    "
    aria-label="Footer"
  >
    <div
      class="mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 text-xs tracking-wider md:flex-row md:text-sm"
      :class="
        isTransparent
          ? 'text-white md:text-secondaryText'
          : 'text-secondaryText'
      "
    >
      <div class="text-center md:text-left">
        <img
          src="/images/logo.svg"
          alt="Developer Analytics"
          class="max-w-28 mb-2 h-auto flex-shrink-0"
          width="112"
          height="20"
        />
        <p>Discover GitHub developers and explore repository statistics.</p>
      </div>
      <nav
        aria-label="Footer navigation"
        class="flex flex-wrap items-center justify-center gap-6"
      >
        <NuxtLink to="/" class="transition-colors hover:text-secondary">
          Home
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="transition-colors hover:text-secondary"
        >
          Favorites
        </NuxtLink>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-secondary"
        >
          GitHub
        </a>
      </nav>
      <p class="text-center md:text-right">© {{ currentYear }} DevAnalytics</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  isTransparent?: boolean;
}

const { isTransparent = false } = defineProps<Props>();

const currentYear = new Date().getFullYear();
</script>
