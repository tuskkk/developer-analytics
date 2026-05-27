<script setup lang="ts">
import { Search, X } from "@lucide/vue";

const model = defineModel<string>({
  default: "",
});
const inputRef = ref<HTMLInputElement>();

defineProps<{
  placeholder?: string;
}>();
const clearSearch = () => {
  model.value = "";
  inputRef.value?.focus();
};
</script>

<template>
  <div class="relative">
    <Search
      :size="14"
      class="absolute left-2 top-1/2 -translate-y-1/2 text-primaryText md:left-3"
    />

    <input
      ref="inputRef"
      v-model="model"
      name="search"
      type="text"
      :placeholder="placeholder ?? 'Search...'"
      class="w-full h-full border border-primary rounded-2xl py-2 pl-8 pr-0.5 text-sm outline-none transition-colors hover:border-primaryText focus:border-primaryText md:pl-11 md:pr-4"
    />
    <button
      v-if="model"
      type="button"
      aria-label="Clear search"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-tertiary transition-colors hover:text-primaryText"
      @click="clearSearch"
    >
      <X :size="16" />
    </button>
  </div>
</template>
