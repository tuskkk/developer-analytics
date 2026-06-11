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

// const githubUserDetailsStore = useGithubUserDetailsStore();
// const { user } = storeToRefs(githubUserDetailsStore);

const handleSearch = () => {
  // currently hidden, as user data are needed no sooner as after navigating to the user page
  // useSearchGithubUser(login.value);

  navigateTo({
    path: `/githubUser/${login.value?.trim()}/`,
  });
};
</script>
