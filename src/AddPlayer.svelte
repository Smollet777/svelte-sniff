<script>
  import { createEventDispatcher } from "svelte";

  import { genders } from "./stores.js";

  const dispatch = createEventDispatcher();

  const defaultPlayer = { name: "", points: 0, gender: genders[0] };
  let player = { ...defaultPlayer };

  const onSubmit = () => {
    player.id = +new Date();
    dispatch("addplayer", player);

    player = { ...defaultPlayer };
  };
</script>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }

  form > * {
    align-self: center;
  }
</style>

<form on:submit|preventDefault={onSubmit}>
  <input
    type="text"
    bind:value={player.name}
    placeholder="Player name"
    required />
  <input type="number" bind:value={player.points} />
  <select size="1" title="gender" bind:value={player.gender}>
    {#each $genders as gender}
      <option value={gender}>{gender}</option>
    {/each}
  </select>
  <input type="submit" class="btn btn-primary" value="Add Player" />
</form>
