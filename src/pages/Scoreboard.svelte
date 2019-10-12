<script>
  import { onMount } from "svelte";
  import Player from "../Player.svelte";
  import AddPlayer from "../AddPlayer.svelte";

  let players = [];

  let fetching = true;

  onMount(async function() {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(json => {
        players = json.map(({ id, name, email }) => ({
          id,
          name,
          points: email.length
        }));
      })
      .finally(_ => (fetching = !fetching))
      .catch(console.log);
  });

  const addPlayer = e => {
    const newPlayer = e.detail;
    players = [...players, newPlayer];
  };

  const deletePlayer = e => {
    const playerToDelete = e.detail;
    players = players.filter(player => player.id !== playerToDelete.id);
  };
</script>

<style>

</style>

{#if fetching}
  Fetching data...
{:else if !players.length}
  There is no players.
{:else}
  {#each players as player}
    <Player {player} on:deleteplayer={deletePlayer} />
  {/each}
{/if}
<AddPlayer on:addplayer={addPlayer} />
