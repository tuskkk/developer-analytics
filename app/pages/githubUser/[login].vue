<template>
  <AppPage banner-image="developer">
    <template #content>
      <Transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-y-8 scale-65"
        enter-to-class="opacity-100 translate-y-0 scale-100"
      >
        <div v-if="userError" class="w-full h-screen pt-32">
          <ErrorBanner
            class="relative w-full h-14 flex z-10"
            :message="userError"
          />
        </div>
        <div
          v-else-if="!initialized || loading"
          class="relative w-full h-screen flex items-center justify-center z-10"
        >
          <AppLoader />
        </div>
        <div v-else-if="isUserShown" class="w-full pt-32">
          <GithubUser />
        </div>
        <div
          v-else-if="login && isUserEmpty"
          class="relative w-full h-screen flex items-start justify-start text-2xl text-secondary tracking-widest pt-24 z-10"
        >
          No user found with login "{{ login }}"
        </div>
      </Transition>
    </template>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();

const login = computed(() => route.params.login as string);

const githubUserDetailsStore = useGithubUserDetailsStore();
const { user, loading, userError, initialized } = storeToRefs(
  githubUserDetailsStore,
);
const { setLoading, fetchGithubUser } = githubUserDetailsStore;

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

const fetchUserData = async () => {
  if (shouldFetchUser.value) {
    setLoading(true);
    await fetchGithubUser(login.value);
  }
};

onMounted(async () => fetchUserData());

watch(login, async () => fetchUserData());
</script>
