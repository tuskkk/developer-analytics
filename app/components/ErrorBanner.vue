<template>
  <div v-if="message" class="rounded bg-primary p-4 text-alert">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
