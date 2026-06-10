<template>
  <section v-if="user?.repositories.nodes.length" class="mb-4">
    <h2 class="mb-4 text-3xl tracking-tight text-primaryText">
      Top repositories
    </h2>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="repository in user.repositories.nodes"
        :key="repository.id"
        class="rounded-xl border border-tertiary bg-white p-5"
      >
        <div class="mb-3 flex items-start justify-between gap-4">
          <a
            :href="repository.url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-secondary hover:underline"
          >
            {{ repository.name }}
          </a>
        </div>

        <p
          v-if="repository.description"
          class="mb-4 line-clamp-2 text-sm text-primaryText"
        >
          {{ repository.description }}
        </p>

        <div class="flex flex-wrap gap-4 text-sm text-secondaryText">
          <div class="flex items-center gap-1">
            <Star :size="16" />
            {{ repository.stargazerCount }}
          </div>

          <div class="flex items-center gap-1">
            <GitFork :size="16" />
            {{ repository.forkCount }}
          </div>

          <div
            v-if="repository.primaryLanguage"
            class="flex items-center gap-1"
          >
            <Circle
              :size="14"
              :fill="repository.primaryLanguage.color || 'currentColor'"
              :color="repository.primaryLanguage.color || 'currentColor'"
            />
            {{ repository.primaryLanguage.name }}
          </div>
        </div>

        <div
          class="mt-4 border-t border-tertiary pt-4 text-sm text-primaryText"
        >
          Updated
          {{ new Date(repository.updatedAt).toLocaleDateString() }}
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";
import { Star, GitFork, Circle } from "@lucide/vue";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);
</script>
