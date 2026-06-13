<template>
  <article
    v-if="user"
    class="relative flex flex-col gap-6 py-3.5 px-4 bg-white border rounded-lg shadow-lg lg:py-5 lg:px-28"
  >
    <img
      :src="user.avatarUrl"
      :alt="`${user.login} avatar`"
      class="absolute left-1/2 -translate-x-1/2 -top-10 w-28 h-28 rounded-full object-cover shrink-0 shadow-xl lg:w-36 lg:h-36 lg:-top-16"
    />
    <div class="flex-1 items-center text-center pt-20 lg:pt-28">
      <h1 class="text-4xl text-primaryText mb-4 tracking-tight">
        {{ user.name || user.login }}
      </h1>
      <p class="mb-4 text-sm text-secondary font-bold tracking-widest">
        @{{ user.login }}
      </p>
      <div
        class="flex flex-wrap items-center justify-center gap-3 mb-4 text-sm text-secondaryText tracking-wide"
      >
        <span v-if="user.company">
          <BriefcaseBusiness
            class="inline-block mr-1 text-secondaryText text-uppercase"
          />
          {{ user.company }}
        </span>
        <span v-if="user.location">
          <MapPin class="inline-block mr-1 text-secondaryText text-uppercase" />
          {{ user.location }}
        </span>
      </div>
      <div class="mb-8 lg:mb-0">
        <a
          v-if="user.url"
          :href="user.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          {{ user.url }}
        </a>
      </div>
      <GithubUserStats />
    </div>
    <div
      class="flex-1 items-center text-center pt-4 text-base border-t border-tertiary lg:text-lg"
    >
      <p v-if="user.bio" class="mb-4 text-primaryText tracking-wide">
        {{ user.bio }}
      </p>
    </div>
    <div
      v-if="user?.organizations.nodes.length"
      class="flex flex-col justify-center items-center mb-4 text-center text-base text-primaryText tracking-wider lg:text-lg"
    >
      Organizations:
      <ul class="flex flex-wrap items-center justify-center gap-5 pt-4">
        <li v-for="org in user.organizations.nodes" :key="org.login">
          <!-- todo: replace link text with tooltip -->
          <a
            :href="org.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 justify-center text-sm text-blue-600 hover:underline"
          >
            <img
              :src="org.avatarUrl"
              :alt="`${org.login} avatar`"
              class="w-12 h-12 rounded-full object-cover"
            />
            <span class="hidden lg:block">{{ org.name || org.login }}</span>
          </a>
        </li>
      </ul>
    </div>
    <section
      v-if="user?.repositories.nodes.length"
      class="mb-16 flex flex-col items-center"
    >
      <GithubUserRepositories data-type="pinnedItems" />
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
      <div
        v-else-if="repositoriesError"
        class="relative w-full h-14 mb-4 flex items-center justify-center text-alert z-10"
      >
        Error occurred while fetching user data: {{ repositoriesError }}
      </div>
    </section>
    <p v-else class="text-center text-secondaryText mb-4">
      This user has no public repositories.
    </p>
  </article>
</template>

<script setup lang="ts">
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";
import { MapPin, BriefcaseBusiness } from "@lucide/vue";
import GithubUserStats from "@/components/GithubUserStats.vue";
import GithubUserRepositories from "@/components/GithubUserRepositories.vue";
import GithubUserTechStack from "@/components/GithubUserTechStack.vue";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user, repositoriesLoading, repositoriesError, showLoadMoreButton } =
  storeToRefs(githubUserDetailsStore);

const loadMoreRepositories = () => {
  const login = user.value?.login as string;
  const first = 20;
  const after = user.value?.repositories.pageInfo.endCursor as string;

  githubUserDetailsStore.setRepositoriesLoading(true);
  useLoadMoreRepositories(login, first, after);
};
</script>
