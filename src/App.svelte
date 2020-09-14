<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import Navigation from '@/Navigation.svelte';

  import './stores/uudised';
</script>

<style>

</style>

<main>
  <Navigation />
  <div class="container">
    <Router {routes} />
  </div>
</main>
