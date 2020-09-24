<script type="ts">
  import { afterUpdate } from 'svelte';
  import { renderChart } from '../helpers/render-chart';

  // https://developers.google.com/chart/interactive/docs/gallery/linechart
  export let dataset;

  let chart: HTMLDivElement;

  const render = () => renderChart(chart, dataset);

  afterUpdate(render);
</script>

<style>
  .chart {
    width: 100%;
    height: 600px;
  }
</style>

<div bind:this={chart} class="chart" />
<svelte:window on:resize={render} />
