<script>
  import { uudised } from '@/stores/uudised';
  import { firestore, analytics } from '@/firebase';
  import { user } from '@/stores/user';

  import Kommentaarid from '@/uudised/kommentaarid/Kommentaarid.svelte';

  import moment from 'moment';
  import 'moment/locale/et';
  moment.locale('et');

  import { navigateTo } from 'svelte-router-spa';

  export let currentRoute;

  const id = currentRoute.namedParams.id;
  $: uudis = $uudised.filter((uudis) => uudis.id === id)[0];

  async function kustuta() {
    await firestore.collection('uudised').doc(id).delete();
    analytics.logEvent('remove_news', { name: 'Uudis kustutatud' });
    uudised.del(id);
    navigateTo('/');
  }

  // TODO: Mõtle hea süsteem puuduva uudise ja laadimise näitamiseks.
</script>

<style>
  .uudis-title {
    font-family: Recursive, sans-serif;
    font-size: 2.5em;
  }

  .uudis-rubriik a {
    font-size: 0.9em;
  }

  .uudis-sisu {
    line-height: 2em;
  }

  .uudis-metadata {
    margin-top: 20px;
    font-size: 0.9em;
  }

  .kustuta {
    cursor: pointer;
    color: red;
  }

  .redigeeri {
    text-decoration: none;
    border: none;
    color: green;
  }
</style>

<svelte:head>
  <title>{uudis ? uudis.pealkiri : '...'} - kNews</title>
</svelte:head>

<section class="uudis">
  <a href="/">Esilehele</a>
  {#if uudis}
    <br />
    <span class="uudis-title">{uudis.pealkiri}</span>
    <br />
    <span class="uudis-sisu">
      {@html uudis.sisu}
    </span>
    <br />
    <div class="uudis-metadata">
      {#if uudis.rubriik}
        <span class="uudis-rubriik">
          <a href={`/rubriik/${uudis.rubriik.id}`}>{uudis.rubriik.pealkiri}</a>
        </span>
        <br />
      {/if}
      <span>
        {#if uudis.muudetud}
          Uuendatud: {uudis.muudetud.toDate ? moment(uudis.muudetud.toDate()).fromNow() : 'mõni sekund tagasi'}
        {:else}
          Loodud: {uudis.loodud.toDate ? moment(uudis.loodud.toDate()).fromNow() : 'mõni sekund tagasi'}
        {/if}
      </span>
      {#if $user && ((uudis.autor.uid === $user.uid && $user.editor) || $user.admin)}
        <br />
        <a href={`/redigeeri/${id}`} class="redigeeri">Redigeeri</a>
        <br />
        <span class="kustuta" on:click={kustuta}>Kustuta</span>
      {/if}
    </div>
    <Kommentaarid id={uudis.id} />
  {:else}
    <p>Laadimine</p>
  {/if}
</section>
