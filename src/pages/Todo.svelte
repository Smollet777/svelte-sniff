<script>
  import { onMount } from "svelte";

  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  let todos = [];
  onMount(async function() {
    await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then(res => res.json())
      .then(json => (todos = json))
      .catch(console.log);
  });

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

  function add(input) {
    const todo = {
      id: +new Date(),
      title: input.value,
      completed: false
    };

    todos = [todo, ...todos];
    input.value = "";
  }

  function remove(todo) {
    todos = todos.filter(t => t.id !== todo.id);
  }
</script>

<style>
  .new-todo {
    font-size: 1.4em;
    width: 100%;
    margin: 2em 0 1em 0;
  }

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

  input {
    margin: 0;
  }

  .right label {
    background-color: rgb(180, 240, 100);
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

<input
  class="new-todo"
  placeholder="what needs to be done?"
  on:keydown={event => event.which === 13 && add(event.target)} />

<div class="left">
  <h2>todo</h2>
  {#each todos.filter(t => !t.completed) as todo (todo.id)}
    <label
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip>
      <input type="checkbox" bind:checked={todo.completed} />
      {todo.title}
      <button on:click={() => remove(todo)} title="remove">
        <i class="fas fa-times" aria-label="remove uncompleted" />
      </button>
    </label>
  {/each}
</div>

<div class="right">
  <h2>completed</h2>
  {#each todos.filter(t => t.completed) as todo (todo.id)}
    <label
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip>
      <input type="checkbox" bind:checked={todo.completed} />
      {todo.title}
      <button on:click={() => remove(todo)} title="remove">
        <i class="fas fa-times" aria-label="remove completed" />
      </button>
    </label>
  {/each}
</div>
