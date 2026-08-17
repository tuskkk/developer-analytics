<template>
  <section ref="techStackSection" class="w-full mb-16">
    <h2 class="mb-4 text-3xl tracking-tight text-primaryText">
      Tech stack analytics
    </h2>
    <article
      v-if="areThereRepositories && areThereLanguages"
      class="mx-auto rounded-lg bg-white py-3.5 md:px-4 md:max-w-2xl"
    >
      <ClientOnly>
        <LazyDonutChart
          v-if="shouldLoadChart"
          :options="options"
          :series="series"
          unit="%"
        />
      </ClientOnly>
    </article>
    <p v-else class="text-secondaryText">
      No repositories with languages found for this user.
    </p>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGithubUserDetailsStore } from "~/stores/githubUserDetails";

const githubUserDetailsStore = useGithubUserDetailsStore();

const { user } = storeToRefs(githubUserDetailsStore);

const techStackSection = ref<HTMLElement | null>(null);
const shouldLoadChart = ref(false);

const nodes = computed(() => user.value?.repositories.nodes);

const areThereRepositories = computed(
  () => nodes.value && nodes.value.length > 0,
);

const languageUsage = computed(() => {
  const map = new Map<string, number>();

  if (!nodes.value) {
    return map;
  }

  for (const repo of nodes.value) {
    for (const language of repo.languages.edges) {
      const current = map.get(language.node.name) ?? 0;

      map.set(language.node.name, current + language.size);
    }
  }

  return map;
});

const options = computed(() => Array.from(languageUsage.value.keys()));

const series = computed(() => {
  const numbers = Array.from(languageUsage.value.values());
  const sum = numbers.reduce((acc, currentValue) => acc + currentValue, 0);
  return numbers.map((value) => Math.round((value / sum) * 1000) / 10);
});

const areThereLanguages = computed(() => options.value.length > 0);

onMounted(() => {
  if (!techStackSection.value) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        return;
      }

      shouldLoadChart.value = true;
      observer.disconnect();
    },
    { rootMargin: "300px" },
  );

  observer.observe(techStackSection.value);
});
</script>
