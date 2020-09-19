<script lang="ts">
  import { fetchItems } from './helpers/fetch-items';

  function format(timestamp: string) {
    return new Date(timestamp).toString().replace(/\sGMT.*$/, '');
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#await fetchItems()}
    <h1>Loading...</h1>
  {:then items}
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
  {:catch error}
    <h1>Error!</h1>
    <pre>{error}</pre>
  {/await}
</main>
