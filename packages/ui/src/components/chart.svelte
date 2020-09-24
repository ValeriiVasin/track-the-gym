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
    width: 100vw;
    height: 80vh;
    max-height: 600px;
    /* ios bottom menu */
    margin-bottom: 32px;
  }
</style>

<div bind:this={chart} class="chart" />
<svelte:window on:resize={render} />
