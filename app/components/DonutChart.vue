<template>
  <VueApexCharts
    v-if="series.length"
    type="donut"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup lang="ts">
const VueApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));
const baseOptions = useApexChartOptions();
const props = defineProps<{
  options: number[] | string[];
  series: number[] | string[];
  unit?: string;
}>();

const chartOptions = computed(() => ({
  ...baseOptions,
  labels: props.options,
  tooltip: {
    y: {
      formatter: unitFormatter,
    },
  },
}));

const unitFormatter = (value: number) => {
  if (!props.unit) {
    return value;
  }

  return `${value}${props.unit}`;
};
</script>
