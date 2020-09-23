<script lang="ts">
  import Days from './components/days.svelte';
  import Spinner from './components/spinner.svelte';
  import { fetchItems } from './helpers/fetch-items';
  import { day } from './store';
  import type { Day } from './types';

  function format(timestamp: string) {
    return new Date(timestamp).toString().replace(/\sGMT.*$/, '');
  }

  function handleDayChange(event: CustomEvent<Day>) {
    $day = event.detail;
  }
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
</style>

<main>
  {#await fetchItems()}
    <Spinner />
  {:then items}
    <div class="container">
      <div class="days-wrapper">
        <Days day={$day} on:change={handleDayChange} />
      </div>
      <table>
        <thead>
          <tr>
            <td>timestamp</td>
            <td>checkins</td>
          </tr>
        </thead>
        <tbody>
          {#each items as item}
            <tr>
              <td>{format(item.timestamp)}</td>
              <td>{item.checkins}</td>
            </tr>
          {/each}
          <tr />
        </tbody>
      </table>
    </div>
  {:catch error}
    <h1>Error!</h1>
    <pre>{error}</pre>
  {/await}
</main>
