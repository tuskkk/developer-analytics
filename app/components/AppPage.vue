<template>
  <div v-if="showDarkBannerMask || bannerImage" class="relative">
    <div
      v-if="showDarkBannerMask"
      class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/0 z-0"
    />
    <div
      v-else-if="bannerImage"
      class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/0 to-white z-0"
    />
    <div :class="[bannerClasses, 'bg-cover max-h-screen z-10']">
      <AppNavbar
        :is-navbar-minimal="isNavbarMinimal"
        class="absolute top-0 left-0 z-20 w-full bg-transparent"
      />
      <AppContainer>
        <slot name="content" />
      </AppContainer>
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

<script setup lang="ts">
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";

interface Props {
  isNavbarMinimal?: boolean;
  bannerImage?: string | null;
  showDarkBannerMask?: boolean;
}

const {
  isNavbarMinimal = false,
  bannerImage = null,
  showDarkBannerMask = false,
} = defineProps<Props>();

const bannerClasses = computed(() => {
  switch (bannerImage) {
    case "developer":
      return "bg-top bg-no-repeat bg-developer-mobile md:bg-developer-desktop";

    case "landing":
      return "bg-center bg-landing-mobile md:bg-landing-desktop";

    default:
      return "";
  }
});
</script>
