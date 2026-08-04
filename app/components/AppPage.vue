<template>
  <div>
    <div
      v-if="isLandingPage || bannerImage"
      class="relative overflow-hidden flex-1"
    >
      <div
        v-if="isLandingPage"
        class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/0 z-10"
      />
      <div
        v-else-if="bannerImage"
        class="absolute inset-0 bg-gradient-to-b from-white/50 via-white/0 to-white z-10"
      />
      <div
        :class="[
          bannerClasses,
          'absolute inset-0 bg-contain bg-center bg-no-repeat z-0',
        ]"
      />
      <div class="relative z-20 flex h-full flex-col justify-between">
        <AppNavbar
          :is-navbar-minimal="isNavbarMinimal"
          class="absolute top-0 left-0 z-30 w-full bg-transparent"
        />
        <AppContainer>
          <slot name="content" />
          <AppFooter v-if="isLandingPage" :is-transparent="true" />
        </AppContainer>
      </div>
    </div>
    <template v-else>
      <AppNavbar :is-navbar-minimal="isNavbarMinimal" />
    </template>
    <AppContainer v-if="!isLandingPage">
      <slot />
      <AppFooter />
    </AppContainer>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppContainer from "@/components/AppContainer.vue";

interface Props {
  isNavbarMinimal?: boolean;
  bannerImage?: string | null;
  isLandingPage?: boolean;
}

const {
  isNavbarMinimal = false,
  bannerImage = null,
  isLandingPage = false,
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
