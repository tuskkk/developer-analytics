<template>
  <div class="relative overflow-hidden rounded bg-primary">
    <div class="skeleton-shimmer absolute inset-0" />
  </div>
</template>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 0.35) 40%,
    rgb(255 255 255 / 0.75) 50%,
    rgb(255 255 255 / 0.35) 60%,
    transparent 100%
  );

  animation: shimmer 1.6s linear infinite;
}

@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
