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
    <div class="mb-8 lg:mb-4">
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
    <AddToFavorites
      :is-favorite="isUserFavorite(user?.login as string)"
      :login="user?.login as string"
      @toggle-favorites="toggleUserFavorites"
    />
    <GithubUserStats />
  </div>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "@/stores/githubUserDetails";
import { useFavoriteUsersStore } from "@/stores/favoriteUsers";
import { MapPin, BriefcaseBusiness } from "@lucide/vue";
import AddToFavorites from "@/components/favorites/AddToFavorites.vue";

const githubUserDetailsStore = useGithubUserDetailsStore();
const { toggleFavorites, isUserFavorite } = useFavoriteUsersStore();

const { user } = storeToRefs(githubUserDetailsStore);

const toggleUserFavorites = (login: string) => {
  console.log("toggle favorites", user.value?.login);
  toggleFavorites(login);
};
</script>
