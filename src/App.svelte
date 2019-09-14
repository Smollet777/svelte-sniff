<script>
  import Navbar from "./Navbar.svelte";
  import Player from "./Player.svelte";
  import AddPlayer from "./AddPlayer.svelte";

  let players = [
    {
      name: "John Doe",
      points: 53
    },
    {
      name: "Sam Smith",
      points: 45
    },
    {
      name: "Sara Wilson",
      points: 34
    }
  ];

  const addPlayer = e => {
    const newPlayer = e.detail;
    players = [...players, newPlayer];
  };

  const deletePlayer = e => {
    const playerToDelete = e.detail;
    players = players.filter(player => player.name !== playerToDelete);
  };
</script>

<style>

</style>

<Navbar />
<div class="container">
  {#if !players}
    There is no players.
  {:else}
    {#each players as player}
      <Player
        name={player.name}
        points={player.points}
        on:deleteplayer={deletePlayer} />
    {/each}
  {/if}
  <AddPlayer on:addplayer={addPlayer} />
</div>
