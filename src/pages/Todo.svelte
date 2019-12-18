<script>
  import { onMount } from "svelte";

  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  import SuperList from "../SuperList.svelte";

  let todos = [];

  onMount(async function() {
    await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then(res => res.json())
      .then(json => (todos = json))
      .catch(console.log);
  });

  function add(input) {
    const todo = {
      id: +new Date(),
      title: input.value,
      completed: false
    };

    todos = [todo, ...todos];
    input.value = "";
  }

  function TodoCompletion() {
    todos = todos;
  }

  function deleteTodo(e) {
    todos = todos.filter(t => t.id !== e.detail.id);
  }
</script>

<style>
  .left,
  .right {
    float: left;
    width: 50%;
    padding: 0 1em 0 0;
    box-sizing: border-box;
  }
  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
  }
  .new-todo {
    font-size: 1.4em;
    width: 100%;
    margin: 2em 0 1em 0;
  }
  .right :global(label) {
    background-color: rgb(180, 240, 100);
  }
</style>

<input
  class="new-todo"
  placeholder="what needs to be done?"
  on:keydown={event => event.which === 13 && add(event.target)} />
<div class="left">
  <SuperList
    items={todos.filter(itm => !itm.completed)}
    on:completion={TodoCompletion}
    on:delete={deleteTodo}>
    <h2 slot="title">Todo</h2>
  </SuperList>
</div>
<div class="right">
  <SuperList
    items={todos.filter(itm => itm.completed)}
    on:completion={TodoCompletion}
    on:delete={deleteTodo}>
    <h2 slot="title">Completed</h2>
  </SuperList>
</div>
