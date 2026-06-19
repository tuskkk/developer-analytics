<template>
  <form @submit.prevent="handleNavigate">
    <SearchBar
      v-model="login"
      :is-big="isBig"
      placeholder="Enter GitHub username..."
      @input="handleSearch"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useGithubUserSearchStore } from "~/stores/githubUserSearch";

interface Props {
  isBig?: boolean;
}

const { isBig = false } = defineProps<Props>();

const login = ref("");

const githubUserSearchStore = useGithubUserSearchStore();
//const { suggestions, error } = storeToRefs(githubUserSearchStore);
const { searchGithubUsers } = githubUserSearchStore;

const handleSearch = () => {
  if (login.value.length < 3) {
    return;
  }
  searchGithubUsers(login.value);
};

const handleNavigate = () => {
  navigateTo({
    path: `/githubUser/${login.value?.trim()}/`,
  });
};
</script>
