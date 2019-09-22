<script>
  import { Router, Route } from "svero";

  import Scoreboard from "./pages/Scoreboard.svelte";
  import Todo from "./pages/Todo.svelte";

  import Navbar from "./Navbar.svelte";
</script>

<style>

</style>

<Navbar />
<div class="container">
  <Router>
    <Route exact path="/" component={Scoreboard} />
    <Route path="/todo" component={Todo} />
    <Route path="*">
      <p>404 Page Not found</p>
    </Route>
  </Router>
</div>
