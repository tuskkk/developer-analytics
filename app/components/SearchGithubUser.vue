<template>
  <div class="w-full">
    <form @submit.prevent="handleSearch">
      <SearchBar
        v-model="login"
        :is-big="isBig"
        class="h-10 w-full max-w-80 mx-auto mb-6"
        placeholder="Enter GitHub username..."
      />
    </form>

    <div
      v-if="user"
      class="w-full grid grid-cols-6 gap-2.5 xl:grid-cols-12 xl:gap-gutterXl"
    >
      <h2>{{ user.name }}</h2>
      <!-- todo: remove this after adding more user details on the search results page -->
      <!--<img :src="user.avatarUrl" :alt="user.login" width="120" />

      <p>@{{ user.login }}</p>

      <p>{{ user.bio }}</p>

      <h3>Repositories</h3>

      <ul v-if="repositories.length">
        <li v-for="repository in repositories" :key="repository.id">
          {{ repository.name }}
          ⭐ {{ repository.stargazerCount }}
        </li>
      </ul>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";

interface Props {
  isBig?: boolean;
}

const { isBig = false } = defineProps<Props>();

const login = ref("");
// todo: move this to pinia store
const { user, searchUser } = useGithubUser();

const handleSearch = async () => {
  if (!login.value.trim()) return;
  console.log("HANDLE SEARCH", login.value);
  await searchUser(login.value.trim());
};
</script>
