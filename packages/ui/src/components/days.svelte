<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Day } from '../types';

  export let day: Day;

  const dispatch = createEventDispatcher();

  const days = [
    Day.Monday,
    Day.Tuesday,
    Day.Wednesday,
    Day.Thursday,
    Day.Friday,
    Day.Saturday,
    Day.Sunday,
  ];
</script>

<style lang="scss">
  .days {
    display: flex;
  }

  .day {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: lightgray;
    }

    &.is-active {
      background-color: green;
      color: white;
      pointer-events: none;
    }
  }
</style>

<ul class="days">
  {#each days as weekDay}
    <li
      class="day"
      class:is-active={weekDay === day}
      on:click={() => dispatch('change', weekDay)}>
      {weekDay}
    </li>
  {/each}
</ul>
