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
    <GithubUserCard />
    <div
      class="flex-1 items-center text-center pt-4 text-base border-t border-tertiary lg:text-lg"
    >
      <p v-if="user.bio" class="mb-4 text-primaryText tracking-wide">
        {{ user.bio }}
      </p>
    </div>
    <GithubUserOrganizations v-if="user?.organizations.nodes.length" />
    <GithubUserProjects v-if="user?.repositories.nodes.length" />
    <p v-else class="text-center text-secondaryText mb-4">
      This user has no public repositories.
    </p>
  </article>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";
import GithubUserCard from "@/components/GithubUserCard.vue";
import GithubUserOrganizations from "@/components/GithubUserOrganizations.vue";
import GithubUserProjects from "@/components/GithubUserProjects.vue";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);
</script>
