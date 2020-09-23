<script lang="ts">
  import { onMount } from 'svelte';
  import Days from './components/days.svelte';
  import Spinner from './components/spinner.svelte';
  import { fetchItems } from './helpers/fetch-items';
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

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function handleDayChange(event: CustomEvent<Day>) {
    $day = event.detail;
  }

  $: groups = groupedCheckins.get($day) ?? new Map<string, ParsedItem[]>();
  $: labels = [...groups.keys()];
</script>

<style lang="scss">
  .container {
    width: 1000px;
    margin: 0 auto;
  }

  .days-wrapper {
    display: flex;
    justify-content: center;
  }

  .flex {
    display: flex;
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
      <div class="flex">
        {#each labels as label}
          <table>
            <caption>{label}</caption>
            <thead>
              <tr>
                <th>time</th>
                <th>visits</th>
              </tr>
            </thead>
            <tbody>
              {#each groups.get(label) as { timestamp, checkins }}
                <tr>
                  <td>
                    {pad(timestamp.getHours())}<sup>{pad(timestamp.getMinutes())}</sup>
                  </td>
                  <td>{checkins}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/each}
      </div>
    </div>
  {/if}
</main>
