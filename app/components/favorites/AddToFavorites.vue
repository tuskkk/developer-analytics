<template>
  <div
    class="flex items-center text-secondary tracking-wider text-sm mx-auto w-52 h-14 cursor-pointer"
    @click="$emit('toggleFavorites', login)"
  >
    <Heart
      class="mr-3 transition-all duration-300 ease-in-out"
      :size="28"
      :fill="isFavorite ? 'currentColor' : 'white'"
    />
    <Transition name="fade" mode="out-in">
      <span :key="favoriteText">
        {{ favoriteText }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Heart } from "@lucide/vue";

const props = defineProps<{ isFavorite: boolean; login: string }>();
defineEmits<{ (e: "toggleFavorites", login: string): void }>();

const favoriteText = computed(() =>
  props.isFavorite ? "Remove from favorites" : "Add to favorite users",
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
