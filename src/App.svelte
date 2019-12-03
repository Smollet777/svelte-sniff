<script>
  import { Router, Route } from "svero";

  import Scoreboard from "./pages/Scoreboard.svelte";
  import Todo from "./pages/Todo.svelte";
  import Gender from "./pages/Gender.svelte";

  import Navbar from "./Navbar.svelte";
</script>

<style>

</style>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/ce015ae463.js"
    crossorigin="anonymous">

  </script>
</svelte:head>

<Navbar />
<div class="container">
  <Router>
    <Route exact path="/" component={Scoreboard} />
    <Route path="/todo" component={Todo} />
    <Route path="/genders" component={Gender} />
    <Route path="*">
      <p>404 Page Not found</p>
    </Route>
  </Router>
</div>
