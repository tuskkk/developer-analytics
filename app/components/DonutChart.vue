<template>
  <apexchart
    type="donut"
    :options="{
      ...baseOptions,
      labels: options,
      tooltip: { y: { formatter: unitFormatter },
    } }"
    :series="series"
  />
</template>

<script setup lang="ts">
const baseOptions = useApexChartOptions();
const props = defineProps<{
  options: number[] | string[];
  series: number[] | string[];
  unit?: string;
}>();

const unitFormatter = (value: number) => {
  if (!props.unit) {
    return value;
  }

  return `${value}${props.unit}`;
};
</script>
