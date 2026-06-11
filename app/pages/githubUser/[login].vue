<script setup lang="ts">
import { computed } from "vue";
import AppPage from "@/components/AppPage.vue";
import AppLoader from "@/components/AppLoader.vue";
import GithubUser from "@/components/GithubUser.vue";

const route = useRoute();

const login = computed(() => route.params.login as string);

const githubUserDetailsStore = useGithubUserDetailsStore();
const { user, loading, error } = storeToRefs(githubUserDetailsStore);
const { setLoading } = githubUserDetailsStore;

const isLoginFromCurrentUser = computed(
  () => user.value && user.value.login === login.value,
);

const shouldFetchUser = computed(
  () => !!login.value && !isLoginFromCurrentUser.value,
);

const isUserShown = computed(
  () => login.value.length > 0 && isLoginFromCurrentUser.value,
);

const isUserEmpty = computed(() => {
  if (!user.value) return true;

  const { name, company, location, url, bio } = user.value;
  return !name && !company && !location && !url && !bio;
});

if (shouldFetchUser.value) {
  setLoading(true);
  useSearchGithubUser(login.value);
}
</script>

<template>
  <AppPage is-navbar-minimal banner-image="developer">
    <template #content>
      <Transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-y-8 scale-65"
        enter-to-class="opacity-100 translate-y-0 scale-100"
      >
        <div v-if="isUserShown" class="w-full pt-32 lg:pt-56">
          <GithubUser />
        </div>
        <div
          v-else-if="loading"
          class="w-full h-screen flex items-center justify-center"
        >
          <AppLoader />
        </div>
        <div
          v-else-if="login && isUserEmpty"
          class="w-full h-screen flex items-center justify-center text-lg font-semibold text-secondary"
        >
          No user found with login "{{ login }}"
        </div>
        <div
          v-else-if="error"
          class="w-full h-screen flex items-center justify-center text-alert"
        >
          Error occurred while fetching user data: {{ error }}
        </div>
      </Transition>
    </template>
  </AppPage>
</template>

<style scoped></style>
