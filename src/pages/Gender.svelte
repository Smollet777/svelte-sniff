<script>
  import { onMount } from "svelte";

  import { genders } from "../stores.js";

  let newGender = "";
  let gendersStr = "";

  onMount(_ => {
    const unsubscribe = genders.subscribe(value => {
      gendersStr = value.toString();
    });
  });

  function onSubmit() {
    //отдельно 'set' и 'add' для наглядности "кастомности" stores

    if ($genders.toString() !== gendersStr) {
      genders.set(gendersStr.split(","));
    }
    if (newGender.length) {
      genders.add(newGender);
      newGender = "";
    }
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <p>Add another gender</p>
  <input type="text" placeholder="Another gender" bind:value={newGender} />
  <p>and/or replace existing</p>
  <input type="text" placeholder="..." bind:value={gendersStr} />
  <input type="submit" class="btn btn-primary" value="Add" />
  {#each $genders as gender}
    <p>{gender}</p>
  {/each}
</form>
