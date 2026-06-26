<template>
  <AppPage :is-navbar-minimal="false">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
        Favorite GitHub Developers
      </h1>
      <div v-if="favoriteUsers.length" class="space-y-4">
        <div
          v-for="login in favoriteUsers"
          :key="login"
          class="flex items-center justify-between p-4 rounded-lg border border-tertiary hover:bg-primary transition-colors"
        >
          <NuxtLink
            :to="`/${login}`"
            class="flex-1 text-lg font-medium hover:text-secondary transition-colors"
          >
            {{ login }}
          </NuxtLink>
          <AddToFavorites
            :login="login"
            :is-favorite="isUserFavorite(login)"
            @toggle-favorites="toggleFavorites(login)"
          />
        </div>
      </div>
      <div v-else class="text-center text-secondaryText py-12">
        No favorite developers yet.
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { useFavoriteGithubUsers } from "@/composables/useFavoriteGithubUsers";
const { toggleFavorites, isUserFavorite, favoriteUsers } =
  useFavoriteGithubUsers();
</script>
