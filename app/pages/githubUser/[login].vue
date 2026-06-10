<script setup lang="ts">
import { computed } from "vue";
import AppPage from "@/components/AppPage.vue";
import AppLoader from "@/components/AppLoader.vue";
import GithubUser from "@/components/GithubUser.vue";

const route = useRoute();

const login = computed(() => route.params.login as string);

// const { searchUser, user, stats: repositories } = useGithubUserDetailsStore();
const githubUserDetailsStore = useGithubUserDetailsStore();
const { user, loading, error } = storeToRefs(githubUserDetailsStore);

const isLoginFromCurrentUser = computed(
  () => user.value && user.value.login === login.value,
);

const shouldFetchUser = computed(
  () => !!login.value && !isLoginFromCurrentUser.value,
);

const isUserShown = computed(
  () => login.value.length > 0 && isLoginFromCurrentUser.value,
);

if (shouldFetchUser.value) {
  useSearchGithubUser(login.value);
}
</script>

<template>
  <AppPage is-navbar-minimal banner-image="developer">
    <template #content>
      <div v-if="isUserShown" class="w-full pt-32 lg:pt-56">
        <GithubUser v-if="isUserShown" />
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
    </template>
  </AppPage>
</template>

<style scoped></style>
