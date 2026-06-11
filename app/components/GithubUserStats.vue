<template>
  <div
    class="flex flex-wrap items-center justify-center gap-8 text-sm mb-10 lg:absolute lg:top-3.5 lg:left-36 lg:mb-0"
  >
    <div
      class="flex flex-col items-center text-sm text-secondaryText tracking-wide"
    >
      <span class="text-2xl text-secondary mb-2">
        {{ user?.followers.totalCount }}
      </span>
      followers
    </div>

    <div
      class="flex flex-col items-center text-sm text-secondaryText tracking-wide"
    >
      <span class="text-2xl text-secondary mb-2">
        {{ user?.following.totalCount }}
      </span>
      following
    </div>

    <div
      class="flex flex-col items-center text-sm text-secondaryText tracking-wide"
    >
      <span class="text-2xl text-secondary mb-2">
        {{ user?.repositories.totalCount }}
      </span>
      repositories
    </div>
  </div>
  <div
    class="flex flex-wrap items-center justify-center gap-8 text-sm mb-10 lg:absolute lg:top-3.5 lg:right-36 lg:mb-0"
  >
    <div
      class="flex flex-col items-center text-sm text-secondaryText tracking-wide"
    >
      <span class="text-2xl text-secondary mb-2">
        {{ totalStars }}
      </span>
      stars
    </div>
    <div
      class="flex flex-col items-center text-sm text-secondaryText tracking-wide"
    >
      <span class="text-2xl text-secondary mb-2">
        {{ totalForks }}
      </span>
      forks
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);

const countTotalProperty = (property: "stargazerCount" | "forkCount") => {
  return user.value?.repositories.nodes.reduce(
    (sum, repo) => sum + repo[property],
    0,
  );
};

const totalStars = computed(() => {
  return countTotalProperty("stargazerCount");
});

const totalForks = computed(() => {
  return countTotalProperty("forkCount");
});
</script>
