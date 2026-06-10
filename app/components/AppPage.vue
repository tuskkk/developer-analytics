<script setup lang="ts">
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";

interface Props {
  isNavbarMinimal?: boolean;
  bannerImage?: string | null;
  showBannerMask?: boolean;
}

const {
   isNavbarMinimal = false,
   bannerImage = null,
   showBannerMask = false
 } = defineProps<Props>();

  const bannerClasses = computed(() => {
  switch (bannerImage) {
    case "developer":
      return "bg-contain bg-top bg-no-repeat bg-developer-mobile md:bg-developer-desktop";

    case "landing":
      return "bg-cover bg-center bg-landing-mobile md:bg-landing-desktop";

    default:
      return "";
  }
});
</script>

<template>
  <div v-if="isNavbarMinimal" class="relative">
    <div
      v-if="showBannerMask"
      class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/0 z-0"
    />
    <div :class="[bannerClasses, 'z-10']">
      <AppNavbar
        is-navbar-minimal
        class="absolute top-0 left-0 z-20 w-full bg-transparent"
      />
      <slot name="content" />
    </div>
  </div>
  <template v-else>
    <AppNavbar :is-navbar-minimal="isNavbarMinimal" />
  </template>
  <AppContainer>
    <slot />
    <AppFooter />
  </AppContainer>
</template>
