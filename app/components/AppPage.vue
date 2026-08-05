<template>
  <div>
    <div
      v-if="isLandingPage || bannerImage"
      class="relative overflow-hidden h-full"
    >
      <div
        v-if="isLandingPage"
        class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/0 z-10"
      />
      <div
        v-else-if="bannerImage"
        class="absolute inset-0 bg-gradient-to-b from-white/50 via-white/0 to-white z-10"
      />
      <picture>
        <source
          media="(min-width: 768px)"
          :srcset="`/images/${bannerImage}_desktop.webp`"
        />
        <NuxtImg
          :src="`/images/${bannerImage}_mobile.webp`"
          :alt="`${bannerImage} image`"
          class="absolute inset-0 w-full object-top"
          :class="[
            bannerImage === 'landing' ? 'object-cover h-full' : 'h-auto',
          ]"
          preload
          fetchpriority="high"
        />
      </picture>
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
</script>
