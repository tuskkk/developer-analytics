<script setup lang="ts">
import { Search } from "@lucide/vue";

const model = defineModel<string>({
  default: "",
});

defineProps<{
  placeholder?: string;
}>();
</script>

<template>
  <div class="relative">
    <Search
      :size="24"
      class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 md:left-3"
    />

    <input
      v-model="model"
      type="search"
      :placeholder="placeholder ?? 'Search...'"
      class="w-full h-full rounded-lg border border-gray-500 py-2 pl-8 pr-0.5 text-sm outline-none transition-colors focus:border-primary md:pl-11 md:pr-4"
    />
  </div>
</template>
