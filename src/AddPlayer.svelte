<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const defaultPlayer = { name: "", points: 0 };
  let player = { ...defaultPlayer };

  const onSubmit = e => {
    e.preventDefault();

    player.id = +new Date();
    dispatch("addplayer", player);

    player = { ...defaultPlayer };
  };
</script>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
</style>

<form on:submit={onSubmit}>
  <input
    type="text"
    bind:value={player.name}
    placeholder="Player name"
    required />
  <input type="number" bind:value={player.points} />
  <input type="submit" class="btn btn-primary" value="Add Player" />
</form>
