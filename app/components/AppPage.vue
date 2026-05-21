<script setup lang="ts"></script>

<template>
  <div>
    <AppNavbar />
    <slot /> 
    <!-- todo: Add section with container after configuration of grid in Tailwind config -->
    <AppFooter />
  </div>
</template>

<style scoped></style>
