<script>
  import { navigateTo } from 'svelte-router-spa';
  import { rubriigid } from '@/stores/rubriigid';
  import { uudised } from '@/stores/uudised';
  import { firestore } from '@/firebase';
  import { user } from '@/stores/user';

  export let currentRoute;

  const id = currentRoute.namedParams ? currentRoute.namedParams.id : null;
  $: rubriik = $rubriigid.filter((rubriik) => rubriik.id === id)[0];

  $: rubriigiUudised = $uudised.filter(
    (uudis) => uudis.rubriik && uudis.rubriik.id === id
  );

  async function kustuta() {
    await firestore.collection('rubriigid').doc(id).delete();
    rubriigid.del(id);
    navigateTo('/rubriigid');
  }
</script>

<style>
  ul {
    list-style-type: none;
  }

  .rubriik-title {
    font-family: Recursive, sans-serif;
    font-size: 2.5em;
  }

  .rubriik-kirjeldus {
    font-size: 1.5em;
  }

  .kustuta {
    cursor: pointer;
    color: red;
    font-size: 0.9em;
  }
</style>

<svelte:head>
  <title>{rubriik ? rubriik.pealkiri : '...'} - kNews</title>
</svelte:head>

<section class="rubriik">
  {#if rubriik}
    <span class="rubriik-title">{rubriik.pealkiri}</span>
    <br />
    <span class="rubriik-kirjeldus">{rubriik.kirjeldus}</span>
    <br />
    <br />
    <ul>
      {#each rubriigiUudised as uudis}
        <li>
          <a href={`/uudis/${uudis.id}`}>{uudis.pealkiri}</a>
        </li>
      {/each}
    </ul>
    {#if $user && ($user.editor || $user.admin)}
      <br />
      <span class="kustuta" on:click={kustuta}>Kustuta</span>
    {/if}
  {/if}
</section>
