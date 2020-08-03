<script>
  import { uudised } from '../stores/uudised';
  import '../laeUudised';

  import { onMount } from 'svelte';
  import { navigateTo } from 'svelte-router-spa';

  export let currentRoute;
  export let params = {};

  const id = currentRoute.namedParams.id;
  $: uudis = $uudised.filter(uudis => uudis.id === id)[0];

  onMount(async () => {
    await setTimeout(() => {
      if (!uudis) navigateTo(`/404?id=${id}`);
    }, 1500);
  });
</script>

<svelte:head>
  <title>{uudis ? uudis.pealkiri : '...'} - kNews</title>
</svelte:head>

<section class="uudis">
  {#if uudis}
    <h1>{uudis.pealkiri}</h1>
    <p>{uudis.sisu}</p>
  {:else}
    <p>Laadimine</p>
  {/if}
  <a href="/">Esilehele</a>
</section>
