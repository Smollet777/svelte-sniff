<script>
  import Player from "./Player.svelte";

  export let players;
</script>

<style>

</style>

{#if !players.length}
  There is no players.
{:else}
  {#each players as player (player)}
    <svelte:component this={Player} {player} on:deleteplayer />
  {/each}
{/if}
