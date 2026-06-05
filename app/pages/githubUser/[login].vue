<script setup lang="ts">
import { computed } from "vue";
import AppPage from "@/components/AppPage.vue";
import AppLoader from "@/components/AppLoader.vue";

const route = useRoute();

const login = computed(() => route.params.login as string);

// const { searchUser, user, stats: repositories } = useGithubUserDetailsStore();
const githubUserDetailsStore = useGithubUserDetailsStore();
const { user, loading, error } = storeToRefs(githubUserDetailsStore);

const isUserShown = computed(
  () =>
    login.value.length > 0 && !!user.value && user.value.login === login.value,
);
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
    <div v-else-if="error" class="w-full text-center text-sm text-alert">
      Error occurred while fetching user data: {{ error }}
    </div>
  </AppPage>
</template>

<style scoped></style>
