<template>
  <div class="w-full">
    <form @submit.prevent="handleSearch">
      <SearchBar
        v-model="login"
        :is-big="isBig"
        class="h-10 w-full max-w-80 mx-auto mb-6"
        placeholder="Enter GitHub username..."
      />
    </form>

    <div
      v-if="isUserShown"
      class="w-full grid grid-cols-6 gap-2.5 xl:grid-cols-12 xl:gap-gutterXl"
    >
      <h2>{{ user?.name }}</h2>
    </div>
    <div v-else-if="loading" class="w-full mb-6">
      <AppLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import AppLoader from "@/components/AppLoader.vue";

interface Props {
  isBig?: boolean;
}

const { isBig = false } = defineProps<Props>();

// const { searchUser, user, stats: repositories } = useGithubUserStore();
const githubUserStore = useGithubUserStore();
const { user, loading } = storeToRefs(githubUserStore);
const { searchUser } = githubUserStore;

const login = ref("");

const isUserShown = computed(
  () => !!user.value && user.value.login === login.value,
);

const handleSearch = async () => {
  if (!login.value.trim()) return;
  console.log("HANDLE SEARCH", login.value);
  await searchUser(login.value.trim());
  console.log("USER", user.value);
};
</script>
