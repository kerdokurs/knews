<script>
  import { user } from '@/stores/user';
  import { rubriigid } from '@/stores/rubriigid';
  import { firestore, serverTimestamp } from '@/firebase';
  import { navigateTo } from 'svelte-router-spa/src/spa_router';

  let rubriik = {
    pealkiri: '',
    kirjeldus: '',
  };

  async function onSubmit() {
    rubriik.id = rubriik.pealkiri.toLowerCase().split(' ')[0];
    rubriik.loodud = serverTimestamp();

    await firestore.collection('rubriigid').doc(rubriik.id).set(rubriik);
    rubriigid.add(rubriik);
    rubriik = {};
    navigateTo('/');
  }
</script>

<svelte:head>
  <title>Uus rubriik - kNews</title>
</svelte:head>

<section class="uus-rubriik">
  {#if $user && $user.editor}
    <form on:submit|preventDefault={onSubmit}>
      <div class="row">
        <div class="four columns">
          <label for="pealkiri">Pealkiri</label>
          <input
            type="text"
            class="u-full-width"
            id="pealkiri"
            placeholder="Pealkiri"
            required
            bind:value={rubriik.pealkiri} />
        </div>
      </div>
      <div class="row">
        <div class="twelve columns">
          <label for="kirjeldus">Kirjeldus</label>
          <input
            type="text"
            class="u-full-width"
            id="kirjeldus"
            placeholder="Kirjeldus"
            required
            bind:value={rubriik.kirjeldus} />
        </div>
      </div>
      <button type="submit">Lisa</button>
    </form>
  {:else}
    <p>Rubriikide lisamiseks pead olema toimetaja.</p>
  {/if}
</section>
