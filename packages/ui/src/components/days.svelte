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

  const handleSelectChange: svelte.JSX.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch('change', event.target.value);
  };
</script>

<style lang="scss">
  .days {
    display: none;
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

  @media only screen and (min-width: 768px) {
    .days {
      display: flex;
    }
    .selector {
      display: none;
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

<!-- svelte-ignore a11y-no-onchange -->
<select class="selector" value={day} on:change={handleSelectChange}>
  {#each days as weekDay}
    <option value={weekDay}>{weekDay}</option>
  {/each}
</select>
