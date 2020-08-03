<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';
  import { firestore } from './firebase';

  import { onMount } from 'svelte';

  import { uudised } from './stores/uudised';

  import './laeUudised';

  onMount(async () => {});
</script>

<style>

</style>

<main>
  <Router {routes} />
</main>
