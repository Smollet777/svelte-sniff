<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let name;
  export let points;
  let showControls = false;

  const toggleControls = () => (showControls = !showControls);
  const increment = () => points++;
  const decrement = () => points--;

  const onDelete = () => {
    dispatch("deleteplayer", name);
  };
</script>

<style>
  h3 {
    margin-bottom: 10px;
  }
</style>

<div class="card">
  <h2>
    {name}
    <button class="btn btn-sm" on:click={toggleControls}>
      {#if showControls}^{:else}v{/if}
    </button>
    <button class="btn btn-danger btn-sm" on:click={onDelete}>x</button>
  </h2>
  <h3>Points: {points}</h3>
  {#if showControls}
    <button class="btn" on:click={increment}>+1</button>
    <button class="btn btn-dark" on:click={decrement}>-1</button>
    <input type="number" bind:value={points} />
  {/if}
</div>
