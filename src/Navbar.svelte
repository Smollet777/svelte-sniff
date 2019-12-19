<script>
  import { spring } from "svelte/motion";
  import { pannable } from "./pannable.js";

  import { Link } from "svero";

  const coords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4
    }
  );

  function handlePanStart() {
    coords.stiffness = coords.damping = 1;
  }

  function handlePanMove(event) {
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }));
  }

  function handlePanEnd(event) {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
  }
</script>

<style>
  h1 {
    cursor: move;
  }
</style>

<div class="navbar bg-primary">
  <h1
    use:pannable
    on:panstart={handlePanStart}
    on:panmove={handlePanMove}
    on:panend={handlePanEnd}
    style="transform: translate({$coords.x}px,{$coords.y}px) ">
    Svelte SPA
  </h1>
  <Link href="/">scoreboard</Link>
  <Link href="/todo">todo</Link>
  <Link href="/genders">add another gender</Link>
</div>
