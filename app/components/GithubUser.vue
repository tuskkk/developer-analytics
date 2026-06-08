<template>
  <article
    v-if="user"
    class="relative flex flex-col gap-6 py-3.5 px-4 bg-white border rounded-lg shadow-lg lg:py-9 lg:px-28"
  >
    <img
      :src="user.avatarUrl"
      :alt="`${user.login} avatar`"
      class="absolute left-1/2 -translate-x-1/2 -top-10 w-28 h-28 rounded-full object-cover shrink-0 shadow-xl lg:w-36 lg:h-36 lg:-top-16"
    />
    <div class="flex-1 items-center text-center pt-20 lg:pt-32">
      <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
        {{ user.name || user.login }}
      </h1>
      <p class="mb-4 text-sm text-secondary font-bold tracking-widest lg:mb-10">
        @{{ user.login }}
      </p>
      <div
        class="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm text-secondaryText tracking-wide lg:mb-4"
      >
        <span v-if="user.company">
          {{ user.company }}
        </span>
        <span v-if="user.location">
          <MapPin class="inline-block mr-1 text-secondaryText text-uppercase" />
          {{ user.location }}
        </span>
        <a
          v-if="user.websiteUrl"
          :href="user.websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          Website
        </a>
      </div>
      <GithubUserStats />
    </div>
    <div
      class="flex-1 items-center text-center pt-10 text-base border-t border-tertiary lg:text-lg"
    >
      <p v-if="user.bio" class="mb-4 text-primaryText">
        {{ user.bio }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";
import { MapPin } from "@lucide/vue";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);
</script>
