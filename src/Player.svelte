<script>
  import { createEventDispatcher } from "svelte";

  import { fade, fly } from "svelte/transition";
  import { sineIn } from "svelte/easing";
  import { tweened } from "svelte/motion";

  const dispatch = createEventDispatcher();
  const points = tweened(0, {
    duration: 1000
  });

  export let player;
  let showControls = false;

  const toggleControls = () => (showControls = !showControls);
  const increment = () => points.update(n => n + 1);
  const decrement = () => points.update(n => n - 1);

  const onDelete = () => {
    dispatch("deleteplayer", player);
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
  .active {
    color: var(--primary-color);
  }
</style>

<div
  class="card"
  out:fade|local
  in:customFade={{ duration: 1000 }}
  on:introend={points.set(player.points)}
  on:outrostart={e => (e.target.innerText = 'deleting...')}>

  <h2 class:active={showControls}>
    {player.name}
    <button class="btn btn-sm" on:click={toggleControls} title="show/hide info">
      {#if showControls}
        <i class="fas fa-caret-down" aria-label="hide user info" />
      {:else}
        <i class="fas fa-caret-up" aria-label="show user info" />
      {/if}
    </button>
    <button
      class="btn btn-danger btn-sm"
      on:click={onDelete}
      title="delete user">
      <i class="fas fa-user-times" aria-label="delete user" />
    </button>
  </h2>
  gender: {player.gender}
  <h3>Points: {$points}</h3>
  {#if showControls}
    <button class="btn" on:click={increment}>+1</button>
    <button class="btn btn-dark" on:click={decrement}>-1</button>
    <input
      type="number"
      on:change={e => points.set(+e.target.value)}
      value={$points} />
  {/if}

</div>
