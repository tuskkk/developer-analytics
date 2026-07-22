<template>
  <article
    v-if="mostStarredRepository"
    class="rounded-xl border border-tertiary bg-white p-5 mb-16"
  >
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl md:text-3xl">Most Starred Repository</h2>
      <Star class="text-secondary ml-4" :size="32" />
    </div>
    <div class="space-y-6 tracking-wide">
      <div>
        <h3
          class="mb-2 text-lg font-semibold text-secondary cursor-pointer hover:underline"
        >
          {{ name }}
        </h3>
        <p v-if="description" class="text-sm md:text-base text-primaryText">
          {{ description }}
        </p>
      </div>
      <div class="flex flex-wrap gap-5 text-sm text-secondaryText md:text-base">
        <div class="flex items-center gap-2 md:gap-3">
          <Star :size="20" />
          {{ stargazerCount }}
        </div>
        <div class="flex items-center gap-2 md:gap-3">
          <GitFork :size="20" />
          {{ forkCount }}
        </div>
        <div v-if="primaryLanguage" class="flex items-center gap-2 md:gap-3">
          <span class="w-4 h-4 rounded-full" :style="languageStyle" />
          {{ primaryLanguage.name }}
        </div>
      </div>
      <div
        class="flex items-center gap-2 text-sm text-primaryText border-t border-tertiary pt-6 md:text-base md:gap-3"
      >
        <CalendarDays :size="20" />
        Updated {{ formattedDate }}
      </div>
      <NuxtLink
        :to="url"
        target="_blank"
        class="inline-flex items-center gap-3 text-secondary hover:underline"
      >
        View on GitHub
        <ExternalLink :size="20" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { storeToRefs } from "pinia";
import { Star, GitFork, CalendarDays, ExternalLink } from "@lucide/vue";
import type { GithubRepository } from "@/types/GithubUserResponse";
import { useGithubUserDetailsStore } from "@/stores/githubUserDetails";

const githubUserDetailsStore = useGithubUserDetailsStore();
const { user } = storeToRefs(githubUserDetailsStore);

const mostStarredRepository = computed<GithubRepository | null>(
  () => user.value?.repositories?.nodes?.[0] ?? null,
);
const { primaryLanguage, stargazerCount, forkCount, name, description, url } =
  mostStarredRepository.value ?? {};

const languageStyle = computed<CSSProperties>(() => ({
  backgroundColor: primaryLanguage?.color ?? "transparent",
}));

const formattedDate = computed(() => {
  if (!mostStarredRepository.value) return "";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(mostStarredRepository.value.updatedAt));
});
</script>
