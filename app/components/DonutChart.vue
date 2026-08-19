<template>
  <VueApexCharts
    v-if="series.length"
    type="donut"
    height="360"
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
  fill: {
    type: "gradient",
  },
  tooltip: {
    y: {
      formatter: unitFormatter,
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          height: 400,
        },
        legend: {
          position: "bottom",
          fontSize: "12px",
        },
      },
    },
  ],
}));

const unitFormatter = (value: number) => {
  if (!props.unit) {
    return value;
  }

  return `${value}${props.unit}`;
};
</script>
