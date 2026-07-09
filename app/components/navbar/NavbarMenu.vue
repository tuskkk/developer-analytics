<template>
  <nav aria-label="Main navigation">
    <ul class="flex items-center gap-6">
      <li v-for="item in navigation" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="text-primaryText tracking-wider transition-colors duration-200 hover:text-secondary"
          active-class="text-secondary font-semibold"
          :class="[isNavbarMinimal ? 'text-white' : 'text-secondary']"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavigationItem } from "@/types/Navigation";

interface Props {
  isNavbarMinimal?: boolean;
}

const { isNavbarMinimal = false } = defineProps<Props>();

const navigation: NavigationItem[] = [
  {
    label: "favorites",
    to: "/favorites",
  },
  // {
  //   label: 'Developers',
  //   to: '/developers',
  // },
  // {
  //   label: 'Trending',
  //   to: '/trending',
  // },
];
</script>
