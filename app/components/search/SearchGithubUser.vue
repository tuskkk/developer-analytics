<template>
  <form class="relative max-w-full" @submit.prevent="handleNavigate">
    <SearchBar
      v-model="login"
      :is-big="isBig"
      placeholder="Enter GitHub username..."
      @input="handleSearch"
      @keydown="handleKeydown"
    />
    <SearchAutocomplete
      class="max-w-full"
      :query="login"
      :suggestions="suggestions"
      :active-index="activeIndex"
      @select="handleSelect"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { GithubUserBasic } from "@/types/GithubUserSearchResponse";
import { useGithubUserSearchStore } from "@/stores/githubUserSearch";

interface Props {
  isBig?: boolean;
}

const { isBig = false } = defineProps<Props>();

const login = ref("");
const activeIndex = ref(-1);

const githubUserSearchStore = useGithubUserSearchStore();
const { suggestions } = storeToRefs(githubUserSearchStore);
const { searchGithubUsers } = githubUserSearchStore;

const handleKeydown = (event: KeyboardEvent) => {
  if (!suggestions.value.length) return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();

      activeIndex.value =
        activeIndex.value < suggestions.value.length - 1
          ? activeIndex.value + 1
          : 0;
      break;

    case "ArrowUp":
      event.preventDefault();

      activeIndex.value =
        activeIndex.value > 0
          ? activeIndex.value - 1
          : suggestions.value.length - 1;
      break;

    case "Enter":
      if (activeIndex.value >= 0 && suggestions.value[activeIndex.value]) {
        event.preventDefault();
        handleSelect(suggestions.value[activeIndex.value] as GithubUserBasic);
      }
      break;

    case "Escape":
      activeIndex.value = -1;
      break;
  }
};

const handleSearch = () => {
  if (login.value.length < 3) {
    return;
  }
  searchGithubUsers(login.value);
};

const handleSelect = (userData: GithubUserBasic) => {
  login.value = userData.login;
  handleNavigate();
};

const handleNavigate = async () => {
  await navigateTo({
    path: `/githubUser/${login.value?.trim()}/`,
  });
  login.value = "";
};
</script>
