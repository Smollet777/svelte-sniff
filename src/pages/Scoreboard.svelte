<script>
  import { onMount } from "svelte";
  import PlayerList from "../PlayerList.svelte";
  import AddPlayer from "../AddPlayer.svelte";

  let players = [];

  let fetching = true;

  onMount(async function() {
    const getGenderForBot = str => (str.length % 2 ? "male" : "female");

    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(json => {
        players = json.map(({ id, name, email }) => ({
          id,
          name,
          points: email.length,
          gender: getGenderForBot(email)
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
{:else}
  <PlayerList {players} on:deleteplayer={deletePlayer} />
{/if}
<AddPlayer on:addplayer={addPlayer} />
