<template>
  <div class="flex-1 items-center text-center pt-20 lg:pt-28">
    <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
      {{ user?.name || user?.login }}
    </h1>
    <p class="mb-4 text-sm text-secondary font-bold tracking-widest">
      @{{ user?.login }}
    </p>
    <div
      class="flex flex-wrap items-center justify-center gap-3 mb-4 text-sm text-secondaryText tracking-wide"
    >
      <span v-if="user?.company">
        <BriefcaseBusiness
          class="inline-block mr-1 text-secondaryText text-uppercase"
        />
        {{ user.company }}
      </span>
      <span v-if="user?.location">
        <MapPin class="inline-block mr-1 text-secondaryText text-uppercase" />
        {{ user?.location }}
      </span>
    </div>
    <div class="mb-4">
      <a
        v-if="user?.url"
        :href="user.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        {{ user.url }}
      </a>
    </div>
    <LazyAddToFavorites
      class="mb-4 md:mb-0"
      :is-favorite="isUserFavorite(user?.login as string)"
      :login="user?.login as string"
      @toggle-favorites="toggleUserFavorites"
    />
    <GithubUserStats />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGithubUserDetailsStore } from "@/stores/githubUserDetails";
import { MapPin, BriefcaseBusiness } from "@lucide/vue";
import { useFavoriteGithubUsers } from "@/composables/useFavoriteGithubUsers";
import AddToFavorites from "~/components/AddToFavorites.vue";

const githubUserDetailsStore = useGithubUserDetailsStore();
const { user } = storeToRefs(githubUserDetailsStore);

const { toggleFavorites, isUserFavorite } = useFavoriteGithubUsers();

const toggleUserFavorites = (login: string) => {
  toggleFavorites(login);
};
</script>
