<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from './components/chart.svelte';
  import Days from './components/days.svelte';
  import Spinner from './components/spinner.svelte';
  import { fetchItems } from './helpers/fetch-items';
  import { getChartDataset } from './helpers/get-dataset';
  import { groupCheckins } from './helpers/group-checkins';
  import { parseDate } from './helpers/parse-date';
  import { day } from './store';
  import type { Day, GroupedCheckins, Item, ParsedItem } from './types';

  let loading = true;
  let groupedCheckins: GroupedCheckins = new Map();
  let error: unknown;

  function parseCheckins(items: Item[]): ParsedItem[] {
    return items.map(({ timestamp, checkins }) => ({
      checkins,
      timestamp: parseDate(timestamp),
    }));
  }

  onMount(async () => {
    try {
      groupedCheckins = groupCheckins(parseCheckins(await fetchItems()));
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  });

  function handleDayChange(event: CustomEvent<Day>) {
    $day = event.detail;
  }

  $: groups = groupedCheckins.get($day) ?? new Map<string, ParsedItem[]>();
  $: dataset = getChartDataset(groups);
</script>

<style lang="scss">
  .container {
    padding: 0 100px;
    margin: 0 auto;
  }

  .days-wrapper {
    display: flex;
    justify-content: center;
  }

  .chart {
    display: flex;
    justify-content: center;
  }
</style>

<main>
  {#if loading}
    <Spinner />
  {:else if error}
    <h1>Error!</h1>
    <pre>{error}</pre>
  {:else}
    <div class="container">
      <div class="days-wrapper">
        <Days day={$day} on:change={handleDayChange} />
      </div>

      <div class="chart">
        <Chart {dataset} />
      </div>
    </div>
  {/if}
</main>
