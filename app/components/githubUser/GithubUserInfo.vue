<template>
  <li>
    <button
      class="flex w-full items-center gap-3 px-4 py-3 text-left"
      :class="{
        'bg-primary': index === activeIndex,
        'hover:bg-primary': index !== activeIndex,
      }"
      @click="$emit('select', user)"
    >
      <img
        :src="user.avatarUrl"
        :alt="user.login"
        class="h-10 w-10 rounded-full"
      />
      <div>
        <slot />
        <p v-if="user.name" class="text-sm text-primaryText">
          {{ user.name }}
        </p>
      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";

interface Props {
  user: GithubUserBasic;
  index?: number;
  activeIndex?: number;
}

defineProps<Props>();

defineEmits<{ select: [user: GithubUserBasic] }>();
</script>
