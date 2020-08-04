<script>
  import { firestore, serverTimestamp, analytics } from '@/firebase';
  import { navigateTo } from 'svelte-router-spa';

  import { uudised } from '@/stores/uudised';
  import { user } from '@/stores/user';

  let uudis = {
    pealkiri: '',
    sisu: '',
  };

  async function onSubmit() {
    if (!$user) return;

    const id = uudis.pealkiri
      .toLowerCase()
      .substring(0, 40)
      .replace(/([\\\\\/?!.,-<>_'*~=+])/gi, '')
      .replace(/[õö]/gi, 'o')
      .replace(/ä/gi, 'a')
      .replace(/ü/gi, 'u')
      .split(' ')
      .join('-');

    uudis.id = id;
    uudis.sisu = uudis.sisu.replace(/\n/gi, '&nl;');
    uudis.loodud = serverTimestamp();
    uudis.autor = {
      uid: $user.uid,
      displayName: $user.displayName,
    };
    uudis.kommentaare = 0;

    await firestore.collection('uudised').doc(uudis.id).set(uudis);
    analytics.logEvent('add_new', { name: 'Uus uudis' });
    uudised.add(uudis);
    uudis = {};
    navigateTo(`uudis/${id}`);
  }
</script>

<section class="uus-uudis">
  {#if $user}
    <form on:submit|preventDefault={onSubmit}>
      <div class="row">
        <div class="six columns">
          <label for="pealkiri">Pealkiri</label>
          <input
            type="text"
            id="pealkiri"
            class="u-full-width"
            placeholder="Pealkiri"
            required
            bind:value={uudis.pealkiri} />
        </div>
      </div>
      <div class="row">
        <div class="twelve columns">
          <label for="sisu">Sisu</label>
          <textarea
            id="sisu"
            class="u-full-width"
            cols="30"
            rows="10"
            placeholder="Sisu"
            required
            bind:value={uudis.sisu} />
        </div>
      </div>
      <button type="submit">Lisa</button>
    </form>
  {:else}
    <p>Uudiste lisamiseks pead olema sisselogitud.</p>
  {/if}
</section>
