<template>
  <div
    class="flex flex-col justify-center items-center mb-12 text-center text-base text-primaryText tracking-wider lg:text-lg"
  >
    Organizations:
    <ul class="flex flex-wrap items-center justify-center gap-5 pt-4">
      <li v-for="org in user?.organizations.nodes" :key="org.login">
        <!-- todo: replace link text with tooltip -->
        <a
          :href="org.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 justify-center text-sm text-blue-600 hover:underline"
        >
          <img
            :src="org.avatarUrl"
            :alt="`${org.login} avatar`"
            class="w-12 h-12 rounded-full object-cover"
            width="48"
            height="48"
          />
          <span class="hidden lg:block">{{ org.name || org.login }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);
</script>
