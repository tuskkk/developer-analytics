<template>
  <li :class="{ 'mx-auto': isFullVersion }">
    <button
      class="flex w-full items-center text-left"
      :class="{
        'bg-primary': !isFullVersion && index === activeIndex,
        'hover:bg-primary': !isFullVersion && index !== activeIndex,
        'px-4 py-3 gap-3': !isFullVersion,
        'flex-col text-center gap-6': isFullVersion,
      }"
      @click="$emit('select', user)"
    >
      <img
        :src="user.avatarUrl"
        :alt="user.login"
        class="rounded-full shadow-lg"
        :class="[
          isFullVersion ? 'h-24 w-24 md:h-[120px] md:w-[120px]' : 'h-10 w-10',
        ]"
      />
      <div>
        <p
          class="text-primaryText tracking-wider"
          :class="{
            'h-7 text-lg': isFullVersion,
            'text-sm': !isFullVersion,
          }"
        >
          {{ user.name }}
        </p>
        <slot />
      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";

interface Props {
  user: GithubUserBasic;
  isFullVersion?: boolean;
  index?: number;
  activeIndex?: number;
}

const {
  isFullVersion = false,
  index = 0,
  activeIndex = -1,
} = defineProps<Props>();

defineEmits<{ select: [user: GithubUserBasic] }>();
</script>
