<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AppPage from "@/components/AppPage.vue";
import AppLoader from "@/components/AppLoader.vue";

const route = useRoute();

const login = ref("");

onMounted(async () => {
  await handleLoadUser();
  login.value = route.params.login as string;
  console.log("Mounted with login:", login.value);
});

// const { searchUser, user, stats: repositories } = useGithubUserDetailsStore();
const githubUserDetailsStore = useGithubUserDetailsStore();
const { user, loading } = storeToRefs(githubUserDetailsStore);
const { loadUserDetails } = githubUserDetailsStore;

const isUserShown = computed(
  () => !!user.value && user.value.login === login.value,
);

const handleLoadUser = async () => {
  if (!login.value.trim()) return;
  console.log("HANDLE SEARCH", login);
  await loadUserDetails(login.value.trim());
  console.log("USER", user.value);
};
</script>

<template>
  <AppPage>
    <div
      v-if="isUserShown"
      class="w-full grid grid-cols-6 gap-2.5 xl:grid-cols-12 xl:gap-gutterXl"
    >
      <h2>{{ user?.name }}</h2>
    </div>
    <div v-else-if="loading" class="w-full mb-6">
      <AppLoader />
    </div>
    <div v-else-if="login" class="w-full text-center text-sm text-secondary">
      No user found with login "{{ login }}"
    </div>
  </AppPage>
</template>

<style scoped></style>
