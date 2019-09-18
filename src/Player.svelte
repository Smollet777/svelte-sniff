<script>
  import { createEventDispatcher } from "svelte";

  import { fade, fly } from "svelte/transition";
  import { sineIn } from "svelte/easing";

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

  function customFade(node, { duration }) {
    return {
      duration,
      css: t => {
        const eased = sineIn(t);

        return `
					opacity:${eased};
				`;
      }
    };
  }
</script>

<style>
  h3 {
    margin-bottom: 10px;
  }
</style>

<div
  class="card"
  out:fade
  in:customFade={{ duration: 1000 }}
  on:outrostart={e => (e.target.innerText = 'deleting...')}>
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
