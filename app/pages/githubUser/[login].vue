<template>
  <AppPage banner-image="developer">
    <template #content>
      <div v-if="userError" class="w-full h-screen pt-32">
        <ErrorBanner
          class="relative w-full h-14 flex z-10"
          :message="userError"
        />
      </div>
      <div v-else-if="isUserShown || !initialized || loading" class="relative">
        <div
          v-show="!initialized || loading"
          class="absolute inset-0w-full pt-32"
        >
          <GithubUserSkeleton />
        </div>
        <div class="w-full pt-32">
          <GithubUser :class="{ invisible: !initialized || loading }" />
        </div>
      </div>
      <div
        v-else-if="login && isUserEmpty"
        class="relative w-full h-screen flex items-start justify-start text-2xl text-secondary tracking-widest pt-24 z-10"
      >
        No user found with login "{{ login }}"
      </div>
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

useSeoMeta({
  title: () =>
    user.value?.name
      ? `${user.value.name} (@${user.value.login})`
      : (user.value?.login ?? "GitHub User"),
  description: () =>
    user.value?.bio ?? `GitHub profile of ${user.value?.login}`,
  ogTitle: `${user.value?.name} (@${user.value?.login})`,
  ogDescription: user.value?.bio,
  ogImage: user.value?.avatarUrl,
});

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
  if (!shouldFetchUser.value) {
    return user.value;
  }

  setLoading(true);

  return await fetchGithubUser(login.value);
};

await useAsyncData(
  () => `github-user-${login.value}`,
  () => fetchUserData(),
  { watch: [login] },
);
</script>
