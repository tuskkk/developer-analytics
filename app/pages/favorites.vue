<template>
  <AppPage :is-navbar-minimal="false">
    <div class="w-full mx-auto px-4 py-32">
      <h1 class="text-4xl text-primaryText mb-8 tracking-tight">
        Favorite GitHub Developers
      </h1>
      <div
        v-if="!initialized || loading"
        class="relative w-full h-screen flex items-center justify-center z-10"
      >
        <AppLoader />
      </div>
      <div
        v-else-if="!favoriteUsers.length"
        class="text-center text-secondaryText py-12"
      >
        No favorite developers yet.
      </div>
      <ul v-else class="grid grid-cols-4 gap-7">
        <NuxtLink
          v-for="user in favoriteUsersData"
          :key="user.login"
          :to="`/githubUser/${user.login}`"
          class="flex-1 text-lg font-medium hover:text-secondary transition-colors"
        >
          <GithubUserInfo
            class="flex items-center justify-between p-6 rounded-lg border border-tertiary bg-white shadow hover:bg-stroke transition-colors md:p-12"
            :user="user"
            is-full-version
          >
            <AddToFavorites
              :login="user.login"
              :is-favorite="isUserFavorite(user.login)"
              @toggle-favorites="toggleFavorites(user.login)"
            />
          </GithubUserInfo>
        </NuxtLink>
      </ul>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import AddToFavorites from "@/components/favorites/AddToFavorites.vue";
import { useFavoriteGithubUsers } from "@/composables/useFavoriteGithubUsers";
import { useFavoriteUsersStore } from "#imports";

const { toggleFavorites, isUserFavorite, favoriteUsers } =
  useFavoriteGithubUsers();

const favoriteUsersStore = useFavoriteUsersStore();
const { favoriteUsersData, loading, initialized } =
  storeToRefs(favoriteUsersStore);
const { fetchFavoriteUsersData, setFavoriteUsersData } = favoriteUsersStore;

onMounted(async () => {
  if (favoriteUsers.value.length > 0) {
    await fetchFavoriteUsersData(favoriteUsers.value);
  }
});

watch(favoriteUsers, async (users) => {
  if (users.length === 0) {
    setFavoriteUsersData([]);
    return;
  }
  await fetchFavoriteUsersData(users);
});
</script>
