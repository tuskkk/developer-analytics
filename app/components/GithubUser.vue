<template>
  <article
    v-if="user"
    class="relative flex flex-col gap-6 py-3.5 px-4 bg-white border rounded-lg shadow-lg lg:py-5 lg:px-28"
  >
    <img
      :src="user.avatarUrl"
      :alt="`${user.login} avatar`"
      class="absolute left-1/2 -translate-x-1/2 -top-10 w-28 h-28 rounded-full object-cover shrink-0 shadow-xl lg:w-36 lg:h-36 lg:-top-16"
    />
    <div class="flex-1 items-center text-center pt-20 lg:pt-28">
      <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
        {{ user.name || user.login }}
      </h1>
      <p class="mb-4 text-sm text-secondary font-bold tracking-widest">
        @{{ user.login }}
      </p>
      <div
        class="flex flex-wrap items-center justify-center gap-3 mb-4 text-sm text-secondaryText tracking-wide"
      >
        <span v-if="user.company">
          <BriefcaseBusiness
            class="inline-block mr-1 text-secondaryText text-uppercase"
          />
          {{ user.company }}
        </span>
        <span v-if="user.location">
          <MapPin class="inline-block mr-1 text-secondaryText text-uppercase" />
          {{ user.location }}
        </span>
      </div>
      <div class="mb-8 lg:mb-0">
        <a
          v-if="user.url"
          :href="user.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          {{ user.url }}
        </a>
      </div>
      <GithubUserStats />
    </div>
    <div
      class="flex-1 items-center text-center pt-4 text-base border-t border-tertiary lg:text-lg"
    >
      <p v-if="user.bio" class="mb-4 text-primaryText">
        {{ user.bio }}
      </p>
    </div>
    <section v-if="user?.repositories.nodes.length" class="mb-16">
      <GithubUserRepositories data-type="pinnedItems" />
      <GithubUserTechStack />
      <GithubUserRepositories data-type="repositories" />
    </section>
    <p v-else class="text-center text-secondaryText mb-4">
      This user has no public repositories.
    </p>
  </article>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";
import { MapPin, BriefcaseBusiness } from "@lucide/vue";
import GithubUserStats from "@/components/GithubUserStats.vue";
import GithubUserRepositories from "@/components/GithubUserRepositories.vue";
import GithubUserTechStack from "@/components/GithubUserTechStack.vue";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);
</script>
