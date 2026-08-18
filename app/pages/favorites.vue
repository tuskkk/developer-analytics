<template>
  <AppPage>
    <div class="relative w-full mx-auto py-16 md:py-32">
      <h1 class="text-2xl text-primaryText mb-8 tracking-tight md:text-4xl">
        Favorite GitHub Developers
      </h1>
      <ErrorBanner
        v-if="error"
        class="relative w-full h-14 flex z-10"
        :message="error"
      />
      <div
        v-else-if="!initialized || loading"
        class="relative w-full h-[calc(100vh-16rem)] flex items-center justify-center z-10 md:h-screen"
      >
        <AppLoader />
      </div>
      <div
        v-else-if="!favoriteUsers.length"
        class="text-center text-secondaryText py-12"
      >
        No favorite developers yet.
      </div>
      <ul v-else class="grid gap-4 md:grid-cols-3 lg:gap-7 lg:grid-cols-4">
        <GithubUserInfo
          v-for="user in favoriteUsersData"
          :key="user.login"
          class="relative w-full flex items-center justify-between p-4 rounded-lg border border-tertiary bg-white shadow text-lg font-medium transition-colors hover:bg-stroke hover:text-secondary"
          :user="user"
          is-full-version
        >
          <NuxtLink
            :to="`/githubUser/${user.login}`"
            class="absolute inset-0 flex-1 z-10"
          />
          <AddToFavorites
            class="relative z-20"
            :login="user.login"
            :is-favorite="isUserFavorite(user.login)"
            @toggle-favorites="removeFromFavorites(user.login)"
          />
        </GithubUserInfo>
      </ul>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import AddToFavorites from "~/components/AddToFavorites.vue";
import { useFavoriteGithubUsers } from "@/composables/useFavoriteGithubUsers";
import { useFavoriteUsersStore } from "#imports";

useSeoMeta({
  title: "Favorite Users",
  description: "Your saved GitHub developers.",
  ogTitle: "Favorites | Developer Analytics",
  ogDescription: "Browse your saved GitHub profiles.",
});

const { toggleFavorites, isUserFavorite, favoriteUsers } =
  useFavoriteGithubUsers();

const favoriteUsersStore = useFavoriteUsersStore();
const { favoriteUsersData, loading, initialized, error } =
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

const removeFromFavorites = (login: string) => {
  toast.info(`${login} is removed from favorites`, {
    style: { background: "#F9FAFB", color: "#111928" },
  });
  toggleFavorites(login);
};
</script>
