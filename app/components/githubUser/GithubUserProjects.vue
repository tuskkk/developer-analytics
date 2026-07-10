<template>
  <section class="mb-16 flex flex-col items-center">
    <GithubUserRepositories
      v-if="user?.pinnedItems.nodes.length"
      data-type="pinnedItems"
    />
    <GithubUserTechStack />
    <GithubUserRepositories data-type="repositories" />
    <button
      v-if="showLoadMoreButton"
      class="px-5 py-3.5 mb-4 bg-white text-secondary rounded shadow-lg border border-tertiary uppercase hover:bg-secondary hover:text-white transition-colors"
      @click="loadMoreRepositories"
    >
      Load More
    </button>
    <div
      v-else-if="repositoriesLoading"
      class="relative w-full h-14 mb-4 flex items-center justify-center z-10"
    >
      <AppLoader />
    </div>
    <ErrorBanner
      v-else-if="repositoriesError"
      class="relative w-full h-14 mb-4 z-10"
      :message="repositoriesError"
    />
  </section>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user, repositoriesLoading, repositoriesError, showLoadMoreButton } =
  storeToRefs(githubUserDetailsStore);
const { setRepositoriesLoading, fetchMoreRepositories } =
  githubUserDetailsStore;

const loadMoreRepositories = () => {
  const login = user.value?.login as string;
  const first = 20;
  const after = user.value?.repositories.pageInfo.endCursor as string;

  setRepositoriesLoading(true);
  fetchMoreRepositories(login, first, after);
};
</script>
