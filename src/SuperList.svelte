<script>
  import { createEventDispatcher } from "svelte";

  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  export let items;

  const dispatch = createEventDispatcher();
  function completion(item) {
    dispatch("completion", item);
  }
  function remove(item) {
    dispatch("delete", item);
  }

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
</script>

<style>
  label {
    top: 0;
    left: 0;
    display: block;
    font-size: 1em;
    line-height: 1;
    padding: 0.5em;
    margin: 0 auto 0.5em auto;
    border-radius: 2px;
    background-color: #eee;
    user-select: none;
  }

  button {
    float: right;
    height: 1em;
    box-sizing: border-box;
    padding: 0 0.5em;
    line-height: 1;
    background-color: transparent;
    border: none;
    color: rgb(170, 30, 30);
    opacity: 0;
    transition: opacity 0.2s;
  }

  label:hover button {
    opacity: 1;
  }
</style>

{#each items as item (item.id)}
  <label in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
    <input
      type="checkbox"
      bind:checked={item.completed}
      on:change={() => completion(item)} />
    {item.title}
    <button on:click={() => remove(item)} title="remove">
      <i class="fas fa-times" aria-label="remove" />
    </button>
  </label>
{/each}
