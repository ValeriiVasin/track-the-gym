<script type="ts">
  import { onMount } from 'svelte';
  import { renderChart } from '../helpers/render-chart';

  // export let label: string;

  let chart: HTMLDivElement;

  onMount(() => {
    renderChart(chart);
  });
</script>

<style>
  .chart {
    width: 800px;
    height: 600px;
  }
</style>

<div bind:this={chart} class="chart" />
