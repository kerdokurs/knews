<script>
  export let currentRoute;
  export let params;

  const id = currentRoute.queryParams.id;
</script>

<svelte:head>
  <title>404 - kNews</title>
</svelte:head>

<section class="e404">
  <h4>Vabandame, soovitud dokument puudub.</h4>
  {#if id}
    <p>Dokumendi id: {id}</p>
  {/if}
  <a href="/">Esilehele</a>
</section>
