<template>
  <AppPage :is-navbar-minimal="false">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
        Favorite GitHub Developers
      </h1>
      <ClientOnly>
        <ul v-if="favoriteUsers.length" class="space-y-4">
          <NuxtLink
            v-for="user in favoriteUsersData"
            :key="user.login"
            :to="`/githubUser/${user.login}`"
            class="flex-1 text-lg font-medium hover:text-secondary transition-colors"
          >
            <GithubUserInfo
              class="flex items-center justify-between p-4 rounded-lg border border-tertiary hover:bg-primary transition-colors"
              :user="user"
            >
              <AddToFavorites
                :login="user.login"
                :is-favorite="isUserFavorite(user.login)"
                @toggle-favorites="toggleFavorites(user.login)"
              />
            </GithubUserInfo>
          </NuxtLink>
        </ul>
        <div
          v-else-if="loading"
          class="relative w-full h-screen flex items-center justify-center z-10"
        >
          <AppLoader />
        </div>
        <div v-else class="text-center text-secondaryText py-12">
          No favorite developers yet.
        </div>
      </ClientOnly>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import AddToFavorites from "@/components/favorites/AddToFavorites.vue";
import { useFavoriteGithubUsers } from "@/composables/useFavoriteGithubUsers";
import { useFavoriteUsersStore } from "#imports";

const favoriteUsersStore = useFavoriteUsersStore();
const { favoriteUsersData, loading } = storeToRefs(favoriteUsersStore);
const { fetchFavoriteUsersData } = favoriteUsersStore;

const { toggleFavorites, isUserFavorite, favoriteUsers } =
  useFavoriteGithubUsers();
if (favoriteUsers.value.length) {
  fetchFavoriteUsersData(favoriteUsers.value);
}
</script>
