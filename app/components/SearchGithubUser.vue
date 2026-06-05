<template>
  <form @submit.prevent="handleSearch">
    <SearchBar
      v-model="login"
      :is-big="isBig"
      placeholder="Enter GitHub username..."
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";

interface Props {
  isBig?: boolean;
}

const { isBig = false } = defineProps<Props>();

const login = ref("");

const handleSearch = () => {
  console.log("HANDLE SEARCH", login.value);
  useSearchGithubUser(login.value);
};
</script>
