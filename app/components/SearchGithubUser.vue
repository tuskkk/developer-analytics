<template>
  <div class="search-github-user">
    <form @submit.prevent="handleSearch">
      <input v-model="login" type="text" placeholder="Enter GitHub username" />

      <button type="submit">Search</button>
    </form>

    <div v-if="user">
      <h2>{{ user.name }}</h2>

      <img :src="user.avatarUrl" :alt="user.login" width="120" />

      <p>@{{ user.login }}</p>

      <p>{{ user.bio }}</p>

      <h3>Repositories</h3>

      <ul v-if="repositories.length">
        <li v-for="repository in repositories" :key="repository.id">
          {{ repository.name }}
          ⭐ {{ repository.stargazerCount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const login = ref("");
// todo: move this to pinia store
const { user, repositories, searchUser } = useGithubUser();

const handleSearch = async () => {
  if (!login.value.trim()) return;
  console.log("HANDLE SEARCH", login.value);
  await searchUser(login.value.trim());
};
</script>
