<template>
  <ul
    v-if="query.length > 3 && suggestions.length"
    class="absolute top-8 left-0 right-0 z-20 mt-2 overflow-hidden border border-primary rounded-2xl text-sm text-primaryText outline-none bg-white transition-colors hover:border-primaryText focus:border-primaryText"
  >
    <GithubUserInfo
      v-for="(user, index) in suggestions"
      :key="`${user.login}-${index}`"
      :user="user"
      :index="index"
      :active-index="activeIndex"
      @select="$emit('select', user)"
    >
      <p class="font-medium">
        <template
          v-for="(part, partIndex) in getHighlightedParts(user.login)"
          :key="partIndex"
        >
          <mark v-if="part.highlighted" class="rounded bg-secondary/50 px-0.5">
            {{ part.text }}
          </mark>

          <span v-else>
            {{ part.text }}
          </span>
        </template>
      </p>
    </GithubUserInfo>
  </ul>
</template>

<script setup lang="ts">
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";

interface Props {
  query: string;
  suggestions: GithubUserBasic[];
  activeIndex: number;
}

const props = defineProps<Props>();

defineEmits<{ select: [user: GithubUserBasic] }>();

const getHighlightedParts = (login: string) => {
  if (!login) return;
  if (!props.query.trim()) {
    return [{ text: login, highlighted: false }];
  }

  const escapedQuery = props.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return login
    .split(regex)
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlighted: part.toLowerCase() === props.query.toLowerCase(),
    }));
};
</script>
